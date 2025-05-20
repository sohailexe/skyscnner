import FlightSidebar from "./sidebar/flight-sidebar";
import FlightResultsDisplay from "./FlightResultsDisplay";
const FlightSearchResult = () => {
  return (
    <div className="flex flex-col md:flex-row mt-30 px-6 gap-3  justify-center">
      <div className="md:w-1/4 h-full bg-light-blue/10 rounded-lg flex w-full">
        <FlightSidebar />
      </div>
      <div className="md:w-3/4  container ">
        <FlightResultsDisplay />
      </div>
    </div>
  );
};

export default FlightSearchResult;
