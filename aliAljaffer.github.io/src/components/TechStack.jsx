import styles from "../style-modules/TechStack.module.css";
function TechStack({ className = "" }) {
  const images = Array.from({ length: 6 }, () => "https://picsum.photos/100");
  return (
    <div className={className}>
      {images.map((item) => (
        <img
          className="w-full rounded-md grayscale transition-all duration-300 hover:grayscale-0"
          src={item}
          key={crypto.randomUUID()}
          alt={`Technology I use ${item}`}
        />
      ))}
    </div>
  );
}

export default TechStack;
