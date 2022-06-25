import React, { useEffect, useState } from "react";
import { BsFillInboxFill } from "react-icons/bs";
import { ListItem, Summary } from "../../components";
import { _API_URL_ } from "../../utils/globals";
import "./Transactions.css";

const Transactions = ({ sortState, setSortState, data }) => {
  return (
    <>
      <div className="container">
        <Summary data={data} />
        <div className="list">
          {data.length === 0 ? (
            <div className="empty">
              <span>Brak elementów :/</span>
              <BsFillInboxFill />
            </div>
          ) : (
            data.map((item) => (
              <ListItem key={item.ID_TRANSACTION} item={item} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Transactions;
