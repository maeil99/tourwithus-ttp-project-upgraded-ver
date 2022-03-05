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

export const AccommodationList = () => {
  //to get tourist destination
  const { place } = useParams();
  const [searchParams] = useSearchParams();
  //to get params
  const query = searchParams.get("get_started");
  const peopleQuery = searchParams.get("people");
  console.log(place);
  console.log(query, peopleQuery);
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
  const { documents, error } = useCollection("accommodation", [
    "district",
    "==",
    `${destination}`,
  ]);
  useEffect(() => {
    if (documents !== undefined && documents !== null) {
      setAccomList(documents);
    }
  }, [documents]);

  return (
    <Container className="xl:px-0">
      <div className="space-y-3">
        <div className="flex flex-col ">
          {query && <p> user come from homepage</p>}
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
        </div>
        {accomList &&
          accomList.map((accom) => (
            <Card
              key={accom.id}
              header={accom.accomName}
              cardType="accommodation"
              onClick={() => navigateToPage(`${accom.link}`)}
              price={accom.pricePerNight}
            >
              {accom.amenities && (
                <div>
                  <p className="font-bold">Amenities</p>
                  <ul>
                    {accom.amenities.map((accom, index) => (
                      <li key={index}>{accom}</li>
                    ))}
                  </ul>
                </div>
              )}
              <p>{accom.peoplePerRoom} person per room</p>
            </Card>
          ))}
        {error && <p className="text-red-500">{error}</p>}
        {query === "true" ? (
          <div className=" flex justify-end space-x-4">
            <Button>Book a flight</Button>
            <Button>Finish</Button>
          </div>
        ) : (
          <Button onClick={() => navigate("/")}>Back to Homepage</Button>
        )}
      </div>
    </Container>
  );
};
