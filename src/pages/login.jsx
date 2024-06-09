import React, { useState } from "react";
import google from "../assets/images/google.png";
import InputForm from "../components/elements/input";

const LoginPage = () => {
  const [login, setLogin] = useState({ username: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setLogin({ [name]: value });
  };

  return (
    <div className="container">
      <div className="authlayout">
        <div className="login-form p-5">
          <h2 className="fw-semibold  clr-accent-700">Budgetin.</h2>
          <h5 className="my-4 clr-primary-700 fw-regular fs-2">
            You can login with your registered account or quick login with your
            Google account.
          </h5>

          <button
            className="google button w-full fw-regular"
            aria-label="sign with google"
          >
            <img
              src={google}
              alt="google sign-in"
              className="google-logo"
              width={25}
              height={25}
            />
            Sign With Google
          </button>

          <p className="or text-center my-3">or</p>

          <form>
            <InputForm
              name={"Username"}
              id={"username"}
              placeholder={"Enter your username..."}
              type={"text"}
              handleInputChange={handleInputChange}
              value={login.username}
            />

            <button type="submit" className="button mt-5 w-full bg-accent-700">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
