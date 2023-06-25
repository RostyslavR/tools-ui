import "./GoodLink.css";

const GoodLink = ({ item }) => {
  return (
    <>
      {/* <p>{item}</p> */}
      <a href={item} target="_blank" rel="noreferrer">
        {item}
      </a>
    </>
  );
};

export { GoodLink };
