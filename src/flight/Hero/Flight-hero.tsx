import { FlightSearchForm } from "./FlightSearchForm";

const FlightHero = () => {
  return (
    <div className="bg-dark-blue text-white pt-2">
      <div className="maxScreen">
        <h1 className="text-3xl font-bold mb-7">
          Millions of cheap flights. One simple search.
        </h1>

        <a href="#" className="hover:text-white/60 font-bold">
          Create a multi-city route
        </a>
        <FlightSearchForm />
      </div>
    </div>
  );
};

export default FlightHero;
