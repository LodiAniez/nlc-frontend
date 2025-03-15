import React from "react";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  className?: string;
};

const Button = ({ type = "button", children, className = "" }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`w-full bg-blue-500 text-white p-2 rounded ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
