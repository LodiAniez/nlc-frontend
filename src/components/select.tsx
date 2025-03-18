import React from "react";
import { useController, UseControllerProps } from "react-hook-form";

interface Option {
  value: any;
  label: string;
}

interface SelectProps extends UseControllerProps {
  options: Option[];
  label: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  label,
  ...controllerProps
}) => {
  const {
    field,
    fieldState: { error },
  } = useController(controllerProps);

  return (
    <div className="mb-4">
      <label className="block text-gray-700">{label}</label>
      <select
        {...field}
        className="mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default Select;
