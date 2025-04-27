import React, { useEffect, useState } from "react";
import Trash from "./icons/trash.svg";
import { FaSave } from "react-icons/fa";
import Pen from "./icons/pen.svg";
import SearchIcon from "./icons/search_icon.svg";

export default function History(props) {
  const [searchingData, setSearchingData] = useState(props.fileData);

  useEffect(() => {
    props.setData((data) => {
      console.log("data", searchingData);
      let newData = data;
      setSearchingData(newData);
      return data;
    });
  }, [props.fileData]);

  const search = (str) => {
    str &&
      setSearchingData((data) => {
        data = props.fileData;
        let newData = data.filter((fileData) => {
          return (
            fileData.fileName.toLowerCase().includes(str) ||
            fileData.currDate.slice(0, 3).includes(str)
          );
        });
        return newData;
      });
    !str && setSearchingData(props.fileData);
  };
  // Delete all files
  // Reset
  const dltAll = () => {
    if (localStorage.getItem("FileCount") !== null) {
      localStorage.setItem("FileCount", 0);
    }
    if (localStorage.getItem("Files") !== null) {
      localStorage.setItem("Files", JSON.stringify([]));
    }

    setSearchingData([]);
    props.setData([]);
  };

  return (
    <section id="history">
      <div className="title">
        <h1>Transactions History</h1>
        <div className="search">
          <input
            onChange={(e) => search(e.target.value)}
            placeholder="Search file name / date"
          />
          <img src={SearchIcon} />
        </div>
      </div>
      {Array.isArray(searchingData) && searchingData.length > 0 && (
        <div className="restore_files">
          <button onClick={() => dltAll()}>Delete All Files</button>
        </div>
      )}
      {searchingData === null && <h1 className="alert">No files here!</h1>}

      <div id="files_container">
        {Array.isArray(searchingData) &&
          searchingData.length > 0 &&
          searchingData.map((fileData) => {
            return (
              <div className={"files" + " " + fileData.fileCount}>
                <div className="header">
                  <h3>{fileData.fileName}</h3>
                  <div className="date">
                    <h4>{fileData.currDate}</h4>
                    <div className="btn">
                      <button onClick={(e = this) => props.editFile(e)}>
                        <img src={Pen} />
                      </button>
                      <button onClick={(e = this) => props.dltFile(e)}>
                        <img src={Trash} />
                      </button>
                      <button onClick={(e = this) => props.saveFile(e)}>
                        <FaSave size={20} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="transaction_container">
                  <div className="upper">
                    <h3>Net Balance</h3>
                    <div className="amt">{fileData.balance} $</div>
                  </div>
                  <div className="transactions">
                    {fileData.transArr.length !== 0 &&
                      fileData.transArr.map((trans) => {
                        let symbol;
                        if (trans[0] === "moneyIncrement") {
                          symbol = "+ ";
                        } else {
                          symbol = "- ";
                        }
                        let arr =
                          trans[0] === "moneyIncrement"
                            ? ["green", "green_box"]
                            : ["red", "red_box"];
                        return (
                          <div className="transaction">
                            <div className="details">
                              <div className={"Description" + " " + arr[0]}>
                                {trans[1]}
                              </div>
                              <div className={"amount" + " " + arr[0]}>
                                {symbol} $ {trans[2]}
                              </div>
                            </div>
                            <div
                              className={
                                trans[0] === "moneyIncrement"
                                  ? "tag green"
                                  : "tag  red"
                              }
                            ></div>
                          </div>
                        );
                      })}
                  </div>
                  <div className="erEx">
                    <div className="er">${fileData.er}</div>
                    <div className="ex">${fileData.ex}</div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}
