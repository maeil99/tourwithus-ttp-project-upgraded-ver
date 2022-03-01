export interface IFlightProps {
  //flight's company name
  flightCompany: string;
  //price per ticket
  pricePerTicket: string;
  //type of flight
  flightType: "one-way" | "two-way";
  //type of boarding
  boardingClass: CabinClass;
  //hours taken for the flight
  flightDuration: number;
  //what time does the flight start
  departureTime: number;
  //what time does the flight arrived at destination
  arrivalTime: number;
  //provider for the deal
  flightProvider: string;
  //origin departure
  originDeparture: string;
  //flight destination
  flightDestination: string;
  //does the flight have transit, e.g. true
  transit: boolean;
  //number of transit (if any)
  numberOfTransit?: number;
  //place's name of the transit (if any)
  placesOfTransit?: string[];
}

enum CabinClass {
  ECONOMY = "economy",
  BUSINESS = "business",
  BUSINESS_SUITE = "business-suite",
}
