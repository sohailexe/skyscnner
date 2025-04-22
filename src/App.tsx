import MainLayout from "./MainLayout";
import Flightpage from "./pages/Flightpage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hotelpage from "./pages/Hotelpage";
const App = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Flightpage />} />
          <Route path="/hotels" element={<Hotelpage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
