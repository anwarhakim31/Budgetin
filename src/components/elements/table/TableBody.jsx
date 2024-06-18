import React from "react";
import { formartCurrency } from "../../../constant/constant";
import { Plus, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { selectedDataTransaction } from "../../../redux/slices/slice";
import { useDarkMode } from "../../../context/Darkmode";
const TableBody = ({
  isTransaction,
  isThead,
  tableHeaders,
  FormatDate,
  handleDeleteTransaction,
  thead,
}) => {
  let dataTransaction = useSelector(selectedDataTransaction);

  dataTransaction = [...dataTransaction].reverse();
  const { isDark } = useDarkMode();

  return (
    <tbody>
      {isTransaction.length === 0 ? (
        <tr>
          <td
            className={`${isDark ? "hover-dark" : "hover-light"}  notFound`}
            colSpan={tableHeaders.length + 1}
          >
            Data is not available, please create a transaction first.
          </td>
        </tr>
      ) : (
        [...isTransaction].reverse().map((item, i) => (
          <tr key={i} className={`${isDark ? "hover-dark" : "hover-light"}`}>
            {isThead.category && (
              <td>
                {item?.category?.icon} {item?.category?.name}
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
                  className={`${
                    item.type === "income" ? "income" : "expense"
                  } ${isDark ? "bg-dark hover-dark2" : ""}`}
                >
                  {item.type}
                </div>
              </td>
            )}
            {isThead.amount && (
              <td className={``}>
                <div
                  className={`amount ${isDark ? "bg-dark hover-dark2" : ""}`}
                >
                  {formartCurrency(item.amount)}
                </div>
              </td>
            )}
            {thead && (
              <td>
                <button
                  onClick={() => handleDeleteTransaction(dataTransaction[i])}
                  aria-label="delete transaction"
                >
                  <Trash2 width={20} height={20} />
                </button>
              </td>
            )}
          </tr>
        ))
      )}
    </tbody>
  );
};

export default TableBody;
