import { useRef, useState } from "react";
import { iUser } from "../../services/iAxios";
import { Loader } from "../Loader/Loader";
import { GoodList } from "../GoodList/GoodList";
import { FileList } from "../FileList/FileList";
import "./InputBlock.css";

// const SERVER = process.env.REACT_APP_SERVER;

const InputBlock = () => {
  const [link, setLink] = useState("https://comfortshoesottawa.com");
  const [qParams, setQParams] = useState("");
  // const [selectedFile, setSelectedFile] = useState(null);
  const [resChecking, setResChecking] = useState({ status: "", goodlinks: [] });
  const [resFind, setResFind] = useState({ status: "", products: [] });
  const [checkingFile, setCheckingFile] = useState({
    status: "",
    fileList: [],
  });
  // const [resPutFile, setResPutFile] = useState("");
  const filePicker = useRef(null);

  const handleFind = async () => {
    if (qParams && link) {
      try {
        setResFind({ status: "isLoading" });
        const { data } = await iUser.post("/api/files/findprod", {
          link,
          qParams,
        });
        setResFind(data);
      } catch (error) {
        setResFind({ status: error.message, products: [] });
        console.log(error);
      }
    }
  };

  const handleCheckLink = async () => {
    if (link) {
      try {
        setResChecking({ status: "isLoading" });
        const { data } = await iUser.post("/api/files/check", { link });
        setResChecking({ ...data });
      } catch (error) {
        setResChecking({ status: error.message, goodlinks: [] });
        console.log(error);
      }
    }
  };

  const resetLinkFile = () => {
    filePicker.current.value = "";
  };

  // const handleCheckFile = async () => {
  //   // if (resPutFile === "Ok") {
  //   try {
  //     setCheckingFile({ status: "isLoading" });
  //     const { data } = await iUser.get("/api/files/checkfile");
  //     setCheckingFile({ ...data });
  //   } catch (error) {
  //     setCheckingFile({ status: error.message, fileList: [] });
  //     console.log(error);
  //   }
  //   // }
  // };

  const checkFile = async () => {
    if (filePicker.current.files.length > 0) {
      setCheckingFile({ status: "isLoading" });
      try {
        const { data } = await iUser.postForm("/api/files/checkfile", {
          [filePicker.current.name]: filePicker.current.files[0],
        });
        setCheckingFile({ ...data });
        // console.log(data.fileList);
      } catch (error) {
        setCheckingFile({ status: error.message, fileList: [] });
        console.log(error);
      }
    }
  };

  // const putFile = async ({ target: { name, files } }) => {
  //   if (files.length > 0) {
  //     try {
  //       const { status } = await iUser.putForm("/api/files/", {
  //         [name]: files[0],
  //       });
  //       status && setResPutFile("Ok");
  //     } catch (error) {
  //       setResPutFile(error.message);
  //     }
  //   } else {
  //     setResPutFile("");
  //   }
  // };

  return (
    <div className="input-block">
      <input
        className="app-input"
        placeholder="input link"
        type="text"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <button
        className={`app-do-btn ${
          resChecking.status === "isLoading" ? "notActive" : ""
        } 
        }`}
        onClick={handleCheckLink}
      >
        check link
      </button>
      <p>{resChecking.status}</p>
      {resChecking.status === "isLoading" ? (
        <Loader />
      ) : (
        <GoodList list={resChecking.goodlinks} />
      )}
      <input
        className="app-input"
        placeholder="input qParams"
        type="text"
        value={qParams}
        onChange={(e) => setQParams(e.target.value)}
      />
      <button
        className={`app-do-btn ${
          resFind.status === "isLoading" ? "notActive" : ""
        } 
        }`}
        onClick={handleFind}
      >
        find
      </button>
      <p>{resFind.status}</p>
      {resFind.status === "isLoading" ? (
        <Loader />
      ) : (
        <GoodList list={resFind.products} />
      )}
      <div className="chkfile-block">
        <input
          className="app-input-btn"
          type="button"
          onClick={resetLinkFile}
          value={"X"}
        />
        <input
          className="app-input-file"
          placeholder="input file"
          type="file"
          name="linkFile"
          ref={filePicker}
          accept=".xls,.xlsx,.txt,.csv"
          // onChange={putFile}
        />
        <button
          className={`app-do-btn ${
            checkingFile.status === "isLoading" ? "notActive" : ""
          } 
        }`}
          onClick={checkFile}
        >
          check file
        </button>
      </div>
      <p>{checkingFile.status}</p>
      {checkingFile.status === "isLoading" ? (
        <Loader />
      ) : (
        <FileList list={checkingFile.fileList} />
      )}
    </div>
  );
};
export { InputBlock };
