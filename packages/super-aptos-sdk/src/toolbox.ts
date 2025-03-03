import * as aptos from "aptos"

/** The payload type for entry functions */
export interface EntryFunctionPayload {
  type: string
  function: string
  type_arguments: string[]
  arguments: (string | number | Uint8Array)[]
}

/** Create an account on Aptos and fund */
export async function createAndFund(faucet: aptos.FaucetClient, amount = 100e8) {
  const a = new aptos.AptosAccount()
  await faucet.fundAccount(a.address(), amount)
  return a
}

/** Fund an existing account */
export async function fundFromExisting(faucet: aptos.FaucetClient, amount = 100e8, address: string) {
  await faucet.fundAccount(address, amount)
}

/**
 * @param client the AptosClient
 * @param account the AptosAccount that will sign
 * @param payload a payload to an entry function
 * @returns
 */
export async function signTransaction(
  client: aptos.AptosClient,
  account: aptos.AptosAccount,
  payload: EntryFunctionPayload,
) {
  const rawtx = await client.generateTransaction(account.address(), payload)
  return await client.signTransaction(account, rawtx)
}

export async function signSubmitWait(
  client: aptos.AptosClient,
  account: aptos.AptosAccount,
  payload: EntryFunctionPayload,
  checkSuccess = false,
) {
  const signed = await signTransaction(client, account, payload)
  const tx = await client.submitTransaction(signed)
  try {
    const res: any = await client.waitForTransactionWithResult(tx.hash, {
      checkSuccess,
    })
    if (!res.success) {
      const msg = res.vm_status.split(": ")[1]
      throw new TransactionError(msg)
    }

    return res
  } catch (e) {
    console.log("error", e)
    throw e
  }
}
export function registerCoin(account: aptos.AptosAccount, aptosClient: aptos.AptosClient, coin: string) {
  return signSubmitWait(aptosClient, account, {
    type: "entry_function_payload",
    function: "0x1::managed_coin::register",
    type_arguments: [coin],
    arguments: [],
  })
}
/** Shoot the moneygun to a user */
export async function moneygunShoot(
  aptosClient: aptos.AptosClient,
  moneygunAddress: string,
  account: aptos.AptosAccount,
  coin: string, // type
) {
  const payload = {
    type: "entry_function_payload",
    function: `${moneygunAddress}::moneygun::shoot`,
    type_arguments: [coin],
    arguments: [],
  }

  return signSubmitWait(aptosClient, account, payload)
}

export class TransactionError extends Error {
  constructor(msg: string) {
    super(msg)
    this.name = "TransactionError"
  }
}

export function decodeFP64(u128: string): string {
  const fullNumber = BigInt(u128)
  const fractionalMask = BigInt("0xFFFFFFFFFFFFFFFF") // Mask for the fractional part
  const integerPart = fullNumber >> 64n // Shift right to get the integer part
  const fractionalPart = fullNumber & fractionalMask // Apply mask to get the fractional part

  // Convert fractional part to a decimal string
  // We scale the fractional part by dividing it by 2^64 and rounding to a fixed number of decimal places
  const scaleFactor = BigInt("18446744073709551616") // 2^64
  const fractionalDecimal = (Number(fractionalPart) / Number(scaleFactor)).toFixed(10)

  // Concatenate the integer and fractional parts, removing '0.' from the start of the fractional string
  return integerPart.toString() + fractionalDecimal.substring(1)
}

export async function getInterestRate(rootAddress: string, coinType: string, aptosClient: aptos.AptosClient): Promise<number> {
  const [fee] = (await aptosClient.view({
    function: `${rootAddress}::broker::get_interest_rate`,
    arguments: [],
    type_arguments: [coinType],
  })) as [{ value: string }]
  return Number(decodeFP64(fee.value))
}
