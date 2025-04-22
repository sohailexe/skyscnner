import { Button } from "../ui/button";
import { DropdownOptions } from "./Dropdown-options";

export const Topbar = () => {
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
