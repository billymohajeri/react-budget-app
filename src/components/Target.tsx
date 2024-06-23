import React from "react";

const Target = () => {
  return (
    <>
      <p className="h2">Target</p>

      <label htmlFor="amount-expense" className="form-label mt-5">
        Set target
      </label>
      <div className="input-group mb-3">
        <span className="input-group-text">€</span>
        <input
          type="number"
          id="amount-expense"
          className="form-control"
          aria-label="Amount (to the nearest dollar)"
          min={0}
          defaultValue={0}
        />
        <span className="input-group-text">.00</span>
      </div>

      <button type="submit" className="btn btn-outline-danger mt-3">
        Reset
      </button>
      <p className="mt-5">
        Progress:
      </p>
      <div
        className="progress"
        role="progressbar"
        aria-label="Example with label"
        aria-valuenow={25}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          style={{ width: "25%" }}
        >
          25%
        </div>
      </div>
    </>
  );
};

export default Target;
