import { type APIRoute } from 'astro';
import StellarSdk from 'stellar-sdk';
const { ISSUER_SECRET_KEY } = import.meta.env;

const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');

export const POST: APIRoute = async ({ request }) => {
  try {
    const { publicKey, amount } = await request.json();

    const issuingKeys = StellarSdk.Keypair.fromSecret(ISSUER_SECRET_KEY);

    const issuerAccount = await server.loadAccount(issuingKeys.publicKey());

    let destinationAccount = StellarSdk.Keypair.fromPublicKey(publicKey);

    const transaction = new StellarSdk.TransactionBuilder(issuerAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: StellarSdk.Networks.TESTNET,
    })
      .addOperation(
        StellarSdk.Operation.payment({
          destination: destinationAccount.publicKey(),
          asset: new StellarSdk.Asset('PT', issuingKeys.publicKey()),
          amount,
        })
      )
      .setTimeout(30)
      .build();

    transaction.sign(issuingKeys);

    await server.submitTransaction(transaction);

    return new Response('Rewarding user', {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
      console.error('Error:', e);  // Log error details for debugging

      return new Response(JSON.stringify({ error: 'Failed to reward user.', details: e }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

  //For establishing trust until PT is recognized
  // try {
  //   const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');

  //   // Asset details provided by the issuer
  //   const asset = new StellarSdk.Asset('PT', 'GCFP6T2KPZU5WL2G5INAWX4P7Q2P7IEDDGJ52NRUK6H2H7K36ODEOYHQ');

  //   // Receiver's account
  //   const receiverKeypair = StellarSdk.Keypair.fromSecret(''); 
  //   const receiverAccount = await server.loadAccount(receiverKeypair.publicKey());

  //   // Create a trustline
  //   const transaction = new StellarSdk.TransactionBuilder(receiverAccount, {
  //     fee: StellarSdk.BASE_FEE,
  //     networkPassphrase: StellarSdk.Networks.TESTNET // or StellarSdk.Networks.PUBLIC for mainnet
  //   })
  //   .addOperation(StellarSdk.Operation.changeTrust({
  //     asset: asset
  //   }))
  //   .setTimeout(30)
  //   .build();

  //   transaction.sign(receiverKeypair);
  //     await server.submitTransaction(transaction);
  //     return new Response('Trustline established', {
  //       status: 200,
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  // } catch(e) {
  //     return new Response(`Failed to establish trustline ${e}`), {
  //       status: 500,
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     };
  //   }
};
