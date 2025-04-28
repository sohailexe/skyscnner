import { useState } from "react";
import Layout from "../Utility/Layout";
import HotelInfoData from "../Utility";
import Rating from "./HeroSectionComponets/Rating";
import Gallery from "./Gallery";
const HeroSection = () => {
  const [HotelInfo, setHotelInfo] = useState(HotelInfoData);

  return (
    <>
      <div className="pt-16 ">
        <Layout>
          {/* // Intoduction */}
          <section className="font-poppins space-y-4 ">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-Main-Heading font-bold">
                  {HotelInfo.hotel_name}
                </h1>
                <p className="text-sm text-zinc-8x00">{HotelInfo.address}</p>
              </div>
              <div>SkyScanner</div>
            </div>

            <div className="flex items-center  gap-2">
              <h1 className="text-zinc-700">
                <span className="text-black text-Main-Heading font-bold">
                  {HotelInfo.rating}
                </span>
                /5
              </h1>

              <Rating
                rating={HotelInfo.rating}
                review_count={HotelInfo.review_count}
              />
            </div>
          </section>
        </Layout>
        <Gallery />
      </div>
    </>
  );
};

export default HeroSection;
