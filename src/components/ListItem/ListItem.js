import {
  BsArrowLeftSquareFill,
  BsArrowRightSquareFill,
  BsFillTrashFill,
} from "react-icons/bs";
import { BiBus, BiDotsHorizontalRounded } from "react-icons/bi";
import { GiHealthNormal } from "react-icons/gi";
import { FaBreadSlice, FaMoneyBillAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { MdTravelExplore } from "react-icons/md";
import { RiHandCoinLine } from "react-icons/ri";
import { _API_URL_ } from "../../utils/globals";

import { useNavigate } from "react-router-dom";

import "./ListItem.css";

const ListItem = ({ item }) => {
  const navigate = useNavigate();

  const IconTransactionType = (type) => {
    switch (type) {
      case "PRZYCHÓD":
        return <BsArrowRightSquareFill />;
      case "WYDATEK":
        return <BsArrowLeftSquareFill />;
      default:
        return 0;
    }
  };
  const IconCategory = (type) => {
    switch (type) {
      case "TRANSPORT":
        return <BiBus />;
      case "ZDROWIE I URODA":
        return <GiHealthNormal />;
      case "RACHUNKI":
        return <FaMoneyBillAlt />;
      case "POZOSTAŁE":
        return <BiDotsHorizontalRounded />;
      case "ROZRYWKA I PODRÓŻE":
        return <MdTravelExplore />;
      case "WYDATKI PODSTAWOWE":
        return <FaBreadSlice />;
      case "UZNANIA":
        return <RiHandCoinLine />;
      default:
    }
  };

  const deleteItem = async (itemId) => {
    await fetch(`${_API_URL_}/transactions/${itemId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  };

  const EditItem = (itemId) => {
    navigate(`/edittransaction/${itemId}`);
  };

  return (
    <div className="item">
      <div className="left">
        <div>{item.TITLE}</div>
        <div>
          {IconTransactionType(item.TRANSACTION_TYPE_NAME)}
          <span>{item.AMOUNT + " " + item.CURRENCY_PREFIX + " "}</span>
        </div>
        <div>
          <span>{IconCategory(item.CATEGORY_NAME)}</span>
          <span>{item.CATEGORY_NAME}</span>
        </div>
        <div>
          <span>{item.DATE}</span>
        </div>
      </div>
      <div className="right">
        <div className="button">
          <button type="button" onClick={() => EditItem(item.ID_TRANSACTION)}>
            <AiFillEdit />
          </button>
        </div>

        <div className="button">
          <button
            type="button"
            onClick={() =>
              // eslint-disable-next-line no-restricted-globals
              confirm("Czy chcesz usunąć ten rekord?")
                ? deleteItem(item.ID_TRANSACTION)
                : null
            }
          >
            <BsFillTrashFill />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
