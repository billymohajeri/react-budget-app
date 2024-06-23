// Import our custom CSS
// import '../styles.scss'

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
              <p className="h2">Expense</p>
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
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
