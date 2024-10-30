import { Link, useLocation } from "react-router-dom";

//Error Page
export default function Error({ message, code }) {
  let location = useLocation();

  return (
    <div className="tw-flex tw-items-center tw-text-center tw-self-center tw-justify-center tw-flex-col tw-w-full tw-h-full">
      <img
        className="tw-w-[350px] tw-h-[300px]"
        src={require("../../resources/images/error.jpg")}
        alt="error"
      />
      <div className="tw-font-semibold tw-flex tw-items-center tw-mx-0 tw-text-6xl">
        {code ? code : 404} Error
      </div>
      <div className="tw-flex tw-items-center">
        {message ? <p>{message}</p> : <p>Page not found</p>}
      </div>
      {!(location.pathname.includes("/home") || location.pathname === "/") ? (
        <div className="tw-mt-1 tw-flex tw-items-center">
          <Link to="/home" className="primary-btn tw-px-6 tw-py-3">
            Return Home
          </Link>
        </div>
      ) : null}
    </div>
  );
}
