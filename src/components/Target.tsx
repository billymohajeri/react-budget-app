import React from "react";

const Target = () => {
  return (
    <>
      <p className="h2">Target</p>

      <label htmlFor="amount-expense" className="form-label mt-5">
        Set target
      </label>
      <div className="input-group mb-3">
        <span className="input-group-text">$</span>
        <input
          type="number"
          id="amount-expense"
          className="form-control"
          aria-label="Amount (to the nearest dollar)"
          min={1}
          defaultValue={1}
        />
        <span className="input-group-text">.00</span>
      </div>

      <button type="submit" className="btn btn-outline-danger">
        Reset
      </button>
    </>
  );
};

export default Target;
