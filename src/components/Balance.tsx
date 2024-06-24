import React from "react";

export const Balance = () => {
  return (
    <div className="balance-container">
      <p className="h2">Balance</p>
      <p className="mt-5">Current balance:</p>
      <label htmlFor="amount-source" className="form-label mt-3">
        Transfer to saving account
      </label>
      <div className="input-group mb-3" id="balance-input">
        <span className="input-group-text">€</span>
        <input
          type="number"
          id="amount-balance"
          className="form-control"
          aria-label="Amount (to the nearest dollar)"
          min={0}
          defaultValue={0}
        />
        <span className="input-group-text">.00</span>
      </div>

      <button type="submit" className="btn btn-primary">
        Transfer
      </button>
    </div>
  );
};
