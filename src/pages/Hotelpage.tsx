import HotelList from "@/hotels/card-list/Hotels-list";
import HotelsHeader from "@/hotels/Header/Hotels-Header";
import HotelBrands from "@/hotels/hotel-brands/HotelBrands";
import HotelTips from "@/hotels/hotel-tips/HotelTips";

const Hotelpage = () => {
  return (
    <>
      <HotelsHeader />
      <HotelTips />
      <HotelBrands />
      <HotelList />
    </>
  );
};

export default Hotelpage;
