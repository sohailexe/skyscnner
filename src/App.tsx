import MainLayout from "./MainLayout";
import Flightpage from "./pages/Flightpage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hotelpage from "./pages/Hotelpage";
const App = () => {
  return (
    <MainLayout>
      <Router>
        <Routes>
          <Route path="/" element={<Flightpage />} />
          <Route path="/hotels" element={<Hotelpage />} />
        </Routes>
      </Router>
    </MainLayout>
  );
};

export default App;
