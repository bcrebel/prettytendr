import pkg from '@stellar/freighter-api';
import {
  Keypair,
  Contract,
  SorobanRpc,
  Address,
  Transaction,
  TimeoutInfinite,
  TransactionBuilder,
  BASE_FEE,
  Networks,
  nativeToScVal,
  Operation,
  xdr
} from "@stellar/stellar-sdk";
import { useStore } from '@nanostores/react';
import { useForm, type SubmitHandler } from "react-hook-form";
import { publicKey } from '../store/wallet';
import { message } from '../store/message';
import beauty_profile from "../contracts/beauty_profile";
import { sendTx } from '../utils'
import './form.css';
const { signTransaction } = pkg;
const rpc_url = "https://soroban-testnet.stellar.org:443";


type FormValues = {
  hairTexture: string;
  skinType: string;
};

function BeautyProfileForm() {
  const $publicKey = useStore(publicKey);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm<FormValues>({ mode: "onChange" });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if(!isValid) return;

    if($publicKey) {
      try {
        const server = new SorobanRpc.Server(rpc_url, { allowHttp: true });
        const sourceAccount = await server.getAccount($publicKey);

        const contract = new Contract('CD2PZJ4JEFTTHON7HZ55SXBDE4A36M6JTNOPX6UYTCCTLFFZF66BXQHG')
        let tx = new TransactionBuilder(sourceAccount, {
          fee: BASE_FEE,
          networkPassphrase: Networks.TESTNET,
        })
        .addOperation(contract.call('complete_profile', nativeToScVal(Address.fromString($publicKey))))
        .setTimeout(TimeoutInfinite)
        .build()

        const simulated: SorobanRpc.Api.SimulateTransactionResponse =
        await server?.simulateTransaction(tx)

        if (SorobanRpc.Api.isSimulationError(simulated)) {
          throw new Error(simulated.error)
        } else if (!simulated.result) {
          throw new Error(`Invalid simulation: ${simulated}`)
        }

        tx = await server.prepareTransaction(tx)
        
        let signed = await signTransaction(tx.toXDR(), {
          networkPassphrase: Networks.TESTNET,
          address: $publicKey,
        })

        console.log('Signed by: ', signed)

        let transactionToSubmit = TransactionBuilder.fromXDR(signed.signedTxXdr, Networks.TESTNET) 
    
        const raw = await sendTx({ transactionToSubmit, secondsToWait: 30, server })
      
        //return raw
        console.log(raw)


 

      //   const response = await fetch('/prettytendr/api/reward-user', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({ publicKey: 'GA2PNJQ5KIE4POCYDQIVHO6OVN3UOVVMMSN4S6NKRHTYG2Y4NBMUOPXO' }), // Provide the actual user's public key
      //   });
  
      //   const rewardResult = await response.json();
      //   console.log(rewardResult.message);
      } catch (error) {
        message.set('Something went wrong, please try again later')
        console.error('Failed to trigger reward listener:', error);
      }
    } else {
      message.set('Sign into your wallet before submitting')
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-3">
        <label className="question">What is your hair texture?</label>
        <div>
          <input
            type="radio"
            id="straight"
            value="Straight"
            {...register("hairTexture", { required: true })}
          />
          <label htmlFor="straight">Straight</label>
        </div>
        <div>
          <input
            type="radio"
            id="wavy"
            value="Wavy"
            {...register("hairTexture", { required: true })}
          />
          <label htmlFor="wavy">Wavy</label>
        </div>
        <div>
          <input
            type="radio"
            id="curly"
            value="Curly"
            {...register("hairTexture", { required: true })}
          />
          <label htmlFor="curly">Curly</label>
        </div>
        <div>
          <input
            type="radio"
            id="coily"
            value="Coily"
            {...register("hairTexture", { required: true })}
          />
          <label htmlFor="coily">Coily</label>
        </div>
        {errors.hairTexture && isSubmitted && (
          <p style={{ color: "red" }}>A selection is required for hair texture.</p>
        )}
      </div>

      <div className="mt-3">
        <label className="question">What is your skin type?</label>
        <div>
          <input
            type="radio"
            id="dry"
            value="Dry"
            {...register("skinType", { required: true })}
          />
          <label htmlFor="dry">Dry</label>
        </div>
        <div>
          <input
            type="radio"
            id="oily"
            value="Oily"
            {...register("skinType", { required: true })}
          />
          <label htmlFor="oily">Oily</label>
        </div>
        <div>
          <input
            type="radio"
            id="combination"
            value="Combination"
            {...register("skinType", { required: true })}
          />
          <label htmlFor="combination">Combination</label>
        </div>
        {errors.skinType && isSubmitted && (
          <p style={{ color: "red" }}>A selection is required for skin type.</p>
        )}
      </div>

      <button className="bg-black text-white p-2 pl-4 pr-4 mt-5 text-sm" type="submit">
        Submit
      </button>
    </form>
  );
}


export default BeautyProfileForm;
