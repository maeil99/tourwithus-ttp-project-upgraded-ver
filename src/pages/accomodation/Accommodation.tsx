import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../components/ui/Card/Card";
import Container from "../../components/ui/Container";
import { ICovidCasesMalaysia } from "../../shared/interface/covid.interface";
import { useNavigate } from "react-router-dom";

const Accommodation = () => {
  const malaysiaCovidURL =
    "https://disease.sh/v3/covid-19/countries/Malaysia?yesterday=true&strict=true";
  const [covidCases, setCovidCases] = useState<ICovidCasesMalaysia>();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const date = new Date();
  const navigate = useNavigate();
  const getCovidCasesPerak = async () => {
    const res = await axios.get(malaysiaCovidURL);

    const data = res.data;
    setCovidCases(data);
  };

  const navigateToPage = (pagelink: string) => {
    navigate(pagelink);
  };

  useEffect(() => {
    getCovidCasesPerak();
  }, [date]);
  return (
    <>
      <Container className="xl:px-0">
        <div className="space-y-3">
          <div className="flex flex-col">
            <p>
              {date.toDateString()} ,
              {` ${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()} `}
            </p>
            {covidCases && <p>Today's case: {covidCases.todayCases} </p>}
          </div>

          <Card
            header="Oyo Hotel"
            cardType="accommodation"
            onClick={() => navigateToPage("/")}
            price={5}
          >
            <p>hai</p>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default Accommodation;
