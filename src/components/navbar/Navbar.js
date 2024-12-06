import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../actions/auth";
import { clearMessage } from "../../actions/message";
import { CollapseSidebar } from "./CollapsedSideBar";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import "../../resources/css/NavBar.css";

const HagzNavbar = () => {
  //shows collasped sidebar
  const [showSideBar, setShowSidebar] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let location = useLocation();

  //clears message in the message state
  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage()); // clear message when changing location
    }
  }, [dispatch, location]);

  //log out function
  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  //sets overflow hidden on the body when the collasped sidebar is open
  useEffect(() => {
    if (showSideBar) {
      document.body.classList.add("tw-overflow-y-hidden");
    } else {
      document.body.classList.remove("tw-overflow-y-hidden");
    }
  }, [showSideBar]);

  //Closes Sidebar when window is large
  function handleResize(){
      if(window.innerWidth > 1280 && showSideBar ){
        setShowSidebar(false);
      } 
    }

    //Checks to exit sidebar when window is large
  useEffect (() => {
    window.addEventListener('resize', handleResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>
      <div className="topnav sm:tw-fixed  tw-flex-grow-0 tw-flex-shrink-0 tw-basis-auto tw-top-0 tw-left-0 tw-right-0 tw-relative tw-z-[999] tw-flex tw-items-baseline tw-border-0 tw-border-solid tw-border-b tw-border-secondary">
        <ul className="tw-flex tw-justify-between tw-flex-grow tw-items-center tw-py-1 tw-px-5">
          <li className=" tw-flex tw-items-center">
            <Link to={"/"} className="nav-logo">
              <img src={require("../../resources/images/Hagz-Logo.png")} alt=""></img>
            </Link>
          </li>
          <div className="topnav-right tw-flex">
            <div className="tw-hidden md:tw-flex">
              {currentUser ? (
                <li>
                  <a
                    href="/login"
                    className="topnav-button tw-mb-1"
                    id="logout"
                    onClick={logOut}
                  >
                    Sign Out
                  </a>
                </li>
              ) : (
                <>
                  <li className="signup">
                    <Link
                      to={"/register"}
                      className="topnav-button"
                      id="signup"
                    >
                      Sign Up
                    </Link>
                  </li>

                  <li className="login">
                    <Link to={"/login"} className="topnav-button" id="login">
                      Login
                    </Link>
                  </li>
                </>
              )}
            </div>

            <div className="tw-mr-3 tw-justify-center tw-items-center tw-flex md:tw-hidden">
              {!showSideBar ? (
                <button
                  className="tw-w-10 tw-h-10 tw-border-none tw-bg-white tw-flex tw-items-center tw-justify-center tw-cursor-pointer"
                  onClick={() => setShowSidebar(!showSideBar)}
                >
                  <RxHamburgerMenu className="tw-w-10 tw-h-10" />
                </button>
              ) : (
                <button
                  className="tw-w-10 tw-h-10 tw-border-none tw-cursor-pointer tw-bg-white tw-flex tw-items-center tw-justify-center"
                  onClick={() => setShowSidebar(!showSideBar)}
                >
                  <IoMdClose className="tw-w-10 tw-h-10" />
                </button>
              )}
            </div>
          </div>
        </ul>
      </div>
      {showSideBar && <CollapseSidebar />}
    </>
  );
};
export default HagzNavbar;
