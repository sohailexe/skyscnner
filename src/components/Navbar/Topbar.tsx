import { Button } from "../ui/button";
import { DropdownOptions } from "./Dropdown-options";
import { Link } from "react-router";
import logo from "@/assets/skyscanner-seeklogo.png";
export const Topbar = () => {
  return (
    <div className="maxScreen flex justify-between py-2">
      <div>
        <Link to={"/"} className="text-2xl font-bold">
          <img src={logo} alt="logo" className="w-36 invert brightness-0" />
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
