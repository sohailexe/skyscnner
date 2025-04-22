import { NavLinks } from "./NavLinks";
import { Topbar } from "./Topbar";

const Navbar = () => {
  return (
    <nav className="bg-dark-blue text-white pt-5">
      <Topbar />
      <NavLinks />
    </nav>
  );
};

export default Navbar;
