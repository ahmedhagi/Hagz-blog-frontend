import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { fetchPost, deletePost } from "../../actions/post";

import Error from "../error/Error";
import PostSideBar from "../../components/post/PostSideBar";
import { PostSideContent } from "../../components/post/PostSideContent";

import "../../resources/css/Post.css";
import { PostWrapper } from "../../components/post/PostWrapper";
import { CommentWrapper } from "../../components/post/CommentWrapper";

//Post View Page
function PostPage() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);
  let { fetchPostInProgress, fetchPostError, post } = useSelector(
    (state) => state.post
  );
  //const { comment: stateComment } = useSelector((state) => state.comment);

  const [showDeleteLink, setShowDeleteLink] = useState(false);
  const [showUpdateLink, setShowUpdateLink] = useState(false);

  //Gets Post
  useEffect(() => {
    dispatch(fetchPost(id)).catch(() => {});
  }, [id, dispatch]);

  //Checks to add user features
  useEffect(() => {
    if (
      post != null &&
      currentUser != null &&
      post.username === currentUser.username
    ) {
      setShowDeleteLink(true);
      setShowUpdateLink(true);
    } else {
      setShowDeleteLink(false);
      setShowUpdateLink(false);
    }
  }, [post, currentUser]);

  let router_navigate = useNavigate();

  //Delete Feature Function
  const handleDelete = (event) => {
    event.preventDefault();
    dispatch(deletePost(id));
  };

  //Handles Upadte function
  const handleUpdate = (event, id, title, content) => {
    event.preventDefault();
    let path = "/post/update/" + id;
    router_navigate(path, {
      state: {
        create: false,
        update: true,
        id: id,
        title: title,
        content: content,
      },
    });
  };

  //Changes location function to home
  function routeChange() {
    let path = "/home";
    router_navigate(path);
    window.location.reload(true);
  }

  return (
    <>
      {" "}
      {!fetchPostInProgress && fetchPostError != null && (
        <div>
          {" "}
          {post === null ? (
            <Error />
          ) : (
            <div className="tw-flex tw-relative">
              <PostSideBar />
              <div
                className="
              tw-grid
              tw-w-full
              tw-gap-3
              tw-grid-cols-1
              tw-grid-rows-[1fr,auto,auto]
              xl:tw-grid-rows-[1fr,auto]
              xl:tw-grid-cols-[minmax(0,1fr),410px]
              tw-p-3
              tw-pt-5
              
              "
              >
                <PostWrapper
                  post={post}
                  showDeleteLink={showDeleteLink}
                  showUpdateLink={showUpdateLink}
                  handleDelete={handleDelete}
                  handleUpdate={handleUpdate}
                  routeChange={routeChange}
                />
                <PostSideContent />
                <CommentWrapper />
              </div>
            </div>
          )}{" "}
        </div>
      )}{" "}
    </>
  );
}

export default PostPage;
