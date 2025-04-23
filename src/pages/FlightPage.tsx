import PagesHeader from "@/components/PagesHeader";
import { HomeSearchForm } from "@/pages/home/HomeSearchForm";
import headerImg from "@/assets/images/Flights-hero.webp";
import Tips from "@/components/Tips/Tips";
import { flightsTips } from "@/db/tipsdata";
import FlightDealList from "./Flight/Flight-deals/flight-deals-list";
import FeatureShowcase from "@/components/FeaturesShowcase";
import { flightFeatures } from "@/db/featuresData";
const FlightPage = () => {
  return (
    <main>
      <PagesHeader image={headerImg} heading="Find your Flight">
        <HomeSearchForm />
      </PagesHeader>
      <Tips TipsData={flightsTips} />
      <FlightDealList />
      <FeatureShowcase
        heading="Looking for the best flight deals to anywhere in the world?"
        description="It's easy around here. 100 million travellers use us as their go-to tool, comparing flight deals and offers from more than 1,200 airlines and travel providers. With so many options to choose from in one place, you can say hello to savings, and goodbye to stress  here's how."
        features={flightFeatures}
      />
    </main>
  );
};

export default FlightPage;
