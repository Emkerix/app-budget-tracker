import "./App.css";
import { AddTransaction, Transactions } from "./pages";
import { MenuTop, MenuBottom } from "./components";

import { Route, HashRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <div className="App">
        <MenuTop />
        <Router>
          <Routes>
            <Route path="/" element={<Transactions />} />
            <Route path="/addtransaction" element={<AddTransaction />} />
          </Routes>
          <MenuBottom />
        </Router>
      </div>
    </>
  );
}

export default App;
