import { logosArr } from "../lib/logos";
import { Fragment } from "react";
function TechStack({ className = "" }) {
  return (
    <div className={className}>
      {logosArr.map((item, idx) => {
        return <Fragment key={idx}>{item}</Fragment>;
      })}
    </div>
  );
}

export default TechStack;
