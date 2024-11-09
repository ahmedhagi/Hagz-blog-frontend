import { ProfileSettings } from "../../components/settings/ProfileSettings";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Error from "../error/Error.js";
import { useParams } from "react-router-dom";
import SettingsSideBar from "../../components/settings/SettingsSideBar";
import UserService from "../../services/user.services";

//Settings Page
export const Settings = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [user, setUser] = useState(null);

  const { username } = useParams();

  //Gets user info
  useEffect(() => {
    if (username) {
      async function fetchData() {
        await UserService.getUser(username).then(
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
      fetchData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    { (currentUser == null) !== (username &&
      currentUser &&
      String(username) !== String(currentUser.username)) ? (
        <Error
          code={
            currentUser && username && currentUser.usersname !== username
              ? "403"
              : "404"
          }
          message={
            currentUser && username && currentUser.usersname !== username
              ? "User Lack of Necessary Permissions"
              : null
          }
        />
      ) : (
        <div className="tw-flex tw-h-full">
          <SettingsSideBar />
          <div className="tw-mt-3 tw-px-5 tw-relative">
            <ProfileSettings user={user} />
          </div>
        </div>
      )}
    </>
  );
};
