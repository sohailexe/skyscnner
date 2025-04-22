import { Button } from "../ui/button";
import { DropdownOptions } from "./Dropdown-options";
import { Link } from "react-router";
export const Topbar = () => {
  return (
    <div className="maxScreen flex justify-between py-2">
      <div>
        <Link to={"/"} className="text-2xl font-bold">
          Skyscanner{" "}
        </Link>
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
