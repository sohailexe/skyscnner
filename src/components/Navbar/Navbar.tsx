import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCar,
  faHotel,
  faPlane,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <nav className="bg-dark-blue text-white px-5">
      <Topbar />
      <NavLinks />
    </nav>
  );
};

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default Navbar;

const Topbar = () => {
  return (
    <div className="maxScreen flex justify-between py-2">
      <div>
        <h1 className="text-2xl font-bold">Skyscanner</h1>
      </div>
      <div>
        <ul className="flex gap-1">
          <li>
            <Button className="" variant={"ghost"}>
              Login{" "}
            </Button>
          </li>
          <li>
            <DropdownOptions />
          </li>
        </ul>
      </div>
    </div>
  );
};
const NavLinks = () => {
  return (
    <div>
      <ul className="flex gap-2 py-2 pb-4">
        <li>
          <Button
            className="rounded-4xl  bg-transparent border  "
            variant={"outline"}
          >
            Flights
          </Button>
        </li>
        <li>
          <Button
            className="rounded-4xl bg-transparent border  "
            variant={"outline"}
          >
            Hotels
          </Button>
        </li>
        <li>
          <Button
            className="rounded-4xl bg-transparent border  "
            variant={"outline"}
          >
            Cars
          </Button>
        </li>
      </ul>
    </div>
  );
};

export function DropdownOptions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="">
          <FontAwesomeIcon icon={faBars} size="lg" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <FontAwesomeIcon icon={faPlane} className="mr-4 text-blue-500" />
            <span>Flight</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FontAwesomeIcon icon={faHotel} className="mr-4 text-blue-500" />
            <span>Hotel</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FontAwesomeIcon icon={faCar} className="mr-4 text-blue-500" />
            <span>Car</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <FontAwesomeIcon icon={faPlane} className="mr-4 text-blue-500" />
            <span>Flight</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FontAwesomeIcon icon={faHotel} className="mr-4 text-blue-500" />
            <span>Hotel</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FontAwesomeIcon icon={faCar} className="mr-4 text-blue-500" />
            <span>Car</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
