import { ChangeEvent, FormEvent, useState } from "react";
import { TransactionType } from "../types";

import { toast } from "react-toastify";
import { nanoid } from "nanoid";

const Income = () => {
  const [income, setIncome] = useState<TransactionType>({
    source: "",
    amount: 0,
    date: "",
  });
  const [incomes, setIncomes] = useState<TransactionType[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIncome((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleIncomeSubmit = (event: FormEvent) => {
    event.preventDefault();
    const newIncome: TransactionType = {
      id: nanoid(),
      source: income.source,
      amount: Number(income.amount),
      date: income.date,
    };
    toast.success(`${newIncome.source} added successfully!`);
    setIncome({
      source: "",
      amount: 0,
      date: "",
    });
    setIncomes((prevIncomes) => {
      return [...prevIncomes, newIncome];
    });
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const formattedDate = formatter.format(date).replace(/,/g, "");
    return formattedDate;
  };

  return (
    <>
      <p className="h2">Income</p>
      <form onSubmit={handleIncomeSubmit}>
        <label htmlFor="incomeSource" className="form-label mt-5">
          Income source
        </label>
        <input
          type="text"
          className="form-control"
          id="incomeSource"
          name="incomeSource"
          value={income.source}
          required
          onChange={handleChange}
        />

        <label htmlFor="incomeAmount" className="form-label mt-3">
          Amount of income
        </label>
        <div className="input-group mb-3">
          <span className="input-group-text">€</span>
          <input
            type="number"
            id="incomeAmount"
            name="incomeAmount"
            value={income.amount}
            className="form-control"
            aria-label="Amount (to the nearest euro)"
            min={0}
            required
            onChange={handleChange}
          />
          <span className="input-group-text">.00</span>
        </div>

        <div className="mt-3 mb-5">
          <label htmlFor="incomeDate" className="form-label">
            Date of income
          </label>
          <input
            type="date"
            className="form-control"
            id="incomeDate"
            name="incomeDate"
            value={income.date}
            required
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add income
        </button>
      </form>

      {incomes && incomes.length > 0 ? (
        <ul className="mt-5 list">
          {incomes.map((income) => {
            return (
              <li key={income.id}>
                {income.source}: {income.amount}EUR on {formatDate(income.date)}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="mt-5">There is no income in the list</p>
      )}
    </>
  );
};

export default Income;
