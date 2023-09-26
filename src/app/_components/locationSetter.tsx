"use client";
import { IoMdLocate } from "react-icons/io";
import { useWeatherStore } from "@/store";
import { getWeatherData } from "@/utils";

export const LocationSetter = () => {
  const {
    setCity,
    pending,
    firstRender,
    setFirstRender,
    setPending,
    setForcastData,
    system,
  } = useWeatherStore();
  return (
    <div
      onClick={() => {
        if (navigator.geolocation && !pending) {
          setPending(true);
          navigator.geolocation.getCurrentPosition(async function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            if (firstRender) setFirstRender(false);

            setCity("", lat, lon);
            try {
              const res = await getWeatherData(lat, lon, system);
              const data = await res.json();
              if (data?.current?.temp) setForcastData(data);
            } catch (error) {
              throw new Error("Error fetching data");
            } finally {
              setPending(false);
            }
          });
        }
      }}
      className={`${
        pending ? "text-gray5" : "text-gray2"
      } cursor-pointer w-10 h-10 rounded-full localisation-filter bg-gray1  flex items-center justify-center text-2xl`}
    >
      <IoMdLocate />
    </div>
  );
};
