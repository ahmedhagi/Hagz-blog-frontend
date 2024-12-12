import { useForm, FormProvider } from "react-hook-form";
import { Input } from "../elements";
import {
  username_validation,
  email_validation,
  schema,
  password_validation,
  confrimPassword_validation,
} from "../../utils/validations/registerValidations";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { InputError } from "../elements";
import { Spinner } from "../elements";
import { yupResolver } from "@hookform/resolvers/yup";

import { register } from "../../actions/auth";
import { fetchUser } from "../../actions/user";

//Signup Form
const SignUpForm = () => {
  const methods = useForm({ resolver: yupResolver(schema), mode: "onChange" });
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [authError, setAuthError] = useState("");

  //Checks if user is already logged in and
  if (isLoggedIn) {
    return <Navigate to={"/profile" + user.username} />;
  }

  //Submits Signup
  const onSubmit = methods.handleSubmit(async (data) => {
    //gets values from react hook form
    const username = data.username;
    const password = data.password;
    const email = data.email;
    //submits is in progress
    setLoading(true);
    setAuthError("");

    await dispatch(register(username, email, password))
      .then(() => {
         //gets user info
         dispatch(fetchUser(username));
        //resets form and goes to profile page
        methods.reset();
        navigate("/profile/" + username);
      })
      .catch((error) => {
        //server error handling
        //submit is canceled
        setLoading(false);
        //authentication error message
        const signup_error = "Account already exists";
        if (error.includes("401")) {
          //sets authetication error message
          setAuthError(signup_error);
        } else {
          //sets other sever error messsage
          setAuthError(error);
        }
      });
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(e) => e.preventDefault()}
        noValidate
        className="tw-container"
      >
        <div className="">
          <Input {...username_validation} />
          <Input {...email_validation} />
          <Input {...password_validation} />
          <Input {...confrimPassword_validation} />
        </div>
        <div className="tw-mt-7">
          {authError && <InputError message={authError} />}
          <button
            onClick={onSubmit}
            className=" tw-flex tw-align-middle tw-cursor-pointer"
          >
            <Spinner loading={loading} />
            <span className="tw-inline-block tw-align-middle tw-leading-3">
              SignUp
            </span>
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default SignUpForm;
