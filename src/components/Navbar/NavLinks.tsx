import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faHotel, faPlane } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const buttons = [
  {
    name: "Flights",
    icon: faPlane,
    path: "/flights",
  },
  {
    name: "Hotels",
    icon: faHotel,
    path: "/hotels",
  },
  {
    name: "Cars",
    icon: faCar,
    path: "/cars",
  },
];

export const NavLinks = () => {
  return (
    <nav className="maxScreen">
      <ul className="flex gap-2 py-2 pb-4">
        {buttons.map(({ name, icon, path }, index) => (
          <li key={index}>
            <Link to={path}>
              <Button
                className="w-full border rounded-4xl bg-transparent"
                variant="outline"
              >
                <FontAwesomeIcon icon={icon} className="mr-2" />
                {name}
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
