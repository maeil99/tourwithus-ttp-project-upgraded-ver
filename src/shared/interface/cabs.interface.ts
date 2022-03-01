export interface ICabsProps {
  //vehicle type e.g. van, four-seater, six-seater, etc
  vehicleType: string;
  //name of the company, e.g. grab
  companyName: string;
  //number of peoples per vehicle
  vehicleSize: number;
  //pickup location from the attraction place
  originTrip: string;
  //trip destination
  destinationTrip: string;
  //price per trip
  pricePerTrip: number;
  //duration of the trip
  tripDuration: number;
  //total distance from pickup location, in meter
  totalDistance?: number[];
  //distance must be arrange based on accommodation, eg. if fist accommodation is oyo hotel,
  // then the first array is must the distance from oyo hotel to the destination
  totalDistanceFromAccom?: number[];
  //website that offer the deal, e.g. booking.com
  cabsProvider: string;
}
