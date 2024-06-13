import { format } from "crypto-js";

export const URL = `https://burgery-api.onrender.com`;

export const formartCurrency = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};
