import HotelList from "@/hotels/card-list/Hotels-list";
import FastFacts from "@/hotels/fast-facts/FastFacts";
import HotelsHeader from "@/hotels/Header/Hotels-Header";
import HotelBrands from "@/hotels/HotelBrands";
import Tips from "@/components/Tips/Tips";
import FeatureShowcase from "@/components/Tips/FeaturesShowcase";
import { hotelTips } from "@/db/tipsdata";
import { hotelFeatures } from "@/db/featuresData";

const Hotelpage = () => {
  return (
    <>
      <HotelsHeader />
      <Tips TipsData={hotelTips} />
      <HotelBrands />
      <HotelList />
      <FastFacts />
      <FeatureShowcase
        features={hotelFeatures}
        heading="Hello"
        description="aksjhdvcagshdbhaiysucgd hgas dajsud as dh ajsd  asdgas"
      />
    </>
  );
};

export default Hotelpage;
