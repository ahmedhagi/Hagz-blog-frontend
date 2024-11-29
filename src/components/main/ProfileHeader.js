import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserService from "../../services/user.services";
import { Link, useParams } from "react-router-dom";
import { Image } from "../elements/Image";

//Profile Header for Profile Page
export default function ProfileHeader() {
  const { username } = useParams();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [user, setUser] = useState([]);

  //Gets user Details
  useEffect(() => {
    UserService.getUser(username).then(
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
  }, [username]);

  return (
    <div className="tw-mt-9">
      <div className="tw-flex tw-mb-4">
        <Image
          imageUrl={user.imageUrl}
          defaultUrl={require("../../resources/images/defaultProfilePic.png")}
          className="tw-object-cover tw-w-36 tw-h-36 tw-rounded-full tw-mr-2"
        />
        <h2 className=" tw-m-0 tw-pb-1 tw-capitalize tw-text-4xl tw-font-extrabold tw-self-end">
          {user.username}
        </h2>
      </div>
      <p className="tw-mt-2.5 tw-text-xl tw-mb-7.5">{user.bio}</p>
      {currentUser && String(currentUser.username) === String(username) && (
        <Link
          className="primary-btn tw-font-semibold tw-px-6 tw-py-3 tw-my-3"
          to="/post/new_post"
        >
          + Create Post
        </Link>
      )}
    </div>
  );
}
