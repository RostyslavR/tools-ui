import { useState, useRef } from "react";

import { iUser } from "../../services/iAxios";
import { Loader } from "../Loader/Loader";
import { FileList } from "../FileList/FileList";
import { HeaderList } from "../HeaderList/HeaderList";
import { FieldList } from "../FieldList/FieldList";
import { ValueSettingList } from "../ValueSettingList/ValueSettingList";

import "./CsvBlock.css";

const CsvBlock = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fields, setFields] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [difStructure, setDifStructure] = useState(false);

  const [preparing, setPreparing] = useState({ status: "" });
  const [merginFiles, setMerginFiles] = useState({
    status: "",
    fileList: [],
  });

  const [valueSetting, setValueSetting] = useState([]);
  const [useAllFields, setUseAllFields] = useState(false);
  const [removeEmptyRow, setRemoveEmptyRow] = useState(true);

  const filePicker = useRef(null);
  const resetLinkFile = () => {
    filePicker.current.value = "";
  };

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
        const {
          files,
          headers: fHeaders,
          fields: fFields,
          difStructure,
        } = data;
        setSelectedFiles([...files]);

        if (useAllFields === true) {
          setSelectedFields([...fFields]);
          setHeaders([...fFields]);
          setValueSetting(fields.map(() => "noChange"));
        } else {
          const similar = fHeaders.map((h) => {
            const res = fFields.find((f) => f.includes(h));
            return res !== undefined ? res : "";
          });
          setSelectedFields([...similar]);
          setHeaders([...fHeaders]);
          setValueSetting(fHeaders.map(() => "noChange"));
        }
        setFields([...fFields]);
        setDifStructure(difStructure);
        setPreparing({ status: "Ok" });
      } catch (error) {
        setPreparing({ status: "" });
        console.log(error);
      }
    }
  };

  const handleHeaders = ({ idx, value = undefined, del = undefined }) => {
    if (value) {
      let a = [...headers];
      a[idx] = value;
      setHeaders(a);
    }
    if (del) {
      let ah = [...headers];
      let af = [...selectedFields];
      let av = [...valueSetting];
      ah.splice(idx, 1);
      af.splice(idx, 1);
      av.splice(idx, 1);
      setHeaders([...ah]);
      setSelectedFields([...af]);
      setValueSetting([...av]);
    }
  };

  const handleSelectedFields = ({ idx, value }) => {
    let a = [...selectedFields];
    a[idx] = value;
    setSelectedFields(a);
  };

  const handleValueSetting = ({ idx, value }) => {
    let a = [...valueSetting];
    a[idx] = value;
    setValueSetting(a);
  };

  const addHeader = () => {
    setHeaders([...headers, ""]);
    setSelectedFields([...selectedFields, ""]);
    setValueSetting([...valueSetting, "noChange"]);
  };

  const changeUseAllFields = () => {
    if (useAllFields === true) {
      setHeaders([]);
      setSelectedFields([]);
      setValueSetting([]);
    } else {
      setHeaders([...fields]);
      setSelectedFields([...fields]);
      setValueSetting(fields.map(() => "noChange"));
    }
    setUseAllFields(!useAllFields);
  };

  const combineFiles = async () => {
    setMerginFiles({ status: "isLoading" });
    const vSetting = [];
    valueSetting.map((e, i) => {
      if (e !== "noChange") {
        vSetting.push({ key: headers[i], value: e });
      }
      return e;
    });

    try {
      const { data } = await iUser.post("/api/files/csvcombine", {
        headers,
        fields: selectedFields,
        removeEmptyRow,
        vSetting,
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
        className="app-input-btn"
        type="button"
        onClick={resetLinkFile}
        value={"X"}
      />

      <input
        className="app-input-file"
        ref={filePicker}
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
      {preparing.status === "Ok" && (
        <div className="headers-label">
          <p>Headers</p>
          <p>Fields</p>
          <p>ValueToCase</p>
        </div>
      )}
      <div className="headers">
        <HeaderList list={headers} handler={handleHeaders} />
        <FieldList
          list={selectedFields}
          etc={{ optionList: fields, handler: handleSelectedFields }}
        />
        <ValueSettingList list={valueSetting} handler={handleValueSetting} />
      </div>
      {preparing.status === "Ok" && (
        <div className="setting-block">
          <input
            className="app-input-btn"
            type="button"
            onClick={addHeader}
            value={"+"}
          />
          <label className="app-label">
            <input
              className="app-input-btn"
              type="checkbox"
              checked={useAllFields}
              onChange={changeUseAllFields}
            />
            Use all fields
          </label>
          <label className="app-label">
            <input
              className="app-input-btn"
              type="checkbox"
              checked={removeEmptyRow}
              onChange={() => {
                setRemoveEmptyRow(!removeEmptyRow);
              }}
            />
            Remove empty row
          </label>
        </div>
      )}
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
