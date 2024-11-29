import { Input } from "../elements";
import { TbCameraPlus } from "react-icons/tb";
import { bio_validation } from "../../utils/validations/settingsValidations";
import { updateImage } from "../../utils/hooks/updateImage";
import {
  useForm,
  FormProvider,
  Controller,
  useFormContext,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../utils/validations/settingsValidations";
import { useState, useEffect } from "react";
import UserService from "../../services/user.services";
import { InputError } from "../elements";
import { fileToDataString } from "../../utils/hooks/fileToDataString";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { Image } from "../elements/Image";

//Profile Picture Editor for the profile settings component
const ProfilePictureEdit = ({ user }) => {
  const methods = useFormContext();
  const [previewImgUrl, setPreviewimgUrl] = useState("");

  //Handle File Change for Profile picture
  const handleFileChange = async (event, onChange) => {
    let file = event.target.files;
    try {
      //invokes change in the form
      onChange(file?.[0])
      //converts file to string for src
      const imgUrl = await fileToDataString(file?.[0]);
      //sets preview img to new img
      setPreviewimgUrl(imgUrl);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h4 className="tw-m-0 tw-pt-4 tw-text-lg">Profile Image</h4>
      <label
        htmlFor="profilePic"
        className="tw-flex tw-mt-2 tw-flex-col tw-items-center tw-justify-center tw-w-[120px] tw-h-[120px] tw-border-2 tw-border-gray-300 tw-rounded-full tw-cursor-pointer tw-relative"
      >
        <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-[120px] tw-h-[120px] tw-relative tw-overflow-auto tw-rounded-full tw-mix-blend-overlay tw-opacity-70 hover:tw-opacity-50">
          <Image
            imageUrl={
              previewImgUrl
                ? previewImgUrl
                : user && user.imageUrl !== null
                ? user.imageUrl
                : ""
            }
            defaultUrl={require("../../resources/images/defaultProfilePic.png")}
            className="tw-object-cover tw-rounded-full tw-max-h-full tw-max-w-full tw-min-h-full tw-min-w-full"
          />
          <TbCameraPlus className="tw-w-8 tw-z-10 tw-h-8 tw-absolute tw-top-[45px] tw-left-[45px] tw-text-gray-100" />
        </div>
        <Controller
          name="imageUrl"
          control={methods.control}
          render={({ field: { onChange } }) => (
            <input
              id="profilePic"
              className="tw-hidden"
              type="file"
              name="file"
              accept="image/*"
              onChange={(e) => {handleFileChange(e,onChange);}}
              disabled
            />
          )}
        />
      </label>
    </div>
  );
};

export const ProfileSettings = ({ user }) => {
  const [showSaved, setShowSaved] = useState(false);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: user,
  });

  //resets users form when user data is retrieved
  useEffect(() => {
    if (user) {
      methods.reset(user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  //Handles Update to profile infromation
  const handleOnUpdate = methods.handleSubmit(async (data) => {
    const upData = await updateImage(data)
    await UserService.updateUser(upData)
      .then(() => {
        methods.reset(data);
        //indicates that info is saved
        setShowSaved(true);
        //sets timer for animation
        setTimeout(() => {
          setShowSaved(false);
        }, 5000);
      })
      .catch((error) => {});
  });

  return (
    <div className="tw-mt-2">
      <h2 className="tw-m-0" id="profile-settings">
        Profile Settings
      </h2>
      <FormProvider {...methods}>
        <form className="tw-flex tw-flex-col tw-w-[450px]">
          <ProfilePictureEdit user={user} />
          <Input {...bio_validation} />
          {methods.formState.errors && methods.formState.errors.content ? (
            <InputError message={methods.formState.errors.content.message} />
          ) : null}
          <div className="tw-flex tw-flex-col">
            <div
              className={`${
                showSaved ? "tw-animate-fadeIn" : "tw-hidden"
              } tw-flex tw-my-2 tw-p-4 tw-bg-green-100 tw-border-solid tw-border-0 tw-border-l-4 tw-w-full tw-border-green-500 tw-text-green-700`}
            >
              <p className="tw-flex tw-items-center">
                <span className="tw-flex tw-h-4 tw-w-4 tw-mr-1 tw-justify-self-center tw-self-center">
                  <IoMdCheckmarkCircle />
                </span>
                <span>Settings Saved!</span>
              </p>
            </div>

            <button
              className="primary-btn tw-my-2 tw-px-6 tw-py-3 tw-font-medium tw-text-lg tw-self-start"
              onClick={handleOnUpdate}
            >
              Save
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
