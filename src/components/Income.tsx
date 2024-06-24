import { ChangeEvent, FormEvent } from "react";
import { today } from "../App";

const Income = () => {
  const handleChangeIncome = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  const handleIncomeSubmit = (event: FormEvent) => {
    console.log("Form is submitted");
    event.preventDefault();
  };

  return (
    <>
      <p className="h2">Income</p>
      <form onSubmit={handleIncomeSubmit}>
        <label htmlFor="income-source" className="form-label mt-5">
          Income source
        </label>
        <input
          type="text"
          className="form-control"
          id="income-source"
          required
          onChange={handleChangeIncome}
        />

        <label htmlFor="amount-source" className="form-label mt-3">
          Amount of income
        </label>
        <div className="input-group mb-3">
          <span className="input-group-text">€</span>
          <input
            type="number"
            id="amount-source"
            className="form-control"
            aria-label="Amount (to the nearest euro)"
            min={0}
            defaultValue={0}
            required
          />
          <span className="input-group-text">.00</span>
        </div>

        <div className="mt-3 mb-5">
          <label htmlFor="date-input-income" className="form-label">
            Date of income
          </label>
          <input
            type="date"
            className="form-control"
            id="date-input-income"
            defaultValue={today}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add income
        </button>
      </form>
    </>
  );
};

export default Income;
