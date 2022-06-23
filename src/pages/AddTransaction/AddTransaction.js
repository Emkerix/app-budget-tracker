import { useEffect, useState } from "react";
import { _API_URL_ } from "../../utils/globals";
import "./AddTransaction.css";

const AddTransaction = () => {
  const [transactionTypes, setTransactionType] = useState([]);
  const [categories, setCategory] = useState([]);
  const [currencies, setCurrency] = useState([]);

  const fetchData = async () => {
    const [transactionType, category, currency] = await Promise.all([
      fetch(`${_API_URL_}/transaction-types`, {
        headers: { "Content-Type": "application/json" },
      }),
      fetch(`${_API_URL_}/categories`, {
        headers: { "Content-Type": "application/json" },
      }),
      fetch(`${_API_URL_}/currencies`, {
        headers: { "Content-Type": "application/json" },
      }),
    ]);

    const json_1 = await transactionType.json();
    setTransactionType(json_1.rows);

    const json_2 = await category.json();
    setCategory(json_2.rows);

    const json_3 = await currency.json();
    setCurrency(json_3.rows);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const type = e.target.type.value;
    const category = e.target.category.value;
    const date = e.target.date.value;
    const amount = e.target.amount.value;
    const currency = e.target.currency.value;

    const test = {
      ID_TYPE: type,
      ID_CATEGORY: category,
      ID_CURRENCY: currency,
      TITLE: title,
      DATE: date,
      AMOUNT: amount,
    };
    fetch(`${_API_URL_}/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(test),
    });
  };

  return (
    <>
      <div className="container mod add">
        <h2 className="title">Dodawanie rekordu</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Tytuł" required />
          <br />
          <select defaultValue="Wybierz typ transakcji" name="type" required>
            <option disabled value="Wybierz typ transakcji">
              Wybierz typ transakcji
            </option>

            {transactionTypes.map((item) => (
              <option
                value={item.ID_TRANSACTION_TYPE}
                key={item.ID_TRANSACTION_TYPE}
              >
                {item.NAME}
              </option>
            ))}
          </select>
          <br />
          <select defaultValue="Wybierz kategorię" name="category" required>
            <option disabled value="Wybierz kategorię">
              Wybierz kategorię
            </option>

            {categories.map((item) => (
              <option value={item.ID_CATEGORY} key={item.ID_CATEGORY}>
                {item.NAME}
              </option>
            ))}
          </select>
          <br />
          <input type="date" name="date" required />
          <br />
          <input
            min="0"
            type="number"
            id="amount"
            name="amount"
            placeholder="Kwota"
            required
          />
          <select defaultValue="Wybierz walutę" name="currency" required>
            <option disabled value="Wybierz walutę">
              Wybierz walutę
            </option>

            {currencies.map((item) => (
              <option value={item.ID_CURRENCY} key={item.ID_CURRENCY}>
                {item.PREFIX}
              </option>
            ))}
          </select>
          <br />
          <button type="submit" value="Dodaj">
            {">"} Dodaj {"<"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddTransaction;
