import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import "../../resources/css/Login.css";

import LoginForm from "../../components/forms/LoginForm";

import Header from "../../components/elements/FormHeader";

//Login Page
const Login = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  //navigate to profile if logged in
  if (isLoggedIn) {
    return <Navigate to={"/profile/" + currentUser.username} />;
  }

  return (
    <div className="login-container tw-flex-col">
      {
        message && 
        (
          <div className="tw-mt-2 tw-p-3 tw-text-sm tw-bg-green-100 tw-border-solid tw-border-0 tw-border-l-4 tw-w-[350px] tw-border-green-500 tw-text-green-700`">
            <p>{message}</p>
          </div>
        )
      }
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
