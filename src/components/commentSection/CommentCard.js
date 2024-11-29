import moment from "moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { useState, useEffect } from "react";
import { CommentEntry } from "./CommentEntry";
import { deleteComment } from "../../actions/comment";
import { useDispatch } from "react-redux";
import UserService from "../../services/user.services";
import { Image } from "../elements/Image";

//Comment Card to be viewed in list of comments
export const CommentCard = ({ comment }) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [edit, setEdit] = useState(false);
  const commentContent = comment.content;
  const [user, setUser] = useState([]);

  //gets user info for profile image
  useEffect(() => {
    if (comment) {
      UserService.getUser(comment.username).then(
        (response) => {
          setUser(response.data);
        },
        (error) => {
          const _user =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();

          setUser(_user);
        }
      );
    }
  }, [comment]);

  const dispatch = useDispatch();

  //delete comment from post
  const handleDelete = () => {
    dispatch(deleteComment(comment.id));
  };

  return (
    <>
      {
        //CommentCard switches to CommentEntry when being editied
        edit === true ? (
          <CommentEntry
            comment={commentContent}
            commentID={comment.id}
            edit={edit}
            setEdit={setEdit}
          />
        ) : (
          <li class="comment">
            <div class="comment-info tw-flex tw-items-center">
              <Link
                to={`/profile/${comment.username}`}
                className="comment-user tw-flex"
              >
                <Image
                  imageUrl={user.imageUrl}
                  defaultUrl={require("../../resources/images/defaultProfilePic.png")}
                  className="tw-object-cover tw-w-8 tw-h-8 tw-rounded-full tw-mr-2"
                />
                <span className="tw-self-center">{comment.username}</span>
              </Link>
              <span class="middle-dot">·</span>
              <div class="comment-date">
                {" "}
                {moment
                  .utc(comment.createdOn)
                  .local()
                  .startOf("seconds")
                  .fromNow()}
              </div>

              {
                // eslint-disable-next-line eqeqeq
                comment.createdOn != comment.updatedOn && (
                  <>
                    <span class="middle-dot">·</span>
                    <div class="comment-date">
                      edited{" "}
                      {moment
                        .utc(comment.updatedOn)
                        .local()
                        .startOf("seconds")
                        .fromNow()}
                    </div>
                  </>
                )
              }
            </div>
            <div class="comment-content">
              {ReactHtmlParser(comment.content)}
            </div>
            {currentUser && currentUser.username === comment.username ? (
              <div class="comment-toolbar">
                <a
                  href={() => false}
                  onClick={() => {
                    setEdit(true);
                  }}
                >
                  <span className="tw-cursor-pointer">edit</span>
                </a>
                <span class="middle-dot">·</span>
                <a href={() => false} onClick={handleDelete}>
                  <span className="tw-cursor-pointer">delete</span>
                </a>
              </div>
            ) : null}
          </li>
        )
      }
    </>
  );
};
