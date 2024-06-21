import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAll,
  selectedDataCategory,
  selectedDataTransaction,
} from "../../../redux/slices/slice";
import { Plus, Trash2 } from "lucide-react";
import { SlidersHorizontal } from "lucide-react";
import FilterType from "../../elements/filter/FilterType";
import TableBody from "../../elements/table/TableBody";
import { Circle, CircleCheck } from "lucide-react";
import TransactionModal from "./TransactionModal";
import { FileDown } from "lucide-react";
import * as XLSX from "xlsx";
import { formartCurrency } from "../../../constant/constant";
import { useDarkMode } from "../../../context/Darkmode";

const FormatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

const TransactionFragment = () => {
  const dispatch = useDispatch();
  const dataCategory = useSelector(selectedDataCategory);
  const dataTransaction = useSelector(selectedDataTransaction);
  const { isDark } = useDarkMode();
  const [isThead, setIsThead] = useState({
    category: true,
    description: true,
    date: true,
    type: true,
    amount: true,
  });

  const [selectType, setSelectType] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [isTransaction, setIsTransaction] = useState([]);
  const [isOpenType, setIsOpenType] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [isOpenView, setIsOpenView] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectDeleteItem, setSelectDeleteItem] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const refCat = useRef(null);
  const refType = useRef(null);
  const refView = useRef(null);

  const tableHeaders = Object.keys(isThead).filter((key) => isThead[key]);

  useEffect(() => {
    // let active = dataTransaction.map((data) => {
    //   const filteredData = {};

    //   tableHeaders.forEach((header) => {
    //     if (data.hasOwnProperty(header)) {
    //       filteredData[header] = data[header];
    //     }
    //   });

    //   return filteredData;
    // });

    let active = [...dataTransaction];

    if (selectType) {
      active = active.filter((data) => data.type === selectType);
    }

    if (selectCategory) {
      active = active.filter((data) => data.category.name === selectCategory);
    }

    setIsTransaction(active);
  }, [dataTransaction, selectType, selectCategory, isThead]);

  const handleOpenModal = () => {
    setIsModal(true);
  };

  const handleCloseModal = () => {
    setIsModal(false);
  };

  const handleDeleteTransaction = (data) => {
    handleOpenModal();
    setIsDelete(false);
    setSelectDeleteItem(data);
  };

  useEffect(() => {
    if (isDelete) {
      console.log(selectDeleteItem);

      dispatch(deleteAll(selectDeleteItem));
    }
  }, [isDelete, selectDeleteItem]);

  const handleToggleType = () => {
    setIsOpenType(!isOpenType);
  };

  const handleChangeType = (e) => {
    setSelectType(e.target.value);
    handleToggleType();
  };

  const clickOutsideFilterType = (e) => {
    if (refType.current && !refType.current.contains(e.target)) {
      setIsOpenType(false);
    }
  };

  useEffect(() => {
    if (isOpenType) {
      document.addEventListener("mousedown", clickOutsideFilterType);
    } else {
      document.removeEventListener("mousedown", clickOutsideFilterType);
    }

    return () => {
      document.removeEventListener("mousedown", clickOutsideFilterType);
    };
  }, [isOpenType]);

  const handleToggleCategory = () => {
    setIsOpenCategory(!isOpenCategory);
  };

  const handleChangeCategory = (name) => {
    setSelectCategory(name);
    setIsOpenCategory(false); // Close category filter after selection
  };

  const clickOutsideFilterCategory = (e) => {
    if (refCat.current && !refCat.current.contains(e.target)) {
      setIsOpenCategory(false);
    }
  };

  useEffect(() => {
    if (isOpenCategory) {
      document.addEventListener("mousedown", clickOutsideFilterCategory);
    } else {
      document.removeEventListener("mousedown", clickOutsideFilterCategory);
    }

    return () => {
      document.removeEventListener("mousedown", clickOutsideFilterCategory);
    };
  }, [isOpenCategory]);

  const handleViewChange = (e) => {
    const { name } = e.target;

    setIsThead((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const handleToggleView = (e) => {
    setIsOpenView(!isOpenView);
  };

  const clickOutsideFilterView = (e) => {
    if (refView.current && !refView.current.contains(e.target)) {
      setIsOpenView(false);
    }
  };

  useEffect(() => {
    if (isOpenView) {
      document.addEventListener("mousedown", clickOutsideFilterView);
    } else {
      document.removeEventListener("mousedown", clickOutsideFilterView);
    }

    return () =>
      document.removeEventListener("mousedown", clickOutsideFilterView);
  }, [isOpenView]);

  const exportToExcel = () => {
    // Prepare data for Excel
    const dataToExport = isTransaction.map((item) => ({
      Category: item?.category?.name || "",
      Description: item.description,
      Date: FormatDate(item.date),
      Type: item.type,
      Amount: formartCurrency(item.amount),
    }));

    // Create a new workbook and a worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);

    // Style the header row
    const header = Object.keys(dataToExport[0]);
    const headerRow = XLSX.utils.encode_row(0);
    header.forEach((key, index) => {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: index });
      if (!worksheet[cellAddress]) {
        worksheet[cellAddress] = { t: "s", v: key };
      }
      worksheet[cellAddress].s = {
        font: { bold: true },
      };
    });

    // Adjust column widths to fit content
    const maxLengths = header.map((key) => key.length); // start with header length
    dataToExport.forEach((row) => {
      header.forEach((key, index) => {
        maxLengths[index] = Math.max(
          maxLengths[index],
          row[key]?.toString().length || 0
        );
      });
    });

    worksheet["!cols"] = maxLengths.map((width) => ({ width: width + 2 })); // add some padding

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

    // Generate a download
    XLSX.writeFile(workbook, "Transactions.xlsx");
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeOut);
  }, []);

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
          <div className=" gap">
            <div className="relative">
              <button
                className="left"
                aria-label="filter category"
                onClick={handleToggleCategory}
              >
                <div className="icon-left">
                  <Plus height={10} width={10} />
                </div>
                <span>Category</span>
                {selectCategory && (
                  <span className="isActive">{selectCategory}</span>
                )}
              </button>
              {isOpenCategory && (
                <div
                  className={`${
                    selectCategory ? "active" : ""
                  } popup-navigation-category`}
                  ref={refCat}
                  role="dialog"
                >
                  <ul className="primary-list">
                    {dataCategory.map((data) => (
                      <li
                        key={data.id}
                        className="list"
                        onClick={() => handleChangeCategory(data.name)}
                      >
                        <p className="listing">
                          {data.icon} <span>{data.name}</span>
                        </p>
                      </li>
                    ))}
                  </ul>
                  {selectCategory && (
                    <div
                      className="clear"
                      onClick={() => setSelectCategory("")}
                    >
                      <span>Clear Filter</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="relative">
              <button
                className="left"
                aria-label="filter type"
                onClick={handleToggleType}
              >
                <div className="icon-left">
                  <Plus height={10} width={10} />
                </div>
                <span>Type</span>
                {selectType && <span className="isActive">{selectType}</span>}
              </button>
              {isOpenType && (
                <FilterType
                  ref={refType}
                  selectCategory={selectCategory}
                  handleChangeType={handleChangeType}
                  selectType={selectType}
                  setSelectType={setSelectType}
                  handleToggleType={handleToggleType}
                />
              )}
            </div>
          </div>
          <div>
            <div>
              <button
                className="right"
                aria-label="Export CSV"
                onClick={exportToExcel}
                disabled={dataTransaction.length === 0}
              >
                <div className="icon-right">
                  <FileDown height={15} width={15} />
                </div>
                <span>Export XLSX</span>
              </button>
            </div>
            <div className="relative">
              <button
                className="right"
                aria-label="filter view"
                onClick={handleToggleView}
              >
                <div className="icon-right">
                  <SlidersHorizontal height={15} width={15} />
                </div>
                <span>View</span>
              </button>
              {isOpenView && (
                <div
                  className="popup-navigation-view"
                  ref={refView}
                  role="dialog"
                >
                  {Object.keys(isThead).map((key) => {
                    return (
                      <div key={key} className="flex-between relative">
                        <label htmlFor={key}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </label>
                        <input
                          type="checkbox"
                          id={key}
                          name={key}
                          checked={isThead[key]}
                          onChange={handleViewChange}
                        />
                        <div className="checkIcon">
                          {isThead[key] ? (
                            <CircleCheck width={15} height={15} />
                          ) : (
                            <Circle width={15} height={15} />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {isLoading ? (
          <div
            className={`${isDark ? "bg-dark" : ""} wrapper-table-skeleton`}
          ></div>
        ) : (
          <div className="wrapper-table">
            <table>
              <thead>
                <tr>
                  {tableHeaders.map((key, i) => (
                    <th key={i}>{key}</th>
                  ))}
                  <th></th>
                </tr>
              </thead>
              <TableBody
                thead={isThead.category}
                isTransaction={isTransaction}
                isThead={isThead}
                tableHeaders={tableHeaders}
                FormatDate={FormatDate}
                handleDeleteTransaction={handleDeleteTransaction}
              />
            </table>
          </div>
        )}
      </div>
      {isModal && (
        <TransactionModal
          onClose={handleCloseModal}
          setIsDelete={setIsDelete}
        />
      )}
    </>
  );
};

export default TransactionFragment;
