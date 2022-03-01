export interface IAccommodationProps {
  //hotel name
  accomName: string;
  //price per night
  pricePerNight: number;
  //hotel address
  address: string;
  //provider of the deal, eg. booking.com
  AccomProvider: string;
  //accommodation type, eg. hostel
  type: AccomType;
  //room packages, eg. single bed room
  roomType: string;
  //utilities provided / nearby the accommodation
  amenities?: string[];
  //number of people allocation for a single room
  peoplePerRoom: number;
  //based on the provider
  rating?: number;
}

enum AccomType {
  HOTEL = "hotel",
  HOMESTAY = "homestay",
  HOSTEL = "hostel",
  INN = "inn",
  MOTEL = "motel",
  RESORT = "resort",
  APARTMENT = "apartment",
  CHALET = "chalet",
  HOUSE = "house",
  VILLA = "villa",
}
