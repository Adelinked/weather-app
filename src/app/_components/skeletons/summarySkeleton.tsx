import { TiWeatherPartlySunny } from "react-icons/ti";

import clsx from "clsx";

export const SummarySkeleton = () => {
  return (
    <div className="bg-blue1 flex flex-col items-center pb-[105px] md:pb-[52px] relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent">
      <div className="main-bg w-full h-[350px] mt-4 flex items-center justify-center">
        <div className="relative w-[150px] h-[174px] md:w-[202px] md:h-[234px]">
          <TiWeatherPartlySunny className="w-full h-full text-gray5" />
        </div>
      </div>

      <div className="w-32 h-32 mb-10 bg-gray5 rounded-xl " />

      <p className="w-20 h-10 bg-gray5 rounded-xl mb-10" />

      <div className="w-48 h-6 bg-gray5 rounded-xl mb-10" />

      <div className="w-40 h-6 bg-gray5 rounded-xl" />
    </div>
  );
};
