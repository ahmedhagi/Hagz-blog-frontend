import { Link } from "react-router-dom";

//Post preview shown in the recommended posts section of the post page
export default function PostPreview({ postData }) {
  const post = postData;

  return (
    <>
      <div className="tw-flex tw-flex-shrink-0 tw-justify-between">
        <div className="tw-flex tw-flex-col">
          <div className="tw-flex tw-flex-col tw-text-gray-400">
            <Link
              to={`/topic/${post.topic.name}`}
              className="tw-text-base tw-text-gray-400"
            >
              {post.topic.name}
            </Link>
            <div className="tw-flex">
              <Link
                to={`/post/${post.id}/${post.slug}`}
                className="tw-flex tw-flex-wrap tw-flex-grow tw-px-0.5 tw-font-medium tw-text-lg  tw-text-gray-400 "
              >
                <div className="tw-flex tw-min-w-0">
                  <div className="tw-flex tw-flex-col tw-gap-[300px]">
                    <span className="tw-mt-2 tw-overflow-hidden tw-whitespace-pre-wrap">
                      {post.title}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="tw-rounded-[10px] tw-w-[84px] tw-h-[84px] tw-m-0 tw-flex-shrink-0 tw-ml-2">
          <img
            className="tw-w-full tw-h-full tw-rounded-lg"
            alt=""
            src={`${
              post.imageURL
                ? post.imageURL
                : require("../../resources/images/defaultHeader.jpg")
            }`}
          ></img>
        </div>
      </div>
      <div className="tw-text-sm tw-text-gray-400 tw-mb-3">
        <span>{post.comments.length} Comments</span>
      </div>
    </>
  );
}
