export interface ICabsProps {
  id: string;
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
  //distance must be arrange based on accommodation, eg. if fist accommodation is oyo hotel,
  // then the first array is must the distance from oyo hotel to the destination
  totalDistanceFromAttraction?: number[];
  //distance must be arrange based on accommodation, eg. if fist accommodation is oyo hotel,
  // then the first array is must the distance from oyo hotel to the destination
  totalDistanceFromShops?: number[];
  //total distance from both attraction and shops
  totalDistance?: number[];
  //website that offer the deal, e.g. booking.com
  cabsProvider: string;
}
