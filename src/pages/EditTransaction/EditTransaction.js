import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { _API_URL_ } from "../../utils/globals";
import { useNavigate } from "react-router-dom";
import "./EditTransaction.css";

const EditTransaction = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [transactionTypes, setTransactionType] = useState([]);
  const [categories, setCategory] = useState([]);
  const [currencies, setCurrency] = useState([]);

  const [singleData, setSingleData] = useState([
    {
      DATE: "",
      AMOUNT: "",
      TITLE: "",
      TRANSACTION_TYPE_NAME: "",
      CURRENCY_PREFIX: "",
      CATEGORY_NAME: "",
    },
  ]);

  const fetchSingleData = async () => {
    const singleData = await fetch(`${_API_URL_}/transactions/${id}`, {
      headers: { "Content-Type": "application/json" },
    });
    const json = await singleData.json();
    setSingleData(json.rows);
  };

  useEffect(() => {
    fetchSingleData();
  }, []);

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

    const test = {
      ID_TYPE: e.target.type.value,
      ID_CATEGORY: e.target.category.value,
      ID_CURRENCY: e.target.currency.value,
      TITLE: e.target.title.value,
      DATE: e.target.date.value,
      AMOUNT: e.target.amount.value,
    };

    const fetchOneItem = async () => {
      await fetch(`${_API_URL_}/transactions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(test),
      });
    };

    fetchOneItem();
    navigate(-1);
  };

  return (
    <div className="container mod">
      {singleData !== [] ? (
        <>
          <h2 className="title">Edycja rekordu</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              defaultValue={singleData[0].TITLE}
              required
            />
            <br />
            <select
              defaultValue={singleData[0].TRANSACTION_TYPE_NAME}
              name="type"
              required
            >
              {transactionTypes.map((typeItem) => (
                <option
                  value={typeItem.ID_TRANSACTION_TYPE}
                  key={typeItem.ID_TRANSACTION_TYPE}
                >
                  {typeItem.NAME}
                </option>
              ))}
            </select>
            <br />
            <select
              defaultValue={singleData[0].CATEGORY_NAME}
              name="category"
              required
            >
              {categories.map((categoryItem) => (
                <option
                  value={categoryItem.ID_CATEGORY}
                  key={categoryItem.ID_CATEGORY}
                >
                  {categoryItem.NAME}
                </option>
              ))}
            </select>
            <br />
            <input
              type="date"
              defaultValue={singleData[0].DATE}
              name="date"
              required
            />
            <br />
            <input
              min="0"
              type="number"
              name="amount"
              defaultValue={singleData[0].AMOUNT}
              required
            />
            <select
              defaultValue={singleData[0].CURRENCY_PREFIX}
              name="currency"
              required
            >
              {currencies.map((currencyItem) => (
                <option
                  value={currencyItem.ID_CURRENCY}
                  key={currencyItem.ID_CURRENCY}
                >
                  {currencyItem.PREFIX}
                </option>
              ))}
            </select>
            <br />
            <button type="submit" value="Dodaj">
              {">"} Zapisz {"<"}
            </button>
          </form>
        </>
      ) : null}
    </div>
  );
};

export default EditTransaction;
