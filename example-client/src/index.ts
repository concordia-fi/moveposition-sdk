import * as superJsonApiClient from "@concordia/super-json-api-client"
import * as aptos from "aptos"
import * as superSDK from "@concordia/super-aptos-sdk"

const MOVEPOSITION_ADDRESS = "0xccd2621d2897d407e06d18e6ebe3be0e6d9b61f1e809dd49360522b9105812cf"

const RPC_URL = "https://aptos.testnet.porto.movementlabs.xyz/v1"

export interface EntryFunctionPayload {
  type: string
  function: string
  type_arguments: string[]
  arguments: (string | number | Uint8Array | number[])[]
}

async function signTransaction(
  client: aptos.AptosClient,
  account: aptos.AptosAccount,
  payload: EntryFunctionPayload,
) {
  const rawtx = await client.generateTransaction(account.address(), payload)
  return await client.signTransaction(account, rawtx)
}

class TransactionError extends Error {
  constructor(msg: string) {
    super(msg)
    this.name = "TransactionError"
  }
}

async function signSubmitWait(
  client: aptos.AptosClient,
  account: aptos.AptosAccount,
  payload: EntryFunctionPayload,
  checkSuccess = false,
) {
  const signed = await signTransaction(client, account, payload)
  const tx = await client.submitTransaction(signed)
  console.log("Submitted tx", tx.hash)
  try {
    const res: any = await client.waitForTransactionWithResult(tx.hash, {
      checkSuccess,
    })
    if (!res.success) {
      const msg = res.vm_status.split(": ")[1]
      throw new TransactionError(msg)
    }

    console.log("Transaction success", res)

    return res
  } catch (e) {
    console.log("error", e)
    throw e
  }
}

async function main() {
  // Read the distributor key
  let walletAccount: aptos.AptosAccount
  {
    if (!process.env.WALLET_PRIVATE_KEY) {
      throw new Error("WALLET_PRIVATE_KEY is not set")
    }
    const keyString = process.env.WALLET_PRIVATE_KEY
    const keyHex = new aptos.HexString(keyString)
    const keyUint8Array = keyHex.toUint8Array()
    walletAccount = new aptos.AptosAccount(keyUint8Array)
    console.log("Wallet address", walletAccount.address().hex())
  }

  // send the tx to Aptos
  const sdk = new superSDK.SuperpositionAptosSDK(MOVEPOSITION_ADDRESS)

  const brokerAddress = `${MOVEPOSITION_ADDRESS}::broker::Broker<0x1::aptos_coin::AptosCoin>`

  // Create user
  const aptosClient = new aptos.AptosClient(RPC_URL)

  //create SuperClient
  const superClient = new superJsonApiClient.SuperClient({
    BASE: "https://superposition-stable-porto-585478462664.us-central1.run.app",
  })

  let brokerName: string
  {
    //get brokers and expect empty
    const brokers = await superClient.default.getBrokers()
    const broker = brokers.find((b) => b.networkAddress === brokerAddress)
    brokerName = broker.underlyingAsset.name
    console.log("Broker name:", brokerName)
    console.log("Broker interest rate from risk oracle:", broker?.interestRate)
  }

  {
    const intestRate = await superSDK.getInterestRate(MOVEPOSITION_ADDRESS, "0x1::aptos_coin::AptosCoin", aptosClient)
    console.log("Interest rate from on-chain:", intestRate)
  }

  const portfolio = await superClient.default.getPortfolio(walletAccount.address().hex())
  const collaterals = portfolio.collaterals.map((c) => {
    return { instrumentId: c.instrument.name, amount: c.amount }
  })
  const liabilities = portfolio.liabilities.map((l) => {
    return { instrumentId: l.instrument.name, amount: l.amount }
  })
  const currentPortfolioState = {
    collaterals,
    liabilities,
  }

  const signerPubkey = walletAccount.address().hex()

  const network = "aptos"

  // request a lend ticket
  const lendTicket = await superClient.default.lendV2({
    amount: "1000",
    signerPubkey,
    network,
    brokerName,
    currentPortfolioState,
  })

  {
    // decode the stringified packet
    const ticketString = new aptos.HexString(lendTicket.packet)
    const ticketUintArray = ticketString.toUint8Array()
    const lendIX = sdk.lendV2Ix(ticketUintArray, "0x1::aptos_coin::AptosCoin")
    await signSubmitWait(aptosClient, walletAccount, lendIX)
  }
}

main()
