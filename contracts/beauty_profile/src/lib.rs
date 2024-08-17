#![no_std]
use soroban_sdk::{contract, contracterror, contractimpl, vec, Env, Symbol, Address, Vec};

#[contract]
pub struct PrettyTendrContract;

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum Error {
    AlreadyCompleted = 1,
}

#[contractimpl]
impl PrettyTendrContract {
    pub fn complete_profile(env: Env, user: Address) -> Result<(), Error> {
        // Define a key for the profile IDs
        let profile_ids_key = Symbol::new(&env, "profileIDs");

        // Retrieve the existing list of user addresses
        let mut profile_ids: Vec<Address> = match env.storage().persistent().get(&profile_ids_key) {
            Some(ids) => ids,
            None => vec![&env], // Initialize an empty list if none exists
        };

        // Check if the user's address is already in the list
        if profile_ids.iter().any(|addr| addr == user) {
            return Err(Error::AlreadyCompleted);
        }

        // Append the user's address to the list using push_back
        profile_ids.push_back(user.clone());
        env.storage().persistent().set(&profile_ids_key, &profile_ids);

        // Publish the event
        let event_symbol = Symbol::new(&env, "ProfileCompleted");
        env.events().publish((event_symbol,), (user,));

        Ok(())
    }

    // Function to retrieve the list of profile IDs
    pub fn get_profile_ids(env: Env) -> Vec<Address> {
        let profile_ids_key = Symbol::new(&env, "profileIDs");
        env.storage().persistent().get(&profile_ids_key).unwrap_or_else(|| vec![&env])
    }
}

mod test;
