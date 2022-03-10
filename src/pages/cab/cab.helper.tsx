export enum AttractionName {
    HIGH_HOPE = "high_rope_at_mountain_school",
    LOST_WORLD_OF_TAMBUN = "Lost_World_Of_Tambun,_Ipoh_Perak",
    MURAL = "mural_art's_lane",
    HO_YAN = "ho_yan_hor_museum",
    WHITE_WATER = "White_Water_Rafting_on_the_Sungai_Kampar_River",
    GERBANG_MALAM = "gerbang_malam_ipoh",
    TAIPING_ZOO = "taiping_zoo,perak",
    FUNTASY_HOUSE_TRICK = "Funtasy_House_Trick_Art,_Ipoh_Perak",
    BIRCH_MEMORIAL = "Birch_Memorial_Clock_Tower",
    TAIPING_LAKE = "taiping_lake_gardens",
    PERAK_MUSEUM = "perak_museum",
    TEMPURUNG_CAVE = "Tempurung_Cave",
    PANGKOR_ISLAND = "pangkor_island",
    KONG_HENG = "kong_heng_square",
    KELLIE_CASTLE = "Kellie's_Castle",
    MENARA_CONDONG = "menara_condong_teluk_intan",
    LORONG_PANGLIMA = "lorong_panglima_(concubine_lane)",
    GUNUNG_LANG = "gunung_lang_recreational_park",
  
  }
  
  export enum AttractFullName {
    HIGH_HOPE = "high rope at mountain school",
    LOST_WORLD_OF_TAMBUN = "Lost World Of Tambun, Ipoh Perak",
    MURAL = "mural art's lane",
    HO_YAN = "ho yan hor museum",
    WHITE_WATER = "White Water Rafting on the Sungai Kampar River",
    GERBANG_MALAM = "gerbang malam ipoh",
    TAIPING_ZOO = "taiping zoo, perak",
    FUNTASY_HOUSE_TRICK = "Funtasy House Trick Art, Ipoh Perak",
    BIRCH_MEMORIAL = "Birch Memorial Clock Tower",
    TAIPING_LAKE = "taiping lake gardens",
    PERAK_MUSEUM = "perak museum",
    TEMPURUNG_CAVE = "Tempurung Cave",
    PANGKOR_ISLAND = "pangkor island",
    KONG_HENG = "kong heng square",
    KELLIE_CASTLE = "Kellie's Castle",
    MENARA_CONDONG = "menara condong teluk intan",
    LORONG_PANGLIMA = "lorong panglima (concubine lane)",
    GUNUNG_LANG = "gunung lang recreational park",
  }
  
  export const convertAttractionName = (name: string) => {
    switch (name) {
      case AttractionName.LOST_WORLD_OF_TAMBUN:
        return AttractFullName.LOST_WORLD_OF_TAMBUN;
      case AttractionName.BIRCH_MEMORIAL:
        return AttractFullName.BIRCH_MEMORIAL;
      case AttractionName.FUNTASY_HOUSE_TRICK:
        return AttractFullName.FUNTASY_HOUSE_TRICK;
      case AttractionName.GERBANG_MALAM:
        return AttractFullName.GERBANG_MALAM;
        case AttractionName.GUNUNG_LANG:
        return AttractFullName.GUNUNG_LANG;
        case AttractionName.HIGH_HOPE:
        return AttractFullName.HIGH_HOPE;
        case AttractionName.HO_YAN:
        return AttractFullName.HO_YAN;
        case AttractionName.KELLIE_CASTLE:
        return AttractFullName.KELLIE_CASTLE;
        case AttractionName.KONG_HENG:
        return AttractFullName.KONG_HENG;
        case AttractionName.LORONG_PANGLIMA:
        return AttractFullName.LORONG_PANGLIMA;
        case AttractionName.MENARA_CONDONG:
        return AttractFullName.MENARA_CONDONG;
        case AttractionName.MURAL:
        return AttractFullName.MURAL;
        case AttractionName.PANGKOR_ISLAND:
        return AttractFullName.PANGKOR_ISLAND;
        case AttractionName.PERAK_MUSEUM:
        return AttractFullName.PERAK_MUSEUM;
        case AttractionName.TAIPING_LAKE:
        return AttractFullName.TAIPING_LAKE;
        case AttractionName.TAIPING_ZOO:
        return AttractFullName.TAIPING_ZOO;
        case AttractionName.TEMPURUNG_CAVE:
        return AttractFullName.TEMPURUNG_CAVE;
        case AttractionName.WHITE_WATER:
        return AttractFullName.WHITE_WATER;
        
      default:
        break;
    }
  };
  