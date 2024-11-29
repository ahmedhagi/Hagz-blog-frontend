import { useState, useEffect } from "react";
import PostService from "../../services/post.services";
import { useDispatch } from "react-redux";
import { MainHub } from "../../components/main/MainHub";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const pageSize = 9;
  const [offset,setOffset] = useState(0);
  const [totalPages,setTotalPages]=useState(0);
  const [totalResults,setTotalResults] = useState(0);

  const dispatch = useDispatch();
  
  //Gets All Posts
  useEffect(  ()  => {
     PostService.getPostswithPagination(offset,pageSize).then(
      (response) => {
        const tp = response.content;
        setTotalPages(response.totalPages);
        setTotalResults(response.totalElements)
        setPosts(tp);
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
  }, [dispatch,offset]);
  

  return (
    <>
   { !isLoading &&
    (
      <MainHub
        mHeading={"Home"}
        mParagraph={"Welcome to Hagz!"}
        posts={posts}
        showPostBtn={true}
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

export default Home;