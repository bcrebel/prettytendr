// src/components/LoadingIndicator.tsx
import React from 'react';

interface LoadingIndicatorProps {
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
  message?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ fullScreen = false, message }) => {

  return (
    <div className={`flex items-center justify-center ${fullScreen ? 'fixed inset-0 bg-gray-100 bg-opacity-75 z-50' : ''}`}>
        <div className="bg-green-100 max-w-[75%] m-auto border-solid border-gray-950 border-2 leading-normal rounded-md text-center shadow-md p-6 flex flex-col items-center justify-center lg:max-w-[20%]">
            <img className="animate-pulse size-10" alt="pt-coin-logo" src='/prettytendr/public/images/PT_Pink.png' />
            {message && <p className="text-2xl py-3 text-gray-700 px-2">{message}</p>}
        </div>
    </div>
  );
};

export default LoadingIndicator;
