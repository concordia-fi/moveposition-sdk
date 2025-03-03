import { InputTransactionData } from "@aptos-labs/wallet-adapter-core"
export class SuperpositionAptosSDK {
  /**
   * @param aptosRootAddress 0x-prefixed address
   */
  constructor(public aptosRootAddress: string) {}

  /**
   * Construct a transaction that lends to the signer's portfolio
   * @param packet Hocket packet
   * @param coinType 0x-prefixed coin address
   * @returns transaction payload
   */
  lendV2Ix(packet: Uint8Array, coinType: string) {
    return {
      type: "entry_function_payload",
      function: `${this.aptosRootAddress}::entry_public::lend_v2`,
      type_arguments: [coinType],
      arguments: [packet],
    }
  }

  /**
   * Construct a transaction that lends to any portfolio
   * @param packet Hocket packet
   * @param coinType 0x-prefixed coin address
   * @returns transaction payload
   */
  lendToPortfolioIx(
    {
      packet,
      recipientPortfolio,
      coinType
    }: {
      packet: Uint8Array;
      recipientPortfolio: string;
      coinType: string
    }) {
    return {
      type: "entry_function_payload",
      function: `${this.aptosRootAddress}::entry_public::lend_to_portfolio`,
      type_arguments: [coinType],
      arguments: [recipientPortfolio, packet],
    }
  }

  redeemV2Ix(packet: Uint8Array, coinType: string) {
    return {
      type: "entry_function_payload",
      function: `${this.aptosRootAddress}::entry_public::redeem_v2`,
      type_arguments: [coinType],
      arguments: [packet],
    }
  }

  borrowV2Ix(packet: Uint8Array, coinType: string) {
    return {
      type: "entry_function_payload",
      function: `${this.aptosRootAddress}::entry_public::borrow_v2`,
      type_arguments: [coinType],
      arguments: [packet],
    }
  }

  repayV2Ix(packet: Uint8Array, coinType: string) {
    return {
      type: "entry_function_payload",
      function: `${this.aptosRootAddress}::entry_public::repay_v2`,
      type_arguments: [coinType],
      arguments: [packet],
    }
  }

  liquidateV1Ix(packet: Uint8Array, coinTypeOne: string, coinTypeTwo: string) {
    return {
      type: "entry_function_payload",
      function: `${this.aptosRootAddress}::entry_public::liquidate_v1`,
      type_arguments: [coinTypeOne, coinTypeTwo],
      arguments: [packet],
    }
  }

  // Liquidate up to 32 coins
  liquidateV2Ix(
    packet: Uint8Array,
    coinTypeOne: string,
    coinTypeTwo: string,
    coinTypeThree: string,
    coinTypeFour: string,
    coinTypeFive: string,
    coinTypeSix: string,
    coinTypeSeven: string,
    coinTypeEight: string,
    coinTypeNine: string,
    coinTypeTen: string,
    coinTypeEleven: string,
    coinTypeTwelve: string,
    coinTypeThirteen: string,
    coinTypeFourteen: string,
    coinTypeFifteen: string,
    coinTypeSixteen: string,
    coinTypeSeventeen: string,
    coinTypeEighteen: string,
    coinTypeNineteen: string,
    coinTypeTwenty: string,
    coinTypeTwentyOne: string,
    coinTypeTwentyTwo: string,
    coinTypeTwentyThree: string,
    coinTypeTwentyFour: string,
    coinTypeTwentyFive: string,
    coinTypeTwentySix: string,
    coinTypeTwentySeven: string,
    coinTypeTwentyEight: string,
    coinTypeTwentyNine: string,
    coinTypeThirty: string,
    coinTypeThirtyOne: string,
    coinTypeThirtyTwo: string,
  ) {
    return {
      type: "entry_function_payload",
      function: `${this.aptosRootAddress}::entry_public::liquidate_v2`,
      type_arguments: [
        coinTypeOne,
        coinTypeTwo,
        coinTypeThree,
        coinTypeFour,
        coinTypeFive,
        coinTypeSix,
        coinTypeSeven,
        coinTypeEight,
        coinTypeNine,
        coinTypeTen,
        coinTypeEleven,
        coinTypeTwelve,
        coinTypeThirteen,
        coinTypeFourteen,
        coinTypeFifteen,
        coinTypeSixteen,
        coinTypeSeventeen,
        coinTypeEighteen,
        coinTypeNineteen,
        coinTypeTwenty,
        coinTypeTwentyOne,
        coinTypeTwentyTwo,
        coinTypeTwentyThree,
        coinTypeTwentyFour,
        coinTypeTwentyFive,
        coinTypeTwentySix,
        coinTypeTwentySeven,
        coinTypeTwentyEight,
        coinTypeTwentyNine,
        coinTypeThirty,
        coinTypeThirtyOne,
        coinTypeThirtyTwo,
      ],
      arguments: [packet],
    }
  }

  superLendV2Ix(packet: Uint8Array, coinType: string, sender: string): InputTransactionData {
    // Martian wallet does not know how to handle a Uint8Array
    // argument, so we're forced to convert it to a plain Array
    const packetArgument = Array.from(packet)

    return {
      sender,
      data: {
        function: `${this.aptosRootAddress}::entry_public::lend_v2`,
        typeArguments: [coinType],
        functionArguments: [packetArgument],
      },
    }
  }

  superRedeemV2Ix(packet: Uint8Array, coinType: string, sender: string): InputTransactionData {
    // Marian wallet does not know how to handle a Uint8Array
    // argument, so we're forced to convert it to a plan Array
    const packetArgument = Array.from(packet)

    return {
      sender,
      data: {
        function: `${this.aptosRootAddress}::entry_public::redeem_v2`,
        typeArguments: [coinType],
        functionArguments: [packetArgument],
      },
    }
  }

  superBorrowV2Ix(packet: Uint8Array, coinType: string, sender: string): InputTransactionData {
    // Marian wallet does not know how to handle a Uint8Array
    // argument, so we're forced to convert it to a plan Array
    const packetArgument = Array.from(packet)

    return {
      sender,
      data: {
        function: `${this.aptosRootAddress}::entry_public::borrow_v2`,
        typeArguments: [coinType],
        functionArguments: [packetArgument],
      },
    }
  }

  superRepayV2Ix(packet: Uint8Array, coinType: string, sender: string): InputTransactionData {
    // Marian wallet does not know how to handle a Uint8Array
    // argument, so we're forced to convert it to a plan Array
    const packetArgument = Array.from(packet)

    return {
      sender,
      data: {
        function: `${this.aptosRootAddress}::entry_public::repay_v2`,
        typeArguments: [coinType],
        functionArguments: [packetArgument],
      },
    }
  }
}
