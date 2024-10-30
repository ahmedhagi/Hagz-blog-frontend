import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//Decodes JWT into a JSON Object
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

//Verifies if User login is still valid
const AuthVerify = (props) => {
  let location = useLocation();

  useEffect(() => {
    //gets user from local storage
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      //decodes the JWT
      const decodedJwt = parseJwt(user.accessToken);
      //Logs user out if current time exceeds JWT expiration time
      if (decodedJwt.exp * 1000 < Date.now()) {
        props.logOut();
      }
    }
  }, [location, props]);

  return;
};

export default AuthVerify;
