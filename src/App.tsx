// Import our custom CSS
// import '../styles.scss'

import { Expense } from "./components/Expense";
import Income from "./components/Income";

// Import all of Bootstrap's JS

function App() {
  return (
    <>
      <div className="App">
        <div className="container text-center">
          <p className="h1 mt-5 mb-5">Billy's Budget App</p>
          <div className="row align-items-start">
            <div className="col">
              <Income />
            </div>
            <div className="col">
              <Expense />
            </div>
            <div className="col">
              <p className="h2">Target</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
