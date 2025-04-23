import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FlightImg from "@/assets/images/FlightCard.webp";
import Piaimg from "@/assets/images/pia.webp";
import { ArrowRight } from "lucide-react";
const FlightDealList = () => {
  return (
    <section className="maxScreen felx flex-col">
      <h1 className="text-2xl font-bold ">Flight Deals</h1>
      <p className="text-sm mb-5">
        List of flight deals will be displayed here.
      </p>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }, (_, idx) => (
          <li key={idx}>
            <Card className="py-0 gap-2 hover:shadow-2xl transition-all duration-300">
              <img
                src={FlightImg}
                alt="Flight Deal"
                className="w-full h-28 object-cover rounded-t-lg"
              />
              <CardHeader className="gap-0">
                <CardTitle className="text-xl">Quetta </CardTitle>
                <CardDescription className="text-xs">Pakistan</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <div className="flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-3">
                    <img src={Piaimg} alt="" className="w-7" />
                    <div>
                      <p className=" font-bold">Tue, 29 Apr</p>
                      <p className="text-xs text-gray-600">
                        KHI - UET with PIA
                      </p>
                    </div>
                  </div>
                  <span className="font-bold">Direct</span>
                </div>
                <div className="flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-3">
                    <img src={Piaimg} alt="" className="w-7" />
                    <div>
                      <p className=" font-bold">Tue, 29 Apr</p>
                      <p className="text-xs text-gray-600">
                        KHI - UET with PIA
                      </p>
                    </div>
                  </div>
                  <span className="font-bold">Direct</span>
                </div>
              </CardContent>

              <CardFooter className="justify-end py-3 flex  items-end">
                <p className="text-light-blue flex items-center gap-1">
                  from Rs29,241 <ArrowRight />
                </p>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FlightDealList;
