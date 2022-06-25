import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { _API_URL_ } from "../../utils/globals";

ChartJS.register(ArcElement, Tooltip, Legend);

const ShowChart = () => {
  const [categories, setCategories] = useState([]);
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

  const fetchCategories = async () => {
    const category = await fetch(`${_API_URL_}/categories`, {
      headers: { "Content-Type": "application/json" },
    });

    const json_2 = await category.json();
    setCategories(json_2.rows);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const categoryLabels = categories.map((category) => category.NAME);

  const categoriesIncome = [];
  const categoriesOutcome = [];

  categories.forEach((category) => {
    const incomeTotal = data.reduce((accumulator, transaction) => {
      if (
        transaction.ID_CATEGORY === category.ID_CATEGORY &&
        transaction.TRANSACTION_TYPE_NAME === "PRZYCHÓD"
      )
        return accumulator + transaction.AMOUNT;
      else return accumulator;
    }, 0);
    categoriesIncome.push(incomeTotal);

    const outComeTotal = data.reduce((accumulator, transaction) => {
      if (
        transaction.ID_CATEGORY === category.ID_CATEGORY &&
        transaction.TRANSACTION_TYPE_NAME === "WYDATEK"
      )
        return accumulator + transaction.AMOUNT;
      else return accumulator;
    }, 0);
    categoriesOutcome.push(outComeTotal);
  });

  const pieIncomeData = {
    labels: categoryLabels,
    datasets: [
      {
        label: "Przychody",
        data: categoriesIncome,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(100, 109, 24, 0.2)",
          "rgba(150, 159, 14, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(100, 109, 24, 1)",
          "rgba(150, 159, 14, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieOutcomeData = {
    labels: categoryLabels,
    datasets: [
      {
        label: "Wydatki",
        data: categoriesOutcome,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(100, 109, 24, 0.2)",
          "rgba(150, 159, 14, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(100, 109, 24, 1)",
          "rgba(150, 159, 14, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mod">
      <h2 className="title">Przychody</h2>
      <Pie data={pieIncomeData} />
      <h2 className="title">Wydatki</h2>
      <Pie data={pieOutcomeData} />
    </div>
  );
};

export default ShowChart;
