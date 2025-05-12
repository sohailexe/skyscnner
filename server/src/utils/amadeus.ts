import Amadeus from "amadeus";
import { config } from "dotenv";
config();
export const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY!,
  clientSecret: process.env.AMADEUS_API_SECRET!,
});

export const getCityCode = async (city: string) => {
  try {
    const response = await amadeus.referenceData.locations.get({
      keyword: city,
      subType: "CITY",
    });

    const results = response.data.map((item: any) => ({
      cityName: item.address.cityName,
      iataCode: item.iataCode,
      country: item.address.countryName,
    }));

    return results;
  } catch (err: any) {
    console.error("Error fetching city:", err.response?.data || err.message);
    return [];
  }
};
