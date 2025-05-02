import PagesHeader from "@/components/PagesHeader";
import carBg from "@/assets/images/car-bg.jpg";
import CarSearchForm from "./Car-search-form/car-search-form";
import { carTips } from "@/db/tipsdata";
import Tips from "@/components/Tips/Tips";
import CarRentalDestination from "./car-rental-destinations";
import FeatureShowcase from "@/components/FeaturesShowcase";
import { carFeatures } from "@/db/featuresData";
import { carFacts } from "@/db/facts";
import FastFacts from "@/components/fast-facts/FastFacts";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const CarsPage = () => {
  return (
    <div>
      <PagesHeader image={carBg} heading="Find your Car">
        <CarSearchForm />
      </PagesHeader>
      <Breadcrumb className="maxScreen mt-6 text-2xl">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>Car</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Tips TipsData={carTips} />
      <CarRentalDestination />
      <FeatureShowcase
        features={carFeatures}
        heading="Booking car hire in three simple steps"
      />
      <FastFacts
        heading="Car hire fast facts"
        description="Everything you need to know to hit the road happy. "
        dateList={carFacts}
      />
    </div>
  );
};

export default CarsPage;
