import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import ReactHtmlParser from "react-html-parser";

//PostCard that shows up on MainPages
const PostCard = ({ post }) => {
  return (
    <>
      <div className="tw-relative tw-flex tw-flex-col tw-mt-6 tw-overflow-hidden tw-bg-white tw-shadow-md tw-bg-clip-border tw-rounded-xl">
        <div className="tw-pb-6">
          <div className=" tw-block tw-relative">
            <Link
              reloadDocument
              className="tw-box-border"
              to={`/post/${post.id}/${post.slug}`}
            >
              <img
                className="tw-object-cover tw-w-full tw-h-[315px] tw-mb-5"
                alt=""
                src={`${
                  post.imageURL
                    ? post.imageURL
                    : require("../../resources/images/defaultHeader.jpg")
                }`}
              ></img>
            </Link>
          </div>
          <div className="tw-px-2">
            <Link
              to={`/topic/${post.topic.name}`}
              className="tw-no-underline tw-text-gray-700 tw-font-semibold hover:tw-text-blue-700 "
            >
              {post.topic.name}
            </Link>
            <Link
              reloadDocument
              className="tw-no-underline tw-text-gray-700 tw-font-semibold hover:tw-text-blue-700 "
              to={`/post/${post.id}/${post.slug}`}
            >
              <h3 className="tw-block tw-text-xl tw-font-semibold tw-mb-2">
                {post.title}
              </h3>
            </Link>
            <p className="tw-block tw-text-base tw-font-light tw-mb-10 tw-leading-relaxed tw-max-h-56 tw-overflow-hidden">
              {ReactHtmlParser(post.shortDesc)}
            </p>
            <p className="tw-block tw-font-light tw-mb-3">
              Posted By {post.username} on{" "}
              {dateFormat(post.createdOn, "paddedShortDate")}
            </p>
            <p className="tw-block tw-font-light tw-mb-2">
              {" "}
              {post.comments.length} Comments{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
