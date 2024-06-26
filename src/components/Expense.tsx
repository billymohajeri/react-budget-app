import { ChangeEvent, FormEvent, useState } from "react";
import { TransactionType } from "../types";

import { toast } from "react-toastify";
import { nanoid } from "nanoid";

export const Expense = () => {
  const [expense, setExpense] = useState<TransactionType>({
    source: "",
    amount: 0,
    date: "",
  });
  const [expenses, setExpenses] = useState<TransactionType[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setExpense((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleExpenseSubmit = (event: FormEvent) => {
    event.preventDefault();
    const newExpense: TransactionType = {
      id: nanoid(),
      source: expense.source,
      amount: Number(expense.amount),
      date: expense.date,
    };
    toast.success(`${newExpense.source} added successfully!`);
    setExpense({
      source: "",
      amount: 0,
      date: "",
    });
    setExpenses((prevExpenses) => {
      return [...prevExpenses, newExpense];
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
      <p className="h2">Expense</p>
      <form onSubmit={handleExpenseSubmit}>
        <label htmlFor="expenseSource" className="form-label mt-5">
          Expense source
        </label>
        <input
          type="text"
          className="form-control"
          id="expenseSource"
          name="expenseSource"
          value={expense.source}
          required
          onChange={handleChange}
        />

        <label htmlFor="expenseAmount" className="form-label mt-3">
          Amount of expense
        </label>
        <div className="input-group mb-3">
          <span className="input-group-text">€</span>
          <input
            type="number"
            id="expenseAmount"
            name="expenseAmount"
            value={expense.amount}
            className="form-control"
            aria-label="Amount (to the nearest euro)"
            min={0}
            required
            onChange={handleChange}
          />
          <span className="input-group-text">.00</span>
        </div>

        <div className="mt-3 mb-5">
          <label htmlFor="expenseDate" className="form-label">
            Date of expense
          </label>
          <input
            type="date"
            className="form-control"
            id="expenseDate"
            name="expenseDate"
            value={expense.date}
            required
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add expense
        </button>
      </form>

      {expenses && expenses.length > 0 ? (
        <ul className="mt-5 list">
          {expenses.map((expense) => {
            return (
              <li key={expense.id}>
                {expense.source}: {expense.amount}EUR on{" "}
                {formatDate(expense.date)}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="mb-5 mt-5">There is no expense in the list</p>
      )}
    </>
  );
};
