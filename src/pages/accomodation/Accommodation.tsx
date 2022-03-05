import Container from "../../components/ui/Container";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button, { Type } from "../../components/ui/Button/Button";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import SelectField from "../../components/forms/SelectField";
import InputField, { InputType } from "../../components/forms/Input";

interface IAccomInitialValuesProps {
  destination: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfPeople?: number;
}

const Accommodation = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("get_started");

  const navigateToPage = (pageLink: string) => {
    if (query) {
      setSearchParams({ get_started: "true" });
    }
    navigate(pageLink + `?${searchParams}`);
  };

  const initialValues: IAccomInitialValuesProps = {
    destination: "",
    checkInDate: "",
    checkOutDate: "",
    numberOfPeople: undefined,
  };

  const validationSchema = Yup.object({
    destination: Yup.string().required("This field is required"),

    checkInDate: Yup.string().required("Required"),
    checkOutDate: Yup.string().required("Required"),
    numberOfPeople: Yup.number().required("Required"),
  });

  const handleSubmit = (values: IAccomInitialValuesProps) => {
    const { destination, numberOfPeople } = values;

    if (numberOfPeople === (undefined || 0)) {
      return;
    }
    navigateToPage(`/accommodation/${destination}`);
  };

  const destinationOpt = [
    { key: "Select an option", value: "" },
    { key: "Seri Iskandar, Perak", value: "seri_iskandar" },
  ];

  return (
    <>
      <Container className="xl:px-0">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <div className="flex justify-between bg-[#4E95C3] px-2 py-2 max-h-[200px] items-start space-x-2">
              <SelectField
                label="Where do you want to stay?"
                name="destination"
                options={destinationOpt}
              />

              <InputField
                type={InputType.NUMBER}
                name="numberOfPeople"
                label="Number of people"
              />
            </div>
            <div className="py-2">
              <Button type={Type.SUBMIT}>Search</Button>
            </div>
          </Form>
        </Formik>
      </Container>
    </>
  );
};

export default Accommodation;
