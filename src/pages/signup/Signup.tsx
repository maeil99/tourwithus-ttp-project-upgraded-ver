import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField, { InputType } from "../../components/forms/Input";
import Button, { Type } from "../../components/ui/Button/Button";
import useSignup from "../../shared/hooks/firebaseHooks/useSignup";
import { IRegisterProps } from "../../shared/interface/register.interface";

const Singup = () => {
  const { error, isPending, signup } = useSignup();
  const initialValues: IRegisterProps = {
    password: "",
    confirmPassword: "",
    email: "",
    displayName: "",
  };

  const validationShema = Yup.object({
    email: Yup.string().email("Invalid Email Format"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Password must match")
      .required("This field is required"),
    displayName: Yup.string().required("Required"),
  });

  const handleSubmit = (values: IRegisterProps) => {
    const { email, password, displayName } = values;
    signup(email, password, displayName);
  };

  const inputCSS = "w-72 pt-1.5 pl-3 border border-gray-500 rounded-full";
  return (
    <>
      <h1 className="text-center font-bold uppercase py-4">
        Registration Form
      </h1>
      <div className="flex justify-center pb-24">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationShema}
        >
          <Form className="border p-16 rounded-lg shadow-lg">
            <div className="space-x-20 py-4">
              <InputField
                type={InputType.TEXT}
                name="displayName"
                label="Username"
                className={inputCSS}
              />
            </div>
            <div className="space-x-28 py-4">
              <InputField
                type={InputType.EMAIL}
                name="email"
                label="Email"
                className={inputCSS}
              />
            </div>
            <div className="space-x-20 py-4">
              <InputField
                type={InputType.PASSWORD}
                name="password"
                label="Password"
                className={inputCSS}
              />
            </div>
            <div className="space-x-7 py-4">
              <InputField
                type={InputType.PASSWORD}
                name="confirmPassword"
                label="Confirm Password"
                className={inputCSS}
                errorMessageClassname="px-36"
              />
            </div>
            <div className="space-x-4 justify-center px-40 pt-8">
              {isPending ? (
                <Button disabled>Loading</Button>
              ) : (
                <Button type={Type.SUBMIT}>Register</Button>
              )}

              <Button type={Type.RESET}>Reset</Button>
              {error && <p>{error}</p>}
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Singup;
