interface PagesHeaderProps {
  image: string;
  heading?: string;
  children?: React.ReactNode;
}
const PagesHeader = ({ image, heading, children }: PagesHeaderProps) => {
  return (
    <section className="  relative  h-[550px] overflow-hidden ">
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
      <div className="maxScreen absolute inset-0 flex  text-white">
        <div className=" py-32 flex flex-col justify-center items-center w-full ">
          <h1 className="font-extrabold text-6xl pb-5 ">{heading}</h1>
          {children}
        </div>
      </div>
    </section>
  );
};

export default PagesHeader;
