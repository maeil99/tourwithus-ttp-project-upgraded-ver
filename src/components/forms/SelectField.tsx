import { Field, ErrorMessage } from "formik";

interface ISelectFieldProps {
  name: string;
  label: string;
  options?: SelectOptions[];
  className?: string;
  errorMessageClassname?: string;
  multiple?: boolean;
}

interface SelectOptions {
  value: string;
  key: string;
}

const SelectField = ({
  name,
  label,
  options,
  className,
  errorMessageClassname,
  multiple = false,
}: ISelectFieldProps) => {
  return (
    <div className="flex flex-col w-[223px] md:w-[443px]">
      <label htmlFor={name} className="text-xl md:text-3xl pb-2">
        {label}
      </label>
      <Field
        as="select"
        name={name}
        id={name}
        className={` ${className} h-8 md:h-16 items-center text-lg md:text-2xl px-2 border border-black rounded-lg`}
        multiple={multiple}
      >
        {options &&
          options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-xl md:text-2xl"
            >
              {option.key}
            </option>
          ))}
      </Field>
      <div className={`text-red-600 ${errorMessageClassname} flex px-3`}>
        <ErrorMessage name={name} />
      </div>
    </div>
  );
};

export default SelectField;
