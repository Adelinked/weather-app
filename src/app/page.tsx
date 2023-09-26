import { Summary } from "./_components/summary";
import { getInterestingData, testData } from "@/utils";
import { LocationSetter } from "./_components/locationSetter";
import { Details } from "./_components/details";
import { Footer } from "./_components/Footer";
import { SearchButton } from "./_components/searchButton";
const apiKey = process.env.OPENWEAHER_API_KEY;
let lat = "40.7127281";
let lon = "-74.0060152";
let interestingData: any;
export default async function Home() {
  const dataSource = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`;
  try {
    const initialData = await fetch(dataSource).then((res) => res.json());

    interestingData = getInterestingData(initialData);
  } catch (e) {
    throw new Error("Error fetching data from openweatherAPI");
  }

  return (
    <main className="w-full min-h-screen flex flex-col md:flex-row  ">
      <div className=" pt-[18px] md:pt-[42px] w-full min-h-[810px] bg-blue1 md:w-[40%] lg:w-[30%]">
        <div className="px-[11px] md:px-[46px] flex items-start justify-between">
          <SearchButton />
          <LocationSetter />
        </div>
        <Summary initialData={interestingData} />
      </div>
      <div className="bg-blue2 md:w-[60%] lg:w-[70%] pt-[52px] md:pt-[42px]">
        <Details initialData={interestingData} />
        <Footer />
      </div>
    </main>
  );
}
