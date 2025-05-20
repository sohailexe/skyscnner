import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plane, Clock } from "lucide-react";
import { FlightResult } from "@/store/flightStore";
import { useAirports } from "@/store/useAirports";

interface FlightCardProps {
  flight: FlightResult;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -15,
    scale: 0.95,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  const getAiportByIata = useAirports((state) => state.getAiportByIata);
  return (
    <motion.div
      variants={cardVariants}
      layout // Smoothly animates layout changes (e.g. when list reorders)
      // No need for initial, animate, exit here if parent AnimatePresence handles it via variants
    >
      <Card className="border border-slate-200 hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden group bg-white">
        <CardContent className="flex flex-col sm:flex-row justify-between items-stretch p-4 sm:p-5 gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-sky-700 font-semibold bg-sky-100 px-2.5 py-1 rounded-md">
                {flight.airline}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {flight.cabinClass}
              </span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <div className="text-center sm:text-left">
                <div className="text-lg font-bold text-slate-800">
                  {flight.departureTime}
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-wide">
                  {getAiportByIata(flight.from)?.city}
                </div>
              </div>
              <div className="flex flex-col items-center flex-shrink-0 text-slate-500 mx-1 sm:mx-2 group-hover:text-sky-600 transition-colors">
                <Plane className="h-4 w-4 transform group-hover:-rotate-12 transition-transform duration-300" />
                <div className="text-[0.65rem] sm:text-xs mt-0.5 whitespace-nowrap">
                  {flight.totalDuration}
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-lg font-bold text-slate-800">
                  {flight.arrivalTime}
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-wide">
                  {getAiportByIata(flight.to)?.city}
                </div>
              </div>
            </div>
            <div className="text-xs text-slate-500 border-t border-slate-200 pt-2.5 mt-2.5 flex items-center gap-1.5">
              <Clock size={14} className="flex-shrink-0 text-slate-400" />
              <span>
                {flight.numberOfStops === 0
                  ? "Direct Flight"
                  : `${flight.numberOfStops} stop${
                      flight.numberOfStops > 1 ? "s" : ""
                    }`}
              </span>
            </div>
          </div>

          <div className="sm:border-l sm:border-slate-200 sm:pl-4 lg:pl-5 flex flex-col items-center sm:items-end justify-between gap-3 w-full sm:w-auto sm:min-w-[140px] mt-3 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-200">
            <div className="text-center sm:text-right">
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {flight.totalPrice}
                <span className="text-sm font-semibold ml-1">
                  {flight.currency}
                </span>
              </div>
              <div className="text-xs text-slate-500">Total price</div>{" "}
              {/* Simpler label */}
            </div>
            <Button
              size="lg"
              className="bg-sky-600 hover:bg-sky-700 text-white w-full text-sm font-semibold rounded-md transition-all duration-200 hover:shadow-md active:scale-95 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              // onClick={() => alert(`Booking flight ${flight.id}`)} // Example action
            >
              Select Flight{" "}
              <ArrowRight
                size={16}
                className="ml-1.5 group-hover:translate-x-0.5 transition-transform"
              />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
export default FlightCard;
