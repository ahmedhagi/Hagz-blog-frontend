import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserService from "../../services/user.services";
import { Link } from "react-router-dom";

//Author information to be displayed by post
export const AboutAuthor = () => {
  const [user, setUser] = useState([]);
  const { post } = useSelector((state) => state.post);

  //Gets Author's information
  useEffect(() => {
    if (post) {
      UserService.getUser(post.username).then(
        (response) => {
          setUser(response.data);
        },
        (error) => {
          const _user =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();

          setUser(_user);
        }
      );
    }
  }, [post]);

  return (
    post && (
      <div className=" tw-w-[300px] tw-flex tw-flex-col tw-flex-shrink-0 tw-mb-3">
        <div className=" tw-shadow-md tw-p-3 tw-rounded-md">
          <p className="tw-m-0 tw-my-3 tw-text-lg tw-font-bold">About Author</p>
          <Link
            className="tw-flex tw-no-underline visted:tw-text-black"
            reloadDocument
            to={"/profile/" + post.username}
          >
            <img
              className="tw-object-cover tw-w-12 tw-h-12 tw-rounded-full tw-mr-2"
              alt=""
              src={`${
                user.imageURL
                  ? user.imageURL
                  : require("../../resources/images/defaultProfilePic.png")
              }`}
            ></img>
            <p className="tw-mt-5 tw-font-bold tw-text-black hover:tw-text-blue-700">
              {user.username}
            </p>
          </Link>
          <div className="tw-flex">
            <p className="tw-font-light">{user.bio}</p>
          </div>
        </div>
      </div>
    )
  );
};
