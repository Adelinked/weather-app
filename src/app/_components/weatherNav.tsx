"use client";
import { useWeatherStore, useCitiesStore, useWeatherMenuStore } from "@/store";
import { BiSearchAlt2 } from "react-icons/bi";
import { LiaTimesSolid } from "react-icons/lia";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useState, useRef } from "react";
import Spinner from "./spinner";
import { getInterestingData, getWeatherData } from "@/utils";

export const WeatherNav = () => {
  const {
    setCity,
    pending,
    firstRender,
    setFirstRender,
    setPending,
    setForcastData,
    system,
  } = useWeatherStore();
  const { displayMenu, setDisplayMenu } = useWeatherMenuStore();
  const { addCity, cities } = useCitiesStore();

  const localCityRef = useRef("");
  const weatherNavRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState("");
  const closeMenu = () => {
    const menuNav = weatherNavRef.current;
    if (menuNav) {
      menuNav.classList.add("animate-slide-out-left");
      menuNav.onanimationend = () => {
        setDisplayMenu(false);
      };
    }
  };
  return (
    <div
      className={`fixed z-[10] top-0  md:w-[40%] lg:w-[30%] select-none bg-blue1 px-3 md:px-[46px] h-[672px] md:h-[1023px]   ${
        displayMenu ? "animate-slide-in-left left-0" : ""
      }  `}
      ref={weatherNavRef}
    >
      <div className="w-full flex justify-end pt-3 ">
        <LiaTimesSolid
          className="w-6 h-6 md:w-8 md:h-8 text-white cursor-pointer mr-1"
          onClick={closeMenu}
        />
      </div>
      <div className="flex items-center mt-6 md:mt-[38px]   w-full ">
        <div className="flex items-center w-full border-[1px] border-gray2 py-3 pl-3 ">
          <BiSearchAlt2 className="w-6 h-6 text-gray5 " />
          <input
            className="w-full text-gray5 bg-blue1 mx-3 outline-none"
            type="text"
            placeholder="search location"
            onChange={(e) => {
              localCityRef.current = e.target.value;
              if (error.length > 0) setError("");
            }}
          />
        </div>
        <button
          className="flex items-center justify-center bg-blue4 w-24 h-[52px] hover:text-blue4 hover:bg-gray2 disabled:bg-gray5 disabled:text-gray2 disabled:cursor-not-allowed"
          disabled={pending}
          onClick={async () => {
            if (
              cities.filter(
                (city) =>
                  city.name.toLowerCase() === localCityRef.current.toLowerCase()
              ).length > 0
            ) {
              setError("City already exists");
              return;
            }
            try {
              setPending(true);
              const data = await fetch(
                "/api/getCityPosition?city=" + localCityRef.current
              ).then((res) => res.json());
              if (data) {
                setError("");
                if (firstRender) setFirstRender(false);
                setCity(data[0].name, data[0].lat, data[0].lon);
                if (
                  cities.filter(
                    (city) =>
                      city.name.toLowerCase() === data[0].name.toLowerCase()
                  ).length > 0
                ) {
                  setError("City already exists - " + data[0].name);
                  return;
                }
                addCity(data[0]);
                const localCities = JSON.parse(
                  localStorage.getItem("cities") || "[]"
                );
                localCities.push(data[0]);
                localStorage.setItem("cities", JSON.stringify(localCities));
              }
            } catch (e) {
              setError("Can't find city");
              console.error("Error fetching data:", e);
            } finally {
              setPending(false);
            }
          }}
        >
          {pending ? <Spinner width={30} height={30} /> : <span>Search</span>}
        </button>
      </div>
      <div className="w-full h-[38px] md:mb-[20px] text-red-600 font-semibold">
        {error}
      </div>
      <div className="w-full max-h-96  overflow-y-auto">
        {cities.map((c) => (
          <div
            key={c.name}
            className="flex justify-between items-center pl-3 pr-[10px] md:pr-[8px] py-[22px] mb-[22px] group cursor-pointer border-[1px] border-blue1 hover:border-gray5  overflow-y-auto"
            onClick={async () => {
              if (firstRender) setFirstRender(false);
              setPending(true);
              setCity(c.name, c.lat, c.lon);
              try {
                const res = await getWeatherData(c.lat, c.lon, system);
                const data = await res.json();
                if (data?.current?.temp)
                  setForcastData(getInterestingData(data));
              } catch (error) {
                throw new Error("Error fetching data");
              } finally {
                setPending(false);
              }

              localCityRef.current = "";
              setDisplayMenu(false);
            }}
          >
            <span>{c.name}</span>
            <MdKeyboardArrowRight className="w-6 h-6 text-gray5 hidden  group-hover:block" />
          </div>
        ))}
      </div>
    </div>
  );
};
