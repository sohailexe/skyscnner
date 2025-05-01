import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import FaqSection from "./components/Faqs/Faq-section";
import Planner from "./components/planer/Planer";
import { Toaster } from "./components/ui/sonner";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div className="mx-auto  ">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <FaqSection />
      <Planner />
      <Footer />
      <Toaster />
    </div>
  );
}
