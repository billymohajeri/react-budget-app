import { today } from "../App";

const Income = () => {
  return (
    <>
      <p className="h2">Income</p>

      <label htmlFor="income-source" className="form-label mt-5">
        Income source
      </label>
      <input type="text" className="form-control" id="income-source" />

      <label htmlFor="amount-source" className="form-label mt-3">
        Amount of income
      </label>
      <div className="input-group mb-3">
        <span className="input-group-text">$</span>
        <input
          type="number"
          id="amount-source"
          className="form-control"
          aria-label="Amount (to the nearest dollar)"
          min={1}
          defaultValue={1}
        />
        <span className="input-group-text">.00</span>
      </div>

      <div className="mt-3 mb-5">
        <label htmlFor="dateInput" className="form-label">
          Date of income
        </label>
        <input
          type="date"
          className="form-control"
          id="dateInput"
          defaultValue={today}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Add income
      </button>
    </>
  );
};

export default Income;
