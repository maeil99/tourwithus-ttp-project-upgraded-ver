import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import CalendarIcon from "../../assets/icons/CalendarIcon";
import ClockIcon from "../../assets/icons/ClockIcon";
import Button from "../../components/ui/Button/Button";
import Card from "../../components/ui/Card/Card";
import Container from "../../components/ui/Container";
import { useCollection } from "../../shared/hooks/firebaseHooks/useCollection";
import { IAccommodationProps } from "../../shared/interface/accommodation.interface";
import { ICovidCasesMalaysia } from "../../shared/interface/covid.interface";
import standardSingleRoom from "../../assets/standard single room.jpg";
import DeluxeDoubleRoom from "../../assets/deluxe double room.jpg";

export const AccommodationList = () => {
  //to get tourist destination
  const { place } = useParams();
  const [searchParams] = useSearchParams();
  //to get params
  const query = searchParams.get("get_started");
  const peopleQuery = searchParams.get("numberOfPeople");

  //get id for accom to pass in params
  const [getAccomId, setGetAccomId] = useState<string>();
  console.log(getAccomId);
  //call global covid API
  const malaysiaCovidURL =
    "https://disease.sh/v3/covid-19/countries/Malaysia?yesterday=true&strict=true";
  const [covidCases, setCovidCases] = useState<ICovidCasesMalaysia>();
  const navigate = useNavigate();
  const getCovidCasesMalaysia = async () => {
    const res = await axios.get(malaysiaCovidURL);

    const data = res.data;
    setCovidCases(data);
  };

  const navigateToPage = (pageLink: string) => {
    window.location.href = pageLink;
  };
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
    getCovidCasesMalaysia();
  }, []);
  const destination: string = place ? place.replace(/[ _\\/]/g, " ") : "";

  const [accomList, setAccomList] = useState<IAccommodationProps[]>();
  const [filteredAccomList, setFilteredAccomList] =
    useState<IAccommodationProps[]>();
  const { documents, error } = useCollection("accommodation", [
    "district",
    "==",
    `${destination}`,
  ]);
  useEffect(() => {
    if (documents !== undefined && documents !== null) {
      setAccomList(documents);
      const filteredAccom = accomList?.filter(
        (filter) => filter.peoplePerRoom >= Number(peopleQuery)
      );

      setFilteredAccomList(filteredAccom);
    }
  }, [documents, accomList, peopleQuery]);

  return (
    <Container className="xl:px-0">
      <div className="space-y-3">
        <div className="flex flex-col ">
          <div className="flex space-x-3">
            <div className="flex space-x-2">
              <CalendarIcon />
              <p>
                {dateState.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="flex space-x-2">
              <ClockIcon />
              <p>
                {dateState.toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </p>
            </div>
          </div>
          <div className="flex">
            <p>Location: Malaysia</p>
          </div>
          {covidCases && (
            <div className="flex">
              <p>Today's case: {covidCases.todayCases.toLocaleString()} </p>
            </div>
          )}
          <div className="w-48 py-3 flex">
            <Button onClick={() => navigate("/accommodation")}>
              Back to search
            </Button>
          </div>
        </div>

        {filteredAccomList &&
          filteredAccomList.map((accom) => (
            <Card
              get_started={query ? true : false}
              key={accom.id}
              radioId={accom.id}
              name="accomRadioId"
              onChange={(e) => setGetAccomId(e.target.value)}
              header={accom.accomName}
              cardType="accommodation"
              onClick={() => navigateToPage(`${accom.link}`)}
              price={accom.pricePerNight}
            >
              <div className="grid grid-cols-2 py-2">
                <div className="flex justify-center py-1 ">
                  <img
                    src={
                      accom.accomName === "OYO 774 Hotel Iskandar" &&
                      accom.roomType === "standard single room"
                        ? standardSingleRoom
                        : accom.accomName === "OYO 774 Hotel Iskandar" &&
                          accom.roomType === "deluxe double room"
                        ? DeluxeDoubleRoom
                        : ""
                    }
                    alt="gambar hotel"
                    className="w-56 h-56"
                  />
                </div>
                <div className="flex flex-col  px-1">
                  <div>
                    <h3>Location: </h3>
                    <p>{accom.address}</p>
                  </div>

                  <div className="grid py-1 ">
                    <p className="text-lg font-bold  ">Amenities</p>

                    <div
                      className={`grid ${
                        accom.amenities && accom.amenities.length > 6
                          ? "grid-cols-3"
                          : "grid-cols-2"
                      }`}
                    >
                      {accom.amenities?.map((amen, index) => (
                        <p key={index}>{amen}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3">
                <div>{accom.peoplePerRoom}</div>
                <div>{accom.roomType}</div>
              </div>
            </Card>
          ))}
        {error && <p className="text-red-500">{error}</p>}
        {query === "true" &&
        filteredAccomList &&
        filteredAccomList.length > 0 ? (
          <div className=" flex justify-end space-x-4">
            <Button
              onClick={() =>
                navigate(`/flight?get_started=true&accom_id=${getAccomId}`)
              }
            >
              Book a flight
            </Button>
            <Button>Finish</Button>
          </div>
        ) : filteredAccomList?.length === undefined ||
          filteredAccomList.length === 0 ? (
          <>
            <p>No data available!</p>
            <Button onClick={() => navigate("/")}>Back to Homepage</Button>
          </>
        ) : (
          <Button onClick={() => navigate("/")}>Back to Homepage</Button>
        )}
      </div>
    </Container>
  );
};
