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
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const FlightDealList = () => {
  return (
    <section className="maxScreen flex flex-col pb-20">
      <h1 className="text-2xl font-bold">Flight Deals from Pakistan</h1>
      <p className="text-sm mb-5">
        List of flight deals will be displayed here.
      </p>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }, (_, idx) => (
          <motion.li
            key={idx}
            custom={idx}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="transition-all duration-300"
          >
            <Card className="py-0 gap-2 hover:shadow-2xl transition-all duration-300">
              <img
                src={FlightImg}
                alt="Flight Deal"
                className="w-full h-28 object-cover rounded-t-lg"
              />
              <CardHeader className="gap-0">
                <CardTitle className="text-xl">Quetta</CardTitle>
                <CardDescription className="text-xs">Pakistan</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {[1, 2].map((_, i) => (
                  <div
                    className="flex items-center gap-2 justify-between"
                    key={i}
                  >
                    <div className="flex items-center gap-3">
                      <img src={Piaimg} alt="" className="w-7" />
                      <div>
                        <p className="font-bold">Tue, 29 Apr</p>
                        <p className="text-xs text-gray-600">
                          KHI - UET with PIA
                        </p>
                      </div>
                    </div>
                    <span className="font-bold">Direct</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="justify-end py-3 flex items-end">
                <p className="text-light-blue flex items-center gap-1">
                  from Rs29,241 <ArrowRight />
                </p>
              </CardFooter>
            </Card>
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default FlightDealList;
