import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, loading, className, ...props }) => {
  return (
    <button
      {...props}
      className={`w-fit bg-black text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-800 focus:outline-none ${className || ''}`}
      disabled={loading || props.disabled}
    >
      {loading ? 'Loading...' : label}
    </button>
  );
};

export default Button;
