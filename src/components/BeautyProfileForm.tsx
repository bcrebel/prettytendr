import React from 'react';
import pkg from '@stellar/freighter-api';
import {
  Contract,
  SorobanRpc,
  Address,
  TimeoutInfinite,
  TransactionBuilder,
  BASE_FEE,
  Networks,
  nativeToScVal,
} from "@stellar/stellar-sdk";
import { useStore } from '@nanostores/react';
import { useForm, type SubmitHandler } from "react-hook-form";
import { isLoading } from '../store/loadingStore';
import { publicKey } from '../store/wallet';
import { message } from '../store/message';
import { sendTx } from '../utils'
import  Button from './Button'
import './form.css';
import LoadingIndicator from './LoadingIndicator';
const { signTransaction } = pkg;
const rpc_url = "https://soroban-testnet.stellar.org:443";


type FormValues = {
  hairTexture: 'Straight' | 'Wavy' | 'Curly' | 'Coily';
  skinType: 'Dry' | 'Oily' | 'Combination';
  undertones: 'Warm' | 'Cool' | 'Neutral' | 'Olive';
  hairColor: 'Blonde' | 'Brunette' | 'Red' | 'Black';
  allergies?: string;
  skincareConcerns?: string;
};

function BeautyProfileForm() {
  const $publicKey = useStore(publicKey);
  const $loading = useStore(isLoading);
  const [profileStatus, setProfileStatus] = React.useState<'pending' | 'profileSuccess' | 'ptSuccess' | 'failure'>('pending');
  const [progressMessage, setProgressMessage] = React.useState('Hang tight, submitting your profile...')

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm<FormValues>({ mode: "onChange" });

  const options = {
    hairTexture: ['Straight', 'Wavy', 'Curly', 'Coily'],
    skinType: ['Dry', 'Oily', 'Combination'],
    undertones: ['Warm', 'Cool', 'Neutral', 'Olive'],
    hairColor: ['Blonde', 'Brunette', 'Red', 'Black']
  };

  const onSubmit: SubmitHandler<FormValues> = async (/*data*/) => {
    if(!isValid) return;
    
    if($publicKey) {
      isLoading.set(true); // Set loading to true

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

        let txToSubmit = TransactionBuilder.fromXDR(signed.signedTxXdr, Networks.TESTNET) 
    
        const { status } = await sendTx({ txToSubmit, secondsToWait: 30, server })
      
        if(status === "SUCCESS") { // if profile submission is successful
          setProgressMessage('Profile submitted successfully, awarding PT...')
          const response = await fetch('/prettytendr/api/reward-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ publicKey: $publicKey, amount: '5' }), // Provide the actual user's public key
          });

          if(response.status === 200) {
            setProfileStatus("ptSuccess")
            isLoading.set(false)
          }
        }
      } catch (error) {
        message.set('Something went wrong, please try again later')
        console.error('Failed to trigger reward listener:', error);
        isLoading.set(false);
      }
    } else {
      message.set('Sign into your wallet before submitting')
    }
  };

  const renderRadioGroup = (name: keyof FormValues, label: string, options: string[]) => (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <div className="form-radio-group">
        {options.map((option) => (
          <label key={option} htmlFor={option.toLowerCase()} className="form-radio-label">
            <input
              type="radio"
              id={option.toLowerCase()}
              value={option}
              {...register(name, { required: true })}
              className="form-radio-input"
            />
            <span>{option}</span>
          </label>
        ))}
        {errors[name] && isSubmitted && (
          <p className="form-error">A selection is required for {label.toLowerCase()}.</p>
        )}
      </div>
    </div>
  );

  return (
    <>
      {$loading && profileStatus === 'pending' && <LoadingIndicator message={progressMessage} fullScreen></LoadingIndicator>}
      {profileStatus !== 'ptSuccess' ? <form onSubmit={handleSubmit(onSubmit)} className="form-container">
    <div className="form-grid">
      <div className="form-column">
        {renderRadioGroup("hairTexture", "What is your hair texture?", options.hairTexture)}
        {renderRadioGroup("skinType", "What is your skin type?", options.skinType)}
      </div>

      <div className="form-column">
        {renderRadioGroup("undertones", "What are your skin undertones?", options.undertones)}
        {renderRadioGroup("hairColor", "What is your hair color?", options.hairColor)}
      </div>

      <div className="form-textarea-column">
        <div className="form-group">
          <label htmlFor="allergies" className="form-label">Do you have any allergies? (optional)</label>
          <textarea
            id="allergies"
            {...register("allergies")}
            className="form-textarea"
          />
        </div>

        <div className="form-group">
          <label htmlFor="skincareConcerns" className="form-label">Any skincare concerns? (optional)</label>
          <textarea
            id="skincareConcerns"
            {...register("skincareConcerns")}
            className="form-textarea"
          />
        </div>
      </div>
    </div>

    <Button onClick={handleSubmit(onSubmit)} type="submit">
      Submit
    </Button>
  </form>


 : <p className='pt-5'>Thank you for completing your profile!</p>}
    </>
  );
}


export default BeautyProfileForm;
