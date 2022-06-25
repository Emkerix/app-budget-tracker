import React, { useState, useEffect } from "react";
import {
  AddTransaction,
  EditTransaction,
  Transactions,
  ShowChart,
} from "./pages";
import { MenuTop, MenuBottom, Preloader } from "./components";
import { _SORT_STATES_, _API_URL_ } from "./utils/globals";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import "./App.css";

function App() {
  const [sortState, setSortState] = useState(_SORT_STATES_.DEFAULT);

  const [data, setData] = useState([]);
  const fetchData = async () => {
    const data = await fetch(`${_API_URL_}/transactions`, {
      headers: { "Content-Type": "application/json" },
    });
    const json = await data.json();
    setData(json.rows);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="App">
        <MenuTop />
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Preloader />
                  <Transactions
                    sortState={sortState}
                    setSortState={setSortState}
                    data={data}
                  />
                </>
              }
            />
            <Route path="/addtransaction" element={<AddTransaction />} />
            <Route path="/edittransaction/:id" element={<EditTransaction />} />
            <Route path="/chart" element={<ShowChart />} />
          </Routes>
          <MenuBottom
            sortState={sortState}
            setSortState={setSortState}
            data={data}
            setData={setData}
            fetchData={fetchData}
          />
        </Router>
      </div>
    </>
  );
}

export default App;
