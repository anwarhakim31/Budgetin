import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAll,
  selectedDataTransaction,
} from "../../../redux/slices/slice";
import { formartCurrency } from "../../../constant/constant";
import { Plus, Trash2 } from "lucide-react";

const FormatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

const TransactionFragment = () => {
  const dispatch = useDispatch();
  const [selectType, setSelectType] = useState("");
  const dataTransaction = useSelector(selectedDataTransaction);
  const [isThead, setIsThead] = useState({
    category: true,
    description: true,
    date: true,
    type: true,
    amount: true,
  });
  const [isTransaction, setIsTransaction] = useState([]);

  const tableHeaders = Object.keys(isThead).filter((key) => isThead[key]);
  useEffect(() => {
    const active = dataTransaction.map((data) => {
      const filteredData = {};

      tableHeaders.forEach((header) => {
        if (data.hasOwnProperty(header)) {
          filteredData[header] = data[header];
        }
      });

      return filteredData;
    });
    setIsTransaction(active);

    if (selectType) {
      const select = active.filter((data) => data.type === selectType);

      setIsTransaction(select);
    }
  }, [dataTransaction, selectType]);

  const handleDeleteTransaction = (data) => {
    dispatch(deleteAll(data));
  };

  const handleChangeType = (e) => {
    setSelectType(e.target.value);
  };

  return (
    <>
      <div className="dashboard-overflow">
        <div className="dashboard-main-header">
          <div>
            <h1 className="heading-100">Transaction History</h1>
            <p className="heading-50 text-head text-primary-500">
              Transaction history that has been done
            </p>
          </div>
        </div>

        <div className="wrapper-navigation flex-between relative">
          <div>
            <button className="left">
              <div className="icon-left">
                <Plus height={10} width={10} />
              </div>
              <span>Type</span>
            </button>
          </div>
          <div className="popup-navigation">
            <div className="select">
              <input
                type="radio"
                value={"income"}
                id="income"
                checked={selectType === "income"}
                onChange={handleChangeType}
              />

              <label htmlFor="income">Income</label>
            </div>
            <div className="select">
              <input
                type="radio"
                value={"expense"}
                id="expense"
                checked={selectType === "expense"}
                onChange={handleChangeType}
              />

              <label htmlFor="expense">Expense</label>
            </div>
            <div className="select">
              <span>Clear Filter</span>
            </div>
          </div>
        </div>

        <div className="wrapper-table">
          <table>
            <thead>
              <tr>
                {tableHeaders.map((key, i) => (
                  <th key={(key, i)}>{key}</th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {isTransaction.length === 0 ? (
                <tr>
                  <td className="notFound" colSpan={tableHeaders.length + 1}>
                    Data is not available, please create a transaction first.
                  </td>
                </tr>
              ) : (
                [...isTransaction].reverse().map((item, i) => (
                  <tr key={i}>
                    {isThead.category && (
                      <td>
                        {item.category.icon} {item.category.name}
                      </td>
                    )}
                    {isThead.description && (
                      <td>
                        <p className="description">{item.description}</p>
                      </td>
                    )}
                    {isThead.date && (
                      <td>
                        <div className="date">{FormatDate(item.date)}</div>
                      </td>
                    )}
                    {isThead.type && (
                      <td>
                        <div
                          className={
                            item.type === "income" ? "income" : "expense"
                          }
                        >
                          {item.type}
                        </div>
                      </td>
                    )}
                    {isThead.amount && (
                      <td>
                        <div className={`amount`}>
                          {formartCurrency(item.amount)}
                        </div>
                      </td>
                    )}
                    <td>
                      <button
                        onClick={() => handleDeleteTransaction(item)}
                        aria-label="delete transaction"
                      >
                        <Trash2 width={20} height={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TransactionFragment;
