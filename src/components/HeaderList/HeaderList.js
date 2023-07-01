// import "./HeaderList.css";

const HeaderList = ({ list, handler }) => {
  return (
    <ul className="HeaderList">
      {list.map((item, idx) => (
        <li key={idx}>
          <FileItem item={item} idx={idx} handler={handler} />
        </li>
      ))}
    </ul>
  );
};

const FileItem = ({ item, idx, handler }) => {
  return (
    <>
      {/* <p>{item}</p> */}
      <input
        className="app-input"
        type="text"
        value={item}
        onChange={(e) => handler({ idx, value: e.target.value })}
      />
    </>
  );
};

export { HeaderList };
