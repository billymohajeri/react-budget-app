const Target = () => {
  return (
    <>
      <p className="h2">Target</p>

      <label htmlFor="amount-target" className="form-label mt-5">
        Set target
      </label>
      <div className="input-group">
        <span className="input-group-text">€</span>
        <input
          type="number"
          id="amount-target"
          className="form-control"
          aria-label="Amount (to the nearest dollar)"
          min={0}
        />
        <span className="input-group-text">.00</span>
      </div>

      <button type="submit" className="btn btn-outline-danger mt-2">
        Reset
      </button>
      <p className="mt-2">
        Current saving:
      </p>
      <p className="mt-2">
        Target:
      </p>
      <p className="mt-0">
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
