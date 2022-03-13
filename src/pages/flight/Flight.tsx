import { useNavigate, useSearchParams } from "react-router-dom";
import { CabinClass } from "../../shared/interface/flight.interface";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import SelectDate from "../../components/forms/SelectDate";
import SelectField from "../../components/forms/SelectField";
import Button, { Type } from "../../components/ui/Button/Button";
import { useState } from "react";
import {
  formatDate,
  OriginLocation,
  OriginLocationFullName,
} from "./flight.helper";

interface IFlightInitialValuesProps {
  from: string;
  to: string;
  departTimeStamp: Date;
  returnTimeStamp: Date;
  flightClass: string;
}

const Flight = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("get_started");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const navigateToPage = (
    pageLink: string,
    {
      departTimeStamp,
      from,
      returnTimeStamp,
      to,
      flightClass,
    }: IFlightInitialValuesProps
  ) => {
    const departDate = formatDate(departTimeStamp);
    const returnDate = formatDate(returnTimeStamp);
    setSearchParams({ get_started: "true" });
    if (query) {
      navigate(
        `${pageLink}?${searchParams}&from=${from}&to=${to}&departDate=${departDate}&returnDate=${returnDate}&flightClass=${flightClass}`
      );
    }
  };

  const initialValues: IFlightInitialValuesProps = {
    from: "",
    to: "",
    departTimeStamp: new Date(),
    returnTimeStamp: new Date(),
    flightClass: "",
  };

  const validationSchema = Yup.object({
    from: Yup.string().required("This field is required"),
    to: Yup.string().required("This field is required"),
    departDate: Yup.string().optional(),
    returnDate: Yup.string().optional(),
    flightClass: Yup.string().required("This field is required"),
  });

  const handleSubmit = (
    values: IFlightInitialValuesProps,
    { resetForm }: { resetForm: any }
  ) => {
    const { flightClass } = values;

    if (flightClass !== undefined) {
      navigateToPage("/flight/flightList", { ...values });
      resetForm({ values: "" });
    } else {
      return;
    }
  };

  const originLocation = [
    { key: "Where is your origin location", value: "" },
    {
      key: OriginLocationFullName.BANKGKOK,
      value: OriginLocation.BANKGKOK,
    },
    { key: OriginLocationFullName.YANGON, value: OriginLocation.YANGON },
    {
      key: OriginLocationFullName.CHANGI,
      value: OriginLocation.CHANGI,
    },
    {
      key: OriginLocationFullName.BRUNEI,
      value: OriginLocation.BRUNEI,
    },
    {
      key: OriginLocationFullName.JAKARTA,
      value: OriginLocation.JAKARTA,
    },
    {
      key: OriginLocationFullName.CAMBODIA,
      value: OriginLocation.CAMBODIA,
    },
    {
      key: OriginLocationFullName.VIETNAM,
      value: OriginLocation.VIETNAM,
    },
    {
      key: OriginLocationFullName.KUALA_TERENGGANU,
      value: OriginLocation.KUALA_TERENGGANU,
    },
    {
      key: OriginLocationFullName.KOTA_KINABALU,
      value: OriginLocation.KOTA_KINABALU,
    },
    { key: OriginLocationFullName.KUCHING, value: OriginLocation.KUCHING },
    {
      key: OriginLocationFullName.KEDAH,
      value: OriginLocation.KEDAH,
    },
    {
      key: OriginLocationFullName.IPOH,
      value: OriginLocation.IPOH,
    },
    { key: OriginLocationFullName.KUANTAN, value: OriginLocation.KUANTAN },
    { key: OriginLocationFullName.PENANG, value: OriginLocation.PENANG },
    { key: OriginLocationFullName.PENGKALAN, value: OriginLocation.PENGKALAN },
    {
      key: OriginLocationFullName.JOHOR,
      value: OriginLocation.JOHOR,
    },
  ];

  const destinationLocation = [
    { key: "Where is your destination?", value: "" },
    { key: "Kuala Lumpur, Malaysia", value: "kuala_lumpur_malaysia" },
  ];

  const flightClass = [
    { key: "Select your flight class", value: "" },
    { key: "Business", value: CabinClass.BUSINESS },
    { key: "Business Suite", value: CabinClass.BUSINESS_SUITE },
    { key: "Economy", value: CabinClass.ECONOMY },
    { key: "Premium Economy", value: CabinClass.PREMIUM_ECONOMY },
  ];

  return (
    <div className="max-w-full min-h-[1000px] md:min-h-[1200px] bg-[#E5E5E5] flex flex-col items-start">
      <h2 className="text-xl md:text-3xl pt-16 mx-16 md:mx-28">
        How do you plan to travel?
      </h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form>
            <div className="bg-[#4E95C3] max-w-[700px] md:max-w-[1840px] mx-16 md:mx-24 md:my-4">
              <div className="my-4 px-4 py-2  flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 ">
                <SelectField
                  label="From?"
                  name="from"
                  options={originLocation}
                />
                <SelectField
                  label="To?"
                  name="to"
                  options={destinationLocation}
                />

                <SelectDate
                  label="Depart date"
                  name="departDate"
                  onBlur={formik.handleBlur}
                  startDate={fromDate}
                  setStartDate={setFromDate}
                  minDate={new Date()}
                />
                <SelectDate
                  label="Return Date"
                  name="returnDate"
                  onBlur={formik.handleBlur}
                  startDate={toDate}
                  setStartDate={setToDate}
                  minDate={fromDate}
                />
                <SelectField
                  label="Flight Class"
                  name="flightClass"
                  options={flightClass}
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

export default Flight;
