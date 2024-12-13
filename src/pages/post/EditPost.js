import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../actions/post.js";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPost } from "../../actions/post.js";
import { useForm } from "react-hook-form";
import Error from "../error/Error.js";
import { InputError } from "../../components/elements/Input.js";
import PostEntry from "../../components/post/PostEntry.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../utils/validations/postValidations.js";
import { topicToTopicName, tagsToTagNames } from "../../utils/hooks/tagSectionHook";
import "../../resources/css/EditPost.css";

//Edited Post Page
const EditPost = (props) => {
  const [authError, setAuthError] = useState("");
  const [error, setError] = useState(false);

  const { id } = useParams();
  const { post, fetchPostInProgress } = useSelector((state) => state.post);
  const { user: currentUser } = useSelector((state) => state.auth);

  //react hook form has default value from post state
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues:  useMemo(() => {
      console.log("Post has changed");
      return post;
    }, [post]),
    mode: "onChange"
  });

  const dispatch = useDispatch();

  //Get posts
  useEffect(() => {
   
    function fetchData() {
      try {
        dispatch(fetchPost(id));
      } catch (error) {
        setError(true);
      }
    }
    fetchData();
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //updates data to remove unmapped values
  function updatedData(data) {
    let updateData = {};
    Object.entries(data).forEach(([key, value]) => {
      if (value !== post[key]) {
        if(key === "topic"){
          updateData["topicName"] = topicToTopicName(data.topic);
          delete updateData["topic"]
   
        }
        else if(key === "tags"){
          updateData["tagSet"] = tagsToTagNames(data.tags);
          delete updateData["topic"]
        }
        else{
          updateData[key] = value;
        }
      }
    });
    return updateData;
  }

  let navigate = useNavigate();

  //Handle Update to a Post
  const handleOnUpdate = methods.handleSubmit(async (data) => {
    const changedData = updatedData(data);
    //const upData = updateImage(changedData);
    await dispatch(updatePost(post.id, changedData))
      .then(() => {
        //Navigate to updated post
        methods.reset();
        let path = "/post/" + post.id;
        navigate(path);
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

  return (
    <>
      {!fetchPostInProgress &&
        ((post == null && error) !==
        (post != null &&
          currentUser != null &&
          String(post.username) !== String(currentUser.username)) ? (
          <Error
            code={
              currentUser && post && currentUser.usersname !== post.username
                ? "403"
                : "404"
            }
            message={
              currentUser && post && currentUser.usersname !== post.username
                ? "User Lack of Necessary Permissions"
                : null
            }
          />
        ) : (
          <>
            <div className="tw-p-5">
              <PostEntry methods={methods} />
              <div className="tw-mt-5">
                {authError && <InputError message={authError} />}
              </div>
              <button
                id="editButton"
                className="primary-btn tw-mt-3 tw-font-medium tw-text-base tw-px-6 tw-py-3"
                onClick={(e) => handleOnUpdate(e)}
              >
                Update Post
              </button>
              <button
                id="cancelButton"
                className="primary-btn tw-mt-3 tw-ml-2 tw-font-medium tw-text-base tw-px-6 tw-py-3"
                onClick={(e) => navigate(-1)}
              >
                Cancel
              </button>
            </div>
          </>
        ))}
    </>
  );
};

export default EditPost;
