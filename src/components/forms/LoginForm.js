import { useForm, FormProvider } from "react-hook-form";
import { Input } from "../elements";
import {
  username_validation,
  password_validation,
} from "../../utils/validations/loginValidations";

import { login } from "../../actions/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { InputError } from "../elements";
import { Spinner } from "../elements";

//Login Form
const LoginForm = () => {
  const methods = useForm();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [authError, setAuthError] = useState("");

  //Submits Login
  const onSubmit = methods.handleSubmit(async (data) => {
    const username = data.username;
    const password = data.password;
    methods.reset();
    //indicates submission is in progress
    setLoading(true);
    setAuthError("");

    await dispatch(login(username, password))
      .then(() => {
        //goes to profile page after succesful login
        navigate("/profile/" + username);
      })
      .catch((error) => {
        //Server error handling
        //submissions ends/fails
        setLoading(false);
        //error for invalid authentication
        const login_error = "You have entered an invalid username or password";
        if (error.includes("401")) {
          //sets invalid authenication message
          setAuthError(login_error);
        } else {
          //sets other error message from server
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
          <Input {...password_validation} />
        </div>
        <div className="tw-mt-7">
          {authError && <InputError message={authError} />}
          <button
            onClick={onSubmit}
            className=" tw-flex tw-align-middle tw-cursor-pointer"
          >
            <Spinner loading={loading} />
            <span className="tw-inline-block tw-align-middle tw-leading-3">
              Login
            </span>
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
