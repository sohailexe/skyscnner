interface PagesHeaderProps {
  image: string;
  heading?: string;
  children?: React.ReactNode;
}

const PagesHeader = ({ image, heading, children }: PagesHeaderProps) => {
  return (
    <section className="relative h-[550px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: "center",
        }}
      />

      {/* Optional Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-20" />

      {/* Content positioning */}
      <div className="absolute inset-0 flex items-center justify-center w-full text-white">
        <div className="container mx-auto px-4 flex flex-col items-center w-full">
          {heading && (
            <h1 className="font-extrabold text-3xl md:text-6xl md:pb-5">
              {heading}
            </h1>
          )}
          <div className="w-full">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default PagesHeader;
