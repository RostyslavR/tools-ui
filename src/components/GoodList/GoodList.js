import { GoodLink } from "../GoodLink/GoodLink";
import "./GoodList.css";

const GoodList = ({ list }) => {
  return (
    <ul className="GoodList">
      {list.map((item, idx) => (
        <li key={idx}>
          <GoodLink item={item} />
        </li>
      ))}
    </ul>
  );
};
export { GoodList };
