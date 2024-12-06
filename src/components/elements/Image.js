import { useState, useEffect } from "react";

//Image component
export const Image = ({ imageUrl, defaultUrl, className }) => {
  const [imgUrl, setImgUrl] = useState("");

  //Sets image
  useEffect(() => {
    async function fetchData() {
      if ( await imageUrl != null && imageUrl.length !== 0 && imageUrl instanceof Array) {
        //ImageUrl is a byte array dsiplayed as base64
        const new_img = "data:image/png;base64," + imageUrl;
        setImgUrl(new_img);
      }
      else{
        setImgUrl(imageUrl);
      }
    }
    fetchData();
  }, [imageUrl]);

  return (
    <>
      <img
        className={className}
        alt={defaultUrl}
        src={`${imgUrl ? imgUrl : defaultUrl}`}
      />
    </>
  );
};
