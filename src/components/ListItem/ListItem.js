import {
  BsArrowLeftSquareFill,
  BsArrowRightSquareFill,
  BsFillTrashFill,
} from "react-icons/bs";
import { BiBus, BiDotsHorizontalRounded } from "react-icons/bi";
import { GiHealthNormal } from "react-icons/gi";
import { FaBreadSlice, FaMoneyBillAlt, FaPlus } from "react-icons/fa";
import { MdTravelExplore } from "react-icons/md";
import { RiHandCoinLine } from "react-icons/ri";

import "./ListItem.css";

const ListItem = ({ item, onDelete }) => {
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

  return (
    <div className="item">
      <div className="left">
        <div>
          {IconTransactionType(item.TRANSACTION_TYPE_NAME)}
          <span>
            {item.ID_TRANSACTION +
              " " +
              item.TRANSACTION_TYPE_NAME +
              " " +
              item.AMOUNT +
              " " +
              item.CURRENCY_PREFIX}
          </span>
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
          <button>
            <FaPlus />
          </button>
        </div>

        <div className="button">
          <button type="button" onClick={() => onDelete(item.ID_TRANSACTION)}>
            <BsFillTrashFill />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
