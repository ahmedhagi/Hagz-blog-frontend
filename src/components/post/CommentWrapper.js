import { Link } from "react-router-dom";
import CommentSection from "../commentSection/CommentSection";
import { CommentEntry } from "../commentSection/CommentEntry";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

//Contains the CommentSection and CommentEntry aspects of the Post Page
export const CommentWrapper = () => {
  const [showNewComment, setShowNewComment] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  let { post } = useSelector((state) => state.post);

  //if user is login they can add comment to post
  useEffect(() => {
    if (currentUser) {
      setShowNewComment(true);
    } else {
      setShowNewComment(false);
    }
  }, [currentUser]);

  return (
    <div className="sm:tw-col-[1/3] lg:tw-row-[3]">
      <CommentSection comments={post.comments} id={post.id} />
      <div className="tw-mt-4 tw-mb-5">
        {showNewComment ? (
          <CommentEntry postID={post.id} comment={""} />
        ) : (
          <div className="tw-my-4">
            Please Login to comment!{" "}
            <Link reloadDocument to="/login">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
