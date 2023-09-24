import { TiWeatherPartlySunny } from "react-icons/ti";

import clsx from "clsx";
import { SystemChangeSkeleton } from "./systemChangeSkeleton";
const OneDaySkeleton = () => {
  return (
    <div
      className={clsx(
        "bg-blue1 flex flex-col items-center w-[120px] h-[177px] py-[18px]",
        {
          "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent":
            true,
        }
      )}
    >
      <p className="mb-[9px] bg-gray5 w-[90%] h-5 rounded-xl"></p>

      <div className=" relative w-[54px] h-[62px] mb-8">
        <TiWeatherPartlySunny className="w-full h-full text-gray5" />
      </div>
      <div className="flex justify-between w-full px-5">
        <span className="bg-gray5 w-5 h-5 rounded-sm" />

        <span className="bg-gray5 w-5 h-5 rounded-sm" />
      </div>
    </div>
  );
};

export const DetailsSkeleton = () => {
  const arr = [0, 1, 2, 3, 4];

  return (
    <div className="w-full  md:pr-[60px]">
      <SystemChangeSkeleton />
      <div className="w-full flex flex-wrap pl-[54px] md:pl-[100px] xl:pl-[122px] gap-[26px] md:mt-[66px]  pb-[51px] md:pb[72px] ">
        {arr.map((day) => (
          <OneDaySkeleton key={day} />
        ))}
      </div>
      <div className="pl-6 md:pl-[100px] xl:pl-[122px]">
        <p className="pb-8 text-2xl font-bold">Today’s Hightlights </p>
        <div className="flex gap-8 md:gap-12 flex-wrap ">
          <WindSkeleton />
          <HumiditySkeleton />
          <VisibilitySkeleton />
          <PressureSkeleton />
        </div>
      </div>
    </div>
  );
};

const WindSkeleton = () => {
  return (
    <div
      className={clsx(
        "flex  flex-col items-center text-2xl w-[328px] h-[204px] pt-[22px] bg-blue1",
        {
          "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent":
            true,
        }
      )}
    >
      <p className="pb-[6px]"> Wind Status</p>

      <div className="flex items-center mb-6 w-20 h-16 bg-gray5 rounded-xl"></div>

      <div className="w-10 h-5 bg-gray5 rounded-xl"></div>
    </div>
  );
};

const HumiditySkeleton = () => {
  return (
    <div
      className={clsx(
        "flex flex-col items-center text-2xl w-[328px] h-[204px] pt-[22px] bg-blue1",
        {
          "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent":
            true,
        }
      )}
    >
      <p className="pb-[11px]">Humidity</p>

      <div className="flex items-center mb-5 w-20 h-16 bg-gray5 rounded-xl"></div>

      <div className="w-[229px] h-4 rounded-[80px] bg-gray5"></div>
    </div>
  );
};

const VisibilitySkeleton = () => {
  return (
    <div
      className={clsx(
        "flex  flex-col items-center text-2xl w-[328px] h-[159px] pt-[22px] bg-blue1",
        {
          "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent":
            true,
        }
      )}
    >
      <p className="pb-[6px]">Visibility</p>

      <div className="w-20 h-16 rounded-xl bg-gray5"></div>
    </div>
  );
};

const PressureSkeleton = () => {
  return (
    <div
      className={clsx(
        "flex  flex-col items-center text-2xl w-[328px] h-[159px] pt-[22px] bg-blue1",
        {
          "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent":
            true,
        }
      )}
    >
      <p className="pb-[6px]">Air Pressure</p>

      <div className="w-20 h-16 rounded-xl bg-gray5"></div>
    </div>
  );
};
