import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../components/ui/Button/Button";
import Card from "../../components/ui/Card/Card";
import Container from "../../components/ui/Container";
import { useCollection } from "../../shared/hooks/firebaseHooks/useCollection";
import { IFlightProps } from "../../shared/interface/flight.interface";

const FlightList = () => {
  //get all params in the url
  const [searchParams] = useSearchParams();
  const query = searchParams.get("get_started");
  const accomId = searchParams.get("accom_id");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const departDate = searchParams.get("departDate");
  const returnDate = searchParams.get("returnDate");
  const flightClass = searchParams.get("flightClass");

  console.log(query, accomId, from, to, departDate, returnDate, flightClass);
  //get id for accom to pass in params
  const [getFlightId, setGetFlightId] = useState<string>();

  //to navigate other page
  const navigate = useNavigate();

  //const for origin location
  const originLocation = from ? originLocationFormat(from) : "";
  console.log("hai: ", originLocation);
  //fetch data based on origin departure location
  const { documents, error } = useCollection("flight", [
    "originDepartureLocation",
    "==",
    `${originLocation}`,
  ]);

  const [flightList, setFlightList] = useState<IFlightProps[]>();
  const [filteredFlightList, setFilteredFlightList] =
    useState<IFlightProps[]>();

  useEffect(() => {
    if (documents !== undefined && documents !== null) {
      setFlightList(documents);
      const filteredFlightList = flightList?.filter(
        (filter) => filter.boardingClass === flightClass
      );

      setFilteredFlightList(filteredFlightList);
    }
  }, [documents, flightClass, flightList]);

  //navigate page to external website
  const navigateToPage = (pageLink: string) => {
    window.location.href = pageLink;
  };
  console.log(filteredFlightList);
  return (
    <Container className="xl:px-0">
      <h1 className="flex font-semibold text-xl pb-4">List of Flight</h1>
      {error && <p>{error}</p>}
      {filteredFlightList && filteredFlightList.length === 0 ? (
        <div>No data found</div>
      ) : (
        <div className=" flex flex-col space-y-4">
          {filteredFlightList?.map((flight) => {
            return (
              <Card
                get_started={query ? true : false}
                flightCompanyOne={flight.flightCompanyOneDeparture || "NA"}
                flightCompanyTwo={
                  flight.flightType === "two-way"
                    ? flight.flightCompanyOneReturn
                    : "Not Available"
                }
                name="flightRadioId"
                radioId={flight.id}
                key={flight.id}
                cardType="flight"
                onClick={() => navigateToPage(flight.link)}
                price={
                  flight.flightType === "one-way"
                    ? flight.pricePerOneWayTicket
                    : flight.priceForTwoWayTicket
                }
                onChange={(e) => setGetFlightId(e.target.value)}
              >
                <div className="grid grid-cols-3 py-2">
                  <p className="flex justify-start">
                    Origin Location: {flight.originDepartureLocation}
                  </p>
                  <p className="flex justify-start">
                    Destination Location:{" "}
                    {flight.flightDestinationLocation || "NA"}
                  </p>
                  <p className="flex justify-end">
                    Flight Duration:{" "}
                    {`${Math.floor(flight.flightDuration / 60)} hours ${
                      flight.flightDuration % 60
                    } minutes`}
                  </p>
                </div>
                <div className="grid grid-cols-3 py-2">
                  <p className="flex justify-center">
                    Flight Type:{" "}
                    {flight.flightType === "one-way" ? "One way" : "Two way"}
                  </p>
                  <p className="flex justify-center">
                    {flight.transit === true
                      ? flight.numberOfTransit + " transit"
                      : "No Transit"}
                  </p>
                  <p className="flex justify-center">
                    Flight Provider: {flight.flightProvider}
                  </p>
                </div>
                <div>
                  <p>Flight from {flight.originDepartureLocation}</p>
                  <div className="grid grid-cols-2 py-2">
                    <p className="flex justify-start pl-8">
                      Departure time:{" "}
                      {convertTime(flight.departureTimeFromOrigin)}
                    </p>
                    <p className="flex justify-center pl-16">
                      Arrival time: {convertTime(flight.arrivalTimeFromOrigin)}
                    </p>
                  </div>
                </div>
                {flight.flightType !== "one-way" && (
                  <div>
                    <p>Return Flight from {flight.flightDestinationLocation}</p>
                    <div className="grid grid-cols-2 py-2">
                      <p className="flex justify-start pl-8">
                        Departure time:{" "}
                        {flight.departureTimeFromDestination &&
                          convertTime(flight.departureTimeFromDestination)}
                      </p>
                      <p className="flex justify-center pl-16">
                        Arrival time:{" "}
                        {flight.arrivalTimeFromDestination &&
                          convertTime(flight.arrivalTimeFromDestination)}
                      </p>
                    </div>
                  </div>
                )}

                {/* {flight.numberOfTransit && flight.numberOfTransit > 0 && (
                  <div className="grid grid-cols-2 py-2">
                    <p className="flex justify-center">
                      Flight Type: {flight.flightType}
                    </p>
                    <p className="flex justify-center">
                      {flight.transit === true
                        ? flight.numberOfTransit + " transit"
                        : "No Transit"}
                    </p>
                    <p className="flex justify-center">
                      Flight Provider: {flight.flightProvider}
                    </p>
                  </div>
                )} */}
              </Card>
            );
          })}
          {query === "true" &&
          filteredFlightList &&
          filteredFlightList.length > 0 ? (
            <div>
              <div className=" flex justify-end space-x-4">
                <div>
                  <Button
                    onClick={() =>
                      navigate(
                        `/attraction?get_started=true&accom_id=${accomId}&flight_id=${getFlightId}`
                      )
                    }
                    disabled={getFlightId ? false : true}
                  >
                    Book an Attraction
                  </Button>
                </div>

                <Button>Finish</Button>
              </div>
              {getFlightId === undefined && (
                <p className="flex justify-end pr-[120px] py-1 text-gray-500">
                  No Flight selected
                </p>
              )}
            </div>
          ) : filteredFlightList?.length === undefined ||
            filteredFlightList.length === 0 ? (
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

export default FlightList;

const originLocationFormat = (origin: string) => {
  switch (origin) {
    case "bangkok_thailand":
      return "Bangkok, Thailand";
    case "yangon_myanmar":
      return "Yangon, Myanmar";
    default:
      break;
  }
};

const convertTime = (time: Date) => {
  let timestamp = new Date(Number(time) * 1000);
  var formattedTime = timestamp.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return formattedTime;
};
