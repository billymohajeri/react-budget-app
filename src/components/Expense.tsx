import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { nanoid } from 'nanoid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { TransactionType } from '../types';

type ExpenseProps = {
  expenses: TransactionType[];
  addExpense: (expense: TransactionType) => void;
  deleteExpense: (id: string) => void;
};

const expenseSchema = z.object({
  source: z.string().min(1, "Expense source is required"),
  amount: z.number().min(1, "The amount can't be negative or zero"),
  date: z.string().min(1, "Date is required"),
});

const Expense = ({ expenses, addExpense, deleteExpense }: ExpenseProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransactionType>({
    resolver: zodResolver(expenseSchema),
    defaultValues: { source: "", amount: 0, date: "" },
  });

  const onSubmit = (data: TransactionType) => {
    const newExpense: TransactionType = {
      id: nanoid(),
      source: data.source,
      amount: Number(data.amount),
      date: data.date,
    };
    addExpense(newExpense);
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

    return formatter.format(date).replace(/,/g, "");
  };

  return (
    <>
      <p className="h2">Expense</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="expenseSource" className="form-label mt-5">
          Expense source
        </label>
        <input
          type="text"
          className="form-control"
          id="expenseSource"
          {...register("source")}
        />
        {errors.source && (
          <p className="text-danger">{errors.source.message}</p>
        )}

        <label htmlFor="expenseAmount" className="form-label mt-3">
          Amount of expense
        </label>
        <div className="input-group">
          <span className="input-group-text">€</span>
          <input
            type="number"
            id="expenseAmount"
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
          <label htmlFor="expenseDate" className="form-label">
            Date of expense
          </label>
          <input
            type="date"
            className="form-control"
            id="expenseDate"
            {...register("date")}
          />
        </div>
        {errors.date && <p className="text-danger">{errors.date.message}</p>}

        <button type="submit" className="btn btn-primary mt-5">
          Add expense
        </button>
      </form>

      {expenses.length > 0 ? (
        <ul className="mt-5 list-unstyled">
          {expenses.map((expense) => (
            <li key={expense.id} className="d-flex justify-content-between align-items-center">
              <div>
                {expense.source}: {expense.amount}EUR on {formatDate(expense.date)}
              </div>
              <FontAwesomeIcon 
                icon={faTrash} 
                className="text-danger ms-3" 
                style={{ cursor: 'pointer' }} 
                onClick={() => deleteExpense(expense.id)} 
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-5">There is no expense in the list</p>
      )}
    </>
  );
};

export default Expense;
