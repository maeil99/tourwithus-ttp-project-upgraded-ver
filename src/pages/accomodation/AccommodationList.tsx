import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import CalendarIcon from "../../assets/icons/CalendarIcon";
import ClockIcon from "../../assets/icons/ClockIcon";
import Button from "../../components/ui/Button/Button";
import Card from "../../components/ui/Card/Card";
import Container from "../../components/ui/Container";
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
  const getCovidCasesPerak = async () => {
    const res = await axios.get(malaysiaCovidURL);

    const data = res.data;
    setCovidCases(data);
  };

  const navigateToPage = (pageLink: string) => {
    navigate(pageLink);
  };
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
    getCovidCasesPerak();
  }, []);

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

        <Card
          header="Oyo Hotel"
          cardType="accommodation"
          onClick={() => navigateToPage("/")}
          price={5}
        >
          <p>hai</p>
        </Card>
        {query === "true" ? (
          <div className=" flex justify-end space-x-4">
            <Button>Next</Button>
            <Button>Finish</Button>
          </div>
        ) : (
          <Button onClick={()=> navigateToPage('/')}>Back to Homepage</Button>
        )}
      </div>
    </Container>
  );
};
