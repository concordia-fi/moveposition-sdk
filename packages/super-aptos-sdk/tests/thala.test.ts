import { AptosClient } from "aptos"
import { ThalaSDK } from "@concordia/super-aptos-sdk"
import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"
chai.use(chaiAsPromised)
const expect = chai.expect

const MAINNET_URL = 'https://fullnode.mainnet.aptoslabs.com/v1'

describe("test thala SDK", () => {
  it("gets the mainnet thAPT/APT swap pool balances", async function () {
    const thalaSDK = new ThalaSDK()
    const aptosClient = new AptosClient(MAINNET_URL)
    const balances: number[] = await thalaSDK.getThalaSwapPoolBalances({
      aptosClient,
      coinTypeOne: '0xfaf4e633ae9eb31366c9ca24214231760926576c7b625313b3688b5e900731f6::staking::ThalaAPT',
      coinTypeTwo: '0x1::aptos_coin::AptosCoin',
      coinTypeThree: '0x48271d39d0b05bd6efca2278f22277d6fcc375504f9839fd73f74ace240861af::base_pool::Null',
      coinTypeFour: '0x48271d39d0b05bd6efca2278f22277d6fcc375504f9839fd73f74ace240861af::base_pool::Null'
    })
    expect(balances[0]).to.be.greaterThan(0)
    expect(balances[1]).to.be.greaterThan(0)
  })

  it("gets the mainnet thAPT/APT swap pool AMP factor", async function () {
    const thalaSDK = new ThalaSDK()
    const aptosClient = new AptosClient(MAINNET_URL)
    const ampFactor = await thalaSDK.getThalaSwapPoolAmpFactor({
      aptosClient,
      coinTypeOne: '0xfaf4e633ae9eb31366c9ca24214231760926576c7b625313b3688b5e900731f6::staking::ThalaAPT',
      coinTypeTwo: '0x1::aptos_coin::AptosCoin',
      coinTypeThree: '0x48271d39d0b05bd6efca2278f22277d6fcc375504f9839fd73f74ace240861af::base_pool::Null',
      coinTypeFour: '0x48271d39d0b05bd6efca2278f22277d6fcc375504f9839fd73f74ace240861af::base_pool::Null'
    })
    expect(ampFactor).to.be.equal(50)
  })

  it("gets the mainnet thAPT/APT swap pool fee rate", async function () {
    const thalaSDK = new ThalaSDK()
    const aptosClient = new AptosClient(MAINNET_URL)
    const feeRate = await thalaSDK.getThalaSwapPoolFeeRate({
      aptosClient,
      coinTypeOne: '0xfaf4e633ae9eb31366c9ca24214231760926576c7b625313b3688b5e900731f6::staking::ThalaAPT',
      coinTypeTwo: '0x1::aptos_coin::AptosCoin',
      coinTypeThree: '0x48271d39d0b05bd6efca2278f22277d6fcc375504f9839fd73f74ace240861af::base_pool::Null',
      coinTypeFour: '0x48271d39d0b05bd6efca2278f22277d6fcc375504f9839fd73f74ace240861af::base_pool::Null'
    })
    expect(feeRate).to.be.greaterThanOrEqual(0)
    expect(feeRate).to.be.lessThanOrEqual(1)
  })

  it("estimates mainnet thAPT trade amount", async function () {
    const thalaSDK = new ThalaSDK()
    const aptosClient = new AptosClient(MAINNET_URL)
    const estimatedAmountOut = await thalaSDK.estimateThalaSwapOutput({
      aptosClient,
      inCoinType: '0xfaf4e633ae9eb31366c9ca24214231760926576c7b625313b3688b5e900731f6::staking::ThalaAPT',
      outCoinType: '0x1::aptos_coin::AptosCoin',
      exactInAmount: 100_000_000
    })
    expect(estimatedAmountOut).to.be.greaterThan(0)
  })

  it("gets sthAPT/APT exchange rate", async function () {
    const thalaSDK = new ThalaSDK()
    const aptosClient = new AptosClient(MAINNET_URL)
    const thaptPerSthapt = await thalaSDK.getThaptPerSthapt(aptosClient)
    expect(thaptPerSthapt.thaptStaked).to.be.greaterThan(0)
    expect(thaptPerSthapt.sthaptTotalSupply).to.be.greaterThan(0)
  })
})
