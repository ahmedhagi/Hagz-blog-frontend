import  { useState, useEffect } from "react";
import PostService from "../../services/post.services";
import { useParams } from "react-router-dom";
import { MainHub } from "../../components/main/MainHub";
import "../../resources/css/Home.css";

//Tagged Post Page
const Tag = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  const { tag } = useParams();

  //Gets posts by tag
  useEffect(() => {
    PostService.getPostsByTag(tag).then(
      (response) => {
        const tp = response;
        const sp = sortedPosts(tp);
        setPosts(sp);
        setIsLoading(false)
        
      },
      (error) => {
        const _posts =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setPosts(_posts);
        setIsLoading(false)
      }
    );
    
  }, [tag]);

  //sorts post by oldest
  function sortedPosts(tp)  {  
   return [...tp].sort((a,b) => {
    return new Date(a.createdOn).getTime() - 
        new Date(b.createdOn).getTime()
  }).reverse();
}

  return (
    <>
    { !isLoading &&
      (
    <MainHub
      mHeading={tag}
      // eslint-disable-next-line no-useless-concat
      mParagraph={"See all posts related to " + "\"" + tag.charAt(0).toUpperCase() + tag.slice(1) + "\"" }
      posts={posts}
      showPostBtn={true}
      showResults={true}
    />
      )
    }
    </>
  );
};

export default Tag;