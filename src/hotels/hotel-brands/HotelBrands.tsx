import br1 from "@/assets/images/br1.png";
import br2 from "@/assets/images/br2.png";
import br3 from "@/assets/images/br3.png";
import br4 from "@/assets/images/br4.png";
import br5 from "@/assets/images/br5.png";
import br6 from "@/assets/images/br6.png";

const brands = [
  {
    id: 1,
    name: "Hilton",
    image: br1,
  },
  {
    id: 2,
    name: "Marriott",
    image: br2,
  },
  {
    id: 3,
    name: "Hyatt",
    image: br3,
  },
  {
    id: 4,
    name: "Intercontinental",
    image: br4,
  },
  {
    id: 5,
    name: "Accor",
    image: br5,
  },
  {
    id: 6,
    name: "Radisson",
    image: br6,
  },
];

const HotelBrands = () => {
  return (
    <div className="maxScreen py-5">
      <h1 className="font-extrabold text-3xl">
        Compare hotels across your favourite brands
      </h1>
      <ul className="flex gap-4 ">
        {brands.map((brand) => (
          <li key={brand.id}>
            <img src={brand.image} alt={brand.name} className="w-24" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HotelBrands;
