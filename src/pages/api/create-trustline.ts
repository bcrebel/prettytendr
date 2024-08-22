import type { APIRoute } from 'astro';
import { Horizon, Keypair, TransactionBuilder, BASE_FEE, Operation, Asset, Networks } from 'stellar-sdk';
const { PUBLIC_ASSET_ISSUER_KEY, PUBLIC_STELLAR_NETWORK_URL, PUBLIC_ASSET_CODE } = import.meta.env;


const server = new Horizon.Server("https://horizon-testnet.stellar.org");

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {

  try {


    const { privateKey } = await request.json();

    const keypair = Keypair.fromSecret(privateKey);
    const account = await server.loadAccount(keypair.publicKey());

    const PTAsset = new Asset(PUBLIC_ASSET_CODE, PUBLIC_ASSET_ISSUER_KEY);

    const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET, // Change to Networks.PUBLIC if using mainnet
    })
      .addOperation(
        Operation.changeTrust({
          asset: PTAsset,
        })
      )
      .setTimeout(30)
      .build();

    transaction.sign(keypair);

    const transactionResult = await server.submitTransaction(transaction);

    return new Response(JSON.stringify({ result: transactionResult }), { status: 200 });
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: error }), { status: 500 });
  }
};


