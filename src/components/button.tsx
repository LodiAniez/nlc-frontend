import React from "react";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  type = "button",
  children,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`bg-blue-500 text-white p-2 rounded ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
