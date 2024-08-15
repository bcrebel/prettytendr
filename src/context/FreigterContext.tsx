// FreighterContext.tsx
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import * as freighter from '@stellar/freighter-api';
const { isAllowed, setAllowed, getUserInfo } = freighter.default

type FreighterContextType = {
    publicKey: string;
    connect: () => Promise<void>;
    isAllowed: boolean;
};

// export const FreighterContext = createContext<FreighterContextType>({ publicKey: '', connect: () => {console.log('dummy')}, isAllowed: false });

// export const FreighterProvider = ({ children }: { children: ReactNode }) => {
//     const [publicKey, setPublicKey] = useState<string>('');
//     const [_connect, setConnect] = useState<null>(null);
//     const [_isAllowed, _setAllowed] = useState(false)

//     const wtv = async() => {
//         console.log('wtv')
//         if(_isAllowed) return
//         let _ = await isAllowed()
//         _setAllowed(_)
//         let pk = await getUserInfo()
//         setPublicKey(pk.publicKey)
//     }


// // useEffect(() => {
// //     async function fetchData() {
// //       // You can await here
// //       const response = await MyAPI.getData(someId);
// //       // ...
// //     }
// //     fetchData();
// //   }, [someId]); // Or [] if effect doesn't need props or state

//     useEffect(() => {
//         async function doIt() {
//             await wtv()
//             setConnect(() => () => connect)
//         }

//         doIt()
//     }, [])

//       // await setAllowed
//   // await getUserInfo
//   // render signed in as publickey
//     let connect = async() => {
//         console.log('connect in connect')
//         let aThing = await setAllowed()
//         _setAllowed(aThing)
//         let pk = await getUserInfo();
//         setPublicKey(pk.publicKey);
//     }


//     // if(_connect === null) setConnect({myFunction: () => connect})


// console.log('before return', { publicKey, isAllowed: _isAllowed, connect: _connect })
//     return (
//         <FreighterContext.Provider value={{ publicKey, isAllowed: _isAllowed, connect: _connect }}>
//             {children}
//         </FreighterContext.Provider>
//     );
// };

// export const useFreighter = () => {
//     const context = useContext(FreighterContext);
//     // if (!context) {
//     //     throw new Error('useFreighter must be used within a FreighterProvider');
//     // }
// console.log('context', context)
//     return context;
// };

export const MyContext = createContext({});

export const FreighterProvider = ({ children }: { children: ReactNode }) => {
    const [value, setValue] = useState('initial value');

      // Function to update state inside the provider
    const updateValueInProvider = () => {
        setValue('updated inside provider');
    };

      // Call the function when the component mounts
  useEffect(() => {
    updateValueInProvider();
  }, []); 
console.log('val', value)

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
}
