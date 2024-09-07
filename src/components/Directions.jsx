import NavButton from "./NavButton";
import useUrl from "../hooks/useUrl";
function Directions({ width }) {
  const url = useUrl();
  const paths = ["/home", "/projects", "/contact"];
  const notFound = !paths.includes(url);
  return (
    <div
      className={`${width} flex items-center ${notFound ? "justify-center" : "justify-between"} gap-4 px-1`}
    >
      {url === "/home" ? (
        <>
          <NavButton variation="small" to="/contact">
            Contact
          </NavButton>
          <NavButton variation="small" to="/projects">
            Projects
          </NavButton>
        </>
      ) : url === "/contact" ? (
        <>
          <NavButton variation="small" to="/home">
            Home
          </NavButton>
          <NavButton variation="small" to="/projects">
            Projects
          </NavButton>
        </>
      ) : url === "/projects" ? (
        <>
          <NavButton variation="small" to="/contact">
            Contact
          </NavButton>
          <NavButton variation="small" to="/home">
            Home
          </NavButton>
        </>
      ) : (
        <NavButton variation="small" to="/home">
          Home
        </NavButton>
      )}
    </div>
  );
}

export default Directions;
