import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../actions/auth";
import { clearMessage } from "../../actions/message";
import { NavigationContent } from "./Sidebar";
import { ProfileLink } from "./ProfileLink";

//SideBar that appears when screen width is smaller
export const CollapseSidebar = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //log out function
  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <div className="tw-min-h-screen tw-w-full tw-py-3 tw-px-5 tw-overflow-hidden tw-fixed tw-top-[57px] tw-left-0 tw-bg-white tw-z-[999]">
      <div className="tw-mb-3">
        <ProfileLink />
        <div className="sidebarContent">
          <NavigationContent />
        </div>
      </div>
      <span className="tw-text-lg tw-font-bold tw-mb-2">Login</span>
      <div className="tw-ml-1.5 tw-mt-2">
        {currentUser ? (
          <a
            href="/login"
            className="tw-my-2 tw-text-base tw-text-black tw-no-underline hover:tw-text-gray-700"
            onClick={logOut}
          >
            Sign Out
          </a>
        ) : (
          <div className="tw-flex tw-flex-col">
            <Link
              to={"/register"}
              className="tw-my-2 tw-text-base tw-text-black tw-no-underline hover:tw-text-gray-700"
            >
              Sign Up
            </Link>
            <Link
              to={"/login"}
              className="tw-my-1 tw-text-base tw-text-primary tw-no-underline hover:tw-text-primaryf"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
