import React, { useState } from "react";
import AuthLayout from "../components/layout/AuthLayout";
import FormLogin from "../components/fragments/FormLogin";

const LoginPage = () => {
  return (
    <AuthLayout>
      <FormLogin />
    </AuthLayout>
  );
};

export default LoginPage;
