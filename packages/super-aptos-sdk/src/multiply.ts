import { AptosClient, HexString } from "aptos"
import { ThalaSDK } from "./thala"

type TypeInfo = {
  account_address: string,
  module_name: string,
  struct_name: string,
}

type InstrumentBalance = {
  instrument_balance: string,
  instrument_id: TypeInfo,
}

type PortfolioBalances = {
  collaterals: InstrumentBalance[],
  liabilities: InstrumentBalance[],
}

export class MultiplySDK {
  thalaSDK: ThalaSDK

  /**
   * @param multiplyAddress 0x-prefixed address
   */
  constructor(
    public multiplyAddress: string,
    public superpAddress: string
  ) {
    this.thalaSDK = new ThalaSDK()
  }

  openMultiplyVaultIx(
    lendAndBorrowPacket: Uint8Array,
    principalAmount: number,
    flashLoanAmount: number,
    collateralCoinType: string,
    liabilityCoinType: string,
  ) {
    // Martian wallet does not know how to handle a Uint8Array
    // argument, so we're forced to convert it to a plain Array
    const lendAndBorrowPacketArgument = Array.from(lendAndBorrowPacket)

    return {
      type: "entry_function_payload",
      function: `${this.multiplyAddress}::multiply_public::open_vault`,
      type_arguments: [collateralCoinType, liabilityCoinType],
      arguments: [lendAndBorrowPacketArgument, principalAmount, flashLoanAmount],
    }
  }

  async getVaultAddress(
    aptosClient: AptosClient,
    vaultOwner: string,
    collateralCoinType: string,
    liabilityCoinType: string,
  ): Promise<string> {
    const [vaultAddress] = (await aptosClient.view({
      function: `${this.multiplyAddress}::multiply_public::get_vault_address`,
      arguments: [vaultOwner],
      type_arguments: [collateralCoinType, liabilityCoinType],
    })) as [string]

    return vaultAddress
  }

  async getMultiplyLeverage(
    aptosClient: AptosClient,
    vaultAddress: string,
    collateralCoinType: string,
    liabilityCoinType: string,
  ): Promise<number> {
    const leverage = (await aptosClient.view({
      function: `${this.multiplyAddress}::multiply_public::get_vault_leverage`,
      type_arguments: [collateralCoinType, liabilityCoinType],
      arguments: [vaultAddress],
    })) as [{ principal_amount: number; flash_loan_amount: number }]
    if (leverage[0].principal_amount == 0 || leverage[0].flash_loan_amount == 0) {
      return 0
    }

    const numerator_amount = Number(leverage[0].flash_loan_amount) + Number(leverage[0].principal_amount)
    return numerator_amount / leverage[0].principal_amount
  }

  typeInfoToString(typeInfo: TypeInfo): string {
    const moduleNameHexString = new HexString(typeInfo.module_name)
    const moduleNameUint8Array = moduleNameHexString.toUint8Array()
    const moduleNameString = new TextDecoder().decode(moduleNameUint8Array)
    const structNameHexString = new HexString(typeInfo.struct_name)
    const structNameUint8Array = structNameHexString.toUint8Array()
    const structNameString = new TextDecoder().decode(structNameUint8Array)
    return `${typeInfo.account_address}::${moduleNameString}::${structNameString}`
  }

  async getMainnetSthaptCollateralBalance(
    aptosClient: AptosClient,
    portfolioView: PortfolioBalances): Promise<number> {
    const sthaptDepositNoteBalance = parseInt(portfolioView.collaterals[0].instrument_balance)
    let totalSthaptDeposited: number
    {
      const collateralCoinType = '0xfaf4e633ae9eb31366c9ca24214231760926576c7b625313b3688b5e900731f6::staking::StakedThalaAPT'
      const viewResult = (await aptosClient.view({
        function: `${this.superpAddress}::broker::deposited`,
        arguments: [],
        type_arguments: [collateralCoinType],
      }) as [string])
      totalSthaptDeposited = parseInt(viewResult[0])
    }

    let depositNoteSupply: number
    {
      const viewResult = (await aptosClient.view({
        function: `${this.superpAddress}::broker::deposit_note_supply`,
        arguments: [],
        type_arguments: ['0xfaf4e633ae9eb31366c9ca24214231760926576c7b625313b3688b5e900731f6::staking::StakedThalaAPT'],
      }) as [string])
      depositNoteSupply = parseInt(viewResult[0])
    }
    const sthaptCollateralCoinBalance = sthaptDepositNoteBalance * totalSthaptDeposited / depositNoteSupply
    return sthaptCollateralCoinBalance
  }

