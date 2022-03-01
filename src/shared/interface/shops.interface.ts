export interface IShopProps {
  //shop's name, e.g. kedai runcit rahmat
  shopName: string;
  shopAddr: string;
  originPlace: string[]; // [oyoHotel, billion, utp]
  totalDistance: number[]; //[5km, 2km]
  //type of shops, e.g. grocery store, banks,
  shopType: string;
}
