import * as pkg from '@stellar/freighter-api';

import { useStore } from '@nanostores/react';
import { walletLoading, _isAllowed, publicKey } from '../store/wallet'
import { message } from '../store/message'

const { setAllowed, getAddress } = pkg.default;

const FreighterConnectButton = () => {
    let $_isAllowed = useStore(_isAllowed);
    let $publicKey = useStore(publicKey);
    let $walletLoading = useStore(walletLoading);

    const connect = async() => {
        await setAllowed();
        const {address} = await getAddress();
        publicKey.set(address)
    }

    if(typeof window === "undefined" || $walletLoading) return <button className="base border-gray-400 text-gray-400">Loading...</button>

    if(!$_isAllowed && !$publicKey) return <button className="base" onClick={connect}>Connect Wallet</button>


    if($_isAllowed) {
        if($publicKey) return <button className="max-w-24 overflow-hidden">{$publicKey.slice(0, 6)}</button>
        message.set('Freighter is locked. Sign into Freighter and refresh the page.')
    }

    return <button className="base" onClick={connect}>Connect Wallet</button>
};

export default FreighterConnectButton;