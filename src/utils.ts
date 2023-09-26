const readDay = (dt: number) => {
  const d = new Date();
  const time = d.getTime();
  const day = new Date(time + Number(dt) * 24 * 3600 * 1000);
  const dayString = String(day);
  //console.log(dayString);
  return (
    dayString.slice(0, 3) +
    ", " +
    dayString.slice(8, 10) +
    " " +
    dayString.slice(4, 7)
  );
};

export const getInterestingData = (forcastData: any) => {
  //console.log(forcastData.daily[0]);
  return {
    city2: forcastData?.timezone?.split("/")[1]?.replace("_", " "),
    /*lat: forcastData.lat,
    lon: forcastData.lon,*/
    weather: forcastData?.current?.weather[0]?.main ?? "",
    temp: forcastData?.current?.temp,
    pressure: forcastData?.current?.pressure,
    humidity: forcastData?.current?.humidity,
    visibility: forcastData?.current?.visibility,
    windSpeed: forcastData?.current?.wind_speed,
    windDeg: forcastData?.current?.wind_deg,
    todayDate: readDay(0),
    nextDays: [
      {
        weather: forcastData?.daily[1]?.weather[0]?.main,
        max: forcastData?.daily[1]?.temp?.max,
        min: forcastData?.daily[1]?.temp?.min,
        date: "Tomorrow",
      },
      {
        weather: forcastData?.daily[2]?.weather[0]?.main,
        max: forcastData?.daily[2]?.temp?.max,
        min: forcastData?.daily[2]?.temp?.min,
        date: readDay(2),
      },
      {
        weather: forcastData?.daily[3]?.weather[0]?.main,
        max: forcastData?.daily[3]?.temp?.max,
        min: forcastData?.daily[3]?.temp?.min,
        date: readDay(3),
      },
      {
        weather: forcastData?.daily[4]?.weather[0]?.main,
        max: forcastData?.daily[4]?.temp?.max,
        min: forcastData?.daily[4]?.temp?.min,
        date: readDay(4),
      },
      {
        weather: forcastData?.daily[5]?.weather[0]?.main,
        max: forcastData?.daily[5]?.temp?.max,
        min: forcastData?.daily[5]?.temp?.min,
        date: readDay(5),
      },
    ],
  };
};

export const weatherImages = [
  "Clear",
  "Hail",
  "HeavyCloud",
  "HeavyRain",
  "LightCloud",
  "LightRain",
  "Shower",
  "Sleet",
  "Snow",
  "Thunderstorm",
  "Clouds",
];

export async function getWeatherData(lat: number, lon: number, system: string) {
  const res = await fetch(
    `/api/getWeather?lat=${lat}&lon=${lon}&system=${system}`
  );

  return res;
}

export const getWeatherImage = (weather: string) => {
  const weatherIndex = weatherImages.indexOf(weather);
  let weatherImage = "";
  if (weatherIndex > 0) weatherImage = weatherImages[weatherIndex];
  else {
    weatherImage =
      weatherImages.filter(
        (img) => img.includes(weather) || img.includes(weather) + "s"
      )[0] ?? weatherImages[0];
  }
  return "/" + weatherImage + ".png";
};

export const getWindDirectionText = (windDeg: number) => {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  const index = Math.round((windDeg % 360) / 22.5);
  return directions[index % 16];
};

export const testData = {
  city2: "test",
  weather: "test",
  temp: 0,
  pressure: 0,
  humidity: 0,
  visibility: 0,
  windSpeed: 0,
  windDeg: 0,
  todayDate: "test1",
  nextDays: [
    {
      weather: "test",
      max: 0,
      min: 0,
      date: "test2",
    },
    {
      weather: "test",
      max: 0,
      min: 0,
      date: "test3",
    },
    {
      weather: "test",
      max: 0,
      min: 0,
      date: "test4",
    },
    {
      weather: "test",
      max: 0,
      min: 0,
      date: "test5",
    },
  ],
};
