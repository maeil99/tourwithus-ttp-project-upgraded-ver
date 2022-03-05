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
    <>
      <label htmlFor={name}>{label}</label>
      <Field
        as="select"
        name={name}
        id={name}
        className={`registerField ${className}`}
        multiple={multiple}
      >
        {options &&
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          ))}
      </Field>
      <div className={`text-red-600 px-16 ${errorMessageClassname}`}>
        <ErrorMessage name={name} />
      </div>
    </>
  );
};

export default SelectField;
