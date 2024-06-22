"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import our custom CSS
require("../styles.scss");
function App() {
    return (<div className="App">
      <div className="container text-center">
        <div className="row align-items-start">
          <div className="col">One of three columns</div>
          <div className="col">One of three columns</div>
          <div className="col">One of three columns</div>
        </div>
      </div>
    </div>);
}
exports.default = App;
