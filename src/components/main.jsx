import React, { useEffect, useState } from "react";
import Transaction from "./transaction";
import Save from "./icons/save.png";
import New from "./icons/new.png";

export default function Main(props) {
  // CRUD OPERATIONS
  // LocalStorage : balance , Expense ,Earning , transactions
  // Hamburger Menu
  // PreLoader

  if (localStorage.getItem("Balance") === null)
    localStorage.setItem("Balance", 0);
  if (localStorage.getItem("Er") === null) localStorage.setItem("Er", 0);
  if (localStorage.getItem("Ex") === null) localStorage.setItem("Ex", 0);
  if (localStorage.getItem("Trans") === null)
    localStorage.setItem("Trans", JSON.stringify([]));

  const [cash, setCash] = useState(0);
  const [description, setDescription] = useState("");
  const [balance, setBalance] = useState(
    Number.parseInt(localStorage.getItem("Balance")).length > 0
      ? 0
      : Number.parseInt(localStorage.getItem("Balance"))
  );
  const [earningBtn, setEarningBtn] = useState(
    Number.parseInt(localStorage.getItem("Er")).length > 0
      ? 0
      : Number.parseInt(localStorage.getItem("Er"))
  );
  const [expenseBtn, setExpenseBtn] = useState(
    Number.parseInt(localStorage.getItem("Ex")).length > 0
      ? 0
      : Number.parseInt(localStorage.getItem("Ex"))
  );

  const [transArr, setTransArr] = useState(
    JSON.parse(localStorage.getItem("Trans"))
  );

  const [transactionData, setTransactionData] = useState(
    JSON.parse(localStorage.getItem("Trans"))
  );

  const [listener, setListener] = useState(true);

  // Transaction Id
  const [IdNum, setIdNum] = useState(
    Number.parseInt(localStorage.getItem("IdNum")) + 1
  );
  let transId;

  let transData;

  useEffect(() => {
    console.log("editFileData", props.editFileData);

    // Process the first valid data object in editFileData
    const data =
      Array.isArray(props.editFileData) && props.editFileData.length > 0
        ? props.editFileData[0]
        : null;
    console.log("data1", data);
    if (data) {
      console.log("data2", data);

      // Update state with safe parsing
      const newBalance = data.balance
        ? parseInt(data.balance, 10) || balance
        : balance;
      const newEarning = data.er
        ? parseInt(data.er, 10) || earningBtn
        : earningBtn;
      const newExpense = data.ex
        ? parseInt(data.ex, 10) || expenseBtn
        : expenseBtn;
      const newTransData = data.transArr || transactionData;

      setBalance(newBalance);
      setEarningBtn(newEarning);
      setExpenseBtn(newExpense);
      setTransactionData(newTransData);

      // Update transArr if distinct (assuming same as transactionData for now)
      setTransArr(newTransData);

      // Handle transactions and ID
      if (newTransData.length > 0) {
        const lastTransId = newTransData[newTransData.length - 1][3] || "";
        const idNumber = parseInt(lastTransId.slice(5), 10) || 0;
        setIdNum(idNumber + 1);

        // Save to localStorage
        localStorage.setItem("Trans", JSON.stringify(newTransData));
        localStorage.setItem("IdNum", idNumber.toString());
      }

      // Save state to localStorage
      localStorage.setItem("Balance", newBalance.toString());
      localStorage.setItem("Er", newEarning.toString());
      localStorage.setItem("Ex", newExpense.toString());

      // Clear file data
      props.editingFileData([]);
    }
  }, [props.editingFileData, balance, earningBtn, expenseBtn, transactionData]);

  // Reset
  const reset = () => {
    if (localStorage.getItem("Balance") !== null) {
      localStorage.setItem("Balance", 0);
    }
    if (localStorage.getItem("Er") !== null) localStorage.setItem("Er", 0);
    if (localStorage.getItem("Ex") !== null) localStorage.setItem("Ex", 0);
    if (localStorage.getItem("Trans") !== null) {
      localStorage.setItem("Trans", JSON.stringify([]));
      localStorage.setItem("IdNum", 0);
    }

    setBalance(0);
    setEarningBtn();
    setExpenseBtn(0);
    setIdNum(0);

    setTransactionData([]);
    setTransArr([]);
  };

  let EarningTrans = () => {
    setBalance(balance + Number.parseInt(cash));
    setEarningBtn(earningBtn + Number.parseInt(cash));

    setIdNum(IdNum + 1);
    transId = `trans${IdNum}`;

    setTransactionData((transactionData) => {
      const newData = [
        ...transactionData,
        ["moneyIncrement", description, cash, transId],
      ];
      setCash(0);
      setDescription("");
      return newData;
    });
    setTimeout(() => {
      let balanceElem = document.querySelector("#balance").innerText;
      localStorage.setItem(
        "Balance",
        balanceElem.slice(0, balanceElem.length - 2)
      );

      let ErElem = document.querySelector("#amount_in").innerText;
      localStorage.setItem("Er", ErElem.slice(1));

      let transDataElem = document.querySelector(`.${transId}`);
      let details = transDataElem.children[0];
      let cashDetails = details.children[1].innerText.slice(4);
      let descDetails = details.children[0].innerText;

      transData = ["moneyIncrement", descDetails, cashDetails, transId];

      localStorage.setItem("IdNum", IdNum);

      setTransArr((transArr) => {
        const newData = [...transArr, transData];
        localStorage.setItem("Trans", JSON.stringify(newData));
        return newData;
      });
    }, 100);
  };
  let ExpenseTrans = () => {
    setBalance(balance - Number.parseInt(cash));
    setExpenseBtn(expenseBtn + Number.parseInt(cash));

    setIdNum(IdNum + 1);
    transId = `trans${IdNum}`;

    setTransactionData((transactionData) => {
      const newData = [
        ...transactionData,
        ["moneyDecrement", description, cash, transId],
      ];
      setCash(0);
      setDescription("");
      return newData;
    });

    setTimeout(() => {
      let balanceElem = document.querySelector("#balance").innerText;
      localStorage.setItem(
        "Balance",
        balanceElem.slice(0, balanceElem.length - 2)
      );

      let ExElem = document.querySelector("#amount_out").innerText;
      localStorage.setItem("Ex", ExElem.slice(1));

      let transDataElem = document.querySelector(`.${transId}`);
      let details = transDataElem.children[0];
      let cashDetails = details.children[1].innerText.slice(4);
      let descDetails = details.children[0].innerText;

      transData = ["moneyDecrement", descDetails, cashDetails, transId];

      setTransArr((transArr) => {
        const newData = [...transArr, transData];
        localStorage.setItem("Trans", JSON.stringify(newData));
        return newData;
      });
    }, 100);
  };
  let dlt = (elem) => {
    let target = elem.target.parentElement.parentElement.parentElement;
    let mixedValue = target.children[0].children[1].innerText;
    let dltCash = Number.parseInt(mixedValue.slice(3));
    let dltId = target.classList[0];

    if (target.id === "moneyIncrement") {
      setBalance(balance - dltCash);

      setEarningBtn(earningBtn - dltCash);

      setTransactionData((transactionData) => {
        const newDate = transactionData.filter((i) => {
          return !(i[3] === dltId);
        });
        return newDate;
      });
    } else if (target.id === "moneyDecrement") {
      setBalance(balance + dltCash);

      setExpenseBtn(expenseBtn - dltCash);

      setTransactionData((transactionData) => {
        const newDate = transactionData.filter((i) => {
          return !(i[3] === dltId);
        });
        return newDate;
      });
    }
    setTimeout(() => {
      let balanceElem = document.querySelector("#balance").innerText;
      localStorage.setItem(
        "Balance",
        balanceElem.slice(0, balanceElem.length - 2)
      );

      let ErElem = document.querySelector("#amount_in").innerText;
      localStorage.setItem("Er", ErElem.slice(1));

      let ExElem = document.querySelector("#amount_out").innerText;
      localStorage.setItem("Ex", ExElem.slice(1));

      setTransArr((transArr) => {
        const newData = transArr.filter((i) => {
          return !(i[3] === dltId);
        });
        localStorage.setItem("Trans", JSON.stringify(newData));
        return newData;
      });
    }, 100);
  };

  let modify = (elem) => {
    setListener(false);

    let target = elem.target.parentElement.parentElement.parentElement;
    let mixedValue = target.children[0].children[1].innerText;
    let transDes = target.children[0].children[0].innerText;
    let dltCash = Number.parseInt(mixedValue.slice(3));
    let dltId = target.classList[0];

    let erBtn = document.querySelector("#money_in");
    let exBtn = document.querySelector("#money_out");

    let type;
    let sign;

    setCash(dltCash);
    setDescription(transDes);

    let updateEr = () => {
      if (target.id === "moneyDecrement") {
        sign = "+";
        setExpenseBtn(expenseBtn - dltCash);
      } else {
        sign = "-";
      }
      type = "moneyIncrement";

      setBalance(
        eval(balance + sign + dltCash) +
          Number.parseInt(document.querySelector("#amount").value)
      );
      setEarningBtn(
        eval(earningBtn + sign + (sign === "+" ? 0 : dltCash)) +
          Number.parseInt(document.querySelector("#amount").value)
      );

      erBtn.removeEventListener("click", updateEr);
      exBtn.removeEventListener("click", updateEx);

      setDescription(document.querySelector("#amount_description").value);

      setTransactionData((transactionData) => {
        transactionData = transactionData.filter((i) => {
          if (i[3] === dltId) {
            i[0] = type;
            i[1] = document.querySelector("#amount_description").value;
            i[2] = document.querySelector("#amount").value;
          }
          return i;
        });
        return transactionData;
      });

      setTimeout(() => {
        let balanceElem = document.querySelector("#balance").innerText;
        localStorage.setItem(
          "Balance",
          balanceElem.slice(0, balanceElem.length - 2)
        );

        let ErElem = document.querySelector("#amount_in").innerText;
        localStorage.setItem("Er", ErElem.slice(1));

        let ExElem = document.querySelector("#amount_out").innerText;
        localStorage.setItem("Ex", ExElem.slice(1));

        setTransArr((transArr) => {
          transArr = transArr.filter((i) => {
            if (i[3] === dltId) {
              i[0] = type;
              i[1] = document.querySelector("#amount_description").value;
              i[2] = document.querySelector("#amount").value;
            }
            return i;
          });
          localStorage.setItem("Trans", JSON.stringify(transArr));
          return transArr;
        });
      }, 100);
      setTimeout(() => {
        setCash(0);
        setDescription("");
        setListener(true);
      }, 300);
    };

    let updateEx = () => {
      if (target.id === "moneyIncrement") {
        sign = "-";
        setEarningBtn(earningBtn - dltCash);
      } else {
        sign = "+";
      }

      type = "moneyDecrement";

      setBalance(
        eval(balance + sign + dltCash) -
          Number.parseInt(document.querySelector("#amount").value)
      );

      setExpenseBtn(
        eval(
          expenseBtn + (sign === "+" ? "-" : "+") + (sign === "-" ? 0 : dltCash)
        ) + Number.parseInt(document.querySelector("#amount").value)
      );

      erBtn.removeEventListener("click", updateEr);
      exBtn.removeEventListener("click", updateEx);

      setDescription(document.querySelector("#amount_description").value);

      setTransactionData((transactionData) => {
        transactionData = transactionData.filter((i) => {
          if (i[3] === dltId) {
            i[0] = type;
            i[1] = document.querySelector("#amount_description").value;
            i[2] = document.querySelector("#amount").value;
          }
          return i;
        });
        return transactionData;
      });
      setTimeout(() => {
        let balanceElem = document.querySelector("#balance").innerText;
        localStorage.setItem(
          "Balance",
          balanceElem.slice(0, balanceElem.length - 2)
        );

        let ErElem = document.querySelector("#amount_in").innerText;
        localStorage.setItem("Er", ErElem.slice(1));

        let ExElem = document.querySelector("#amount_out").innerText;
        localStorage.setItem("Ex", ExElem.slice(1));

        setTransArr((transArr) => {
          transArr = transArr.filter((i) => {
            if (i[3] === dltId) {
              i[0] = type;
              i[1] = document.querySelector("#amount_description").value;
              i[2] = document.querySelector("#amount").value;
            }
            return i;
          });
          localStorage.setItem("Trans", JSON.stringify(transArr));
          return transArr;
        });
      }, 100);
      setTimeout(() => {
        setCash(0);
        setDescription("");
        setListener(true);
      }, 300);
    };
    erBtn = document.querySelector("#money_in");
    exBtn = document.querySelector("#money_out");

    erBtn.addEventListener("click", updateEr);
    exBtn.addEventListener("click", updateEx);
  };
  return (
    <main>
      <section id="header_section">
        <header id="header">Balance sheet</header>
        <h1 id="balance">{balance} $</h1>
        <h1>Your Balance</h1>
      </section>
      <section id="balance_sheet">
        <div id="segment">
          <h2>Transactions</h2>
          <div className="btn">
            <button id="reset_btn" onClick={() => reset()}>
              <img src={New} />
            </button>
            <button id="save_btn" onClick={() => props.showing()}>
              <img src={Save} />
            </button>
          </div>
        </div>
        <div id="transactions_box">
          {transactionData.length !== 0 &&
            transactionData.map((transaction) => {
              let symbol;
              if (transaction[0] === "moneyIncrement") {
                symbol = "+ ";
              } else {
                symbol = "- ";
              }
              let arr =
                transaction[0] === "moneyIncrement"
                  ? ["green", "green_box"]
                  : ["red", "red_box"];

              return (
                <Transaction
                  modify={modify}
                  dlt={dlt}
                  arr={arr}
                  Id={transaction[0]}
                  class={transaction[3]}
                  description={transaction[1]}
                  cash={`${symbol} $ ${transaction[2]}`}
                />
              );
            })}
        </div>
      </section>
      <section id="user_input">
        <h2>Add Transactions</h2>
        <div id="inputs">
          <div id="left">
            <label htmlFor="text">Text</label>
            <input
              type="text"
              id="amount_description"
              name="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div id="right">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="Amount"
              value={cash}
              onChange={(e) => {
                setCash(
                  e.target.value === "" ? 0 : Number.parseInt(e.target.value)
                );
              }}
            />
          </div>
        </div>
        <div id="btn">
          <button
            id="money_in"
            onClick={listener ? () => EarningTrans() : null}
          >
            <p id="amount_in">$ {earningBtn >= 0 ? earningBtn : 0}</p>
            <p>Earning</p>
          </button>
          <button
            id="money_out"
            onClick={listener ? () => ExpenseTrans() : null}
          >
            <p id="amount_out">$ {expenseBtn >= 0 ? expenseBtn : 0}</p>
            <p>Expense</p>
          </button>
        </div>
      </section>
    </main>
  );
}
