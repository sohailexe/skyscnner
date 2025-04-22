import MainLayout from "./MainLayout";
import HomePage from "./pages/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hotelpage from "./pages/Hotelpage";
import FlightPage from "./pages/FlightPage";
import CarsPage from "./pages/CarsPage";
const App = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flights" element={<FlightPage />} />
          <Route path="/hotels" element={<Hotelpage />} />
          <Route path="/cars" element={<CarsPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
