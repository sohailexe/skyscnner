interface Feature {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface FeatureShowcaseProps {
  features: Feature[]; // ← array, not a one-element tuple
  heading?: string;
  description?: string;
}
const FeatureShowcase = ({
  features,
  heading,
  description,
}: FeatureShowcaseProps) => {
  return (
    <section className="maxScreen bg-slate-100 text-center px-6 py-10">
      {heading && <h1 className="px-8 text-2xl font-bold pb-2 ">{heading}</h1>}
      {description && <p className="text-xs pb-4 px-8">{description}</p>}
      <ul className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
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

export default FeatureShowcase;
