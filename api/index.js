const express = require("express");
const cors = require("cors");
const app = express();
const _PORT_ = 8000;

app.use(cors());
app.use(express.json());

const db = require("./db.js");

app.get("/transactions", (request, response) => {
  const query = `SELECT t.*, tt.NAME AS 'TRANSACTION_TYPE_NAME', cur.PREFIX AS 'CURRENCY_PREFIX', cat.NAME as CATEGORY_NAME
  FROM 'TRANSACTION' AS t
  LEFT JOIN 'TRANSACTION_TYPE' AS 'tt' ON t.ID_TYPE=tt.ID_TRANSACTION_TYPE
  LEFT JOIN 'CURRENCY' AS 'cur' ON t.ID_CURRENCY=cur.ID_CURRENCY
  LEFT JOIN 'CATEGORY' AS 'cat' ON t.ID_CATEGORY=cat.ID_CATEGORY
  ;`;
  db.all(query, [], (error, rows) => {
    if (error) {
      response.status(404).json({ err: error.message });
    }
    rows.forEach((row) => {
      console.log(row);
    });
    response.json({ rows });
  });
});

app.get("/transactions/:id", (request, response) => {
  const query = `SELECT * FROM 'TRANSACTION' WHERE ID_TRANSACTION=${request.params.id};`;
  db.all(query, [], (error, rows) => {
    if (error) {
      response.status(404).json({ err: error.message });
    }
    console.log(rows);
    response.json({ rows });
  });
});

app.delete("/transactions/:id", (request, response) => {
  db.run(
    `DELETE FROM 'TRANSACTION' WHERE ID_TRANSACTION = ?`,
    request.params.id,
    (error) => {
      if (error) {
        response.status(404).json({ err: error.message });
      } else {
        response.status(201).json({ message: "deleted" });
      }
    }
  );
});

app.post("/transactions", (request, response) => {
  const { ID_TYPE, ID_CATEGORY, ID_CURRENCY, TITLE, DATE, AMOUNT } =
    request.body;
  db.run(
    `INSERT INTO 'TRANSACTION' ( ID_TYPE, ID_CATEGORY, ID_CURRENCY, TITLE, DATE, AMOUNT ) VALUES ( ?, ?, ?, ?, ?, ? )`,
    [ID_TYPE, ID_CATEGORY, ID_CURRENCY, TITLE, DATE, AMOUNT],
    (error) => {
      if (error) {
        response.status(404).json({ err: error.message });
      } else {
        response.status(201).json({ message: "created" });
      }
    }
  );
});

app.get("/", (request, response) => {
  response.json({ status: "running" });
});

app.use(function (request, response, next) {
  response.status(404).send({ error: "404" });
});

app.listen(_PORT_, () => {
  console.log(`http://localhost:${_PORT_}`);
});
