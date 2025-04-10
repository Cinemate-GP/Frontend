import { Controller, useFormContext } from "react-hook-form";

interface CustomSelectProps {
  label: string;
  name: string;
  options: string[];
}

const RHFSelectField: React.FC<CustomSelectProps> = ({
  label,
  name,
  options,
  ...other
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div>
          <label className="block mb-2">{label}</label>
          <select
            {...field}
            {...other}
            className="bg-transparent border border-gray-800 w-full p-4 outline-none"
          >
            {options.map((option) => (
              <option
                key={option}
                value={option}
                className="p-3 cursor-pointer transition text-black"
              >
                {option}
              </option>
            ))}
          </select>
        </div>
      )}
    />
  );
};

export default RHFSelectField;
