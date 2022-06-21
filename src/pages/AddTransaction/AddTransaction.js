import { useEffect, useState } from "react";
import { _API_URL_ } from "../../utils/globals";
import "./AddTransaction.css";

const AddTransaction = () => {
  const [transaction_type, setTransactionType] = useState([]);
  const [category, setCategory] = useState([]);
  const [currency, setCurrency] = useState([]);

  const fetchData = async () => {
    const [transaction_type, category, currency] = await Promise.all([
      fetch(`${_API_URL_}/transaction_types`, {
        headers: { "Content-Type": "application/json" },
      }),
      fetch(`${_API_URL_}/categories`, {
        headers: { "Content-Type": "application/json" },
      }),
      fetch(`${_API_URL_}/currencies`, {
        headers: { "Content-Type": "application/json" },
      }),
    ]);

    const json_1 = await transaction_type.json();
    setTransactionType(json_1.rows);

    const json_2 = await category.json();
    setCategory(json_2.rows);

    const json_3 = await currency.json();
    setCurrency(json_3.rows);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="container mod">
        <h2 className="title">Dodawanie rekordu</h2>
        <form>
          <input type="text" id="title" placeholder="Tytuł" />
          <br />
          <select
            defaultValue="Wybierz typ transakcji"
            name="type"
            id="type"
            required
          >
            <option disabled value="Wybierz typ transakcji">
              Wybierz typ transakcji
            </option>

            {transaction_type.map((item) => (
              <option
                value={item.ID_TRANSACTION_TYPE}
                key={item.ID_TRANSACTION_TYPE}
              >
                {item.NAME}
              </option>
            ))}
          </select>
          <br />
          <select
            defaultValue="Wybierz kategorię"
            name="category"
            id="category"
            required
          >
            <option disabled value="Wybierz kategorię">
              Wybierz kategorię
            </option>

            {category.map((item) => (
              <option value={item.ID_CATEGORY} key={item.ID_CATEGORY}>
                {item.NAME}
              </option>
            ))}
          </select>
          <br />
          <input type="date" id="date" required />
          <br />
          <input
            min="0"
            type="number"
            id="amount"
            placeholder="Kwota"
            required
          />
          <select
            defaultValue="Wybierz walutę"
            name="currency"
            id="currency"
            required
          >
            <option disabled value="Wybierz walutę">
              Wybierz walutę
            </option>

            {currency.map((item) => (
              <option value={item.ID_CURRENCY} key={item.ID_CURRENCY}>
                {item.PREFIX}
              </option>
            ))}
          </select>
          <br />
          <button type="button" value="Dodaj" />
        </form>
      </div>
    </>
  );
};

export default AddTransaction;
