import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import FaqSection from "../components/Faqs/Faq-section";
import Planner from "../components/planer/Planer";
import { Toaster } from "../components/ui/sonner";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div className="mx-auto  ">
      <Navbar />
      <main className="flex-grow">{<Outlet />}</main>
      <FaqSection />
      <Planner />
      <Footer />
      <Toaster />
    </div>
  );
}
