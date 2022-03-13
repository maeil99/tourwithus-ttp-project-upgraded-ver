import React, { useEffect, useState } from "react";
import { useCollection } from "../../shared/hooks/firebaseHooks/useCollection";
import firebase from "firebase/app";
import "firebase/firestore";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IAccommodationProps } from "../../shared/interface/accommodation.interface";
import { IFlightProps } from "../../shared/interface/flight.interface";
import Button from "../../components/ui/Button/Button";
import { IAttractionProps } from "../../shared/interface/attraction.interface";
import { ICabsProps } from "../../shared/interface/cabs.interface";

const EstimationTotalCost = () => {
  const navigate = useNavigate();
  //get all ids
  const [searchParams] = useSearchParams();
  const accomId = searchParams.get("accom_id");
  const flightId = searchParams.get("flight_id");
  const attractId = searchParams.get("attract_id");
  const cabId = searchParams.get("cab_id");

  //accommodation
  const { documents: accomDocs } = useCollection("accommodation", [
    firebase.firestore.FieldPath.documentId(),
    "==",
    `${accomId}`,
  ]);
  const [getAccomData, setGetAccomData] = useState<IAccommodationProps[]>();
  //get total amount for accommodation
  const [accomTotal, setAccomTotal] = useState<number>(0);

  //flight
  const { documents: flightDocs } = useCollection("flight", [
    firebase.firestore.FieldPath.documentId(),
    "==",
    `${flightId}`,
  ]);
  const [getFlightData, setGetFlightData] = useState<IFlightProps[]>();
  //get total amount for flight
  const [flightTotal, setFlightTotal] = useState<number>(0);

  //attraction
  const { documents: attractDocs } = useCollection("attraction", [
    firebase.firestore.FieldPath.documentId(),
    "==",
    `${attractId}`,
  ]);
  const [getAttractData, setGetAttractData] = useState<IAttractionProps[]>();
  //get total amount for flight
  const [attractTotal, setAttractTotal] = useState<number>(0);

  //cab
  const { documents: cabDocs } = useCollection("cab", [
    firebase.firestore.FieldPath.documentId(),
    "==",
    `${cabId}`,
  ]);
  const [getCabData, setGetCabData] = useState<ICabsProps[]>();
  //get total amount for flight
  const [CabTotal, setCabTotal] = useState<number>(0);

  useEffect(() => {
    //accommodation
    if (accomDocs !== undefined && accomDocs !== null) {
      setGetAccomData(accomDocs);
    }
    if (getAccomData !== undefined && getAccomData !== null) {
      getAccomData.map((cost) => setAccomTotal(cost.pricePerNight));
    }

    //flight
    if (flightDocs !== undefined && flightDocs !== null) {
      setGetFlightData(flightDocs);
    }
    if (getFlightData !== undefined && getFlightData !== null) {
      getFlightData.map((cost) =>
        setFlightTotal(
          cost.pricePerOneWayTicket
            ? cost.pricePerOneWayTicket
            : cost.priceForTwoWayTicket
        )
      );
    }

    //attraction
    if (attractDocs !== undefined && attractDocs !== null) {
      setGetAttractData(attractDocs);
    }
    if (getAttractData !== undefined && getAttractData !== null) {
      getAttractData.map((cost) =>
        setAttractTotal(
          cost.pricePerTicket === "free" ? 0 : cost.pricePerTicket
        )
      );
    }

    //cabs
    if (cabDocs !== undefined && cabDocs !== null) {
      setGetCabData(cabDocs);
    }
    if (getCabData !== undefined && getCabData !== null) {
      getCabData.map((cost) => setCabTotal(cost.pricePerTrip));
    }
  }, [
    accomDocs,
    getAccomData,
    flightDocs,
    getFlightData,
    attractDocs,
    getAttractData,
    cabDocs,
    getCabData,
  ]);

  const totalEstimationCost =
    accomTotal + flightTotal + attractTotal + CabTotal;

  return (
    <div className="min-h-screen">
      <h1 className="text-center font-bold uppercase py-4">
        Estimation Total Cost
      </h1>
      <div className="flex justify-center space-x-28">
        <div className=" rounded-lg shadow-lg  py-5 px-28 ">
          {getAccomData &&
            getAccomData.map((accom) => (
              <div className="flex flex-col py-2">
                <h2 className="flex font-semibold underline">Accommodation</h2>
                <div className="flex justify-between">
                  <p>Hotel Name:</p>
                  <p>Price</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-bold pr-4">{accom.accomName}</p>
                  <p className="font-bold">
                    RM{accom.pricePerNight.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          {getFlightData &&
            getFlightData.map((flight) => (
              <div className="flex flex-col py-2">
                <h2 className="flex font-semibold underline">Flight</h2>
                <div className="flex justify-between">
                  <p>Flight Name:</p>
                  <p>Price</p>
                </div>
                <div className="flex justify-between items-center">
                  {flight.flightType === "one-way" ? (
                    <p className="font-bold">
                      {flight.flightCompanyOneDeparture}
                    </p>
                  ) : (
                    <div className="font-bold">
                      <p className="pr-4">{`Departure: ${flight.flightCompanyOneDeparture}`}</p>
                      <p className="flex">{`Return: ${flight.flightCompanyOneReturn}`}</p>
                    </div>
                  )}

                  <p className="font-bold">
                    RM
                    {flight.pricePerOneWayTicket
                      ? flight.pricePerOneWayTicket.toFixed(2)
                      : flight.priceForTwoWayTicket.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          {getAttractData &&
            getAttractData.map((attract) => (
              <div className="flex flex-col py-2">
                <h2 className="flex font-semibold underline">Attraction</h2>
                <div className="flex justify-between">
                  <p>Attraction Name:</p>
                  <p>Price</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-bold pr-4">{attract.attractionName}</p>
                  <p className="font-bold">
                    {attract.pricePerTicket === "free"
                      ? "free"
                      : `RM${attract.pricePerTicket.toFixed(2)}`}
                  </p>
                </div>
              </div>
            ))}
          {getCabData &&
            getCabData.map((cab) => (
              <div className="flex flex-col py-2">
                <h2 className="flex font-semibold underline">Cab</h2>
                <div className="flex justify-between">
                  <p>Company Name:</p>
                  <p>Price</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-bold pr-4">{cab.companyName}</p>
                  <p className="font-bold">
                    RM{cab.pricePerTrip.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          <div className="flex justify-between py-5">
            <p>Total Estimation: </p>
            <p className="font-bold">RM{totalEstimationCost.toFixed(2)}</p>
          </div>
        </div>
      </div>
      <div className=" flex justify-center py-5">
        <Button onClick={() => navigate("/")}>Back to Homepage</Button>
      </div>
    </div>
  );
};

export default EstimationTotalCost;
