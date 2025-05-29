import CarSearchResult from "./CarSearchResult"; // Adjust path

import ScrollToTopButton from "./ScrollToTopButton"; // Adjust path

const CarResultsPage = () => {
  return (
    <div className="maxScreen bg-slate-50 min-h-screen mt-30">
      <div className="container mx-auto px-2 sm:px-4 py-8">
        <div className="mb-6 px-2 sm:px-0">
          {" "}
          {/* Added some horizontal padding for this text on small screens */}
          <p className="text-sm text-gray-600">
            Pick up and return your car with the same amount of fuel.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <main className="w-full flex-grow">
            <CarSearchResult />
          </main>
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default CarResultsPage;
