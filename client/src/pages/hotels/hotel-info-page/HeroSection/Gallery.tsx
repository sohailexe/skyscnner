import { useEffect, useState } from "react";
import images from "../Utility/index";
import DetailedGallery from "./DetailedGallery";

// Type for Image Data
interface ImageData {
  url: string;
}

export default function Gallery() {
  const [ImgUrl, setImgUrl] = useState<string[]>([]);
  const [ShowDetail, setShowDetail] = useState<boolean>(false);

  // Assuming images.Photos is an array of objects with 'url' as a string.
  const Data: ImageData[] = images.Photos;

  useEffect(() => {
    setImgUrl(Data.slice(0, 6).map((item) => item.url));
  }, [Data]);

  const HandleClick = (): void => {
    setShowDetail((prev) => !prev);
  };

  return (
    <>
      {!ShowDetail && (
        <div
          className="relative flex space-x-1 font-poppins"
          onClick={HandleClick}
        >
          <div className="absolute rounded-md bottom-5 flex items-center justify-center right-10 bg-slate-100">
            <h1 className="px-3 py-1 text-sm ">+{Data.length}</h1>
          </div>
          <div className="w-[50%] h-[17rem] overflow-hidden border">
            <img
              className="w-full h-full object-cover"
              src={ImgUrl[0]}
              alt="gallery"
            />
          </div>

          <div className="flex w-[50%] h-[17rem] space-x-1 overflow-hidden">
            <div className="w-[60%] h-full space-y-1">
              <div className="h-1/2">
                <img
                  className="w-full h-full object-cover"
                  src={ImgUrl[1]}
                  alt="gallery"
                />
              </div>
              <div className="flex w-full h-1/2 space-x-1">
                <div className="w-1/2">
                  <img
                    className="w-full h-full object-cover"
                    src={ImgUrl[2]}
                    alt="gallery"
                  />
                </div>
                <div className="w-1/2">
                  <img
                    className="w-full h-full object-cover"
                    src={ImgUrl[3]}
                    alt="gallery"
                  />
                </div>
              </div>
            </div>
            <div className="w-1/2 h-full overflow-hidden space-y-1">
              <div className="h-1/2">
                <img
                  className="w-full h-full object-cover"
                  src={ImgUrl[4]}
                  alt="gallery"
                />
              </div>
              <div className="h-1/2">
                <img
                  className="w-full h-full object-cover"
                  src={ImgUrl[5]}
                  alt="gallery"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {ShowDetail && <DetailedGallery HandleClick={HandleClick} />}
    </>
  );
}
