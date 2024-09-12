import { Link } from "react-router-dom";
function NavButton({
  onClick,
  children,
  activeColor = "bg-stone-900",
  idleColor = "bg-stone-500",
  variation = "",
  className = "",
  to = undefined,
}) {
  const isActive = true;
  const baseState = "opacity-80 rounded-sm p-3 uppercase sm:p-6";
  const states = {
    active: `${baseState} ${activeColor} text-lg text-c1`,
    idle: `${baseState} ${idleColor} text-lg text-c5`,
    small: `${baseState} py-0.5 lg:py-1 lg:h-full text-md text-stone-600 font-semibold hover:font-bold tracking-widest  hover:text-stone-800 hover:border-b-2 hover:shadow-cool hover:border-stone-300 hover:rounded-lg border-b-2 border-r-2 border-transparent duration-300 transition-all sm:text-xl md:py-1 md:px-4 md:text-md md:shadow-lg lg:text-2xl lg:rounded-xl lg:px-8 md:shadow-stone-300 md:rounded-lg`,
  };

  if (to !== undefined)
    return (
      <Link
        className={
          className + " " + variation === ""
            ? isActive
              ? states.active
              : states.idle
            : states[variation]
        }
        to={to}
      >
        {children}
      </Link>
    );

  return (
    <button
      onClick={onClick}
      className={
        className + " " + variation === ""
          ? isActive
            ? states.active
            : states.idle
          : states[variation]
      }
    >
      {children}
    </button>
  );
}

export default NavButton;
