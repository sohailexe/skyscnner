import { Link } from "react-router-dom";
import { FaUsers, FaEdit, FaCarSide, FaHotel } from "react-icons/fa";

function AdminDashboard() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <header className="mb-10 text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            SkyScanner
          </span>
        </h1>
        <p className="mt-2 text-lg sm:text-xl text-gray-400">
          Admin Control Panel
        </p>
      </header>

      <div className="w-full max-w-6xl bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 md:p-10 border border-gray-700">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-300 mb-2">
            Welcome, Admin!
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            Take control of your system with ease — view, manage, and update all
            essential data points.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-700 rounded-lg p-6 shadow-lg flex flex-col items-center justify-center text-center">
            <FaUsers className="text-blue-400 text-3xl mb-3" />
            <h3 className="text-xl font-semibold text-gray-200 mb-2">
              User Stats
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Explore user engagement, signups, and behavior.
            </p>
            <Link
              to="user-details"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-md transition duration-300"
            >
              View Users
            </Link>
          </div>

          <div className="bg-gray-700 rounded-lg p-6 shadow-lg flex flex-col items-center justify-center text-center">
            <FaEdit className="text-green-400 text-3xl mb-3" />
            <h3 className="text-xl font-semibold text-gray-200 mb-2">
              Flight Management
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Update flights, schedules, and promo offers.
            </p>
            <Link
              to="flight-search"
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-5 rounded-md transition duration-300"
            >
              Explore Flights Search
            </Link>
          </div>

          <div className="bg-gray-700 rounded-lg p-6 shadow-lg flex flex-col items-center justify-center text-center">
            <FaHotel className="text-yellow-400 text-3xl mb-3" />
            <h3 className="text-xl font-semibold text-gray-200 mb-2">
              Hotel Listings
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Add or update hotel availability and info.
            </p>
            <Link
              to="hotel-search"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-5 rounded-md transition duration-300"
            >
              Explore Hotels Search
            </Link>
          </div>

          <div className="bg-gray-700 rounded-lg p-6 shadow-lg flex flex-col items-center justify-center text-center">
            <FaCarSide className="text-red-400 text-3xl mb-3" />
            <h3 className="text-xl font-semibold text-gray-200 mb-2">
              Car Rentals
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Maintain rental listings and bookings.
            </p>
            <Link
              to="car-search"
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-5 rounded-md transition duration-300"
            >
              Explore Cars Search
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
