import { ChangeEvent, FormEvent, useState } from "react";

const Target = () => {
  const [target, setTarget] = useState(0);

  const handleTargetChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTarget(Number(event.target.value));
  };

  const handleIncomeSubmit = (event: FormEvent) => {
    event.preventDefault();
    setTarget(0);
  };

  return (
    <>
      <p className="h2">Target</p>
      <form onSubmit={handleIncomeSubmit}>
        <label htmlFor="targetAmount" className="form-label mt-5">
          Set target
        </label>
        <div className="input-group mb-3">
          <span className="input-group-text">€</span>
          <input
            type="number"
            id="targetAmount"
            name="targetAmount"
            value={target}
            className="form-control"
            aria-label="Amount (to the nearest euro)"
            min={0}
            required
            onChange={handleTargetChange}
          />
          <span className="input-group-text">.00</span>
        </div>

        <button type="submit" className="btn btn-outline-danger mt-2">
          Reset
        </button>
      </form>
      <p className="mt-5">Current saving:</p>
      <p className="mt-2">Target: {target}</p>
      <p className="mt-0">Progress:</p>
      <div
        className="progress"
        role="progressbar"
        aria-label="Example with label"
        aria-valuenow={100}
        aria-valuemin={0}
        aria-valuemax={target}
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
