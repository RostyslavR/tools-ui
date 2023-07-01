import { useState } from "react";

import { iUser } from "../../services/iAxios";
import { Loader } from "../Loader/Loader";
import { FileList } from "../FileList/FileList";
import { HeaderList } from "../HeaderList/HeaderList";
import { FieldList } from "../FieldList/FieldList";

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

  const handleSelectedFiles = async (e) => {
    const { name, files } = e.target;
    setPreparing({ status: "isPreparing" });
    setMerginFiles({
      status: "",
      fileList: [],
    });

    if (files.length > 0) {
      const fd = new FormData();
      for (let i = 0; i < files.length; i++) {
        fd.append(name, files[i]);
      }

      try {
        const { data } = await iUser.postForm("/api/files/csvprepare", fd);
        const { files, headers, fields, difStructure } = data;
        const similar = headers.map((h) => {
          const res = fields.find((f) => f.includes(h));
          return res !== undefined ? res : "";
        });
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
        className="app-input-file"
        type="file"
        multiple
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
          preparing.status !== "Ok" ||
          merginFiles.status === "isLoading" ||
          merginFiles.fileList.length > 0
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
