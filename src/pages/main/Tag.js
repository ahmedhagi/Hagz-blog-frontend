import  { useState, useEffect } from "react";
import PostService from "../../services/post.services";
import { useParams } from "react-router-dom";
import { MainHub } from "../../components/main/MainHub";
import "../../resources/css/Home.css";

//Tagged Post Page
const Tag = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const pageSize = 9;
  const [offset,setOffset] = useState(0);
  const [totalPages,setTotalPages]=useState(0);
  const [totalResults,setTotalResults] = useState(0);

  const { tag } = useParams();

  //Gets posts by tag
  useEffect(() => {
    PostService.getPostsByTag(tag,offset,pageSize).then(
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
    
  }, [tag,offset]);


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

export default Tag;