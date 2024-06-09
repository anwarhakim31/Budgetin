import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="container ">
      <div className="flex-center flex-col w-full min-h-screen text-center">
        <h1 className="clip heading-300 fw-extra">Oops !</h1>
        <h3 className="fs-4 font-medium">404 - Page Not Found</h3>
        <p className="not ">
          We couldn't find the page that you're looking for. please check the
          address and try again.
        </p>
        <Link
          to={"/"}
          aria-label="back to budgetin"
          className="button mt-4 fs-3"
        >
          Back To Budgetin
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
