import { AptosClient, Network } from "aptos"
import { MultiplySDK } from "@concordia/super-aptos-sdk"
import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"
chai.use(chaiAsPromised)
const expect = chai.expect

const TESTNET_MULTIPLY_ADDRESS = "0xc9324f0a32efe3c9cb8ee32023b9fd6eeec760e004a2d4844a0ac0e036d7112c"
const TESTNET_SUPERP_ADDRESS = "0x93305a1157665b3f837a2acf1de9f5018050775356b743684ee390797fbaf8d6"
const TESTNET_URL = 'https://fullnode.testnet.aptoslabs.com/v1'
const MAINNET_MULTIPLY_ADDRESS = '0x4dc16e1fe9872adce33d0bbf7f64f4db638a60fd6170f680ed0c3159891ae9f0'
const MAINNET_SUPERP_ADDRESS = '0xccd1a84ccea93531d7f165b90134aa0415feb30e8757ab1632dac68c0055f5c2'
const MAINNET_URL = 'https://api.mainnet.aptoslabs.com/v1'

describe("test multiply SDK", () => {
  it("estimates mainnet StakedThala multiply vault closing amount", async function () {
    let multiplySDK = new MultiplySDK(MAINNET_MULTIPLY_ADDRESS, MAINNET_SUPERP_ADDRESS)
    const aptosClient = new AptosClient(MAINNET_URL)
    // Existing user address in testnet
    const ownerAddress = "0xe3d0fa42bd7f368390c9fc6241c968335c623c31ba0044d94d6b8eacbf29fe7e"
    const collateralCoinType = '0xfaf4e633ae9eb31366c9ca24214231760926576c7b625313b3688b5e900731f6::staking::StakedThalaAPT'
    const liabilityCoinType = '0x1::aptos_coin::AptosCoin'
    const vaultAddress = await multiplySDK.getVaultAddress(
      aptosClient,
      ownerAddress,
      collateralCoinType,
      liabilityCoinType)
    expect(vaultAddress).to.be.equal("0xd5e94ea8ce921c28f21b3d559d8de0fdc975c9dcf3c2035fc2b9a1603d0e2996")
    const estimatedAmountOut = await multiplySDK.estimateClosingRedemptionAmount({
      aptosClient,
      vaultAddress,
      collateralCoinType,
      liabilityCoinType
    })
    expect(estimatedAmountOut).to.be.greaterThan(0)
  })

  it("estimates testnet StakedThala multiply vault closing amount", async function () {
    let multiplySDK = new MultiplySDK(TESTNET_MULTIPLY_ADDRESS, TESTNET_SUPERP_ADDRESS)
    const aptosClient = new AptosClient(TESTNET_URL)
    // Existing user address in testnet
    const ownerAddress = "0xe3d0fa42bd7f368390c9fc6241c968335c623c31ba0044d94d6b8eacbf29fe7e"
    const collateralCoinType = '0xdf7256dba0d07aafdd98dafb50cade82db360bc5a5003c170ae88ffd1769fd85::coins::StakedThalaAPT'
    const liabilityCoinType = '0xdf7256dba0d07aafdd98dafb50cade82db360bc5a5003c170ae88ffd1769fd85::coins::CoinB'
    const vaultAddress = await multiplySDK.getVaultAddress(
      aptosClient,
      ownerAddress,
      collateralCoinType,
      liabilityCoinType)
    const estimatedAmountOut = await multiplySDK.estimateClosingRedemptionAmount({
      aptosClient,
      vaultAddress,
      collateralCoinType,
      liabilityCoinType
    })
    expect(estimatedAmountOut).to.be.greaterThan(0)
  })
})
