import { useState } from "react";
import { fileToDataString } from "../../utils/hooks/fileToDataString";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useFormContext, Controller } from "react-hook-form";
import { InputError } from "../elements";

//Header Image component for the PostEntry Form
export const HeaderImage = () => {
  const [previewImgUrl, setPreviewimgUrl] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const methods = useFormContext();

  //Handles when file is Changed
  const handleFileChange = async (event,onChange) => {
    //gets file from clicking the file space
    let file = event.target.files;
    if (!file) {
      //checks if file is by draggin and drop file into file space
      const dragFile = event.dataTransfer.files;
      if (!dragFile) {
        return;
      } else {
        //the dragFile is then set to the file variable
        file = dragFile;
      }
    }
    try {
      //invokes change in the form
        onChange(file?.[0])
      //converts file to String src to be uploaded when post is submitted
      const imgUrl = await fileToDataString(file?.[0]);
      //sets the image to preview image which can be changed if new file is choosen
      setPreviewimgUrl(imgUrl);
    } catch (error) {
      //logs the error
      console.log(error);
    }
  };

  //function for handling dragging file into file space
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  //function for when file is dropped into file space
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e);
    }
  };

  return (
    <div className="tw-flex tw-flex-col tw-my-3 tw-relative">
      <h3 className="tw-font-bold tw-capitalize tw-text-xl tw-m-0 tw-p-0">
        Header Image
      </h3>
      <div className="tw-flex tw-flex-col tw-items-center tw-self-start">
        {previewImgUrl && (
          <div>
            <img
              className="tw-w-[330px] tw-h-64  tw-object-cover"
              src={previewImgUrl}
              alt="headerPreview"
            />
          </div>
        )}
        {String(previewImgUrl).length === 0 ? (
          <Controller
            name="imageUrl"
            control={methods.control}
            render={({ field: { onChange } }) => (
              <label
                onDragEnter={handleDrag}
                htmlFor="dropzone-file"
                className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-[330px] tw-h-64 tw-border-2 tw-border-gray-300 tw-border-dashed tw-rounded-lg tw-cursor-pointer tw-relative tw-bg-gray-50 hover:tw-bg-gray-100"
              >
                <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-pt-5 tw-pb-6">
                  <IoCloudUploadOutline className="tw-w-8 tw-h-8 tw-mb-4 tw-text-gray-500" />
                  <p className="tw-mb-2 tw-text-sm tw-text-gray-500 tw-dark:text-gray-400">
                    <span className="tw-font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="tw-text-xs tw-text-gray-500">
                    SVG, PNG or JPG (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  className="tw-hidden"
                  type="file"
                  name="file"
                  onChange={ (e) => {handleFileChange(e,onChange);}}
                  accept="image/*"
                  disabled
                />
                {dragActive && (
                  <div
                    className="tw-w-full tw-h-full tw-absolute tw-top-0 tw-bottom-0 tw-left-0 tw-right-0"
                    id="drag-file-element"
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  ></div>
                )}
              </label>
            )}
          />
        ) : (
          <button
            onClick={() => {setPreviewimgUrl("");}}
            className="secondary-btn tw-font-semibold tw-px-6 tw-py-3 tw-my-2"
          >
            Change Image
          </button>
        )}
        {methods.formState.errors && methods.formState.errors.imageUrl ? (
          <InputError message={methods.formState.errors.imageUrl.message} />
        ) : null}
      </div>
    </div>
  );
};
export default HeaderImage;
