export interface IAttractionProps {
  id: string;
  //name of the attraction
  attractionName: string;
  //distance must be arrange based on accommodation, eg. if fist accommodation is oyo hotel,
  // then the first array is must the distance from oyo hotel to the attraction
  distanceFromAccom: number[];
  //list of attraction
  attractionAvailable: string[];
  //attraction address
  attractionAddr: string;
  openingHours: number;
  closingHours: number;
  pricePerTicket: number | "free";
  //provider site for the attraction
  AttractProvider?: string;
  //PIC for the attraction place (if any)
  AttractPhoneNo?: number;
  //determine whether in that attraction place have souvenir shops or not
  souvenirShops: boolean;
  //type of attraction, eg.
  type: AttracType;
  //rating from provider , scale is 1 to 5
  rating?: number;
  accomLocation:string;
  link: string;
}

export enum AttracType {
  ENTERTAINMENT_PARKS = "entertainment_parks",
  WILDLIFE = "wildlife",
  MUSEUM = "museum",
  HISTORICAL = "historical",
}
