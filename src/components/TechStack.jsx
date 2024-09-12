import { logosArr } from "../lib/logos";
import { Fragment } from "react";
function TechStack() {
  return (
    <div
      className={
        "flex h-auto w-[100%] flex-row flex-wrap items-start justify-around gap-1 px-4 lg:justify-between lg:gap-1"
      }
    >
      {logosArr.map((item, idx) => {
        return <Fragment key={idx}>{item}</Fragment>;
      })}
    </div>
  );
}

export default TechStack;
