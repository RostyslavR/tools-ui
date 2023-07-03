// import "./HeaderList.css";

const HeaderList = ({ list, handler }) => {
  return (
    <ul className="HeaderList">
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
      <input
        className="app-input-btn"
        type="button"
        onClick={() => handler({ idx, del: true })}
        value={"-"}
      />
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
