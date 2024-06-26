import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { TransactionType } from "../types";

import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";

type IncomeProps = {
  onGetTotalIncome: (amount: number) => void;
};

const Income = (props: IncomeProps) => {
  const { register, watch, handleSubmit, reset } = useForm<TransactionType>();
  const [incomes, setIncomes] = useState<TransactionType[]>([]);

  useEffect(() => {
    const totalIncome = incomes.reduce(
      (total, currentIncome) => total + currentIncome.amount,
      0
    );

    props.onGetTotalIncome(totalIncome);
  }, [incomes, props]);

  const onSubmit = (data: TransactionType) => {
    const newIncome: TransactionType = {
      id: nanoid(),
      source: data.source,
      amount: Number(data.amount),
      date: data.date,
    };
    toast.success(`${data.source} added successfully!`);
    setIncomes((prevIncomes) => [...prevIncomes, newIncome]);
    reset();
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="incomeSource" className="form-label mt-5">
          Income source
        </label>
        <input
          type="text"
          className="form-control"
          id="incomeSource"
          {...register("source", { required: true })}
        />

        <label htmlFor="incomeAmount" className="form-label mt-3">
          Amount of income
        </label>
        <div className="input-group mb-3">
          <span className="input-group-text">€</span>
          <input
            type="number"
            id="incomeAmount"
            {...register("amount", { required: true, min: 0 })}
            className="form-control"
            aria-label="Amount (to the nearest euro)"
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
            {...register("date", { required: true })}
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
