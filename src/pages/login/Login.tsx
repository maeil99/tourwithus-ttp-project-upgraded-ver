import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputField, { InputType } from "../../components/forms/Input";
import Button, { Type } from "../../components/ui/Button/Button";
import { ILoginProps } from "../../shared/interface/login.interface";
import useLogin from "../../shared/hooks/firebaseHooks/useLogin";

const Login = () => {
  const { login, error, isPending } = useLogin();
  const initialValues: ILoginProps = {
    password: "",

    email: "",
  };
  const validationShema = Yup.object({
    email: Yup.string().email("Invalid Email Format"),
    password: Yup.string().required("Required"),
  });
  const handleSubmit = (values: ILoginProps) => {
    const { email, password } = values;
    login(email, password);
    console.log("Email: ", email);
    console.log(password);
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

            <div className="space-x-4 justify-center px-40 pt-8">
              {isPending ? (
                <Button disabled>Loading</Button>
              ) : (
                <Button type={Type.SUBMIT}>Login</Button>
              )}
            </div>
            {error && <p>{error}</p>}
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Login;
