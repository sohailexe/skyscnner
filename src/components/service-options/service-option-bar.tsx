import { CarIcon, Globe, LucideHotel } from "lucide-react";

interface ServiceButtonProps {
  icon: React.ReactNode;
  label: string;
}

const ServiceButton = ({ icon, label }: ServiceButtonProps) => {
  return (
    <button className="bg-dark-blue hover:bg-light-blue/75 text-white cursor-pointer flex  gap-2  px-6 py-7 rounded-lg transition-colors duration-150 ease-in ">
      <span className="text-lg">{icon}</span>
      {label}
    </button>
  );
};

const ServiceOptionBar = () => {
  const services = [
    { icon: <LucideHotel />, label: "Hotels" },
    { icon: <CarIcon />, label: "Car hire" },
    { icon: <Globe />, label: "Explore everywhere" },
  ];

  return (
    <div className="maxScreen grid grid-cols-3 justify-center gap-4 flex-wrap mt-12">
      {services.map((service, index) => (
        <ServiceButton key={index} icon={service.icon} label={service.label} />
      ))}
    </div>
  );
};

export default ServiceOptionBar;
