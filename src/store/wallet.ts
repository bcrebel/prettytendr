import { atom } from 'nanostores';
import * as freighter from '@stellar/freighter-api';
const { isAllowed, getUserInfo, isConnected } = freighter.default;

export const walletLoading = atom<boolean>(true);
export const _isAllowed = atom<boolean>(false);
export const publicKey = atom<string>("");

if(!await isConnected()) {
    walletLoading.set(false)
} else if(await isAllowed()) {
    let pk = await getUserInfo();
    _isAllowed.set(true);
    publicKey.set(pk.publicKey);
    setTimeout(() => walletLoading.set(false), 500);
} 










