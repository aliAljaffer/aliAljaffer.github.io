import Heading from "./Heading";

function List({
  headingTitle = "",
  className = "",
  projectStyles = "",
  headingStyle = "",
  listContent = [],
}) {
  return (
    <div className={className}>
      <Heading message={headingTitle} className={headingStyle} />
      {listContent.map((item) => (
        <p className={projectStyles}>{item}</p>
      ))}
    </div>
  );
}

export default List;
