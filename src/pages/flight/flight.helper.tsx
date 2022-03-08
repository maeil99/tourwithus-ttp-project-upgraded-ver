export const originLocationFormat = (origin: string) => {
  switch (origin) {
    case "bangkok_thailand":
      return "Bangkok, Thailand";
    case "yangon_myanmar":
      return "Yangon, Myanmar";
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
