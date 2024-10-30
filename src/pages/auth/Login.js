import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import "../../resources/css/Login.css";

import LoginForm from "../../components/forms/LoginForm";

import Header from "../../components/elements/FormHeader";

//Login Page
const Login = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user: currentUser } = useSelector((state) => state.auth);

  //navigate to profile if logged in
  if (isLoggedIn) {
    return <Navigate to={"/profile/" + currentUser.username} />;
  }

  return (
    <div className="login-container">
      <div className="login-form tw-my-3 tw-mb-10">
        <Header
          heading="Welcome Back!"
          paragraph="Don't have an account?"
          linkName="Signup"
          linkUrl="/register"
        />
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
