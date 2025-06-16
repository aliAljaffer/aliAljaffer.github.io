import { useState } from "react";
import Image from "./Image";
import images from "../lib/images.json";
function Images() {
  const [currIdx, setCurrId] = useState(0);
  const { path, alt, location } = images.at(currIdx);
  const BASE_URL =
    "https://alialjaffer-portfolio-images.s3.eu-north-1.amazonaws.com/";
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Image
        path={BASE_URL + path}
        thumbnail={BASE_URL + "thumbnails/" + path.toLowerCase()}
        alt={alt}
        location={location}
        onNext={() => setCurrId((currIdx) => currIdx + 1)}
        onPrev={() => setCurrId((currIdx) => currIdx - 1)}
        idx={currIdx}
        numImages={images.length}
      />
    </div>
  );
}

export default Images;
