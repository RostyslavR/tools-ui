import { useState, useRef } from "react";

import { iUser } from "../../services/iAxios";
import { Loader } from "../Loader/Loader";
import { FileList } from "../FileList/FileList";
import { HeaderList } from "../HeaderList/HeaderList";
import { FieldList } from "../FieldList/FieldList";

// import { similarValues } from "../../lib";
import "./CsvBlock.css";

const CsvBlock = () => {
  const [preparing, setPreparing] = useState({ status: "" });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [fields, setFields] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [difStructure, setDifStructure] = useState(false);
  const [merginFiles, setMerginFiles] = useState({
    status: "",
    fileList: [],
  });

  const filePicker = useRef(null);

  const handleSelectedFiles = async (e) => {
    setPreparing({ status: "isPreparing" });
    if (e.target.files.length > 0) {
      const fd = new FormData();
      for (let i = 0; i < e.target.files.length; i++) {
        fd.append("files", e.target.files[i]);
      }

      try {
        const { data } = await iUser.postForm("/api/files/csvprepare", fd);
        const { files, headers, fields, difStructure } = data;
        // const similar = similarValues(headers, fields);

        const similar = headers.map((h) => fields.find((f) => f.includes(h)));

        setSelectedFields([...similar]);
        setSelectedFiles([...files]);
        setHeaders([...headers]);
        setFields([...fields]);
        setDifStructure(difStructure);
        setPreparing({ status: "Ok" });
      } catch (error) {
        setPreparing({ status: "" });
        console.log(error);
      }
    }
  };

  const handleHeaders = ({ idx, value }) => {
    let a = [...headers];
    a[idx] = value;
    setHeaders(a);
  };

  const handleSelectedFields = ({ idx, value }) => {
    let a = [...selectedFields];
    a[idx] = value;
    setSelectedFields(a);
  };

  const combineFiles = async () => {
    setMerginFiles({ status: "isLoading" });
    try {
      const { data } = await iUser.post("/api/files/csvcombine", {
        headers,
        fields: selectedFields,
      });
      setMerginFiles({ ...data });
    } catch (error) {
      setMerginFiles({ status: error.message, fileList: [] });
      console.log(error);
    }
  };

  return (
    <div className="csv-block">
      <input
        type="file"
        multiple
        ref={filePicker}
        name="files"
        accept=".csv"
        onChange={handleSelectedFiles}
      ></input>
      {difStructure && <p>files have defferent strustures</p>}
      {preparing.status === "isPreparing" ? (
        <Loader />
      ) : (
        <FileList list={selectedFiles} />
      )}
      <div className="headers">
        <HeaderList list={headers} handler={handleHeaders} />
        <FieldList
          list={selectedFields}
          etc={{ optionList: fields, handler: handleSelectedFields }}
        />
      </div>
      <button
        className={`app-do-btn ${
          merginFiles.status === "isLoading" || preparing.status !== "Ok"
            ? "notActive"
            : ""
        } 
        }`}
        onClick={combineFiles}
      >
        combine files
      </button>
      <p>{merginFiles.status}</p>
      {merginFiles.status === "isLoading" ? (
        <Loader />
      ) : (
        <FileList list={merginFiles.fileList} />
      )}
    </div>
  );
};
export { CsvBlock };
