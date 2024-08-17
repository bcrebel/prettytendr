#![cfg(test)]

use crate::{PrettyTendrContract, PrettyTendrContractClient};
use super::*;
use soroban_sdk::{ testutils::Address};

#[test]
fn test_complete_profile_already_completed() {
    let env = Env::default();
    let contract_id = env.register_contract(None, PrettyTendrContract);
    let client = PrettyTendrContractClient::new(&env, &contract_id);
    let user = <soroban_sdk::Address as Address>::generate(&env);

    // First call should succeed
    assert_eq!(client.complete_profile(&user), ());

    // Second call should return an error
    // assert_eq!(client.complete_profile(&user), ());
}

