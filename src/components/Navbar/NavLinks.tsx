import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faHotel, faPlane } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";

const buttons = [
  {
    name: "Flights",
    icon: faPlane,
  },
  {
    name: "Hotels",
    icon: faHotel,
  },
  {
    name: "Cars",
    icon: faCar,
  },
];

export const NavLinks = () => {
  const buttonList = buttons.map((button, index) => {
    return (
      <li key={index}>
        <Button
          className="rounded-4xl w-full  bg-transparent border  "
          variant={"outline"}
        >
          <FontAwesomeIcon icon={button.icon} className="mr-2" />
          {button.name}
        </Button>
      </li>
    );
  });
  return (
    <div className="maxScreen">
      <ul className="flex gap-2 py-2 pb-4 ">{buttonList}</ul>
    </div>
  );
};
