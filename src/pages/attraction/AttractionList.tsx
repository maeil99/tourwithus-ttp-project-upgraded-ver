import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Button from "../../components/ui/Button/Button";
import Card from "../../components/ui/Card/Card";
import Container from "../../components/ui/Container";
import { AuthContext } from "../../context/AuthContext";
import capitalizeFirstLetter from "../../shared/helper/capitalizeFirstLetter";
import { useCollection } from "../../shared/hooks/firebaseHooks/useCollection";
import { IAttractionProps } from "../../shared/interface/attraction.interface";
import LostWorld from "../../assets/pic/attraction/lost_world_of_tambun.jpg";
import HighRope from "../../assets/pic/attraction/high_rope.jpg";
import FuntasyHouse from "../../assets/pic/attraction/funtasy_house.jpeg";

const AttractionList = () => {
  //get user (if logged in)
  const { user } = useContext<string | any>(AuthContext);
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
      {user && (
        <div className="flex justify-center border-2 border-blue-300">
          <p className="text-xl py-3">
            Use gift code <strong>TWUATT</strong> to get 10% of at the checkout
          </p>
        </div>
      )}
      {filteredAttractList && filteredAttractList.length === 0 ? (
        <div className="py-2">No data found</div>
      ) : (
        <div className=" flex flex-col space-y-4 py-2">
          {filteredAttractList?.map((attraction) => {
            return (
              <Card
                get_started={query ? true : false}
                header={capitalizeFirstLetter(attraction.attractionName)}
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
              >
                <div className="py-2 grid grid-cols-2">
                  <div className="flex justify-center">
                    <img
                      src={attractPic(attraction.attractionName)}
                      alt="gambar hotel"
                      className="w-56 h-56"
                    />
                    <div className="flex flex-col space-y-3 items-center py-8">
                      <p>Location: {attraction.attractionAddr}</p>
                      <p>
                        Person In Charge Contact No. : +60
                        {attraction.AttractPhoneNo}
                      </p>
                      <div className="flex justify-between px-8 space-x-4">
                        <p>
                          Opening Hours:{" "}
                          {attraction.openingHours < 1000
                            ? "0" + attraction.openingHours
                            : attraction.openingHours}
                        </p>
                        <p>
                          Closing Hours:{" "}
                          {attraction.closingHours < 1000
                            ? "0" + attraction.closingHours
                            : attraction.closingHours}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="flex justify-start md:justify-end md:pr-40">
                      Available Attraction:
                    </p>
                    {attraction.attractionAvailable.map((attract, index) => (
                      <ul className="flex justify-start md:pl-[350px]">
                        <li key={index}>
                          {index + 1}) {attract}
                        </li>
                      </ul>
                    ))}
                    <p className="py-2 md:pl-80">
                      {attraction.souvenirShops === true
                        ? "The attraction included souvenir shops"
                        : "No souvenir shops included"}
                    </p>
                    <p className="py-2 md:pl-72">
                      Provider: {attraction.AttractProvider}
                    </p>
                  </div>
                </div>
              </Card>
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

const attractPic = (loc: string) => {
  switch (loc) {
    case "lost world of tambun amusement and water park admission ticket":
      return LostWorld;
    case "high rope at mountain school":
      return HighRope;
    case "funtasy house trick art admission ticket":
      return FuntasyHouse;
    default:
      break;
  }
};
