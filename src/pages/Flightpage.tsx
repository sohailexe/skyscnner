import ServiceOptionBar from "@/components/service-options/service-option-bar";
import FlightHeader from "@/flight/Header/Flight-Header";
import FlightHero from "@/flight/Hero/Flight-Hero";
const Flightpage = () => {
  return (
    <div>
      <FlightHeader />
      <ServiceOptionBar />
      <FlightHero />
    </div>
  );
};

export default Flightpage;
