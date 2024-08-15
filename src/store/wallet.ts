import { atom } from 'nanostores';
import * as freighter from '@stellar/freighter-api';
const { isAllowed, setAllowed, getUserInfo } = freighter.default;


export const _isAllowed = atom<boolean>(false);
export const publicKey = atom<string>("");

if(await isAllowed()) {
    let pk = await getUserInfo();

    _isAllowed.set(true);
    publicKey.set(pk.publicKey);


}