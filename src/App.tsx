import FaqSection from "./components/Faqs/Faq-section";
import MainLayout from "./MainLayout";
import Flightpage from "./pages/Flightpage";
const App = () => {
  return (
    <MainLayout>
      <Flightpage />
      <FaqSection />
    </MainLayout>
  );
};

export default App;
