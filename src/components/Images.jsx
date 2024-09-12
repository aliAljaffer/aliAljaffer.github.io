import { useState } from "react";
import Image from "./Image";
import images from "../lib/images.json";
function Images() {
  const [currIdx, setCurrId] = useState(0);
  const { path, imageId, alt, location } = images.at(currIdx);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Image
        path={path}
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
