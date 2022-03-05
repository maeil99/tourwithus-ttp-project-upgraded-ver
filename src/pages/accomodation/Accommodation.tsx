import { useNavigate, useSearchParams } from "react-router-dom";
import Button, { Type } from "../../components/ui/Button/Button";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import SelectField from "../../components/forms/SelectField";
import InputField, { InputType } from "../../components/forms/Input";
import { useState } from "react";
import SelectDate from "../../components/forms/SelectDate";

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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const navigateToPage = (pageLink: string, numberOfPeople: string) => {
    if (query) {
      setSearchParams({ get_started: "true" });
    }
    navigate(pageLink + `?${searchParams}&${numberOfPeople}`);
  };

  const initialValues: IAccomInitialValuesProps = {
    destination: "",
    checkInDate: "",
    checkOutDate: "",
    numberOfPeople: undefined,
  };

  const validationSchema = Yup.object({
    destination: Yup.string().required("This field is required"),

    checkInDate: Yup.string().optional(),
    checkOutDate: Yup.string().optional(),
    numberOfPeople: Yup.number().required("This field is required"),
  });

  const handleSubmit = (values: IAccomInitialValuesProps) => {
    const { destination, numberOfPeople } = values;

    if (numberOfPeople !== undefined) {
      navigateToPage(
        `/accommodation/${destination}`,
        `numberOfPeople=${numberOfPeople}`
      );
    } else {
      return;
    }
  };

  const destinationOpt = [
    { key: "Select an option", value: "" },
    { key: "Seri Iskandar, Perak", value: "seri_iskandar" },
  ];

  console.log(startDate);

  return (
    <div className="min-h-[1200px] bg-[#E5E5E5]">
      <h2 className="text-3xl pt-16">Where do you plan to stay?</h2>
      <div className="pt-14 px-[118px]">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form>
              <div className="flex justify-between bg-[#4E95C3] px-2 py-2 max-h-[200px] items-start space-x-2 min-w-max">
                <SelectField
                  label="Where do you want to stay?"
                  name="destination"
                  options={destinationOpt}
                />

                <SelectDate
                  label="Check-In date"
                  name="checkInDate"
                  onBlur={formik.handleBlur}
                  startDate={startDate}
                  setStartDate={setStartDate}
                  minDate={new Date()}
                />
                <SelectDate
                  label="Check-Out date"
                  name="checkInDate"
                  onBlur={formik.handleBlur}
                  startDate={endDate}
                  setStartDate={setEndDate}
                  minDate={startDate}
                />
                <InputField
                  type={InputType.NUMBER}
                  name="numberOfPeople"
                  label="Number of people"
                  errorMessageClassname="flex"
                />
              </div>
              <div className="py-5">
                <Button type={Type.SUBMIT}>Search</Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Accommodation;
