"use client";
import { create } from "zustand";

export interface oneDayData {
  weather: string;
  max: number;
  min: number;
  date: string;
}

export interface forcastDataType {
  city2: string;
  weather: string;
  temp: number;
  pressure: number;
  humidity: number;
  visibility: number;
  windSpeed: number;
  windDeg: number;
  todayDate: string;
  nextDays: oneDayData[];
}

const initialFocast = {
  city2: "",
  weather: "",
  temp: 0,
  pressure: 0,
  humidity: 0,
  visibility: 0,
  windSpeed: 0,
  windDeg: 0,
  todayDate: "",
  nextDays: [],
};

export const useWeatherStore = create<{
  city: string;
  lat: number;
  lon: number;
  system: string;
  setSystem: (system: string) => void;
  setCity: (city: string, lat: number, lon: number) => void;
  forcastData: forcastDataType;
  setForcastData: (forcastData: forcastDataType) => void;
  pending: boolean;
  setPending: (pending: boolean) => void;
  firstRender: boolean;
  setFirstRender: (firstRender: boolean) => void;
}>((set) => ({
  city: "New York",
  lat: 40.7127281,
  lon: -74.0060152,
  system: "Celcius",
  setSystem: (system: string) => set({ system }),
  setCity: (city: string, lat: number, lon: number) => set({ city, lat, lon }),
  forcastData: initialFocast,
  setForcastData: (forcastData: forcastDataType) => set({ forcastData }),
  pending: false,
  setPending: (pending: boolean) => set({ pending }),
  firstRender: true,
  setFirstRender: (firstRender: boolean) => set({ firstRender }),
}));

export interface cityData {
  name: string;
  lat: number;
  lon: number;
}

export const useWeatherMenuStore = create<{
  displayMenu: boolean;
  setDisplayMenu: (displayMenu: boolean) => void;
}>((set) => ({
  displayMenu: false,
  setDisplayMenu: (displayMenu: boolean) => set({ displayMenu }),
}));

export const useCitiesStore = create<{
  cities: cityData[];
  setCities: (cities: cityData[]) => void;
  addCity: (city: cityData) => void;
}>((set) => ({
  cities: [],
  setCities: (cities: cityData[]) => set({ cities }),
  addCity: (city: cityData) =>
    set((state) => {
      const cities = [...state.cities, city];
      return { cities };
    }),
}));
