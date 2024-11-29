
import { useState, useEffect } from "react";
import PostService from "../../services/post.services";
import { useParams } from "react-router-dom";
import { MainHub } from "../../components/main/MainHub";

//Profile Page
const Profile = () => {

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  const { username } = useParams();
  const pageSize = 9;
  const [offset,setOffset] = useState(0);
  const [totalPages,setTotalPages]=useState(0);
  const [totalResults,setTotalResults] = useState(0);

  //Gets Users posts
  useEffect(() => {
    PostService.getPostsByUsername(username,offset,pageSize).then(
      (response) => {
        const tp = response.content;
        setTotalPages(response.totalPages);
        setTotalResults(response.totalElements)
        setPosts(tp);
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
    
  }, [username,offset]);

  

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
        offset={offset}
        setOffset={setOffset}
        totalPages={totalPages}
        totalResults={totalResults} 
      />
      )
    }
    </>
  );
};

export default Profile;