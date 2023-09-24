"use client";
import { IoMdLocate } from "react-icons/io";
import { useWeatherStore } from "@/store";

export const LocationSetter = () => {
  const { setCity, pending, firstRender, setFirstRender } = useWeatherStore();
  return (
    <div
      onClick={() => {
        if (navigator.geolocation && !pending) {
          navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            if (firstRender) setFirstRender(false);
            setCity("", lat, lon);
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
