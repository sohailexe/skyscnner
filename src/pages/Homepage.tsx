import PagesHeader from "@/components/PagesHeader";
import ServiceOptionBar from "@/components/service-options/service-option-bar";
import { HomeSearchForm } from "@/home/HomeSearchForm";
import FlightHero from "@/home/Hero/Home-Hero";
import headerImg from "@/assets/images/hotelspage-banner.webp";

const HomePage = () => {
  return (
    <div>
      <PagesHeader image={headerImg} heading="Find your perfect hotel">
        <HomeSearchForm />
      </PagesHeader>
      <ServiceOptionBar />
      <FlightHero />
    </div>
  );
};

export default HomePage;
