import { Buffer } from "buffer";
import { Client as ContractClient, Spec as ContractSpec, } from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk';
export * as contract from '@stellar/stellar-sdk/contract';
export * as rpc from '@stellar/stellar-sdk/rpc';
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}
export const networks = {
    testnet: {
        networkPassphrase: "Test SDF Network ; September 2015",
        contractId: "CDFIMGNKJPZ3Z6ECPA3SH5PE4TY6563YCNUR7JHOU7HDCMM2CNMD7PT3",
    }
};
export const Errors = {};
export class Client extends ContractClient {
    options;
    constructor(options) {
        super(new ContractSpec(["AAAAAAAAADRJbmNyZW1lbnQgYW4gaW50ZXJuYWwgY291bnRlcjsgcmV0dXJuIHRoZSBuZXcgdmFsdWUuAAAACWluY3JlbWVudAAAAAAAAAAAAAABAAAABA==",
            "AAAAAAAAACVHZXQgdGhlIGN1cnJlbnQgdmFsdWUgb2YgdGhlIGNvdW50ZXIuAAAAAAAACWdldF92YWx1ZQAAAAAAAAAAAAABAAAABA=="]), options);
        this.options = options;
    }
    fromJSON = {
        increment: (this.txFromJSON),
        get_value: (this.txFromJSON)
    };
}
