import PostPreview from "./PostPreview";
import { useSelector } from "react-redux";

//Related Posts section for the current post on the Post Page
export default function RelatedPosts({ allPosts }) {
  let { post } = useSelector((state) => state.post);

  // filter out current post
  let posts = allPosts.filter((aPost) => aPost.id !== post.id);

  // define maxPosts to display
  const maxPosts = 5;

  // get tags of current posts
  const tags = post.tags.map((tag) => {
    return tag.name;
  });

  // rate posts depending on tags
  posts.forEach((post) => {
    post.relevance = 0;
    post.tags.forEach((tag) => {
      if (tags.includes(tag.name)) {
        post.relevance++;
      }
    });
  });

  // sort posts by relevance
  const sortedPosts = posts.sort(function (a, b) {
    return b.relevance - a.relevance;
  });

  return (
    <div className="tw-flex tw-flex-col tw-shadow-md tw-rounded-md tw-p-3">
      <p className="tw-my-3 tw-font-bold tw-text-lg">Related Posts</p>
      {sortedPosts.slice(0, maxPosts).map((post, i) => (
        <PostPreview key={i} postData={post} />
      ))}
    </div>
  );
}
