import { NextResponse } from "next/server";

const apiKey = process.env.OPENWEAHER_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");

  try {
    const data = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
    ).then((res) => res.json());
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: e });
  }
}
