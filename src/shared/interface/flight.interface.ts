export interface IFlightProps {
  id: string;
  link: string;
  //flight's company name
  flightCompanyOneDeparture: string;
  //flight's company name
  flightCompanyOneReturn?: string;
  //price per ticket
  pricePerOneWayTicket: number;
  //price per ticket
  priceForTwoWayTicket: number;
  //type of flight
  flightType: "one-way" | "two-way";
  //type of boarding
  boardingClass: CabinClass;
  //hours taken for the flight, in minutes , for example 1hour 30 minutes = 90 minutes
  flightDuration: number;
  //what time does the flight start from origin,
  departureTimeFromOrigin: Date;
  //what time does the flight arrived at destination
  arrivalTimeFromOrigin: Date;
  //what time does the flight start,
  departureTimeFromDestination?: Date;
  //what time does the flight arrived at destination
  arrivalTimeFromDestination?: Date;
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

export enum CabinClass {
  ECONOMY = "economy",
  PREMIUM_ECONOMY = "premium_economy",
  BUSINESS = "business",
  BUSINESS_SUITE = "business_suite",
}
