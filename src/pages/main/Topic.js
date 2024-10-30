import { useState, useEffect } from "react";
import PostService from "../../services/post.services";
import { useParams } from "react-router-dom";
import { MainHub } from "../../components/main/MainHub";


import "../../resources/css/Home.css";

//Topic Posts Page
const Topic = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  const { topic } = useParams();

  //Gets posts by Topic
  useEffect(() => {
    PostService.getPostsByTopic(topic).then(
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
    
  }, [topic]);

  //sorts posts by oldest to newest
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
      mHeading={topic}
      // eslint-disable-next-line no-useless-concat
      mParagraph={"See all posts related to " + "\"" + topic.charAt(0).toUpperCase() + topic.slice(1) + "\"" }
      posts={posts}
      showPostBtn={true}
      showResults={true}
    />
      )
    }
    </>
  );
};

export default Topic;