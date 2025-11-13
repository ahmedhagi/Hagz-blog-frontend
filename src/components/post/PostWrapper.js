import dateFormat from "dateformat";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import  {Image}  from "../elements/Image";

//Contains the main Post Content to be shown in the Post page
export const PostWrapper = ({
  post,
  showDeleteLink,
  showUpdateLink,
  handleDelete,
  handleUpdate,
  routeChange,
}) => {
  return (
    <>
      <div className="tw-flex tw-flex-col tw-px-4 tw-grid-flow-dense sm:tw-col-[1] sm:tw-row-[1]">
        <div className="post-container">
          <div className="post-header tw-relative">
            <div className="tw-my-3">
              <Link
                className="primary-btn tw-font-medium tw-py-2 tw-px-5"
                to={"/topic/" + post.topic.name}
              >
                {post.topic.name}
              </Link>
            </div>
            <h1 className="post-title">{post.title}</h1>
            {post.imageUrl && (
              <Image
                  className="tw-object-cover tw-mt-3 tw-mb-6 tw-w-full tw-max-w-[620px] tw-h-[380px]"
                  imageUrl={post.imageUrl}
              />
            )}
            <div className="post-info tw-mb-1 max-[542px]:tw-text-sm">
              <Link
                reloadDocument
                to={"/profile/" + post.username}
                className="post-user"
              >
                {post.username}
              </Link>
              on {dateFormat(post.createdOn, "paddedShortDate")}
              {
                // eslint-disable-next-line eqeqeq
                post.createdOn != post.updatedOn && (
                  <>
                    <span className="middle-dot">·</span>
                    <div className="">
                      edited on {dateFormat(post.updatedOn, "paddedShortDate")}
                    </div>
                  </>
                )
              }
              <div className="tw-ml-2">
                {post.tags.map((tag) => (
                  <Link reloadDocument className="tag" to={"/tag/" + tag.name}>
                    #{tag.name}
                  </Link>
                ))}
              </div>
            </div>
            <p className="tw-m-0 tw-p-0 tw-mt-3 tw-italic tw-text-lg tw-text-gray-500">
              {post.shortDesc}
            </p>
          </div>

          <div className="post-content">{ReactHtmlParser(post.content)}</div>
        </div>

        {showDeleteLink && showUpdateLink ? (
          <div className=" tw-my-5">
            <Link
              className="tw-text-graylink tw-text-md tw-font-normal  "
              id="updatePost"
              type="Link"
              onClick={(e) => {
                handleUpdate(e, post.id, post.title, post.content);
              }}
            >
              Edit Post
            </Link>
            <span className="tw-text-graylink tw-mx-1">·</span>
            <Link
              className="tw-text-graylink tw-text-md tw-mr-1"
              id="deletePost"
              type="Link"
              onClick={(e) => {
                handleDelete(e);
              }}
            >
              Delete Post
            </Link>
          </div>
        ) : null}
      </div>
    </>
  );
};
