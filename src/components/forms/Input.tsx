import { Field, ErrorMessage } from "formik";

interface InputProps {
  name: string;
  label: string;
  type?: InputType;
  placeholder?: string;
  className?: string;
  children?: React.ReactNode;
  errorMessageClassname?: string;
  as?: string;
}

export enum InputType {
  TEXT = "text",
  PASSWORD = "password",
  EMAIL = "email",
  NUMBER = "number",
}

const InputField = ({
  label,
  name,
  type,
  as,
  placeholder,
  className,
  errorMessageClassname,
}: InputProps) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Field
        as={as}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        className={className}
      />
      <div className={`text-red-600 px-16 ${errorMessageClassname}`}>
        <ErrorMessage name={name} />
      </div>
    </>
  );
};

export default InputField;
