import React from 'react';

interface ButtonProps {
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  type: "submit" | "reset" | "button";
}

const Button: React.FC<ButtonProps> = ({ isLoading = false, disabled = false, onClick, children, type }) => {
  const baseStyles = 'inline-flex items-center px-10 py-2 border border-transparent text-base font-medium shadow-sm';
  const enabledStyles = 'text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';
  const disabledStyles = 'text-gray-500 bg-gray-200 cursor-not-allowed';
  const loadingStyles = 'bg-blue-600 text-white cursor-wait';

  const getButtonStyles = () => {
    if (isLoading) return `${baseStyles} ${loadingStyles}`;
    if (disabled) return `${baseStyles} ${disabledStyles}`;
    return `${baseStyles} ${enabledStyles}`;
  };

  return (
    <button
      type={type}
      className={getButtonStyles()}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
