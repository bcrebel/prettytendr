import { useState, useEffect } from 'react';
import * as StellarSdk from '@stellar/stellar-sdk';
const { PUBLIC_STELLAR_NETWORK_URL, PUBLIC_ASSET_ISSUER_KEY, PUBLIC_ASSET_CODE } = import.meta.env

const server = new StellarSdk.Horizon.Server("https://horizon-testnet.stellar.org");

interface UseTrustlineCheckProps {
  publicKey: string;
}

export const useTrustlineCheck = ({ publicKey }: UseTrustlineCheckProps) => {
  const [hasTrustline, setHasTrustline] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkTrustline = async () => {
      try {
        setLoading(true);
        const account = await server.loadAccount(publicKey);
        const trustline = account.balances.find((balance) => {
          // Check if the balance is of a type that has asset_code and asset_issuer
          if ('asset_code' in balance && 'asset_issuer' in balance) {
            return balance.asset_code === PUBLIC_ASSET_CODE && balance.asset_issuer === PUBLIC_ASSET_ISSUER_KEY;
          }
          return false;
        });

        setHasTrustline(!!trustline);
      } catch (err) {
        setError('Failed to check trustline');
      } finally {
        setLoading(false);
      }
    };

    checkTrustline();
  }, [publicKey]);

  return { hasTrustline, trustlineLoading: loading, error };
};
