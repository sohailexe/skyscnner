import HotelList from "@/hotels/card-list/Hotels-list";
import FastFacts from "@/hotels/fast-facts/FastFacts";
import HotelsHeader from "@/hotels/Header/Hotels-Header";
import HotelBrands from "@/hotels/hotel-brands/HotelBrands";
import HotelTips from "@/hotels/hotel-tips/HotelTips";

const Hotelpage = () => {
  return (
    <>
      <HotelsHeader />
      <HotelTips />
      <HotelBrands />
      <FastFacts />
      <HotelList />
    </>
  );
};

export default Hotelpage;
