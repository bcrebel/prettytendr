import { atom } from 'nanostores';
import type { ReactElement } from 'react';

export const message = atom<string | ReactElement>("")