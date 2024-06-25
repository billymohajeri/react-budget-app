import { Balance } from "./components/Balance";
import { Expense } from "./components/Expense";
import Income from "./components/Income";
import Target from "./components/Target";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <div className="App">
        <ToastContainer />
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
              <Target />
            </div>
          </div>
          <div className="row align-items-center mt-5">
            <div className="col px-5 mt-5">
              <Balance />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
