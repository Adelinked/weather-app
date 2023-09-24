import { Footer } from "./_components/Footer";
import { DetailsSkeleton } from "./_components/skeletons/detailsSkeleton";
import { LocationSetterSkeleton } from "./_components/skeletons/locationSetterSkeleton";

import { SearchButtonSkeleton } from "./_components/skeletons/searchButtonSkeleton";
import { SummarySkeleton } from "./_components/skeletons/summarySkeleton";

export default function Loading() {
  return (
    <main className="w-full min-h-screen flex flex-col md:flex-row  ">
      <div className=" pt-[18px] md:pt-[42px] w-full min-h-[810px] bg-blue1 md:w-[40%] lg:w-[30%]">
        <div className="px-[11px] md:px-[46px] flex items-start justify-between">
          <SearchButtonSkeleton />
          <LocationSetterSkeleton />
        </div>
        <SummarySkeleton />
      </div>
      <div className="bg-blue2 md:w-[60%] lg:w-[70%] pt-[52px] md:pt-[42px]">
        <DetailsSkeleton />
        <Footer />
      </div>
    </main>
  );
}
