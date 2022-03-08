import { Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import SelectDate from "../../components/forms/SelectDate";
import SelectField from "../../components/forms/SelectField";
import Button, { Type } from "../../components/ui/Button/Button";
import { AttracType } from "../../shared/interface/attraction.interface";

interface IAttractInitialValuesProps {
  destination: string;
  scheduleDate: string;
  attracType: string;
}

const Attraction = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("get_started");
  const [startDate, setStartDate] = useState(new Date());

  //navigate page
  const navigateToPage = (pageLink: string, attractType: string) => {
    if (query) {
      setSearchParams({ get_started: "true" });
      navigate(pageLink + `?${searchParams}&${attractType}`);
    } else {
      navigate(pageLink + `?${attractType}`);
    }
  };

  //initial value
  const initialValues: IAttractInitialValuesProps = {
    destination: "",
    scheduleDate: "",
    attracType: "",
  };

  //validation schema
  const validationSchema = Yup.object({
    destination: Yup.string().required("This field is required"),
    attracType: Yup.string().required("This field is required"),
    schedule: Yup.string().optional(),
  });

  //on submit function
  const onSubmit = (
    values: IAttractInitialValuesProps,
    { resetForm }: { resetForm: any }
  ) => {
    const { destination, attracType } = values;
    if (destination !== "" && attracType !== "") {
      navigateToPage(`/attraction/${destination}`, `attracType=${attracType}`);
      resetForm({ values: "" });
    } else {
      return;
    }
  };

  //attraction place option
  const destinationOpt = [
    { key: "Where do you want to go?", value: "" },
    { key: "Seri Iskandar, Perak", value: "seri_iskandar" },
  ];

  //type of attraction
  const attractionType = [
    { key: "Select one option", value: "" },
    { key: "Entertainment Park", value: AttracType.ENTERTAINMENT_PARKS },
    { key: "Wildlife", value: AttracType.WILDLIFE },
    { key: "Museum", value: AttracType.MUSEUM },
    { key: "Historical", value: AttracType.HISTORICAL },
  ];
  return (
    <div className="bg-[#E5E5E5]">
      <h2 className="text-3xl pt-16 pb-2 flex md:px-[410px]">
        Where do you want to visit?
      </h2>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form>
            <div className="flex justify-center">
              <div className="flex flex-col md:flex-row md:justify-between bg-[#4E95C3] px-2 py-2 max-h-[450px] md:max-h-[200px] space-x-2 max-w-lg md:max-w-7xl ">
                <SelectField
                  label="Location"
                  name="destination"
                  options={destinationOpt}
                />
                <SelectDate
                  label="Pick-up date"
                  name="schedule"
                  onBlur={formik.handleBlur}
                  startDate={startDate}
                  setStartDate={setStartDate}
                  minDate={new Date()}
                />
                <SelectField
                  label="Type of Attraction"
                  name="attracType"
                  options={attractionType}
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
  );
};

export default Attraction;
