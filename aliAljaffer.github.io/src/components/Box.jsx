function Box({ children, className }) {
  return <div className={`rounded-lg bg-c2 ${className}`}>{children}</div>;
}

export default Box;
