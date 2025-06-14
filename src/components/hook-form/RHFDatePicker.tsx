/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, Controller, useFormContext } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

interface RHFDatePickerProps {
  label: string;
  name: string;
  control: Control<any>;
}

const RHFDatePicker: React.FC<RHFDatePickerProps> = ({ label, name }) => {
  const { control } = useFormContext();

  return (
    <div>
      <label className="block mb-2 text-textMuted">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            {...field}
          
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={50}
            minDate={new Date(1980, 0, 1)}
            maxDate={new Date(2030, 11, 31)}
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            className="bg-background rounded-lg text-foreground w-full text-sm p-4 outline-none border border-border"
            placeholderText="Select a date"
          />
        )}
      />
    </div>
  );
};

export default RHFDatePicker;
