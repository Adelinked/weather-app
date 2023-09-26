"use client";
import { useWeatherStore } from "@/store";
import { getWeatherData, testData } from "@/utils";

const ChangeButton = ({ title }: { title: string }) => {
  const {
    system,
    setSystem,
    lat,
    lon,
    setForcastData,
    setPending,
    pending,
    firstRender,
    setFirstRender,
  } = useWeatherStore();

  const selectedStyle = !pending
    ? system === title
      ? "bg-white text-blue3"
      : "bg-blue1 text-gray2"
    : "";
  return (
    <button
      onClick={async () => {
        if (firstRender) setFirstRender(false);
        setPending(true);
        setSystem(title);
        try {
          const res = await getWeatherData(lat, lon, title);
          const data = await res.json();
          setForcastData(data);
        } catch (error) {
          setForcastData(testData);
          console.error("Error fetching data:", error);
        } finally {
          setPending(false);
        }
      }}
      className={`flex items-center justify-center w-10 h-10 bg-blue1 rounded-full ${selectedStyle} mr-3  disabled:text-gray5`}
      disabled={pending}
    >
      {title === "Celcius" ? "°C" : "°F"}
    </button>
  );
};

export const SystemChange = () => {
  return (
    <div className="hidden md:flex w-full justify-end text-lg font-bold pr-3">
      <ChangeButton title="Celcius" />
      <ChangeButton title="Fahrenheit" />
    </div>
  );
};
