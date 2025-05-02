import React from "react";
import {
  Card,
  CardHeader,
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
import Autoplay from "embla-carousel-autoplay";
import carList from "@/data/Hotels";

const CarRentalDestination: React.FC = () => (
  <section className="maxScreen py-8">
    <Carousel
      className="w-full flex flex-col"
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold pb-3">
          Popular car rental destinations
        </h1>

        <div className="relative mx-12  w-3">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>

      <CarouselContent>
        {carList.map((car, index) => (
          <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3">
            <Card className="py-0 gap-3">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-40 object-cover rounded-t-lg"
              />

              <CardHeader className="pb-5 gap-0">
                <CardTitle className="text-2xl ">Car Hire in Dubi</CardTitle>
                <CardDescription className="text-sm">
                  <span>Most Popular car type:</span> Econnemy
                </CardDescription>
                <CardAction>
                  <div className="flex flex-col gap-0 justify-start items-end">
                    <span className="text-xs font-light text-gray-600">
                      From
                    </span>
                    <span className="text-xl font-bold ">Rs5122</span>
                    <span className="text-xs font-light text-gray-600">
                      per day
                    </span>
                  </div>
                </CardAction>
              </CardHeader>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  </section>
);

export default CarRentalDestination;
