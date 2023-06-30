import { AutoInput } from "../AutoInput/AutoInout";
// import "./HeaderList.css";

const FieldList = ({ list, etc }) => {
  return (
    <ul className="FieldList">
      {list.map((item, idx) => (
        <li key={idx}>
          <FieldItem item={item} etc={{ ...etc, idx }} />
        </li>
      ))}
    </ul>
  );
};

const FieldItem = ({ item, etc }) => {
  return (
    <>
      <AutoInput value={item} etc={etc} />
    </>
  );
};

export { FieldList };
