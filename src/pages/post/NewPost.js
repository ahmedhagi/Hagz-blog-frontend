import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../actions/post";
import { useNavigate } from "react-router-dom";
import PostEntry from "../../components/post/PostEntry";
import { useForm } from "react-hook-form";
import { InputError } from "../../components/elements/Input.js";


import "../../resources/css/EditPost.css";
import Error from "../error/Error";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../utils/validations/postValidations";
import { updateImage } from "../../utils/hooks/updateImage";

//New Post Page
const NewPost = (props) => {
  const [authError, setAuthError] = useState("");

  const methods = useForm({ resolver: yupResolver(schema) });

  const { post } = useSelector((state) => state.post);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let navigate = useNavigate();

  //Publishes Post
  const handleOnPost = methods.handleSubmit(async (data) => {
    const upData = await updateImage(data)
    await dispatch(createPost(upData))
      .then(() => {
        //reset form
        methods.reset();
      })
      .catch((error) => {
        //Server Error Handling

        //authenication error
        const login_error = "You are not logged in!";

        if (error.includes("401")) {
          //sets error to authencation error
          setAuthError(login_error);
        } else {
          //sets error to other errors in the server
          if (error === "") {
            setAuthError("Network Error");
          } else {
            setAuthError(error);
          }
        }
      });
  });

  //Navigate to post after post is published
  useEffect(() => {
    if (post) {
      navigate("/post/" + post.id);
    }
  }, [navigate, post]);

  return (
    <>
      {isLoggedIn ? (
        <div className="tw-p-5">
          <PostEntry methods={methods} />
          <div className="tw-mt-5">
            {authError && <InputError message={authError} />}
          </div>
          <button
            id="editButton"
            className="primary-btn tw-mt-3 tw-font-medium tw-text-base tw-px-6 tw-py-3"
            onClick={(e) => {
              handleOnPost(e);
            }}
          >
            Create Post
          </button>
        </div>
      ) : (
        <Error
          code={!isLoggedIn ? "401" : "404"}
          message={
            !isLoggedIn ? "Not authorized! User must be logged In" : null
          }
        />
      )}
    </>
  );
};

export default NewPost;