  async getMainnetAptLiabilityBalance(
    aptosClient: AptosClient,
    portfolioView: PortfolioBalances): Promise<number> {
    const aptLiabilityNoteBalance = parseInt(portfolioView.liabilities[0].instrument_balance)
    let totalAptBorrowed: number
    {
      const liabilityCoinType = '0x1::aptos_coin::AptosCoin'
      const viewResult = (await aptosClient.view({
        function: `${this.superpAddress}::broker::borrowed`,
        arguments: [],
        type_arguments: [liabilityCoinType],
      }) as [string])
      totalAptBorrowed = parseInt(viewResult[0])
    }

    let loanNoteSupply: number
    {
      const viewResult = (await aptosClient.view({
        function: `${this.superpAddress}::broker::loan_note_supply`,
        arguments: [],
        type_arguments: ['0x1::aptos_coin::AptosCoin'],
      }) as [string])
      loanNoteSupply = parseInt(viewResult[0])
    }

    const aptLiabilityCoinBalance = aptLiabilityNoteBalance * totalAptBorrowed / loanNoteSupply
    return aptLiabilityCoinBalance
  }

  async estimateMainnetSthaptRedemptionAmount({
    aptosClient,
    vaultAddress,
  }: {
    aptosClient: AptosClient
    vaultAddress: string
  }): Promise<number> {
    let portfolioViewRaw
    {
      const viewResult = await aptosClient.view({
        function: `${this.superpAddress}::portfolio::portfolio_view`,
        arguments: [vaultAddress],
        type_arguments: [],
      })
      portfolioViewRaw = viewResult[0]
    }
    const portfolioView = portfolioViewRaw as PortfolioBalances
    const sthaptCollateralBalance = await this.getMainnetSthaptCollateralBalance(aptosClient, portfolioView)

    if (sthaptCollateralBalance == 0) {
      return 0
    }

    const aptLiabilityBalance = await this.getMainnetAptLiabilityBalance(aptosClient, portfolioView)

    // 0.3% flash loan fee
    const flashLoanFeeRate = 0.003
    const aptFlashLoanFee = aptLiabilityBalance * flashLoanFeeRate
    const aptFlashLoanRepayment = aptLiabilityBalance + aptFlashLoanFee

    const estimatedTotalAptBeforeRepay = await this.thalaSDK.estimateSthaptToApt({
      aptosClient,
      sthaptAmountIn: sthaptCollateralBalance,
    })
    const estimatedAptRedemptionAmount = estimatedTotalAptBeforeRepay - aptFlashLoanRepayment
    return estimatedAptRedemptionAmount
  }

  /**
   * Estimate the amount of liabilityCoinType coins that will be
   * redeemed by the user when the vault is closed
   */
  async estimateClosingRedemptionAmount({
    aptosClient,
    vaultAddress,
    collateralCoinType,
    liabilityCoinType,
  }: {
    aptosClient: AptosClient
    vaultAddress: string
    collateralCoinType: string
    liabilityCoinType: string
  }): Promise<number> {
    {
      const viewResult = await aptosClient.view({
        function: `${this.superpAddress}::portfolio::portfolio_view`,
        arguments: [vaultAddress],
        type_arguments: [],
      })
      const portfolioViewRaw = viewResult[0]
      const portfolioView = portfolioViewRaw as PortfolioBalances
      if (portfolioView.collaterals.length < 1) {
        // vault not created yet
        return 0
      }
    }

    if (collateralCoinType == '0xdf7256dba0d07aafdd98dafb50cade82db360bc5a5003c170ae88ffd1769fd85::coins::StakedThalaAPT' && liabilityCoinType == '0xdf7256dba0d07aafdd98dafb50cade82db360bc5a5003c170ae88ffd1769fd85::coins::CoinB') {
      const [redemptionAmount] = (await aptosClient.view({
        function: `${this.multiplyAddress}::multiply_public::estimate_closing_redemption_amount`,
        type_arguments: [collateralCoinType, liabilityCoinType],
        arguments: [vaultAddress],
      })) as [string]
      return parseInt(redemptionAmount)
    } else if (collateralCoinType == `0xfaf4e633ae9eb31366c9ca24214231760926576c7b625313b3688b5e900731f6::staking::StakedThalaAPT` && liabilityCoinType == '0x1::aptos_coin::AptosCoin') {
      return this.estimateMainnetSthaptRedemptionAmount({ aptosClient, vaultAddress })
    } else {
      throw new Error(`Unsupported coin types: ${collateralCoinType} ${liabilityCoinType}`)
    }
  }

  closeMultiplyVaultIx(
    repayAndRedeemPacket: Uint8Array,
    collateralCoinType: string,
    liabilityCoinType: string,
    minLiabilityCoinAmountOut: number,
  ) {
    // Martian wallet does not know how to handle a Uint8Array
    // argument, so we're forced to convert it to a plain Array
    const repayAndRedeemPacketArgument = Array.from(repayAndRedeemPacket)
    const unused = 0
    return {
      type: "entry_function_payload",
      function: `${this.multiplyAddress}::multiply_public::close_vault`,
      arguments: [repayAndRedeemPacketArgument, minLiabilityCoinAmountOut, unused],
      type_arguments: [collateralCoinType, liabilityCoinType],
    }
  }
}
