import hotelsBackground from "@/assets/images/hotelspage-banner.webp";
import HotelSearchBar from "./HotelSearchBar";
const HotelsHeader = () => {
  return (
    <section className="  relative  h-[550px] overflow-hidden ">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${hotelsBackground})`,
          backgroundPosition: "center",
        }}
      />

      {/* Optional Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-20" />

      {/* Content positioning */}
      <div className="maxScreen absolute inset-0 flex  text-white">
        <div className=" py-32 flex flex-col justify-center items-center w-full ">
          <h1 className="font-extrabold text-6xl pb-5 ">
            Find the right hotel today
          </h1>
          <HotelSearchBar />
        </div>
      </div>
    </section>
  );
};

export default HotelsHeader;
