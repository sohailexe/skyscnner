import ServiceOptionBar from "@/components/service-options/service-option-bar";
import HomeHeader from "@/home/Header/Home-Header";
import FlightHero from "@/home/Hero/Home-Hero";
const HomePage = () => {
  return (
    <div>
      <HomeHeader />
      <ServiceOptionBar />
      <FlightHero />
    </div>
  );
};

export default HomePage;
