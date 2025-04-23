import HotelList from "@/hotels/card-list/Hotels-list";
import FastFacts from "@/hotels/fast-facts/FastFacts";
import HotelsHeader from "@/hotels/Header/Hotels-Header";
import HotelBrands from "@/hotels/HotelBrands";
import HotelTips from "@/hotels/hotel-tips/HotelTips";
import HotelFeatureShowcase from "@/hotels/HotelFeatureShowcase";

const Hotelpage = () => {
  return (
    <>
      <HotelsHeader />
      <HotelTips />
      <HotelBrands />
      <HotelList />
      <FastFacts />
      <HotelFeatureShowcase />
    </>
  );
};

export default Hotelpage;
