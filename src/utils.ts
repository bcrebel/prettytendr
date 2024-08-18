import { SorobanRpc } from "@stellar/stellar-sdk";
  
  type TxResponse = SorobanRpc.Api.GetTransactionResponse & {
    txHash: string
  }

  export async function sendTx({
    transactionToSubmit,
    secondsToWait,
    server,
  }: {
    transactionToSubmit: any
    secondsToWait: number
    server: SorobanRpc.Server
  }): Promise<TxResponse> {
    const sendTransactionResponse = await server.sendTransaction(transactionToSubmit)
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
        // Wait a beat
        await new Promise(resolve => setTimeout(resolve, waitTime))
        /// Exponential backoff
        waitTime = waitTime * exponentialFactor
        // See if the transaction is complete
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
          `Waited ${secondsToWait} seconds for transaction to complete, but it did not. ` +
            `Returning anyway. Check the transaction status manually. ` +
            `Info: ${JSON.stringify(sendTransactionResponse, null, 2)}`
        )
      }
    
      return { ...getTransactionResponse, txHash: sendTransactionResponse.hash }
    }