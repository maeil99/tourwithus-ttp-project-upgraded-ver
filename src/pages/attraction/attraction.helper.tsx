import LostWorld from "../../assets/pic/attraction/lost_world_of_tambun.jpg";
import FuntasyHouse from "../../assets/pic/attraction/funtasy_house.jpeg";
import Mural from "../../assets/pic/attraction/Colorful-Murals-At-Mural-Arts-Lane-In-Ipoh.jpg";
import Hoyan from "../../assets/pic/attraction/Ho-Yan-Hor-Museum-Mu-Hotel-Ipoh-Nearby-Attraction.jpg";
import Nomad from "../../assets/pic/attraction/nomad-earth-camp.jpg";
import Gerbang_Malam from "../../assets/pic/attraction/GERBANG-MALAM-6.t52ccbcb8.m600.w.4sTBMWaterM21.jpg.TIF.pv_.x50ae2479_640x428.jpg";
import Zoo_Taiping from "../../assets/pic/attraction/ZOOaTAIPING_1605838228.jpg";
import Birch_Memorial from "../../assets/pic/attraction/Birch Memorial Clock Tower.jpg";
import Taiping_Lake from "../../assets/pic/attraction/Taiping Lake Gardens.jpg";
import Perak_Museum from "../../assets/pic/attraction/Perak Museum.jpg";
import Gua_Tempurung from "../../assets/pic/attraction/Gua_Tempurung_Intro.jpg";
import Pangkor_Island from "../../assets/pic/attraction/51826-emerald-bay-pangkor-laut-resort-pangkor-laut.jpg";
import Oval_Park from "../../assets/pic/attraction/Oval Park.jpg";
import Kong_Heng from "../../assets/pic/attraction/kongheng_hero.jpg";
import Kellie from "../../assets/pic/attraction/kellies-castle-2888100_1280.jpg";
import Menara_Condong from "../../assets/pic/attraction/29menara1.transformed.jpg";
import Gunung_Lang from "../../assets/pic/attraction/place-2015-09-10-8-Gununglangrecreationalpark0609fa61540c4865e3bebcaf48d8b941.jpg";

enum AttractionFullName {
    LOST_WORLD = "Lost World of Tambun, Ipoh Perak",
    MURAL = "Mural Art's Lane",
    HO_YAN = "Ho Yan Hor Museum",
    NOMAD_ADVENTURE = "Nomad Adventure Sdn Bhd, Earth Camp",
    GERBANG_MALAM = "Gerbang Malam Ipoh",
    TAPING_ZOO = "Taiping Zoo, Perak",
    FUNTASY_HOUSE = "Funtasy House Trick Art, Ipoh Perak",
    BIRCH_MEMORIAL = "Birch Memorial Clock Tower",
    TAIPING_LAKE = "Taiping Lake Gardens",
    PERAK_MUSEUM = "Perak Museum",
    TEMPURUNG_CAVE = "Tempurung Cave",
    PANGKOR_ISLAND = "pangkor island ",
    OVAL_PARK_UTP = "Oval Park",
    KONG_HENG_SQUARE = "Kong Heng Square",
    KELLIE = "Kellie's Castle",
    MENARA_CONDONG = "Menara Condong Teluk Intan",
    GUNUNG_LANG = "Gunung Lang Recreational Park",
  }
  
  export const attractPic = (loc: string) => {
    switch (loc) {
      case AttractionFullName.LOST_WORLD:
        return LostWorld;
      case AttractionFullName.MURAL:
        return Mural;
      case AttractionFullName.HO_YAN:
        return Hoyan;
      case AttractionFullName.NOMAD_ADVENTURE:
        return Nomad;
      case AttractionFullName.GERBANG_MALAM:
        return Gerbang_Malam;
      case AttractionFullName.TAPING_ZOO:
        return Zoo_Taiping;
      case AttractionFullName.BIRCH_MEMORIAL:
        return Birch_Memorial;
      case AttractionFullName.TAIPING_LAKE:
        return Taiping_Lake;
      case AttractionFullName.PERAK_MUSEUM:
        return Perak_Museum;
      case AttractionFullName.TEMPURUNG_CAVE:
        return Gua_Tempurung;
      case AttractionFullName.PANGKOR_ISLAND:
        return Pangkor_Island;
      case AttractionFullName.OVAL_PARK_UTP:
        return Oval_Park;
      case AttractionFullName.KONG_HENG_SQUARE:
        return Kong_Heng;
      case AttractionFullName.KELLIE:
        return Kellie;
      case AttractionFullName.MENARA_CONDONG:
        return Menara_Condong;
      case AttractionFullName.GUNUNG_LANG:
        return Gunung_Lang;
      case AttractionFullName.FUNTASY_HOUSE:
        return FuntasyHouse;
      default:
        break;
    }
  };