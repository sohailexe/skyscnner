import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div className="mx-auto  ">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
