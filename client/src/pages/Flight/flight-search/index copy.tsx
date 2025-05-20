import { useEffect } from "react";
import { motion } from "framer-motion";
import FlightsSidebar from "./FlightsSidebar";
import FlightResultsDisplay from "./FlightResultsDisplay";
import { useFlightStore, FlightSearchPayload } from "@/store/flightStore"; // Import FlightSearchPayload

// Example: This component would be rendered after a user submits a search form.
// The `searchParams` would come from that form or URL.
const FlightResultsPage = ({
  searchParams,
}: {
  searchParams?: FlightSearchPayload;
}) => {
  // Optional: pass searchParams
  const fetchFlights = useFlightStore((state) => state.fetchFlights);
  const hasFetchedOnce = useFlightStore(
    (state) =>
      state.allFetchedFlights.length > 0 ||
      state.error !== null ||
      state.loading
  );

  // This is where you'd get actual search parameters
  // For this standalone example, we use a default or passed in one.
  const defaultDummyPayload: FlightSearchPayload = {
    fromLocation: "JFK",
    toLocation: "LHR",
    departureDate: new Date().toISOString().split("T")[0], // Today
    returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0], // 7 days from today
    userTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    traverlerDetails: { adults: 1, children: [] },
  };

  const currentSearchPayload = searchParams || defaultDummyPayload;

  useEffect(() => {
    // Fetch flights only if not already fetched for this session or if params change
    // For this example, we fetch on mount if `searchParams` are provided, or with dummy.
    // A more robust solution would check if `currentSearchPayload` has changed.
    if (!hasFetchedOnce || searchParams) {
      // Only fetch if we haven't tried, or if specific params are given
      console.log("Fetching flights with payload:", currentSearchPayload);
      fetchFlights(currentSearchPayload).catch((err) => {
        console.error("Error during flight fetch from page:", err);
      });
    }
  }, [fetchFlights, currentSearchPayload, hasFetchedOnce, searchParams]); // Add searchParams to deps if passed

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-slate-100 min-h-screen selection:bg-sky-200 selection:text-sky-900 mt-30"
    >
      <div className="container mx-auto px-2 sm:px-4 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <motion.aside
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15, ease: "circOut" }}
            className="w-full lg:w-[280px] xl:w-[320px] flex-shrink-0"
          >
            <FlightsSidebar />
          </motion.aside>

          <main className="w-full flex-grow min-w-0">
            <FlightResultsDisplay />
          </main>
        </div>
      </div>
    </motion.div>
  );
};

export default FlightResultsPage;

// How to use it in your main App component (e.g., App.tsx for Vite or pages/index.tsx for Next.js)
// import FlightResultsPage from './pages/FlightResultsPage'; // Adjust path
// function App() {
//   // Example: If you have search params from a form or URL
//   // const exampleSearchParams: FlightSearchPayload = {
//   //   fromLocation: "SFO", toLocation: "TYO",
//   //   departureDate: "2024-09-01", returnDate: "2024-09-15",
//   //   userTimezone: "America/Los_Angeles",
//   //   traverlerDetails: { adults: 2, children: [{age: 5}] }
//   // };
//   return (
//     <div>
//       {/* Your Navbar / Header */}
//       <FlightResultsPage /> {/* or <FlightResultsPage searchParams={exampleSearchParams} /> */}
//       {/* Your Footer */}
//     </div>
//   );
// }
// export default App;
