import { useStore } from '@nanostores/react';
import { _isAllowed, publicKey } from '../store/wallet'

const FreighterConnectButton = () => {
    let $_isAllowed = useStore(_isAllowed)
    let $publicKey = useStore(publicKey)

    console.log($_isAllowed, $publicKey)
    
    if(!$_isAllowed && !$publicKey) return <button>Connect Wallet</button>
    // const { publicKey, isAllowed, connect } = React.useContext(FreighterContext);


    if($_isAllowed) {
        if($publicKey) return <div>Signed in as {$publicKey}</div>

        return <div>Freighter is locked. Sign in & refresh the page.</div>
    }

};

export default FreighterConnectButton;