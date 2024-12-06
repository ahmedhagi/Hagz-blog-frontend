import {  useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import './resources/main.css';
import "./App.css";

import HagzNavBar from "./components/navbar/Navbar";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/main/Home";
import Profile from "./pages/profile/Profile";
import PostPage from "./pages/post/Post"
import Error from "./pages/error/Error";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { clearPost } from "./actions/post";
import AuthVerify from "./common/AuthVerify";
import Topic from "./pages/main/Topic";
import EditPost from "./pages/post/EditPost";
import NewPost from "./pages/post/NewPost";

import Footer from "./components/elements/Footer";
import Tag from "./pages/main/Tag";
import { Settings } from "./pages/settings/Settings";

const App = () => {
  
  const { post } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  let location = useLocation();
  

  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage()); // clear message when changing location
    }
  }, [dispatch, location]);

  useEffect(() => {
    if (!location.pathname.includes('/post') && post != null){
      dispatch(clearPost()); // clears current viewed post
    }
  }, [dispatch, location, post]);  

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
 

  return ( 
    <div className="tw-flex  tw-flex-col tw-pt-0 sm:tw-pt-[56px] tw-justify-between tw-min-w-full tw-min-h-screen tw-relative">
      <HagzNavBar/>
      <div className="app tw-flex-grow tw-flex tw-min-h-screen">
        <div className="main tw-box-border tw-max-w-full tw-relative max-sm:tw-px-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/profile/:username/settings" element={<Settings />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/post/:id/:slug" element={<PostPage />} />
            <Route path="/topic/:topic" element={< Topic/>} />
            <Route path="/tag/:tag" element={< Tag/>} />
            <Route path="/post/new_post" element={< NewPost />}/>
            <Route path="/post/update/:id" element={< EditPost />}/>
            <Route path='*' element={<Error/>}/>
          </Routes>   
        </div>
        <AuthVerify logOut={logOut}/>
      </div>
      <Footer/> 
    </div>
  );
};

export default App;