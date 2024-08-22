import { Horizon, Keypair, Asset, TransactionBuilder, BASE_FEE, Networks, Operation } from 'stellar-sdk';
export { renderers } from '../../renderers.mjs';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/prettytendr/", "DEV": false, "MODE": "production", "PROD": true, "PUBLIC_ASSET_CODE": "PT", "PUBLIC_ASSET_ISSUER_KEY": "GCFP6T2KPZU5WL2G5INAWX4P7Q2P7IEDDGJ52NRUK6H2H7K36ODEOYHQ", "PUBLIC_SOROBAN_ACCOUNT": "olive", "PUBLIC_SOROBAN_NETWORK": "testnet", "PUBLIC_SOROBAN_NETWORK_PASSPHRASE": "Test SDF Network ; September 2015", "PUBLIC_SOROBAN_RPC_URL": "https://soroban-testnet.stellar.org:443", "PUBLIC_STELLAR_NETWORK_URL": "https://horizon-testnet.stellar.org", "SITE": "https://bcrebel.github.io", "SSR": true};
const { PUBLIC_ASSET_ISSUER_KEY, PUBLIC_STELLAR_NETWORK_URL, PUBLIC_ASSET_CODE } = Object.assign(__vite_import_meta_env__, { _: process.env._ });
const server = new Horizon.Server(PUBLIC_STELLAR_NETWORK_URL);
const prerender = false;
const POST = async ({ request }) => {
  try {
    const { privateKey } = await request.json();
    const keypair = Keypair.fromSecret(privateKey);
    const account = await server.loadAccount(keypair.publicKey());
    const PTAsset = new Asset(PUBLIC_ASSET_CODE, PUBLIC_ASSET_ISSUER_KEY);
    const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET
      // Change to Networks.PUBLIC if using mainnet
    }).addOperation(
      Operation.changeTrust({
        asset: PTAsset
      })
    ).setTimeout(30).build();
    transaction.sign(keypair);
    const transactionResult = await server.submitTransaction(transaction);
    return new Response(JSON.stringify({ result: transactionResult }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
