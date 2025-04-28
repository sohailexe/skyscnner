import HeroSection from "./HeroSection/HeroSection";
import SubNavBar from "./NavBar/SubNavBar";
import RoomAndPrices from "./sections/RoomAndPrices";
import Amenities from "./sections/Amenities";
import RatingAndReviews from "./sections/ReviewsAndRating/RatingAndReviews";
import ExploreTheArea from "./sections/Explore the area/ExploreTheArea";
const Index = () => {
  return (
    <>
      <HeroSection />
      <SubNavBar />
      <div className="py-10 space-y-10">
        {/* <RoomAndPrices /> */}
        {/* <Amenities /> */}
        <RatingAndReviews />
        <ExploreTheArea />
      </div>
    </>
  );
};

export default Index;
