import MainLayout from "./MainLayout";
import HomePage from "./pages/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hotelpage from "./pages/hotels/main/Hotelpage";
import FlightPage from "./pages/FlightPage";
import CarsPage from "./pages/CarsPage";
import HotelInfoPage from "./pages/hotels/hotel-info-page/hotel-info-page";
const App = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flights" element={<FlightPage />} />
          <Route path="/hotels" element={<Hotelpage />} />
          <Route path="/hotels/:hotelId" element={<HotelInfoPage />} />
          <Route path="/cars" element={<CarsPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
