import NavButton from "./NavButton";
import useUrl from "../hooks/useUrl";
function Directions({ width }) {
  const url = useUrl();
  const paths = ["/", "/projects", "/contact", "/photography"];
  const notFound = !paths.includes(url);
  return (
    <div
      className={`${width} flex items-center ${notFound ? "justify-center" : "justify-between"} gap-4 px-1`}
    >
      {url === "/" ? (
        <>
          <NavButton variation="small" to="/contact">
            Contact
          </NavButton>
          <NavButton variation="small" to="/photography">
            Photography
          </NavButton>
          <NavButton variation="small" to="/projects">
            Projects
          </NavButton>
        </>
      ) : url === "/contact" ? (
        <>
          <NavButton variation="small" to="/">
            Home
          </NavButton>
          <NavButton variation="small" to="/photography">
            Photography
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
          <NavButton variation="small" to="/photography">
            Photography
          </NavButton>
          <NavButton variation="small" to="/">
            Home
          </NavButton>
        </>
      ) : url === "/photography" ? (
        <>
          <NavButton variation="small" to="/contact">
            Contact
          </NavButton>
          <NavButton variation="small" to="/">
            Home
          </NavButton>
          <NavButton variation="small" to="/projects">
            Projects
          </NavButton>
        </>
      ) : (
        <NavButton variation="small" to="/">
          Home
        </NavButton>
      )}
    </div>
  );
}

export default Directions;
