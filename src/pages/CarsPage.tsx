import PagesHeader from "@/components/PagesHeader";
import headerImg from "@/assets/images/Flights-hero.webp";
import CarSearchForm from "./cars/Car-search-form/car-search-form";
import { carTips } from "@/db/tipsdata";
import Tips from "@/components/Tips/Tips";
import CarRentalDestination from "./cars/car-rental-destinations";
import FeatureShowcase from "@/components/FeaturesShowcase";
import { carFeatures } from "@/db/featuresData";

const CarsPage = () => {
  return (
    <div>
      <PagesHeader image={headerImg} heading="Find your Car">
        <CarSearchForm />
      </PagesHeader>
      <Tips TipsData={carTips} />
      <CarRentalDestination />
      <FeatureShowcase
        features={carFeatures}
        heading="Booking car hire in three simple steps"
      />
    </div>
  );
};

export default CarsPage;
