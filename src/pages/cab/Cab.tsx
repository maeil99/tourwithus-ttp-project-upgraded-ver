import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Button from "../../components/ui/Button/Button";
import Card from "../../components/ui/Card/Card";
import Container from "../../components/ui/Container";
import { useCollection } from "../../shared/hooks/firebaseHooks/useCollection";
import { IAccommodationProps } from "../../shared/interface/accommodation.interface";
import { ICabsProps } from "../../shared/interface/cabs.interface";
import { convertAttractionName } from "./cab.helper";

const Cab = () => {
  const { attractLocation } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("get_started");
  const accomId = searchParams.get("accom_id");
  const flightId = searchParams.get("flight_id");
  const attractId = searchParams.get("attract_id");
  const attractName =
    attractLocation !== undefined && convertAttractionName(attractLocation);
  console.log("HAI: ", attractName);
  const navigate = useNavigate();

  //call api for accommodation
  const { documents: accomDocs, error: accomError } =
    useCollection("accommodation");

  //set accom data in a new const
  const [accomList, setAccomList] = useState<IAccommodationProps[]>();
  const [filteredAccomList, setFilteredAccomList] =
    useState<IAccommodationProps>();
  console.log("filtered Accom List: ", filteredAccomList);
  //call api for cab
  const { documents: cabDocs, error: cabError } = useCollection("cab", [
    "destinationTrip",
    "==",
    `${attractName}`,
  ]);
  //set list of cab in a new const
  const [cabList, setCabList] = useState<ICabsProps[]>();
  console.log("cab list: ", cabList);
  const cabFilter = cabList?.filter(
    (cab) => cab.originTrip === filteredAccomList?.accomName
  );

  //get id for cab to pass in params
  const [getCabId, setGetCabId] = useState<string>();

  useEffect(() => {
    if (accomDocs !== undefined && accomDocs !== null) {
      setAccomList(accomDocs);
      const filteredAccom = accomList?.find((id) => {
        return id.id === accomId;
      });
      setFilteredAccomList(filteredAccom);
    }

    if (cabDocs !== undefined && cabDocs !== null) {
      setCabList(cabDocs);
    }
  }, [accomDocs, accomId, accomList, cabDocs, cabList]);
  return (
    <Container>
      {cabFilter && (
        <div>
          {cabFilter.map((cabRental) => (
            <Card
              get_started={true}
              key={cabRental.id}
              radioId={cabRental.id}
              name="attractRadioId"
              onChange={(e) => setGetCabId(e.target.value)}
              header={cabRental.companyName}
              cardType="cab"
              price={cabRental.pricePerTrip}
            >
              <div className="flex justify-between py-2 px-2">
                <p>origin location: {cabRental.originTrip}</p>
                <p>Destination location: {cabRental.destinationTrip}</p>
              </div>
              <div className="flex justify-between py-2 px-2">
                <div className="flex space-x-6">
                  <p>Vehicle Type: {cabRental.vehicleType}</p>
                  <p>Group size: {cabRental.vehicleSize}</p>
                </div>

                <p>Provider : {cabRental.cabsProvider || "Not Applicable"}</p>
              </div>
            </Card>
          ))}
          {cabFilter.length === 0 && (
            <div className="space-y-3">
              <p>No data found</p>
              <Button
                onClick={() =>
                  navigate(
                    `/attraction/?get_started=true&accom_id=${accomId}&flight_id=${flightId}`
                  )
                }
              >
                Return to Attraction Page
              </Button>
            </div>
          )}
        </div>
      )}
      {cabError && <p>{cabError}</p>}
      {accomError && <p>{accomError}</p>}
      {query === "true" && cabFilter && cabFilter.length > 0 && (
        <div>
          <div className=" flex justify-end py-4 px-10">
            <div>
              <Button
                onClick={() =>
                  navigate(
                    `/estimation-cost?get_started=true&accom_id=${accomId}&flight_id=${flightId}&attract_id=${attractId}&cab_id=${getCabId}`
                  )
                }
                disabled={getCabId ? false : true}
              >
                Finish
              </Button>
            </div>
          </div>
          {getCabId === undefined && (
            <p className="flex justify-end px-10 text-gray-500">
              No cabs selected
            </p>
          )}
        </div>
      )}
    </Container>
  );
};

export default Cab;
