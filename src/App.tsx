import Transfer from "./components/Transfer";
import Expense from "./components/Expense";
import Income from "./components/Income";
import Target from "./components/Target";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

function App() {
  const [totalIncomeAmount, setTotalIncomeAmount] = useState(0);
  const [totalExpenseAmount, setTotalExpenseAmount] = useState(0);
  const [transferToSavingAmount, setTransferToSavingAmount] = useState(0);

  const getTotalIncome = (amount: number) => {
    setTotalIncomeAmount(amount);
  };

  const getTotalExpense = (amount: number) => {
    setTotalExpenseAmount(amount);
  };

  const getTransferToSavingAmount = (amount: number) => {
    setTransferToSavingAmount(amount);
  };

  return (
    <>
      <div className="App">
        <ToastContainer />
        <div className="container text-center">
          <p className="h1 mt-5 mb-5">Billy's Budget App</p>
          <div className="row align-items-start">
            <div className="col col-border px-5">
              <Income onGetTotalIncome={getTotalIncome} />
            </div>
            <div className="col col-border px-5">
              <Expense onGetTotalExpense={getTotalExpense} />
            </div>
            <div className="col px-5">
              <Target transferToSavingAmount={transferToSavingAmount} />
            </div>
          </div>
          <div className="row align-items-center mt-5">
            <div className="col px-5 mt-5">
              <Transfer
                totalIncomeAmount={totalIncomeAmount}
                totalExpenseAmount={totalExpenseAmount}
                onGetTransferToSavingAmount={getTransferToSavingAmount}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
