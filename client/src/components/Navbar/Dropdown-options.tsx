import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCar,
  faHotel,
  faPlane,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";

const menuItems = [
  { icon: faPlane, label: "Flight", path: "/flights" },
  { icon: faHotel, label: "Hotel", path: "/hotels" },
  { icon: faCar, label: "Car", path: "/cars" },
];

export function DropdownOptions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <FontAwesomeIcon icon={faBars} size="lg" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          {menuItems.map((item, index) => (
            <MenuItem
              key={`group1-${index}`}
              icon={item.icon}
              label={item.label}
              path={item.path}
            />
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {menuItems.map((item, index) => (
            <MenuItem
              key={`group2-${index}`}
              icon={item.icon}
              label={item.label}
              path={item.path}
            />
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MenuItem({
  icon,
  label,
  path,
}: {
  icon: any;
  label: string;
  path: string;
}) {
  return (
    <DropdownMenuItem>
      <Link to={path}>
        <FontAwesomeIcon icon={icon} className="mr-4 text-blue-500" />
        <span>{label}</span>
      </Link>
    </DropdownMenuItem>
  );
}
