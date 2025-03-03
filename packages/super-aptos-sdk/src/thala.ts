import { AptosClient, Network } from "aptos"
import { ThalaswapRouter } from "@thalalabs/router-sdk"

const THALASWAP_ADDRESS = "0x48271d39d0b05bd6efca2278f22277d6fcc375504f9839fd73f74ace240861af"
const ONE_APT_IN_NATIVE_UNITS = 100_000_000

const ZERO = BigInt(0);
const ONE = BigInt(1);

const fp64ToFloat = (a: bigint): number => {
  // avoid large number
  let mask = BigInt("0xffffffff000000000000000000000000");
  if ((a & mask) != ZERO) {
    throw new Error("too large");
  }

  // integer part
  mask = BigInt("0x10000000000000000");
  let base = 1;
  let result = 0;
  for (let i = 0; i < 32; ++i) {
    if ((a & mask) != ZERO) {
      result += base;
    }
    base *= 2;
    mask = mask << ONE;
  }

  // fractional part
  mask = BigInt("0x8000000000000000");
  base = 0.5;
  for (let i = 0; i < 32; ++i) {
    if ((a & mask) != ZERO) {
      result += base;
    }
    base /= 2;
    mask = mask >> ONE;
  }
  return result;
};

export class ThalaSDK {
  async getThalaSwapPoolFeeRate({
    aptosClient,
    coinTypeOne,
    coinTypeTwo,
    coinTypeThree,
    coinTypeFour,
  }: {
    aptosClient: AptosClient
    coinTypeOne: string
    coinTypeTwo: string
    coinTypeThree: string
    coinTypeFour: string
  }): Promise<number> {
    const [feeRate] = (await aptosClient.view({
      function: `${THALASWAP_ADDRESS}::stable_pool::swap_fee_ratio`,
      arguments: [],
      type_arguments: [coinTypeOne, coinTypeTwo, coinTypeThree, coinTypeFour],
    })) as [{ v: string }]
    const feeRateFp64 = BigInt(feeRate.v)
    const feeRateFloat = fp64ToFloat(feeRateFp64)
    return feeRateFloat
  }

  async getThalaSwapPoolAmpFactor({
    aptosClient,
    coinTypeOne,
    coinTypeTwo,
    coinTypeThree,
    coinTypeFour,
  }: {
    aptosClient: AptosClient
    coinTypeOne: string
    coinTypeTwo: string
    coinTypeThree: string
    coinTypeFour: string
  }): Promise<number> {
    const [ampFactor] = (await aptosClient.view({
      function: `${THALASWAP_ADDRESS}::stable_pool::pool_amp_factor`,
      arguments: [],
      type_arguments: [coinTypeOne, coinTypeTwo, coinTypeThree, coinTypeFour],
    })) as [string]
    return parseInt(ampFactor)
  }

  async getThalaSwapPoolBalances({
    aptosClient,
    coinTypeOne,
    coinTypeTwo,
    coinTypeThree,
    coinTypeFour,
  }: {
    aptosClient: AptosClient
    coinTypeOne: string
    coinTypeTwo: string
    coinTypeThree: string
    coinTypeFour: string
  }): Promise<number[]> {
    const [poolStringBalances] = (await aptosClient.view({
      function: `${THALASWAP_ADDRESS}::stable_pool::pool_balances`,
      arguments: [],
      type_arguments: [coinTypeOne, coinTypeTwo, coinTypeThree, coinTypeFour],
    })) as [string[]]
    const balances = poolStringBalances.map((balance) => parseInt(balance))
    return balances
  }

  async estimateSthaptToApt(
    {
      aptosClient,
      sthaptAmountIn,
    }: {
      aptosClient: AptosClient
      sthaptAmountIn: number
    }
  ): Promise<number> {
    const {thaptStaked, sthaptTotalSupply} = await this.getThaptPerSthapt(aptosClient)
    const thaptAmount = (sthaptAmountIn * thaptStaked) / sthaptTotalSupply
    // Charge thala LSD unstaking fee
    const aptAmount = await this.estimateThalaSwapOutput({
      aptosClient,
      inCoinType: '0xfaf4e633ae9eb31366c9ca24214231760926576c7b625313b3688b5e900731f6::staking::ThalaAPT',
      outCoinType: '0x1::aptos_coin::AptosCoin',
      exactInAmount: thaptAmount,
    })
    return aptAmount
  }

  // Estimates the thala swap output amount including fees
  async estimateThalaSwapOutput(
    {
      aptosClient,
      inCoinType,
      outCoinType,
      exactInAmount,
    }: {
      aptosClient: AptosClient
      inCoinType: string
      outCoinType: string
      exactInAmount: number
    }
  ): Promise<number> {
    let scaledDownAmountIn: number = exactInAmount / ONE_APT_IN_NATIVE_UNITS

    if (inCoinType == '0xfaf4e633ae9eb31366c9ca24214231760926576c7b625313b3688b5e900731f6::staking::ThalaAPT' && outCoinType == '0x1::aptos_coin::AptosCoin') {
    } else if (inCoinType == '0x1::aptos_coin::AptosCoin' && outCoinType == '0xfaf4e633ae9eb31366c9ca24214231760926576c7b625313b3688b5e900731f6::staking::ThalaAPT') {
    } else {
      throw new Error(`Unsupported coin types: ${inCoinType} ${outCoinType}`)
    }

    const router = new ThalaswapRouter(
      Network.MAINNET,
      "https://api.mainnet.aptoslabs.com/v1",
      "0x48271d39d0b05bd6efca2278f22277d6fcc375504f9839fd73f74ace240861af",
      "0x60955b957956d79bc80b096d3e41bad525dd400d8ce957cdeb05719ed1e4fc26",
    );
    const maxHops = 1; //always use the thaAPT/APT pool
    const route = await router.getRouteGivenExactInput(
      inCoinType,
      outCoinType,
      scaledDownAmountIn,
      maxHops,
    );
    if (!route) {
      throw new Error('Route not found');
    }

    const scaledUpAmountOut = route.amountOut * ONE_APT_IN_NATIVE_UNITS;

    return scaledUpAmountOut
  }

  async getThaptPerSthapt(aptosClient: AptosClient):
    Promise<{ thaptStaked: number; sthaptTotalSupply: number }> {
    const rate = (await aptosClient.view({
      function: `0xfaf4e633ae9eb31366c9ca24214231760926576c7b625313b3688b5e900731f6::staking::thAPT_sthAPT_exchange_rate_synced`,
      arguments: [],
      type_arguments: [],
    })) as string[]
    const thaptStaked = parseInt(rate[0])
    const sthaptTotalSupply = parseInt(rate[1])
    return {
      thaptStaked,
      sthaptTotalSupply,
    }
  }
}
