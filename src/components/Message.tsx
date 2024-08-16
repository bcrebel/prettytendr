import { useStore } from '@nanostores/react';
import { message } from "../store/message";


const Message = () => {
    const text = useStore(message)

    if(!text) return 

   return  <div 
        className="z-10 flex min-h-12 w-screen items-center justify-center fixed top-0 left-0 text-white bg-red-600">
            {text}
            <button onClick={() => message.set("")} className="absolute right-5">✕</button>
    </div>
}


export default Message;

