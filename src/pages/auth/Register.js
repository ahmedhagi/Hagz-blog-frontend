import { useSelector } from "react-redux";
import "../../resources/css/Register.css";
import Header from "../../components/elements/FormHeader";
import { Navigate } from "react-router-dom";
import SignUpForm from "../../components/forms/SignupForm";

//SignUp Page
const Register = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  //navigate to profile if logged in
  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="signup-container">
      <div className="signup-form tw-my-3 tw-mb-10">
        <Header
          heading="Welcome to Hagz!"
          paragraph="Have an account?"
          linkName="Login"
          linkUrl="/login"
        />
        <SignUpForm />
      </div>
    </div>
  );
};

export default Register;
