import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../resources/css/CommentSection.css";
import CommentServices from "../../services/comment.services";
import { CommentCard } from "./CommentCard";

//List of Comments under Post
export default function CommentSection(props) {
  const { comment: stateComment } = useSelector((state) => state.comment);
  const [comments, setComments] = useState([]);

  //sorts comments from oldest to newest
  const sortedComments = (array) => {
    return array.sort((a, b) => {
      return new Date(a.createdOn).getTime() - new Date(b.createdOn).getTime();
    });
  };

  //Gets comment from Post id from props in parent component
  useEffect(() => {
    CommentServices.getComments(props.id).then(
      (response) => {
        setComments(sortedComments(response));
      },
      (error) => {
        const _comments =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setComments(_comments);
      }
    );
  }, [props.id, stateComment]);

  return (
    <div className="tw-container">
      <div class="num-comments">{comments ? comments.length : 0} comments</div>
      <hr />
      <div class="comments">
        <ul class="comment-list">
          {
            comments &&
            // eslint-disable-next-line eqeqeq
              comments != [] &&
              comments.map((new_comment) => {
                return (
                  <div>
                    <CommentCard comment={new_comment} />
                  </div>
                );
              })
          }
        </ul>
      </div>
    </div>
  );
}
