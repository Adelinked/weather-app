"use client";
import { useWeatherMenuStore } from "@/store";
import { WeatherNav } from "./weatherNav";
export const SearchButton = () => {
  const { setDisplayMenu, displayMenu } = useWeatherMenuStore();

  return (
    <>
      {displayMenu && <WeatherNav />}
      <button
        className="py-[11px] px-[18px] bg-gray1 text-gray2 button-shadow hover:bg-gray2 hover:text-gray1"
        onClick={() => setDisplayMenu(true)}
      >
        Search for places
      </button>
    </>
  );
};
