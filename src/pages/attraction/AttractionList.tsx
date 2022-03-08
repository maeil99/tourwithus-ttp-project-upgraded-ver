import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Button from "../../components/ui/Button/Button";
import Card from "../../components/ui/Card/Card";
import Container from "../../components/ui/Container";
import { useCollection } from "../../shared/hooks/firebaseHooks/useCollection";
import { IAttractionProps } from "../../shared/interface/attraction.interface";

const AttractionList = () => {
  //to get tourist destination
  const { place } = useParams();
  const [searchParams] = useSearchParams();
  //to get params
  const query = searchParams.get("get_started");
  const attracTypeQuery = searchParams.get("attracType");
  const accomId = searchParams.get("accom_id");
  const flightId = searchParams.get("flight_id");

  //convert any params into useful params
  const destination: string = place ? place.replace(/[ _\\/]/g, " ") : "";
  const attracType: string = attracTypeQuery
    ? attracTypeQuery.replace(/[ _\\/]/g, " ")
    : "";

  //get attractionList
  const [attractList, setAttractList] = useState<IAttractionProps[]>();

  //filter attraction list based on attractType
  const [filteredAttractList, setFilteredAttractList] =
    useState<IAttractionProps[]>();

  //get attraction id for accom to pass in params
  const [getAttractId, setGetAttractId] = useState<string>();

  const navigate = useNavigate();
  //navigate page to external website
  const navigateToPage = (pageLink: string) => {
    window.location.href = pageLink;
  };

  //call api
  const { documents, error } = useCollection("attraction", [
    "accomLocation",
    "==",
    `${destination}`,
  ]);
  console.log(documents || 0);

  useEffect(() => {
    if (documents !== undefined && documents !== null) {
      setAttractList(documents);
      const filteredAttraction = attractList?.filter(
        (filter) => filter.type === attracType
      );

      setFilteredAttractList(filteredAttraction);
    }
  }, [documents, attracType, attractList]);

  console.log(filteredAttractList);

  return (
    <Container className="xl:px-0">
      <h1 className="flex font-semibold text-xl pb-4">List of Attraction</h1>
      {error && <p>{error}</p>}
      <div className="w-48 py-3 flex">
        <Button
          onClick={() => {
            if (query) {
              navigate(
                `/attraction?get_started=true&accom_id=${accomId}&flight_id=${flightId}`
              );
            } else {
              navigate(`/attraction`);
            }
          }}
        >
          Back to search
        </Button>
      </div>
      {filteredAttractList && filteredAttractList.length === 0 ? (
        <div>No data found</div>
      ) : (
        <div className=" flex flex-col space-y-4">
          {filteredAttractList?.map((attraction) => {
            return (
              <Card
                get_started={query ? true : false}
                header={attraction.attractionName}
                name="attractionRadioId"
                radioId={attraction.id}
                key={attraction.id}
                cardType="attraction"
                onClick={() => navigateToPage(attraction.link)}
                price={
                  attraction.pricePerTicket !== undefined &&
                  attraction.pricePerTicket !== "free"
                    ? attraction.pricePerTicket
                    : 0
                }
                onChange={(e) => setGetAttractId(e.target.value)}
              ></Card>
            );
          })}
          {query === "true" &&
          filteredAttractList &&
          filteredAttractList.length > 0 ? (
            <div>
              <div className=" flex justify-end space-x-4">
                <div>
                  <Button
                    onClick={() =>
                      navigate(
                        `/cab?get_started=true&accom_id=${accomId}&flight_id=${flightId}&attract_id=${getAttractId}`
                      )
                    }
                    disabled={getAttractId ? false : true}
                  >
                    Schedule a transportation
                  </Button>
                </div>

                <Button>Finish</Button>
              </div>
              {getAttractId === undefined && (
                <p className="flex justify-end pr-[120px] py-1 text-gray-500">
                  No Attraction selected
                </p>
              )}
            </div>
          ) : filteredAttractList?.length === undefined ||
            filteredAttractList.length === 0 ? (
            <>
              <p>No data available!</p>
              <Button onClick={() => navigate("/")}>Back to Homepage</Button>
            </>
          ) : (
            <Button onClick={() => navigate("/")}>Back to Homepage</Button>
          )}
        </div>
      )}
    </Container>
  );
};

export default AttractionList;
