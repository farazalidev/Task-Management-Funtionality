/* eslint-disable react/display-name */
import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>((props, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className={`border-2 border-black rounded-none px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black ${props.className || ''}`}
    />
  );
});

export default InputField;
