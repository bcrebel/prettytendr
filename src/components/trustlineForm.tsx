import React, {  useState } from 'react';
import Button from '../components/Button'

const CreateTrustlineForm: React.FC = () => {
  const [privateKey, setPrivateKey] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/create-trustline', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ privateKey }), // Send the private key as a string
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Trustline created successfully!');
        setTimeout(() => window.location.assign(document.referrer), 500)
      } else {
        setMessage(`Error: ${JSON.stringify(data.error)}`);
      }
    } catch (error) {
      setMessage('An error occurred while creating the trustline.');
    }
  };

  return (
    <div>
      <h2>Create Trustline to PT Asset</h2>
      <form className="flex w-full flex-col items-start" onSubmit={handleSubmit}>
        <div className="flex w-full mb-4">   
            <label className="mt-3 flex-grow-0 pr-2 inline-block">
            Private Key:
            </label>
            <input
                className="mt-3 pl-1 flex-grow border inline-block border-gray-700"
                type="password"
                value={privateKey}
                onChange={(e) => {
                    setPrivateKey(e.target.value)
                }}
                required
            />
        </div>
        <Button type="submit">Submit</Button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};


export default CreateTrustlineForm;
