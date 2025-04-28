import React from "react";
import Layout from "../../Utility/Layout";
import ReviewAndRating from "../index";
import Rating from "../../HeroSection/HeroSectionComponets/Rating";
import Reviews from "./Reviews";

const TravelerReview = () => {
  return (
    <>
      <div>TravelerReview</div>
    </>
  );
};

const RatingAndReviews = () => {
  console.log(ReviewAndRating);
  return (
    <>
      <Layout>
        <section id="ratings-reviews">
          <div className="py-10 ">
            <h1 className="text-Sub-Heading font-semibold">
              Ratings and reviews
            </h1>

            <div className="flex pt-6 pb-12 gap-10">
              <div className="flex items-center gap-3 w-[20%]">
                <h1 className="text-zinc-700">
                  <span className="text-black text-Main-Heading font-bold">
                    {ReviewAndRating.rating}
                  </span>
                  /5
                </h1>
                <Rating HotelInfo={ReviewAndRating} />
              </div>
              <div className="w-[80%]">
                <Reviews categories={ReviewAndRating.categories} />
              </div>
            </div>

            <TravelerReview />
          </div>
        </section>
      </Layout>
    </>
  );
};

export default RatingAndReviews;
