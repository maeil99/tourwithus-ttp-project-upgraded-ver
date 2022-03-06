import { FocusEventHandler } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface ISelectDateProps {
  name: string;
  label: string;
  startDate: Date;
  minDate: Date;
  setStartDate: (value: React.SetStateAction<Date>) => void;
  onBlur: FocusEventHandler<HTMLInputElement> | undefined;
}

const SelectDate = ({
  name,
  label,
  setStartDate,
  startDate,
  minDate,
  onBlur,
}: ISelectDateProps) => {
  return (
    <div className={"flex flex-col w-[223px] md:w-[443px]"}>
      <label htmlFor={name} className={"text-xl md:text-3xl pb-2"}>
        {label}
      </label>
      <ReactDatePicker
        id={name}
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        onBlur={onBlur}
        minDate={minDate}
        className={
          "h-8 md:h-16 items-center text-lg md:text-2xl px-2 border border-black rounded-lg"
        }
      />
    </div>
  );
};

export default SelectDate;
