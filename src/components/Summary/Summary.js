import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";
import "./Summary.css";

const Summary = ({ data }) => {
  const incomeFilter = data.filter((item) => item.ID_TYPE === 1);
  const outcomeFilter = data.filter((item) => item.ID_TYPE === 2);
  return (
    <div className="summary">
      <div className="title">
        <BsArrowLeftSquareFill />
        <span>Ilość zaplanowanych wydatków: {outcomeFilter.length}</span>
      </div>
      <div className="title">
        <BsArrowRightSquareFill />
        <span>Ilość zaplanowanych przychodów: {incomeFilter.length}</span>
      </div>
    </div>
  );
};

export default Summary;
