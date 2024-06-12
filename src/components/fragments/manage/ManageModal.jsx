import React, { useEffect, useRef, useState } from "react";
import Modal from "../../elements/Modal";
import { X } from "lucide-react";
import InputForm from "../../elements/input";
import pick from "../../../assets/images/pick.svg";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { v4 as uuid } from "uuid";
import { useDarkMode } from "../../../context/Darkmode";
import { useDispatch } from "react-redux";
import { addCategory } from "../../../redux/slices/slice";
import { toast } from "react-toastify";
import { useLoggedIn } from "../../../hooks/useLoggedIn";

const ManageModal = ({ onClose, isToken, isUsername }) => {
  const [isPicker, setIsPicker] = useState(false);
  const [isEmoji, setIsEmoji] = useState("");
  const [isName, setIsName] = useState("");
  const [username, setUsername] = useState("");
  const { isDark } = useDarkMode();
  const inputRef = useRef(null);
  const iconRef = useRef(null);
  const emojiRef = useRef(null);
  const dispatch = useDispatch();

  const handleOpenPicker = () => {
    setIsPicker(true);
  };

  useEffect(() => {
    if (isToken) {
      setUsername(isToken.email);
    } else if (isUsername) {
      setUsername(isUsername);
    }
  }, [isToken, isUsername]);

  const handlePickerOutside = (e) => {
    if (emojiRef.current && !emojiRef.current.contains(e.target)) {
      setIsPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handlePickerOutside);

    return () => {
      document.removeEventListener("mousedown", handlePickerOutside);
    };
  }, []);

  const handleInputName = (e) => {
    setIsName(e.target.value);
  };

  const handleAddCategory = () => {
    if (isName === "") {
      inputRef.current.focus();
      return;
    } else if (isEmoji === "") {
      iconRef.current.focus();
      return;
    }

    const notify = () =>
      toast.promise(
        new Promise((resolve, reject) => {
          setTimeout(() => {
            dispatch(
              addCategory({
                id: uuid(),
                name: isName,
                icon: isEmoji,
                user: username,
              })
            );
            onClose();
            resolve("Success!");
          }, 2000); // 2 seconds delay
        }),
        {
          pending: "Processing Add Category...",
          success: "Category has been Created 👌",
          error: "Action failed 🤯",
        }
      );

    notify();
  };

  return (
    <Modal onClose={onClose}>
      <div className="flex-between">
        <h3 className="fs-4 fw-semibold text-primary-700">
          Create New Category
        </h3>
        <button
          className="close-modal"
          aria-label="back to section"
          onClick={onClose}
        >
          <X height={20} width={20} className="text-primary-700" />
        </button>
      </div>
      <p className="fs-2 text-primary-500 mt">
        Insert the details to create a new category.
      </p>
      <div className="modal-content-wrapper mt-5">
        <div className="modal-content">
          <div className="flex flex-col">
            <label htmlFor="category" className="fw-medium text-primary-900">
              Category Name
            </label>
            <input
              type="text"
              className="inputs"
              placeholder="Enter your category name..."
              onChange={handleInputName}
              value={isName}
              maxLength={20}
              ref={inputRef}
            />
            <span className="fs-2">
              Insert the category name (Max:20 Characters).
            </span>
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="" className="fw-medium text-primary-900">
              Category Icon
            </label>
            <button
              className="category-pick"
              onClick={handleOpenPicker}
              ref={iconRef}
              tabIndex={0}
            >
              <div>
                {!isEmoji ? (
                  <img
                    src={pick}
                    alt="pick"
                    className="pick"
                    height={75}
                    width={75}
                  />
                ) : (
                  <h1 className="text-center fs-5 emoji">{isEmoji}</h1>
                )}
                <p className={`text-center fs-2 fw-semibold`}>
                  {!isEmoji
                    ? "Click For Choose Icon!"
                    : "Click For Change Icon!"}
                </p>
              </div>
            </button>
            <span className="fs-2">Choose Category Icon.</span>
            <div className={`${isPicker ? "block" : "hidden"} picker`}>
              <div ref={emojiRef}>
                <Picker
                  data={data}
                  previewPosition={"none"}
                  navPosition={"none"}
                  searchPosition={"none"}
                  emojiSize={16}
                  theme={isDark ? "dark" : "light"}
                  onEmojiSelect={(e) => {
                    setIsEmoji(e.native);
                    setIsPicker(!isPicker);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="button-modal-manage">
            <button
              type="button"
              aria-label="cancel add category"
              className="button bg-primary-400"
              onClick={onClose}
            >
              cancel
            </button>
            <button
              onClick={handleAddCategory}
              type="submit"
              aria-label="add Category"
              className="button"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ManageModal;
