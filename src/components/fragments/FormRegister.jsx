import React, { useEffect, useState } from "react";
import InputForm from "../elements/input";
import { getUser, postUser } from "../../services/auth.service";
import { regisValidate } from "../../services/validate.service";
import { useNavigate } from "react-router-dom";

const FormRegister = () => {
  const [register, setRegister] = useState({ username: "", password: "" });
  const [error, setError] = useState({
    username: "",
    password: "",
  });
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [isEye, setIsEye] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleSeePass = () => {
    setIsEye(!isEye);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUser((res) => setUsers(res.data));
    };

    const exist = users.find((user) => user.username === register.username);
    if (exist) {
      const errorusername = regisValidate(
        "username",
        register.username,
        exist.username
      );
      setError((prevState) => ({ ...prevState, username: errorusername }));
    }

    fetchData();
  }, [register.username]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setRegister((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    const validationError = regisValidate(name, value, register);

    const updateError = { ...error, [name]: validationError };

    setError(updateError);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const usernameError = regisValidate(
      "username",
      register.username,
      register
    );
    const passwordError = regisValidate(
      "password",
      register.password,
      register
    );

    setError({ username: usernameError, password: passwordError });

    if (!usernameError && !passwordError) {
      setIsPending(true);
      await postUser(register);
      const timeout = setTimeout(() => {
        setIsPending(false);
        navigate("/login");
      }, 500);
      return () => clearTimeout(timeout);
    }
  };

  return (
    <form onSubmit={handleRegisterSubmit}>
      <InputForm
        name={"Username"}
        id={"username"}
        placeholder={"Enter your username..."}
        type={"text"}
        handleInputChange={handleInputChange}
        value={register.username}
        error={error.username}
      />
      <InputForm
        name={"Password"}
        id={"password"}
        placeholder={"Enter your password..."}
        type={`${isEye ? "text" : "password"}`}
        handleInputChange={handleInputChange}
        value={register.password}
        error={error.password}
        handleSeePass={handleSeePass}
        isEye={isEye}
      />

      <button type="submit" className="button mt-5 w-full" disabled={isPending}>
        Register
      </button>
    </form>
  );
};

export default FormRegister;
