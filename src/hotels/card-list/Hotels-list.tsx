import React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle as faSolidCircle,
  faCircleHalfStroke,
  faStar,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle as faRegularCircle } from "@fortawesome/free-regular-svg-icons";
import { BookAIcon } from "lucide-react";
import hotelList from "@/db/Hotels";

interface StarListProps {
  stars: number;
}

const StarList: React.FC<StarListProps> = ({ stars }) => {
  const fullStars = Math.floor(stars);
  const hasHalfStar = stars % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: fullStars }, (_, idx) => (
        <FontAwesomeIcon
          key={`full-${idx}`}
          icon={faStar}
          className="w-4 h-4 text-orange-500"
        />
      ))}

      {hasHalfStar && (
        <FontAwesomeIcon
          icon={faStarHalfStroke}
          className="w-4 h-4 text-orange-500"
        />
      )}

      {Array.from({ length: emptyStars }, (_, idx) => (
        <FontAwesomeIcon
          key={`empty-${idx}`}
          icon={faStar}
          className="w-4 h-4 text-gray-300"
        />
      ))}
    </div>
  );
};

interface CircleListProps {
  circles: number;
}

const CircleList: React.FC<CircleListProps> = ({ circles }) => {
  const total = 5;
  const filled = Math.floor(circles);
  const half = circles % 1 !== 0;
  const empty = total - filled - (half ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: filled }, (_, idx) => (
        <FontAwesomeIcon
          key={`filled-${idx}`}
          icon={faSolidCircle}
          className="size-3 text-green-500"
        />
      ))}

      {half && (
        <FontAwesomeIcon
          icon={faCircleHalfStroke}
          className="size-3 text-green-500"
        />
      )}

      {Array.from({ length: empty }, (_, idx) => (
        <FontAwesomeIcon
          key={`empty-${idx}`}
          icon={faRegularCircle}
          className="size-3 text-gray-300"
        />
      ))}
    </div>
  );
};

const HotelList: React.FC = () => (
  <section className="maxScreen py-8">
    <h1 className="text-4xl font-bold pb-3">Explore the best hotels</h1>
    <p className="pb-5">
      Discover a wide range of hotels tailored to your needs.
    </p>

    <Carousel className="w-full">
      <CarouselContent>
        {hotelList.map((hotel, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <Card className="py-0 gap-3">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-28 object-cover rounded-t-lg"
              />

              <CardHeader>
                <CardTitle className="text-2xl">{hotel.name}</CardTitle>
                <CardDescription className="text-sm">
                  {hotel.location}
                </CardDescription>
                <CardAction>
                  <StarList stars={hotel.star} />
                </CardAction>
              </CardHeader>

              <div className="flex items-center px-5 gap-2">
                <span className="font-bold">{hotel.rating}</span>
                <BookAIcon className="w-4 h-4" />
                <CircleList circles={2.4} />
                <span className="text-sm font-light">
                  {hotel.review} reviews
                </span>
              </div>

              <hr />

              <CardFooter className="justify-end py-3 flex flex-col items-end">
                <p className="text-3xl font-bold">Rs {hotel.price}</p>
                <p className="text-sm font-light">Per Night</p>
              </CardFooter>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="relative mx-[30%] my-9 ">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  </section>
);

export default HotelList;
