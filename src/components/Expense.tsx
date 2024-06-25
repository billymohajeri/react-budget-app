import { ChangeEvent, FormEvent, useState } from "react";

import { toast } from "react-toastify";
import { nanoid } from "nanoid";

type ExpenseType = {
  id?: string;
  expenseSource: string;
  expenseAmount: number;
  expenseDate: string;
};

export const Expense = () => {
  const [expense, setExpense] = useState<ExpenseType>({
    expenseSource: "",
    expenseAmount: 0,
    expenseDate: "",
  });
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setExpense((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleExpenseSubmit = (event: FormEvent) => {
    event.preventDefault();
    const newExpense = {
      id: nanoid(),
      expenseSource: expense.expenseSource,
      expenseAmount: Number(expense.expenseAmount),
      expenseDate: expense.expenseDate,
    };
    toast.success(`${newExpense.expenseSource} added successfully!`);
    setExpense({
      expenseSource: "",
      expenseAmount: 0,
      expenseDate: "",
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
          value={expense.expenseSource}
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
            value={expense.expenseAmount}
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
            value={expense.expenseDate}
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
                {expense.expenseSource}: {expense.expenseAmount}EUR on{" "}
                {formatDate(expense.expenseDate)}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="mt-5">There is no expense in the list</p>
      )}
    </>
  );
};
