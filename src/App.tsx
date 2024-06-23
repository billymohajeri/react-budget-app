import { Expense } from "./components/Expense";
import Income from "./components/Income";

export const today = new Date().toISOString().split("T")[0];

function App() {
  return (
    <>
      <div className="App">
        <div className="container text-center">
          <p className="h1 mt-5 mb-5">Billy's Budget App</p>
          <div className="row align-items-start">
            <div className="col col-border px-5">
              <Income />
            </div>
            <div className="col col-border px-5">
              <Expense />
            </div>
            <div className="col px-5">
              <p className="h2">Target</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
