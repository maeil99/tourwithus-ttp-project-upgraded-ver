export interface IFlightProps {
  id: string;
  link: string;
  //flight's company name
  flightCompanyOneDeparture: string;
  //flight's company name
  flightCompanyOneReturn?: string;
  //price per ticket
  pricePerOneWayTicket: string;
  //price per ticket
  priceForTwoWayTicket: string;
  //type of flight
  flightType: "one-way" | "two-way";
  //type of boarding
  boardingClass: CabinClass;
  //hours taken for the flight, in minutes , for example 1hour 30 minutes = 90 minutes
  flightDuration: number;
  //what time does the flight start from origin,
  departureTimeFromOrigin: number;
  //what time does the flight arrived at destination
  arrivalTimeFromOrigin: number;
  //what time does the flight start,
  departureTimeFromDestination?: number;
  //what time does the flight arrived at destination
  arrivalTimeFromDestination?: number;
  //provider for the deal
  flightProvider: string;
  //origin departure
  originDepartureLocation: string;
  //flight destination
  flightDestinationLocation: string;
  //does the flight have transit, e.g. true
  transit: boolean;
  //flight's company name
  flightCompanyTwoDeparture?: string;
  //flight's company name
  flightCompanyTwoReturn?: string;
  //number of transit (if any)
  numberOfTransit?: number;
  //place's name of the transit (if any), [dubai airport]
  placesOfTransit?: string[];
}

enum CabinClass {
  ECONOMY = "economy",
  BUSINESS = "business",
  BUSINESS_SUITE = "business-suite",
}
