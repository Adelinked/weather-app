import { IoMdLocate } from "react-icons/io";

export const LocationSetterSkeleton = () => {
  return (
    <div
      className={`text-gray2 cursor-pointer w-10 h-10 rounded-full localisation-filter bg-gray1  flex items-center justify-center text-2xl`}
    >
      <IoMdLocate />
    </div>
  );
};
