import "./MenuBottom.css";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AiFillHome, AiOutlineAreaChart } from "react-icons/ai";

const MenuBottom = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectToAddTransaction = () => {
    navigate("/addtransaction");
  };

  const redirectToChart = () => {
    navigate("/chart");
  };

  const redirectToRoot = () => {
    navigate("/");
  };

  return (
    <div className="menu-bottom">
      {/* <div className="menu"></div> */}
      <div className="button">
        <button onClick={redirectToChart}>
          <AiOutlineAreaChart />
        </button>
      </div>
      <div className="button">
        {location.pathname.includes("transaction") ||
        location.pathname.includes("chart") ? (
          <button onClick={redirectToRoot}>
            <AiFillHome />
          </button>
        ) : (
          <button onClick={redirectToAddTransaction}>
            <FaPlus />
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuBottom;
