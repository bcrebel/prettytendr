// src/stores/loadingStore.ts
import { atom } from 'nanostores';

// Create a store with an initial value of `false`
export const isLoading = atom<boolean>(false);
