// import "./ValueSettingList.css";

const ValueSettingList = ({ list, handler }) => {
  return (
    <ul className="ValueSettingList">
      {list.map((item, idx) => (
        <li className="file-item" key={idx}>
          <FileItem item={item} idx={idx} handler={handler} />
        </li>
      ))}
    </ul>
  );
};

const FileItem = ({ item, idx, handler }) => {
  return (
    <>
      <label>
        <input
          type="radio"
          name={idx}
          value="noChange"
          checked={item === "noChange"}
          onChange={(e) => {
            handler({ idx, value: e.target.value });
          }}
        />
        no
      </label>
      <label>
        <input
          type="radio"
          name={idx}
          value="LowerCase"
          checked={item === "LowerCase"}
          onChange={(e) => {
            handler({ idx, value: e.target.value });
          }}
        />
        low
      </label>
      <label>
        <input
          type="radio"
          name={idx}
          value="UpperCase"
          checked={item === "UpperCase"}
          onChange={(e) => {
            handler({ idx, value: e.target.value });
          }}
        />
        UP
      </label>
      <label>
        <input
          type="radio"
          name={idx}
          value="TitleCase"
          checked={item === "TitleCase"}
          onChange={(e) => {
            handler({ idx, value: e.target.value });
          }}
        />
        Ttl
      </label>
    </>
  );
};

export { ValueSettingList };
