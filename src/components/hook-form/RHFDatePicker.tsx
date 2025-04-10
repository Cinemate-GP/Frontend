/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, Controller, useFormContext } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

interface RHFDatePickerProps {
  label: string;
  name: string;
  control:Control<any>
}

const RHFDatePicker: React.FC<RHFDatePickerProps> = ({ label, name }) => {
  const { control } = useFormContext();

  return (
    <div>
      <label className="block mb-2">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            {...field}
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            className="w-full border rounded-lg bg-transparent p-4 outline-none border-gray-800"
            placeholderText="Select a date"
          />
        )}
      />
    </div>
  );
};

export default RHFDatePicker;
