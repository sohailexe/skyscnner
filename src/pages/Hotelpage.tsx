import HotelList from "@/hotels/card-list/Hotels-list";
import FastFacts from "@/hotels/fast-facts/FastFacts";
import HotelBrands from "@/hotels/HotelBrands";
import Tips from "@/components/Tips/Tips";
import FeatureShowcase from "@/components/FeaturesShowcase";
import { hotelTips } from "@/db/tipsdata";
import { hotelFeatures } from "@/db/featuresData";
import PagesHeader from "@/components/PagesHeader";
import headerImg from "@/assets/images/hotelspage-banner.webp";
import HotelSearchBar from "@/hotels/Header/HotelSearchBar";
const Hotelpage = () => {
  return (
    <>
      <PagesHeader image={headerImg} heading="Find your perfect hotel">
        <HotelSearchBar />
      </PagesHeader>
      <Tips TipsData={hotelTips} />
      <HotelBrands />
      <HotelList />
      <FastFacts />
      <FeatureShowcase features={hotelFeatures} />
    </>
  );
};

export default Hotelpage;
