import clsx from "clsx";
import { TiWeatherPartlySunny } from "react-icons/ti";
const WeatherIcon = () => (
  <div className="w-full h-full relative flex flex-col items-center justify-center ">
    <TiWeatherPartlySunny className="h-24 w-24 text-gray-700 " />
  </div>
);
export const SkeletonCard = ({ isLoading }: { isLoading?: boolean }) => (
  <div
    className={clsx("rounded-2xl bg-gray-900/80 p-4", {
      "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent":
        isLoading,
    })}
  >
    <div className="space-y-3 w-[250px] ">
      <WeatherIcon />

      <div className="h-14 rounded-lg bg-gray-700" />
      <div className="h-3 w-11/12 rounded-lg bg-gray-700" />
      <div className="h-3 w-8/12 rounded-lg bg-gray-700" />
      <div className="h-4 w-full bg-blue2"></div>
    </div>
  </div>
);
