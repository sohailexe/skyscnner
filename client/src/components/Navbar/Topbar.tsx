import { Link } from "react-router";
import { Button } from "../ui/button";
import { DropdownOptions } from "./Dropdown-options";
import Logo from "@/components/auth/components/Logo";
export const Topbar = () => {
  return (
    <div className="maxScreen flex justify-between py-2">
      <div>
        <Logo />
      </div>
      <div>
        <ul className="flex gap-1">
          <li>
            <Link to={"/login"}>
              <Button className="" variant={"ghost"}>
                Login{" "}
              </Button>
            </Link>
          </li>
          <li>
            <DropdownOptions />
          </li>
        </ul>
      </div>
    </div>
  );
};
