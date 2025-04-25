import PagesHeader from "@/components/PagesHeader";
import headerImg from "@/assets/images/Flights-hero.webp";
import CarSearchForm from "./cars/Car-search-form/car-search-form";
import { carTips } from "@/db/tipsdata";
import Tips from "@/components/Tips/Tips";

const CarsPage = () => {
  return (
    <div>
      <PagesHeader image={headerImg} heading="Find your Car">
        <CarSearchForm />
      </PagesHeader>
      <Tips TipsData={carTips} />
    </div>
  );
};

export default CarsPage;
