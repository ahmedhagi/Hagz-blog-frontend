import { useEffect, useState } from "react";
import PostPreview from "./PostPreview";
import { useSelector } from "react-redux";
import PostService from "../../services/post.services";


export default function RelatedPosts() {
  const { post } = useSelector((state) => state.post);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      if (!post?.id) return;
      
      try {
        setLoading(true);
        PostService.getRelatedPosts(post.id, 5).then((response) => {
          setRelatedPosts(response);
        });
      } catch (error) {
        console.error("Error fetching related posts:", error);
        setRelatedPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedPosts();
  }, [post?.id]);

  if (loading) {
    return (
      <div className="tw-flex tw-flex-col tw-shadow-md tw-rounded-md tw-p-3">
        <p className="tw-my-3 tw-font-bold tw-text-lg">Related Posts</p>
        <p className="tw-text-gray-500">Loading...</p>
      </div>
    );
  }

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="tw-flex tw-flex-col tw-shadow-md tw-rounded-md tw-p-3">
      <p className="tw-my-3 tw-font-bold tw-text-lg">Related Posts</p>
      {relatedPosts.map((post) => (
        <PostPreview key={post.id} postData={post} />
      ))}
    </div>
  );
}