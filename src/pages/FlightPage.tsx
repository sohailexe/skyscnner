import PagesHeader from "@/components/PagesHeader";
import { HomeSearchForm } from "@/pages/home/HomeSearchForm";
import headerImg from "@/assets/images/Flights-hero.webp";
import Tips from "@/components/Tips/Tips";
import { flightsTips } from "@/db/tipsdata";
const FlightPage = () => {
  return (
    <main>
      <PagesHeader image={headerImg} heading="Find your Flight">
        <HomeSearchForm />
      </PagesHeader>
      <Tips TipsData={flightsTips} />
    </main>
  );
};

export default FlightPage;
