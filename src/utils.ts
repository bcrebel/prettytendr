// @ts-nocheck
// Adapted from @soroban/react

import { SorobanRpc, Address, xdr } from "@stellar/stellar-sdk";

  type TxResponse = SorobanRpc.Api.GetTransactionResponse & {
    txHash: string
  }

  export async function sendTx({
    txToSubmit,
    secondsToWait,
    server,
  }: {
    txToSubmit: any
    secondsToWait: number
    server: SorobanRpc.Server
  }): Promise<TxResponse> {
    const sendTransactionResponse = await server.sendTransaction(txToSubmit)
    let getTransactionResponse = await server.getTransaction(
      sendTransactionResponse.hash
    )
    const waitUntil = new Date(Date.now() + secondsToWait * 1000).valueOf()
  
    let waitTime = 1000
    let exponentialFactor = 1.5

    while (
        Date.now() < waitUntil &&
        getTransactionResponse.status === 'NOT_FOUND'
      ) {

        await new Promise(resolve => setTimeout(resolve, waitTime))
        waitTime = waitTime * exponentialFactor

        try {
          getTransactionResponse = await server.getTransaction(
            sendTransactionResponse.hash
          )
        } catch (error) {
          console.log('Failed to get transaction, trying again until timeout...')
          console.error(error)
        }
      }

      if (
        getTransactionResponse.status ===
        SorobanRpc.Api.GetTransactionStatus.NOT_FOUND
      ) {
        console.error(
          `Transaction exceeded ${secondsToWait} seconds` +
            `Error: ${JSON.stringify(sendTransactionResponse, null, 2)}`
        )
      }
    
      return { ...getTransactionResponse, txHash: sendTransactionResponse.hash }
    }

      

      
    
