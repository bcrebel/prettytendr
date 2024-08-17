import StellarSdk from 'stellar-sdk';
const { ISSUER_PUBLIC_KEY, ISSUER_SECRET_KEY } = import.meta.env


const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');

export async function listenForProfileCompletion(userPublicKey: string): Promise<void> {
  const account = await server.loadAccount(ISSUER_PUBLIC_KEY);

  server.transactions()
    .forAccount(account.accountId())
    .cursor('now')
    .stream({
      onmessage: async (tx: any) => {
        const ops = await tx.operations();
        for (const op of ops.records) {
          if (op.type === 'manage_data' && op.name === 'ProfileCompleted' && op.value === userPublicKey) {
            await payUser(userPublicKey, 5);
          }
        }
      },
    });
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


