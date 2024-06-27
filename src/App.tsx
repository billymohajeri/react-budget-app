import Transfer from "./components/Transfer";
import Expense from "./components/Expense";
import Income from "./components/Income";
import Target from "./components/Target";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { TransactionType } from "./types";

const LOCAL_STORAGE_INCOMES_KEY = "incomes";
const LOCAL_STORAGE_EXPENSES_KEY = "expenses";

function App() {
  const [incomes, setIncomes] = useState<TransactionType[]>([]);
  const [expenses, setExpenses] = useState<TransactionType[]>([]);
  const [totalIncomeAmount, setTotalIncomeAmount] = useState(0);
  const [totalExpenseAmount, setTotalExpenseAmount] = useState(0);
  const [transferToSavingAmount, setTransferToSavingAmount] = useState(0);

  useEffect(() => {
    const storedIncomes = localStorage.getItem(LOCAL_STORAGE_INCOMES_KEY);
    const storedExpenses = localStorage.getItem(LOCAL_STORAGE_EXPENSES_KEY);

    if (storedIncomes) {
      const parsedIncomes = JSON.parse(storedIncomes);
      setIncomes(parsedIncomes);
      const total = parsedIncomes.reduce(
        (acc: number, income: TransactionType) => acc + income.amount,
        0
      );
      setTotalIncomeAmount(total);
    }

    if (storedExpenses) {
      const parsedExpenses = JSON.parse(storedExpenses);
      setExpenses(parsedExpenses);
      const total = parsedExpenses.reduce(
        (acc: number, expense: TransactionType) => acc + expense.amount,
        0
      );
      setTotalExpenseAmount(total);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_INCOMES_KEY, JSON.stringify(incomes));
  }, [incomes]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_EXPENSES_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const addIncome = (income: TransactionType) => {
    setIncomes((prevIncomes) => [...prevIncomes, income]);
    setTotalIncomeAmount((prevTotal) => prevTotal + income.amount);
    toast.info(`${income.source} added successfully!`);
  };

  const deleteIncome = (id: string) => {
    setIncomes((prevIncomes) =>
      prevIncomes.filter((income) => income.id !== id)
    );
    const income = incomes.find((income) => income.id === id);
    if (income) {
      setTotalIncomeAmount((prevTotal) => prevTotal - income.amount);
      toast.info(`${income.source} deleted successfully!`);
    }
  };

  const addExpense = (expense: TransactionType) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
    setTotalExpenseAmount((prevTotal) => prevTotal + expense.amount);
    toast.info(`${expense.source} added successfully!`);
  };

  const deleteExpense = (id: string) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
    const expense = expenses.find((expense) => expense.id === id);
    if (expense) {
      setTotalExpenseAmount((prevTotal) => prevTotal - expense.amount);
      toast.info(`${expense.source} deleted successfully!`);
    }
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
              <Income
                incomes={incomes}
                addIncome={addIncome}
                deleteIncome={deleteIncome}
              />
            </div>
            <div className="col col-border px-5">
              <Expense
                expenses={expenses}
                addExpense={addExpense}
                deleteExpense={deleteExpense}
              />
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
