import PostService from "../../services/post.services";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import RelatedPosts from "./RelatedPosts";
import { AboutAuthor } from "./AboutAuthor";

//RightSide Post Content that user can interact with
export const PostSideContent = ({postTopic}) => {
  const [allPosts, setAllPosts] = useState([]);
  const dispatch = useDispatch();

  //Gets all posts for the AboutAuthor component
  useEffect(() => {
    const offset = 0;
    const pageSize = 6;
    PostService.getPostsByTopic(postTopic,offset,pageSize).then(
      (response) => {
        const posts = response.content;
        setAllPosts(posts);
      },
      (error) => {
        const _posts =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setAllPosts(_posts);
      }
    );
  }, [dispatch]);

  return (
    <div className="tw-ml-2 tw-p-3 max-xl:tw-col-[1] max-lg:tw-col-span-1 max-lg:tw-row-[2]">
      <AboutAuthor />
      <RelatedPosts allPosts={allPosts} />
    </div>
  );
};
