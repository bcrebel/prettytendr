import StellarSdk from 'stellar-sdk';
const { ISSUER_PUBLIC_KEY, ISSUER_SECRET_KEY } = import.meta.env


const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');

export async function listenForProfileCompletion(userPublicKey: string): Promise<void> {
  const account = await server.loadAccount(ISSUER_PUBLIC_KEY);

  // let lastLedger = await server.getLatestLedger();
    
  //   while (true) {
  //       try {
  //           const events = await server.getEvents({
  //               startLedger: lastLedger,
  //               filters: [
  //                   {
  //                       type: 'contract',
  //                       contractIds: ['CD2PZJ4JEFTTHON7HZ55SXBDE4A36M6JTNOPX6UYTCCTLFFZF66BXQHG'],
  //                       topics: [['ProfileCompleted']]
  //                   }
  //               ]
  //           });

  //           for (const event of events.events) {
  //               console.log('Event received:', event);
  //               // Process your event here
  //           }

  //           lastLedger = events.latestLedger;
  //       } catch (error) {
  //           console.error('Error fetching events:', error);
  //       }

  //       // Wait for a few seconds before checking for new events
  //       await new Promise(resolve => setTimeout(resolve, 5000));
  //   }
  

  // server.transactions()
  //   .forAccount(account.accountId())
  //   .cursor('now')
  //   .stream({
  //     onmessage: async (tx: any) => {
  //       const ops = await tx.operations();
  //       for (const op of ops.records) {
  //         console.log('OP', op)
  //         if (op.type === 'manage_data' && op.name === 'ProfileCompleted' && op.value === userPublicKey) {
  //           await payUser(userPublicKey, 5);
  //         }
  //       }
  //     },
  //   });
}

async function payUser(publicKey: string, amount: number): Promise<void> {
  const issuingKeys = StellarSdk.Keypair.fromSecret(ISSUER_SECRET_KEY);

  const issuerAccount = await server.loadAccount(issuingKeys.publicKey());

  const transaction = new StellarSdk.TransactionBuilder(issuerAccount, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: StellarSdk.Networks.TESTNET,
  })
    .addOperation(
      StellarSdk.Operation.payment({
        destination: publicKey,
        asset: new StellarSdk.Asset('PT', issuingKeys.publicKey()),
        amount: amount.toString(),
      })
    )
    .setTimeout(30)
    .build();

  transaction.sign(issuingKeys);

  try {
    const result = await server.submitTransaction(transaction);
    console.log('Payment successful!', result);
  } catch (e) {
    console.error('Payment failed!', e);
  }
}


