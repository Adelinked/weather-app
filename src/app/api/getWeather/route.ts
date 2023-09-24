import { NextResponse } from "next/server";

const apiKey = process.env.OPENWEAHER_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const system = searchParams.get("system");
  try {
    const forcastData = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=${
        system == "Fahrenheit" ? "imperial" : "metric"
      }&appid=${apiKey}`
    ).then((res) => res.json());
    return NextResponse.json(forcastData);
  } catch (e) {
    return NextResponse.json({ error: e });
  }
}
