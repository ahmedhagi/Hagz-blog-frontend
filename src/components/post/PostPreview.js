import { Link } from "react-router-dom";
import { Image } from "../elements/Image";

//Post preview shown in the recommended posts section of the post page
export default function PostPreview({ postData }) {
  const post = postData;

  return (
    <>
      <div className="tw-flex tw-overflow-hidden tw-flex-shrink-0 tw-justify-between">
        <div className="tw-flex tw-flex-col">
          <div className="tw-flex tw-flex-col tw-text-gray-400">
            <Link
              to={`/topic/${post.topicName}`}
              className="tw-text-base tw-text-gray-400"
            >
              {post.topicName}
            </Link>
            <div className="tw-flex">
              <Link
                to={`/post/${post.id}/${post.slug}`}
                className="tw-flex tw-flex-wrap tw-flex-grow tw-px-0.5 tw-font-medium tw-text-lg  tw-text-gray-400 "
              >
                <div className="tw-flex tw-min-w-0">
                  <div className="tw-flex-1 tw-flex tw-flex-col tw-gap-[300px] tw-min-w-0">
                    <span className="tw-mt-2 tw-overflow-ellipsis tw-overflow-hidden tw-whitespace-pre-wrap postPreviewWebkit">
                      {post.title}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="tw-rounded-[10px] tw-w-[84px] tw-h-[84px] tw-m-0 tw-flex-shrink-0 tw-ml-2">
          <Image
            imageUrl={post.imageUrl}
            defaultUrl={require("../../resources/images/defaultHeader.jpg")}
            className="tw-w-full tw-h-full tw-rounded-lg tw-object-cover"
          />
        </div>
      </div>
      <div className="tw-text-sm tw-text-gray-400 tw-mb-3">
        <span>{post.commentCount} Comments</span>
      </div>
    </>
  );
}
