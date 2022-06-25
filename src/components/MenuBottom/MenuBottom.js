import "./MenuBottom.css";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AiFillHome, AiOutlineAreaChart } from "react-icons/ai";
import { TbArrowDown, TbArrowsUpDown, TbArrowUp } from "react-icons/tb";
import { _SORT_STATES_ } from "../../utils/globals";

const MenuBottom = ({ sortState, setSortState, data, setData, fetchData }) => {
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

  const toggleSortState = () => {
    if (sortState === _SORT_STATES_.DEFAULT) {
      setData(data.sort((a, b) => a.AMOUNT - b.AMOUNT));
      setSortState(_SORT_STATES_.ASC);
    }
    if (sortState === _SORT_STATES_.ASC) {
      setData(data.reverse());
      setSortState(_SORT_STATES_.DESC);
    }
    if (sortState === _SORT_STATES_.DESC) {
      fetchData();
      setSortState(_SORT_STATES_.DEFAULT);
    }
  };
  const isRootPath = location.pathname === "/";

  return (
    <div className="menu-bottom">
      {/* <div className="menu"></div> */}
      <div className="button">
        <button onClick={redirectToChart}>
          <AiOutlineAreaChart />
        </button>
      </div>
      <div className="button">
        {isRootPath && sortState === _SORT_STATES_.DEFAULT && (
          <button onClick={toggleSortState}>
            <TbArrowsUpDown />
          </button>
        )}
        {isRootPath && sortState === _SORT_STATES_.ASC && (
          <button onClick={toggleSortState}>
            <TbArrowUp />
          </button>
        )}
        {isRootPath && sortState === _SORT_STATES_.DESC && (
          <button onClick={toggleSortState}>
            <TbArrowDown />
          </button>
        )}
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
