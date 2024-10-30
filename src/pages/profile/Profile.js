
import { useState, useEffect } from "react";
import PostService from "../../services/post.services";
import { useParams } from "react-router-dom";
import { MainHub } from "../../components/main/MainHub";

//Profile Page
const Profile = () => {

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  const { username } = useParams();

  //Gets Users posts
  useEffect(() => {
    PostService.getPostsByUsername(username).then(
      (response) => {
        const tp = response;
        //sorts posts by oldest
        const sp = sortedPosts(tp);
        setPosts(sp);
        //loading is set to false
        setIsLoading(false)
        
      },
      (error) => {
        const _posts =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setPosts(_posts);
        //error is return set loading to false
        setIsLoading(false)
      }
    );
    
  }, [username]);

  //function that sets posts to oldest to newests
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
        mHeading={username}
        // eslint-disable-next-line no-useless-concat
        mParagraph={"See all posts by "  + username.charAt(0).toUpperCase() + username.slice(1)  }
        posts={posts}
        profile={true}
        showResults={true}   
      />
      )
    }
    </>
  );
};

export default Profile;