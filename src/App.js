import "./App.css";
import "./history.css";
import "./mediaQueries.css";
import "./info.css";
import NavBar from "./components/NavBar";
import Modal from "./components/modal";
import Main from "./components/main";
import Preloader from "./components/preLoader";
import History from "./components/history";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Info from "./components/Info";

function App() {
  const [loader, setLoader] = useState(true);
  const [show, setShow] = useState(false);
  const [EditFileData, EditingFileData] = useState([]);
  const [fileData, setFileData] = useState(
    JSON.parse(localStorage.getItem("Files"))
  );
  const [fileCount, setFileCount] = useState(
    Number.parseInt(localStorage.getItem("FileCount")) + 1
  );
  let showing = () => {
    setShow(show ? false : true);
  };

  let createFile = (InputValue = "") => {
    setFileCount(fileCount + 1);
    let date = new Date();
    let currDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    let balance = localStorage.getItem("Balance");
    let er = localStorage.getItem("Er");
    let ex = localStorage.getItem("Ex");
    let transArr = JSON.parse(localStorage.getItem("Trans"));
    setFileData((fileData) => {
      let newData = [
        {
          fileName: InputValue,
          currDate: currDate,
          balance: balance,
          er: er,
          ex: ex,
          transArr,
          fileCount: "count" + fileCount,
        },
        ...(Array.isArray(fileData) ? fileData : []), // Line ~48
      ];
      try {
        localStorage.setItem("Files", JSON.stringify(fileData));
        localStorage.setItem("FileCount", String(fileCount));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
      return newData;
    });
  };
  let dltFile = (e) => {
    const target =
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement;
    const Id = target.classList[1];
    setFileData((FileData) => {
      let newData = FileData.filter((i) => {
        return !(i.fileCount === Id);
      });
      localStorage.setItem("Files", JSON.stringify(newData));
      return newData;
    });
  };
  let editFile = (e) => {
    const target =
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement;
    console.log(target);
    console.log(fileData);
    const Id = target.classList[1];
    setFileData((FileData) => {
      let newData = FileData.filter((i) => {
        if (i.fileCount === Id) {
          console.log(i);
          EditingFileData(i);
        }
        if (i.fileCount !== Id) {
          return i;
        }
      });
      console.log(newData);
      localStorage.setItem("Files", JSON.stringify(newData));
      return newData;
    });
    // setFileData((FileData) => {
    //   const prevArray = Array.isArray(FileData) ? FileData : [];
    //   const fileToEdit = prevArray.find((i) => i.fileCount === Id);
    //   if (fileToEdit) {
    //     console.log("Editing file:", fileToEdit);
    //     EditingFileData(fileToEdit); // Assumed to be setEditFileData
    //   }
    //   const newData = prevArray.filter((i) => i.fileCount !== Id);
    //   console.log("New fileData:", newData);
    //   try {
    //     localStorage.setItem("Files", JSON.stringify(newData));
    //   } catch (error) {
    //     console.error("Error saving to localStorage:", error);
    //   }
    //   return newData;
    // });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  // file Editing
  // Reset Btn
  // Manual

  return (
    <>
      <BrowserRouter>
        {loader && <Preloader />}
        <NavBar />
        <Modal show={show} closing={showing} creating={createFile} />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                showing={showing}
                editFileData={[EditFileData]}
                editingFileData={EditingFileData}
              />
            }
          ></Route>
          <Route
            path="/history"
            element={
              <History
                fileData={fileData}
                setData={setFileData}
                dltFile={dltFile}
                fileCount={fileCount}
                editFile={editFile}
              />
            }
          ></Route>
          <Route path="/info" element={<Info />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
