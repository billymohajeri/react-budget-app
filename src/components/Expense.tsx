export const Expense = () => {
  return (
    <>
      <p className="h2">Expense</p>

      <label htmlFor="expense-source" className="form-label mt-5">
        Expense source
      </label>
      <input type="text" className="form-control" id="expense-source" />

      <label htmlFor="amount-expense" className="form-label mt-3">
        Amount of expense
      </label>
      <div className="input-group mb-3">
        <span className="input-group-text">€</span>
        <input
          type="number"
          id="amount-expense"
          className="form-control"
          aria-label="Amount (to the nearest dollar)"
          min={0}
        />
        <span className="input-group-text">.00</span>
      </div>

      <div className="mt-3 mb-5">
        <label htmlFor="dateInput" className="form-label">
          Date of expense
        </label>
        <input
          type="date"
          className="form-control"
          id="date-input-expense"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Add expense
      </button>
    </>
  );
};
