import NavButton from "./NavButton";
import About from "./About";
function NavBar({ handlePageChange, width, className = "" }) {
  return (
    <ul
      className={
        className +
        " mb-4 flex items-center justify-around gap-4" +
        (" " + width)
      }
    >
      <li>
        <NavButton onClick={() => handlePageChange(<About />)}>About</NavButton>
      </li>
      <li>
        <NavButton onClick={() => handlePageChange(<About />)}>
          Projects
        </NavButton>{" "}
      </li>
      <li>
        <NavButton onClick={() => handlePageChange(<About />)} n>
          Contact
        </NavButton>
      </li>
    </ul>
  );
}

export default NavBar;
