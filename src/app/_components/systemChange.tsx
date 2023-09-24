"use client";
import { useWeatherStore } from "@/store";
import { useEffect } from "react";
import { getWeatherData, getInterestingData } from "@/utils";

export const SystemChange = () => {
  const {
    system,
    setSystem,
    lat,
    lon,
    setForcastData,
    setPending,
    pending,
    firstRender,
  } = useWeatherStore();
  useEffect(() => {
    if (firstRender) return;
    (async () => {
      setPending(true);
      try {
        const res = await getWeatherData(lat, lon, system);

        const data = await res.json();
        setForcastData(getInterestingData(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setPending(false);
    })();
  }, [system, lat, lon]);
  const celciusStyle =
    system === "Celcius" ? "bg-white text-blue3" : "bg-blue1 text-gray2";
  const fahenheitStyle =
    system === "Fahrenheit" ? "bg-white text-blue3" : "bg-blue1 text-gray2";
  return (
    <div className="hidden md:flex w-full justify-end text-lg font-bold pr-3">
      <button
        onClick={() => setSystem("Celcius")}
        className={`flex items-center justify-center w-10 h-10 bg-blue1 rounded-full ${celciusStyle} mr-3 disabled:text-gray5`}
        disabled={pending}
      >
        °C
      </button>
      <button
        onClick={() => setSystem("Fahrenheit")}
        className={`flex items-center justify-center w-10 h-10 bg-blue1 rounded-full ${fahenheitStyle} disabled:text-gray5`}
        disabled={pending}
      >
        °F
      </button>
    </div>
  );
};
