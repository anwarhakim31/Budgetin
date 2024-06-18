import React from "react";
import * as XLSX from "xlsx";
import { formartCurrency } from "../../../constant/constant";
export const exportToExcel = () => {
  // Prepare data for Excel
  const dataToExport = dataTransaction.map((item) => ({
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
