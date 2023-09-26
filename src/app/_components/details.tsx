"use client";
import { oneDayData, forcastDataType, useWeatherStore } from "@/store";
import { SystemChange } from "./systemChange";
import { getWeatherImage, getWindDirectionText } from "@/utils";
import Image from "next/image";
import { PiNavigationArrowFill } from "react-icons/pi";

import { DetailsSkeleton } from "./skeletons/detailsSkeleton";
const OneDay = ({ date, weather, max, min }: oneDayData) => {
  const { system } = useWeatherStore((state) => state);

  const weatherImage = getWeatherImage(weather);

  return (
    <div className="bg-blue1 flex flex-col items-center w-[120px] h-[177px] py-[18px]">
      <p className="mb-[9px]">{date}</p>

      <div className=" relative w-[54px] h-[62px] mb-8">
        <Image
          src={weatherImage}
          alt={`${weather}`}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex justify-between w-full px-5">
        <span>
          {max?.toFixed(0)}
          {system === "Celcius" ? "°C" : "°F"}
        </span>

        <span className="text-gray3">
          {min?.toFixed(0)}
          {system === "Celcius" ? "°C" : "°F"}
        </span>
      </div>
    </div>
  );
};

export const Details = ({ initialData }: { initialData: forcastDataType }) => {
  const { forcastData, pending } = useWeatherStore();
  const { nextDays, windSpeed, windDeg, humidity, visibility, pressure } =
    forcastData.weather.length > 0 ? forcastData : initialData;
  return (
    <>
      {pending ? (
        <DetailsSkeleton />
      ) : (
        <div className="w-full  md:pr-[60px]">
          <SystemChange />
          <div className="w-full flex flex-wrap pl-[54px] md:pl-[100px] xl:pl-[122px] gap-[26px] md:mt-[66px]  pb-[51px] md:pb[72px] ">
            {nextDays.map((day) => (
              <OneDay key={day.date} {...day} />
            ))}
          </div>
          <div className="pl-6 md:pl-[100px] xl:pl-[122px]">
            <p className="pb-8 text-2xl font-bold">Today’s Hightlights </p>
            <div className="flex gap-8 md:gap-12 flex-wrap ">
              <Wind windDeg={windDeg} windSpeed={windSpeed} />
              <Humidity humidity={humidity} />
              <Visibility visibility={visibility} />
              <Pressure pressure={pressure} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Wind = ({
  windDeg,
  windSpeed,
}: {
  windDeg: number;
  windSpeed: number;
}) => {
  const { system } = useWeatherStore((state) => state);
  const windDegStyle = `rotate-${windDeg}deg`;
  const arrowRotation = {
    transform: `rotate(${45 + windDeg}deg)`,
  };
  return (
    <div className="flex  flex-col items-center text-2xl w-[328px] h-[204px] pt-[22px] bg-blue1">
      <p className="pb-[6px]"> Wind Status</p>

      <div className="flex items-center mb-6">
        <p className="text-[64px] font-bold">{windSpeed.toFixed(0)}</p>
        <p className="text-4xl pt-6 ml-2">
          {system === "Celcius" ? "kph" : "mph"}
        </p>
      </div>

      <div className="flex items-center gap-[9px]">
        <div className="flex items-center justify-center rounded-full w-[21px] h-[21px] relative">
          <div className="rounded-full w-full h-full bg-white opacity-30"></div>
          <PiNavigationArrowFill
            className={`text-xs opacity-100 text-gray2 absolute ${windDegStyle}`}
            style={arrowRotation}
          />
        </div>
        <p className="text-sm">{getWindDirectionText(windDeg)}</p>
      </div>
    </div>
  );
};

const Humidity = ({ humidity }: { humidity: number }) => {
  const humidityBarWidth = `${humidity}%`;

  const humidityBarClass = humidity === 100 ? "bg-yellow1" : "bg-gray2";

  return (
    <div className="flex flex-col items-center text-2xl w-[328px] h-[204px] pt-[22px] bg-blue1">
      <p className="pb-[11px]">Humidity</p>

      <div className="flex items-center mb-3">
        <p className="text-[64px] font-bold">{humidity.toFixed(0)}</p>
        <p className="text-4xl pt-4 font-regular ml-2">%</p>
      </div>

      <>
        <div className="flex text-gray3 text-sm justify-between w-full px-[50px]">
          <p>0</p>
          <p>50</p>
          <p>100</p>
        </div>
        <div className={`w-[229px] h-[8px] rounded-[80px] ${humidityBarClass}`}>
          <div
            style={{ width: humidityBarWidth }}
            className="h-[8px] rounded-xl bg-yellow1"
          />
        </div>
      </>
    </div>
  );
};

const Visibility = ({ visibility }: { visibility: number }) => {
  const { system } = useWeatherStore((state) => state);
  return (
    <div className="flex  flex-col items-center text-2xl w-[328px] h-[159px] pt-[22px] bg-blue1">
      <p className="pb-[6px]">Visibility</p>

      <div className="flex items-center mb-6">
        <p className="text-[64px] font-bold ">
          {(visibility / 1000).toFixed(1)}
        </p>
        <p className="text-4xl  ml-6 pt-4">
          {system === "Celcius" ? "Km" : "miles"}
        </p>
      </div>
    </div>
  );
};

const Pressure = ({ pressure }: { pressure: number }) => {
  const { system } = useWeatherStore((state) => state);
  return (
    <div className="flex  flex-col items-center text-2xl w-[328px] h-[159px] pt-[22px] bg-blue1">
      <p className="pb-[6px]">Air Pressure</p>

      <div className="flex items-center mb-6">
        <p className="text-[64px] font-bold ">{pressure.toFixed(0)}</p>
        <p className="text-4xl  ml-6 pt-4">
          {system === "Celcius" ? "mb" : "inHg"}
        </p>
      </div>
    </div>
  );
};
