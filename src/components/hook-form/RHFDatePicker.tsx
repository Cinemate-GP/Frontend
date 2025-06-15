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
        rules={{ required: "Date is required" }}
        render={({ field, fieldState: { error } }) => (
          <>
            <DatePicker
              {...field}
              isClearable
              placeholderText="Select a date"
              selected={field.value ? new Date(field.value) : null}
              onChange={(date) => field.onChange(date || null)} // ✅ very important
              className="bg-background rounded-lg text-foreground w-full text-sm p-4 outline-none border border-border"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={50}
              minDate={new Date(1980, 0, 1)}
              maxDate={new Date(2030, 11, 31)}
            />
            {error && (
              <p className="text-red-500 mt-1 text-sm">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default RHFDatePicker;
