import { useState } from "react";
import Layout from "../../Utility/Layout";
import HotelDetail from "../../Utility";
import MapView from "./MapView";
import FullMapModal from "./FullMapModal";

export default function ExploreTheArea() {
  const [showFull, setShowFull] = useState(false);
  const ManipulteShowFull = () => {
    setShowFull(false);
  };

  return (
    <Layout>
      <section id="explore-area" className="h-screen flex flex-col border">
        <div className="py-10 space-y-2">
          <h1 className="text-Sub-Heading">
            Location <span className="font-medium">3.1</span>
          </h1>
          <p className="text-zinc-700">{HotelDetail.address}</p>
        </div>

        {/* Small Map */}
        <div
          className="flex-grow cursor-pointer"
          onClick={() => setShowFull(true)}
        >
          {showFull == false && (
            <MapView className="h-full w-full pointer-events-none" />
          )}
        </div>
      </section>

      {/* bigMAp */}
      <FullMapModal open={showFull} ManipulteShowFull={ManipulteShowFull} />
    </Layout>
  );
}
