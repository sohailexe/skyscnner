import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faHotel, faPlane } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";

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
  const { pathname } = useLocation();

  const isActive = (path: string) => {
    if (path === "/flights") {
      // Active if it's NOT /cars or /hotels
      return pathname !== "/cars" && pathname !== "/hotels";
    }
    return pathname === path;
  };

  return (
    <nav className="maxScreen">
      <ul className="flex gap-2 py-2 pb-4">
        {buttons.map(({ name, icon, path }, index) => (
          <li key={index}>
            <Link to={path}>
              <Button
                className={cn(
                  ` border rounded-4xl bg-transparent hover:bg-light-blue/50 hover:border-light-blue hover:text-white text-white`,
                  isActive(path)
                    ? "bg-light-blue  text-white border-light-blue"
                    : ""
                )}
                variant="ghost"
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
