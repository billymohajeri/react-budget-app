import { ChangeEvent, FormEvent, useState } from "react";

const Transfer = () => {
  const [transferAmount, setTransferAmount] = useState(0);

  const handleTransferAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTransferAmount(Number(event.target.value));
  };

  const handleTransferAmountSubmit = (event: FormEvent) => {
    event.preventDefault();
    setTransferAmount(0);
  };

  return (
    <div className="balance-container">
      <p className="h2">Balance</p>
      <form onSubmit={handleTransferAmountSubmit}>
        <p className="form-label mt-5">Current balance:</p>
        <label htmlFor="transferAmount" className="form-label mt-3">
          Transfer to saving account
        </label>
        <div className="input-group mb-3" id="balance-input">
          <span className="input-group-text">€</span>
          <input
            type="number"
            id="transferAmount"
            name="transferAmount"
            className="form-control"
            aria-label="Amount (to the nearest dollar)"
            min={0}
          />
          <span className="input-group-text">.00</span>
        </div>
        <button type="submit" className="btn btn-primary">
          Transfer
        </button>
      </form>
    </div>
  );
};

export default Transfer;
