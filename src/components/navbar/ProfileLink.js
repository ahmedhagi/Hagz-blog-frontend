import { Link, useLocation } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import UserService from "../../services/user.services";
import { Image } from "../elements/Image";



//Provide Profile Link in SideBar
export const ProfileLink = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [user, setUser] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();

  //gets User info
  useEffect(() => {
    async function fetchData() {
    if (currentUser) {
      await UserService.getUser(currentUser.username).then(
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
 
}
fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  return (
    <div>
      {currentUser && (
        <div className="xl:tw-px-3 xl:tw-pt-3 max-xl:tw-mb-3">
          <h4 className="tw-text-lg tw-font-bold tw-m-0 tw-my-2">Profile</h4>
          <Link
            className="tw-flex tw-items-center tw-no-underline visted:tw-text-black"
            reloadDocument
            to={"/profile/" + user.username}
          >
            <Image
                imageUrl={user.imageUrl}
                defaultUrl={require("../../resources/images/defaultProfilePic.png")}
                 className="tw-object-cover tw-w-8 tw-h-8 tw-rounded-full tw-mr-2"
            />
            <p className="tw-m-0 tw-font-bold tw-text-black hover:tw-text-blue-700">
              {user.username}
            </p>
          </Link>

          {!location.pathname.includes("/settings") && (
            <Link
              to={"/profile/" + user.username + "/settings"}
              className=" tw-flex tw-items-center tw-no-underline visted:tw-text-black tw-mt-1 tw-pl-1 tw-py-1 tw-w-[95%] tw-rounded-md hover:tw-bg-[#F5F5F5]"
            >
              <p className="tw-m-0 tw-text-black tw-font-semibold">Settings</p>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};
