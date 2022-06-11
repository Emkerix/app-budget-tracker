import "./MenuBottom.css";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BsArrowReturnLeft } from "react-icons/bs";
import { useLocation } from "react-router-dom";

const MenuBottom = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = () => {
    navigate("/addtransaction");
  };

  return (
    <div className="menu-bottom">
      <div className="menu"></div>
      {location.pathname === "/addtransaction" ? (
        <div className="button">
          <button onClick={() => navigate(-1)}>
            <BsArrowReturnLeft />
          </button>
        </div>
      ) : (
        <div className="button">
          <button onClick={redirect}>
            <FaPlus />
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuBottom;
