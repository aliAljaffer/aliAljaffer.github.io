import Spinner from "./Spinner";
import { useState } from "react";
function Image({
  path = "/src/assets/images/riyadh-1.JPG",
  alt = "",
  location = "Riyadh, Saudi Arabia",
  onNext,
  onPrev,
  idx,
  numImages,
}) {
  const [city, country] = location.split(",");
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? <Spinner /> : null}
      <img
        onLoad={() => setIsLoading(false)}
        src={path}
        alt={alt}
        className={`mt-auto h-fit w-fit px-5 py-1 ${isLoading ? "hidden" : ""} sm:max-h-[90%] sm:max-w-[90%]`}
      />
      <div className="mt-auto flex w-full justify-between">
        <div className="flex flex-col items-start gap-1">
          <span className="px-5 tracking-widest">{city}</span>
          <span className="px-5 uppercase tracking-wide">{country}</span>
        </div>
        <span className="text-xs">
          ({idx + 1} / {numImages})
        </span>
        <div className="flex flex-col items-end gap-2 sm:flex-row-reverse sm:items-center sm:text-base">
          <button
            disabled={isLoading || idx + 1 === numImages}
            className="px-5 uppercase tracking-widest disabled:cursor-not-allowed"
            onClick={() => {
              onNext();
              setIsLoading(true);
            }}
          >
            Next &rarr;
          </button>
          <button
            disabled={isLoading || idx - 1 < 0}
            className="px-5 uppercase tracking-wide disabled:cursor-not-allowed"
            onClick={() => {
              onPrev();
              setIsLoading(true);
            }}
          >
            &larr; Prev
          </button>
        </div>
      </div>
    </>
  );
}

export default Image;
