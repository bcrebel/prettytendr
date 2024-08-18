import { atom } from 'nanostores';
import * as freighter from '@stellar/freighter-api';
const { isAllowed, getAddress, isConnected } = freighter.default;

export const walletLoading = atom<boolean>(true);
export const _isAllowed = atom<boolean>(false);
export const publicKey = atom<string>("");

if(!await isConnected()) {
    walletLoading.set(false)
} else if(await isAllowed()) {
    let { address } = await getAddress();
    _isAllowed.set(true);
    publicKey.set(address);
    setTimeout(() => walletLoading.set(false), 500);
} 










