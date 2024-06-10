import React, { useEffect, useState } from "react";
import google from "../../assets/images/google.png";
import InputForm from "../elements/input";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import { toast } from "react-toastify";
import { getUser } from "../../services/auth.service";
import { LoginValidate } from "../../services/validate.service";
import { useNavigate } from "react-router-dom";

const FormLogin = () => {
  const [login, setLogin] = useState({ username: "" });
  const [error, setError] = useState({ username: "", noMatch: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLogin({ [name]: value });

    const errorLogin = LoginValidate(name, value);

    setError({ ...error, username: errorLogin });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const usernameError = LoginValidate("username", login.username);

    setError((prevState) => ({ ...prevState, username: usernameError }));

    await getUser((data) => {
      const isMatch = data.data.find(
        (user) => user.username === login.username
      );

      if (!usernameError) {
        if (isMatch) {
          navigate("/dashboard");
          setError((prevState) => ({ ...prevState, noMatch: false }));
          localStorage.setItem("username", isMatch.username);
        } else {
          setTimeout(() => {
            setError((prevState) => ({ ...prevState, noMatch: false }));
          }, 1000);

          setError((prevState) => ({ ...prevState, noMatch: true }));
        }
      }
    });
  };

  const authlogin = useGoogleLogin({
    onSuccess: (response) => {
      localStorage.setItem("token", JSON.stringify(response.access_token));
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  return (
    <>
      <button
        className="google button w-full fw-regular"
        aria-label="sign with google"
        onClick={() => authlogin()}
      >
        <div className="flex-center">
          <img
            src={google}
            alt="google sign-in"
            className="mx-1"
            width={20}
            height={20}
          />

          <span>Sign With Google</span>
        </div>
      </button>
      <p className="or text-center my-3 text-primary-500">or</p>
      <form onSubmit={handleLoginSubmit} className="">
        <InputForm
          name={"Username"}
          id={"username"}
          placeholder={"Enter your username..."}
          type={"text"}
          handleInputChange={handleInputChange}
          value={login.username}
          error={error.username}
        />

        <div className="relative">
          <small
            className={`${
              !error.noMatch ? "opacity-0" : "opacity-1"
            } notif text-sm text-accent-600 font-medium`}
          >
            Username is Wrong
          </small>
          <button type="submit" className="button mt-2  w-full ">
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default FormLogin;