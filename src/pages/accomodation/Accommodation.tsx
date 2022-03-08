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
      navigate(pageLink + `?${searchParams}&${numberOfPeople}`);
    } else {
      navigate(pageLink + `?${numberOfPeople}`);
    }
  };

  const initialValues: IAccomInitialValuesProps = {
    destination: "",
    checkInDate: "",
    checkOutDate: "",
    numberOfPeople: 0,
  };

  const validationSchema = Yup.object({
    destination: Yup.string().required("This field is required"),
    checkInDate: Yup.string().optional(),
    checkOutDate: Yup.string().optional(),
    numberOfPeople: Yup.number().required("This field is required"),
  });

  const handleSubmit = (
    values: IAccomInitialValuesProps,
    { resetForm }: { resetForm: any }
  ) => {
    const { destination, numberOfPeople } = values;

    if (numberOfPeople !== 0) {
      navigateToPage(
        `/accommodation/${destination}`,
        `numberOfPeople=${numberOfPeople}`
      );
      resetForm({ values: "" });
    } else {
      return;
    }
  };

  const destinationOpt = [
    { key: "Where do you want to stay?", value: "" },
    { key: "Seri Iskandar, Perak", value: "seri_iskandar" },
  ];

  return (
    <div className="min-h-[1200px] bg-[#E5E5E5]">
      <h2 className="text-3xl pt-16 flex md:px-[410px]">Where do you plan to stay?</h2>
      <div className="pt-14 px-[50px] md:px-[118px]">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form>
              <div className="flex justify-center">
                <div className="flex flex-col md:flex-row md:justify-between bg-[#4E95C3] px-2 py-2 max-h-[450px] md:max-h-[200px] space-x-2 max-w-lg md:max-w-7xl ">
                  <SelectField
                    label="Staycation"
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
