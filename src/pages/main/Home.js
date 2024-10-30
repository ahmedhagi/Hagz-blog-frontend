import { useState, useEffect } from "react";
import PostService from "../../services/post.services";
import { useDispatch } from "react-redux";
import { MainHub } from "../../components/main/MainHub";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  const dispatch = useDispatch();
  
  //Gets All Posts
  useEffect(  ()  => {
     PostService.getPostsContent().then(
      (response) => {
        const posts = response.data;
        setPosts(sortedPosts(posts));
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
  }, [dispatch]);

  //sorts posts by oldest to newest
  function sortedPosts(posts)  {  
        return [...posts].sort((a,b) => {
        return new Date(a.createdOn).getTime() - 
            new Date(b.createdOn).getTime()
      }).reverse();
  }

  

  return (
    <>
   { !isLoading &&
    (
      <MainHub
        mHeading={"Home"}
        mParagraph={"Welcome to Hagz!"}
        posts={posts}
        showPostBtn={true}   
      />
    )
   }
   </>
  );
};

export default Home;