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
    <div className={className ? "" : "flex flex-col w-[443px]"}>
      <label
        htmlFor={name}
        className={className ? "" : "text-xl md:text-3xl pb-2"}
      >
        {label}
      </label>
      <Field
        as={as}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        className={
          className
            ? className
            : "h-16 items-center text-2xl px-2 border border-black rounded-lg"
        }
      />
      <div className={`text-red-600  ${errorMessageClassname ? errorMessageClassname : 'px-16'}`}>
        <ErrorMessage name={name} />
      </div>
    </div>
  );
};

export default InputField;
