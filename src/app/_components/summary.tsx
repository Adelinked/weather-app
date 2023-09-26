"use client";
import Image from "next/image";
import { BsDot } from "react-icons/bs";

import { MdLocationOn } from "react-icons/md";
import { type cityData, useCitiesStore, useWeatherStore } from "@/store";
import { useEffect } from "react";
import { getWeatherImage } from "@/utils";
import { SummarySkeleton } from "./skeletons/summarySkeleton";
let localCities: cityData[] = [];

export const Summary = ({ initialData }: { initialData: any }) => {
  const { cities, setCities } = useCitiesStore();
  const { forcastData, system, city, pending } = useWeatherStore();
  useEffect(() => {
    localCities = JSON.parse(localStorage.getItem("cities") || "[]");
    if (cities.length === 0) {
      setCities([
        { name: "New York", lat: 40.7127281, lon: -74.0060152 },
        ...localCities,
      ]);
    }
  }, []);

  const { weather, temp, todayDate, city2 } =
    forcastData?.weather.length > 0 ? forcastData : initialData;

  const weatherImage = getWeatherImage(weather);
  return (
    <div>
      {pending ? (
        <SummarySkeleton />
      ) : (
        <div className="bg-blue1 flex flex-col items-center pb-[105px] md:pb-[52px]">
          <div className="main-bg w-full h-[350px] mt-4 flex items-center justify-center">
            <div className="relative w-[150px] h-[174px] md:w-[202px] md:h-[234px]">
              <Image
                src={weatherImage}
                alt={`${weather} image`}
                defaultValue="/HeavyCloud.png"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </div>
          <div className="flex items-center">
            <p className="text-[144px]">{temp?.toFixed(0)}</p>
            <p className="text-5xl text-gray3 pt-16">
              {system === "Celcius" ? "°C" : "°F"}
            </p>
          </div>

          <p className="text-4xl text-gray3 md:mt-[80px] font-semibold">
            {weather}
          </p>

          <div className="text-gray4 text-lg flex items-center mt-12 md:mt-[80px]">
            <p className="">Today</p>
            <BsDot className="mx-2" />
            <p>{todayDate}</p>
          </div>

          <div className="text-gray4 text-lg font-semibold flex items-center mt-8">
            <MdLocationOn className="text-2xl mx-2 " /> <p>{city || city2}</p>
          </div>
        </div>
      )}
    </div>
  );
};
