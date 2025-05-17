import { Link } from "react-router";
import { Button } from "../ui/button";
import { DropdownOptions } from "./Dropdown-options";
import Logo from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";

export const Topbar = () => {
  const { logout } = useAuth();
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
            <Link to={"/payments"}>
              <Button className="" variant={"ghost"}>
                Payments{" "}
              </Button>
            </Link>
          </li>
          <li>
            {/* <Button className="" variant={"ghost"} onClick={logout}>
              Logout
            </Button> */}
          </li>
          <li>
            <DropdownOptions />
          </li>
        </ul>
      </div>
    </div>
  );
};
