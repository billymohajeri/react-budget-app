import { useState, useEffect } from "react";
import { TransactionType } from "../types";

import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

type IncomeProps = {
  onGetTotalIncome: (amount: number) => void;
};

const incomeSchema = z.object({
  source: z.string().min(1, "Income source is required"),
  amount: z.number().min(1, "The amount can't be negative or zero"),
  date: z.string().min(1, "Date is required"),
});

const Income = (props: IncomeProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransactionType>({
    resolver: zodResolver(incomeSchema),
    defaultValues: { source: "", amount: 0, date: "" },
  });
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
    toast.info(`${data.source} added successfully!`);
    setIncomes((prevIncomes) => [...prevIncomes, newIncome]);
    reset();
  };

  const handleDelete = (id: string) => {
    setIncomes((prevIncomes) =>
      prevIncomes.filter((income) => income.id !== id)
    );
    toast.info("Income entry deleted.");
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    return formatter.format(date).replace(/,/g, "");
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
          {...register("source")}
        />
        {errors.source && (
          <p className="text-danger">{errors.source.message}</p>
        )}

        <label htmlFor="incomeAmount" className="form-label mt-3">
          Amount of income
        </label>
        <div className="input-group">
          <span className="input-group-text">€</span>
          <input
            type="number"
            id="incomeAmount"
            {...register("amount", { valueAsNumber: true })}
            className="form-control"
            aria-label="Amount (to the nearest euro)"
          />
          <span className="input-group-text">.00</span>
        </div>
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}

        <div className="mt-3">
          <label htmlFor="incomeDate" className="form-label">
            Date of income
          </label>
          <input
            type="date"
            className="form-control"
            id="incomeDate"
            {...register("date")}
          />
        </div>
        {errors.date && <p className="text-danger">{errors.date.message}</p>}

        <button type="submit" className="btn btn-primary mt-5">
          Add income
        </button>
      </form>

      {incomes.length > 0 ? (
        <ul className="mt-5 list-unstyled">
          {incomes.map((income) => (
            <li
              key={income.id}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                {income.source}: {income.amount}EUR on {formatDate(income.date)}
              </div>
              <FontAwesomeIcon
                icon={faTrash}
                className="text-danger ms-3"
                style={{ cursor: "pointer" }}
                onClick={() => handleDelete(income.id)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-5">There is no income in the list</p>
      )}
    </>
  );
};

export default Income;
