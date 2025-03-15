import { useFormContext } from "react-hook-form";

type InputProps = {
  name: string;
  label: string;
  type?: string;
};

const Input = ({ name, label, type = "text" }: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4">
      <label className="block text-gray-700">{label}</label>
      <input
        type={type}
        {...register(name)}
        className="w-full p-2 border border-gray-300 rounded mt-1"
      />
      {errors[name] && (
        <p className="text-red-500 text-sm">{String(errors[name]?.message)}</p>
      )}
    </div>
  );
};

export default Input;
