import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../components/ui/Button/Button";
import Card from "../../components/ui/Card/Card";
import Container from "../../components/ui/Container";
import Pagination from "../../components/ui/Pagination";
import { AuthContext } from "../../context/AuthContext";
import { useCollection } from "../../shared/hooks/firebaseHooks/useCollection";
import { IFlightProps } from "../../shared/interface/flight.interface";
import { originLocationFormat, convertTime } from "./flight.helper";

const FlightList = () => {
  //get user (if logged in)
  const { user } = useContext<string | any>(AuthContext);
  //get all params in the url
  const [searchParams] = useSearchParams();
  const query = searchParams.get("get_started");
  const accomId = searchParams.get("accom_id");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const departDate = searchParams.get("departDate");
  const returnDate = searchParams.get("returnDate");
  const flightClass = searchParams.get("flightClass");

  const cabinClass = flightClass ? flightClass.replace(/[ _\\/]/g, " ") : "";

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
        (filter) => filter.boardingClass === cabinClass
      );

      setFilteredFlightList(filteredFlightList);
    }
  }, [documents, flightClass, flightList, cabinClass]);

  //navigate page to external website
  const navigateToPage = (pageLink: string) => {
    window.location.href = pageLink;
  };

  //pagination
  let PageSize = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return (
      filteredFlightList &&
      filteredFlightList.slice(firstPageIndex, lastPageIndex)
    );
  }, [currentPage, PageSize, filteredFlightList]);

  return (
    <Container className="xl:px-0">
      <h1 className="flex font-semibold text-xl pb-4">List of Flight</h1>
      {error && <p>{error}</p>}
      <div className="w-48 py-3 flex">
        <Button
          onClick={() => {
            if (query) {
              navigate(`/flight?get_started=true&accom_id=${accomId}`);
            } else {
              navigate(`/flight`);
            }
          }}
        >
          Back to search
        </Button>
      </div>
      {user && (
        <div className="flex justify-center border-2 border-blue-300">
          <p className="text-xl py-3">
            Use gift code <strong>TWUFLI</strong> to get 10% of at the checkout
          </p>
        </div>
      )}
      {currentTableData && currentTableData.length === 0 ? (
        <div className="py-2">No data found</div>
      ) : (
        <div className=" flex flex-col space-y-4 py-2">
          <table>
            <thead></thead>
            <tbody>
              {currentTableData &&
                currentTableData.map((flight) => {
                  return (
                    <div className="py-2">
                      <Card
                        get_started={query ? true : false}
                        flightCompanyOne={
                          flight.flightCompanyOneDeparture || "NA"
                        }
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
                        <div className="grid grid-cols-3 py-2 pl-8">
                          <p className="flex justify-start">
                            Origin Location: {flight.originDepartureLocation}
                          </p>
                          <p className="flex justify-center">
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
                          <p className="flex justify-start pl-8">
                            Flight Type:{" "}
                            {flight.flightType === "one-way"
                              ? "One way"
                              : "Two way"}
                          </p>
                          <p className="flex justify-center">
                            {flight.transit === true
                              ? flight.numberOfTransit + " transit"
                              : "No Transit"}
                          </p>
                          <p className="flex justify-end pr-16">
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
                            <p className="flex justify-end pr-24">
                              Arrival time:{" "}
                              {convertTime(flight.arrivalTimeFromOrigin)}
                            </p>
                          </div>
                        </div>
                        {flight.flightType !== "one-way" && (
                          <div>
                            <p>
                              Return Flight from{" "}
                              {flight.flightDestinationLocation}
                            </p>
                            <div className="grid grid-cols-2 py-2">
                              <p className="flex justify-start pl-8">
                                Departure time:{" "}
                                {flight.departureTimeFromDestination &&
                                  convertTime(
                                    flight.departureTimeFromDestination
                                  )}
                              </p>
                              <p className="flex justify-end pr-24">
                                Arrival time:{" "}
                                {flight.arrivalTimeFromDestination &&
                                  convertTime(
                                    flight.arrivalTimeFromDestination
                                  )}
                              </p>
                            </div>
                          </div>
                        )}
                      </Card>
                    </div>
                  );
                })}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalCount={filteredFlightList ? filteredFlightList.length : 0}
            pageSize={PageSize}
            onPageChange={(page: any) =>
              setCurrentPage(typeof page === "number" ? page : 0)
            }
          />
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

                <Button
                  onClick={() =>
                    navigate(
                      `/estimation-cost?get_started=true&accom_id=${accomId}&flight_id=${getFlightId}`
                    )
                  }
                  disabled={getFlightId ? false : true}
                >
                  Finish
                </Button>
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
