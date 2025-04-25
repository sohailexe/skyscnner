import { useParams } from "react-router";

const HotelInfoPage = () => {
  const { hotelId } = useParams();

  return <div className="bg-red-700">{hotelId}</div>;
};

export default HotelInfoPage;
