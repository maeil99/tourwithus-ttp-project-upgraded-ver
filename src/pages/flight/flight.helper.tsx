export enum OriginLocationFullName {
  BANKGKOK = "Bangkok, Thailand",
  YANGON = "Yangon, Myanmar",
  KUALA_TERENGGANU = "Kuala Terengganu",
  KUCHING = "Kuching, Sarawak",
  KOTA_KINABALU = "Kota Kinabalu, Sabah",
  KUANTAN = "Kuantan, Pahang",
  CHANGI = "Changi, Singapore",
  BRUNEI = "Bandar Seri Begawan, Brunei",
  PENGKALAN = "Pengkalan Chepa, Kota Bharu",
  JAKARTA = "Jakarta, Indonesia",
  PENANG = "Bayan Lepas, Penang",
  CAMBODIA = "Phnom Penh, Cambodia",
  VIETNAM = "Ho Chi Minh City, Vietnam",
  KEDAH = "Alor Setar, Kedah",
  IPOH = "Ipoh, Perak",
  JOHOR = "Senai, Johor Bahru",
}

export enum OriginLocation {
  BANKGKOK = "bangkok_thailand",
  YANGON = "yangon_myanmar",
  KUALA_TERENGGANU = "kuala_terengganu",
  KUCHING = "kuching_sarawak",
  KOTA_KINABALU = "kota_kinabalu_sabah",
  KUANTAN = "kuantan_pahang",
  CHANGI = "changi_singapore",
  BRUNEI = "bandar_seri_begawan_brunei",
  PENGKALAN = "pengkalan_chepa_kota_bharu",
  JAKARTA = "jakarta_indonesia",
  PENANG = "bayan_lepas_penang",
  CAMBODIA = "phnom_penh_cambodia",
  VIETNAM = "ho_chi_minh_city_vietnam",
  KEDAH = "alor_setar_kedah",
  IPOH = "ipoh_perak",
  JOHOR = "senai_johor_bahru",
}

export const originLocationFormat = (origin: string) => {
  switch (origin) {
    case OriginLocation.BANKGKOK:
      return OriginLocationFullName.BANKGKOK;
    case OriginLocation.YANGON:
      return OriginLocationFullName.YANGON;
    case OriginLocation.CHANGI:
      return OriginLocationFullName.CHANGI;
    case OriginLocation.KUALA_TERENGGANU:
      return OriginLocationFullName.KUALA_TERENGGANU;
    case OriginLocation.KUCHING:
      return OriginLocationFullName.KUCHING;
    case OriginLocation.KOTA_KINABALU:
      return OriginLocationFullName.KOTA_KINABALU;
    case OriginLocation.KUANTAN:
      return OriginLocationFullName.KUANTAN;
    case OriginLocation.BRUNEI:
      return OriginLocationFullName.BRUNEI;
    case OriginLocation.PENGKALAN:
      return OriginLocationFullName.PENGKALAN;
    case OriginLocation.JAKARTA:
      return OriginLocationFullName.JAKARTA;
    case OriginLocation.PENANG:
      return OriginLocationFullName.PENANG;
    case OriginLocation.CAMBODIA:
      return OriginLocationFullName.CAMBODIA;
    case OriginLocation.VIETNAM:
      return OriginLocationFullName.VIETNAM;
    case OriginLocation.KEDAH:
      return OriginLocationFullName.KEDAH;
    case OriginLocation.IPOH:
      return OriginLocationFullName.IPOH;
    default:
      break;
  }
};

export const convertTime = (time: Date) => {
  let timestamp = new Date(Number(time) * 1000);
  var formattedTime = timestamp.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return formattedTime;
};

export const formatDate = (currentDate: Date) => {
  const year = currentDate.getFullYear();
  const rawMonth = currentDate.getMonth();
  const rawDay = currentDate.getDate();

  const month = rawMonth < 10 ? "0" + rawMonth : rawMonth;
  const day = rawDay < 10 ? "0" + rawDay : rawDay;

  const newDate = year + "-" + month + "-" + day;
  return newDate;
};
