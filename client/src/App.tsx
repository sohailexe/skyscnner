import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/home/main";
import HotelPage from "./pages/hotels/main";
import FlightPage from "./pages/Flight/main";
import CarsPage from "./pages/cars/main";
import HotelInfoPage from "./pages/hotels/hotel-info-page";
import FlightResult from "./pages/Flight/flight-search";
import Login from "./auth/Login";
import Register from "./auth/Register"; // Ensure this exists
import AuthLayout from "./layouts/AuthLayout";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Main App Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="flights" element={<FlightPage />} />
          <Route path="flight/search" element={<FlightResult />} />
          <Route path="hotels" element={<HotelPage />} />
          <Route path="hotels/:hotelId" element={<HotelInfoPage />} />
          <Route path="cars" element={<CarsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
