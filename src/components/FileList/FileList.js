import "./FileList.css";

const SERVER = process.env.REACT_APP_SERVER || "http://localhost:5300";

const FileList = ({ list }) => {
  return (
    <ul className="FileList">
      {list.map((item, idx) => (
        <li key={idx}>
          <FileItem item={item} />
        </li>
      ))}
    </ul>
  );
};

const FileItem = ({ item }) => {
  return (
    <>
      {/* <p>{item}</p> */}
      <a
        href={`${SERVER}/files/${item}`}
        target="_blank"
        rel="noreferrer"
        download={item}
      >
        {item}
      </a>
    </>
  );
};

export { FileList };
