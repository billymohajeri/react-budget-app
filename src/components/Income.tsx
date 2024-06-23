import React from "react";

const Income = () => {
  return (
    <div>
      <p className="h2">Income</p>
      <label htmlFor="income-source" className="form-label mt-5">
        Income source
      </label>
      <input type="text" className="form-control" id="income-source" />
      <label htmlFor="income-source" className="form-label mt-3">
        Amount of income
      </label>
      <input type="number" className="form-control" id="income-source" />

      <div className="mt-3 mb-5">
        <label htmlFor="dateInput" className="form-label">
          Date of income
        </label>
        <input type="date" className="form-control" id="dateInput" />
      </div>

      <button type="submit" className="btn btn-primary">
        Add Income
      </button>
    </div>
  );
};

export default Income;
