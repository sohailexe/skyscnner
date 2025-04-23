import HotelList from "@/pages/hotels/card-list/Hotels-list";
import FastFacts from "@/pages/hotels/fast-facts/FastFacts";
import HotelBrands from "@/pages/hotels/HotelBrands";
import Tips from "@/components/Tips/Tips";
import FeatureShowcase from "@/components/FeaturesShowcase";
import { hotelTips } from "@/db/tipsdata";
import { hotelFeatures } from "@/db/featuresData";
import PagesHeader from "@/components/PagesHeader";
import headerImg from "@/assets/images/hotelspage-banner.webp";
import HotelSearchBar from "@/pages/hotels/HotelSearchBar";
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
