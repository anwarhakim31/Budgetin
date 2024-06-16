import CryptoJS from "crypto-js";

const secretKey = "Budgetin2024";

export const SaveCategoryStorage = (data) => {
  try {
    const EncyptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      secretKey
    ).toString();

    localStorage.setItem("BCategory", EncyptedData);
  } catch (error) {
    console.log(error);
  }
};

export const loadCategoryStorage = (name) => {
  try {
    const encryptedData = localStorage.getItem("BCategory");

    if (!encryptedData) {
      return [];
    }

    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    const dataUsername = decryptedData.filter((data) => data.user === name);

    return dataUsername || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const saveBudgetStorage = (data) => {
  try {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      secretKey
    ).toString();

    localStorage.setItem("BBudget", encryptedData);
  } catch (error) {
    console.log(error);
  }
};

export const loadBudgetStorage = (name) => {
  try {
    const encryptedData = localStorage.getItem("BBudget");
    if (!encryptedData) {
      return [];
    }

    const byte = CryptoJS.AES.decrypt(encryptedData, secretKey);

    const decryptedData = JSON.parse(byte.toString(CryptoJS.enc.Utf8));

    const byName = decryptedData.filter((data) => data.user === name);

    return byName || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const SaveTransactionStorage = (data) => {
  try {
    const encryptData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      secretKey
    ).toString();

    localStorage.setItem("BTransaction", encryptData);
  } catch (error) {
    console.log(error);
  }
};

export const loadTransactionStorage = (name) => {
  try {
    const EncyptedData = localStorage.getItem("BTransaction");

    if (!EncyptedData) return [];
    const byte = CryptoJS.AES.decrypt(EncyptedData, secretKey);

    const decryptedData = JSON.parse(byte.toString(CryptoJS.enc.Utf8));

    const byName = decryptedData.filter((data) => data.user === name);

    return byName || [];
  } catch (error) {
    console.log(error);
  }
};
