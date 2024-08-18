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
        contractId: "CDTE2GOVPJAJTKRG5UOOEJEGM5XEM5XAJHHHCJ66OW6DDANKPERWRETO",
    }
};
export const Errors = {
    1: { message: "AlreadyCompleted" }
};
export class Client extends ContractClient {
    options;
    constructor(options) {
        super(new ContractSpec(["AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAAAQAAAAAAAAAQQWxyZWFkeUNvbXBsZXRlZAAAAAE=",
            "AAAAAAAAAAAAAAAQY29tcGxldGVfcHJvZmlsZQAAAAEAAAAAAAAABHVzZXIAAAATAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
            "AAAAAAAAAAAAAAAPZ2V0X3Byb2ZpbGVfaWRzAAAAAAAAAAABAAAD6gAAABM="]), options);
        this.options = options;
    }
    fromJSON = {
        complete_profile: (this.txFromJSON),
        get_profile_ids: (this.txFromJSON)
    };
}
