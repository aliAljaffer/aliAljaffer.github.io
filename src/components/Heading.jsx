// import styles from "../style-modules/Heading.module.css";
function Heading({ className = "", message }) {
  return <h1 className={className}>{message}</h1>;
}

export default Heading;
