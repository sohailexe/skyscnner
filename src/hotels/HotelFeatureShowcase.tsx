import fe1 from "@/assets/images/fe1.svg";
import fe2 from "@/assets/images/fe2.svg";
import fe3 from "@/assets/images/fe3.svg";

const features = [
  {
    id: 1,
    name: "Best Price Guarantee",
    description:
      "We search for deals with the world’s leading hotels, and share our findings with you",
    image: fe1,
  },
  {
    id: 2,
    name: "Flexible Cancellation",
    description:
      "We search for deals with the world’s leading hotels, and share our findings with you",
    image: fe2,
  },
  {
    id: 3,
    name: "Exclusive Deals",
    description:
      "We search for deals with the world’s leading hotels, and share our findings with you",
    image: fe3,
  },
];

const HotelFeatureShowcase = () => {
  return (
    <section className="maxScreen bg-slate-100">
      <ul className=" px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        {features.map((feature) => (
          <li
            key={feature.id}
            className="flex flex-col space-y-2 justify-center text-center items-center"
          >
            <img src={feature.image} alt={feature.name} className="w-36 pb-6" />
            <div>
              <h3 className="text-lg font-semibold pb-2 ">{feature.name}</h3>
              <p className="text-xs ">{feature.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default HotelFeatureShowcase;
