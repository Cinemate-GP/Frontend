import { Controller, useFormContext } from "react-hook-form";

interface CustomSelectProps {
  label: string;
  name: string;
  options: { id: number | string; label: string }[];
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
          <label className="block mb-2 text-textMuted">{label}</label>
          <select
            {...field}
            {...other}
            className="bg-background rounded-lg text-foreground w-full text-sm p-4 outline-none border border-border"
          >
            {label === "Job" && (
              <option
                className="p-3 cursor-pointer transition text-foreground hover:bg-primary hover:text-foreground"
                value={""}
              >
                Select a Job
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.id}
                value={option.id}
                className="p-3 cursor-pointer transition text-foreground hover:bg-primary hover:text-foreground"
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}
    />
  );
};

export default RHFSelectField;
