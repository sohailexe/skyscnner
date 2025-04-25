import HotelList from "@/pages/hotels/main/hotel-main-components/card-list/Hotels-list";
import FastFacts from "@/components/fast-facts/FastFacts";
import HotelBrands from "@/pages/hotels/main/hotel-main-components/HotelBrands";
import Tips from "@/components/Tips/Tips";
import FeatureShowcase from "@/components/FeaturesShowcase";
import { hotelTips } from "@/db/tipsdata";
import { hotelFeatures } from "@/db/featuresData";
import PagesHeader from "@/components/PagesHeader";
import headerImg from "@/assets/images/hotelspage-banner.webp";
import HotelSearchBar from "@/pages/hotels/main/hotel-main-components/HotelSearchBar";
import { hotelFacts } from "@/db/facts";
const Hotelpage = () => {
  return (
    <>
      <PagesHeader image={headerImg} heading="Find your perfect hotel">
        <HotelSearchBar />
      </PagesHeader>
      <Tips TipsData={hotelTips} />
      <HotelBrands />
      <HotelList />
      <FastFacts
        heading="Fast facts"
        description="Sleep easy, armed with the stuff that's good to know before you go."
        dateList={hotelFacts}
      />
      <FeatureShowcase features={hotelFeatures} />
    </>
  );
};

export default Hotelpage;
