import { useState } from "react";
import { fileToDataString } from "../../utils/hooks/fileToDataString";
import { IoCloudUploadOutline } from "react-icons/io5";

//Header Image component for the PostEntry Form
export const HeaderImage = () => {
  const [selectedImage, setSelectedImage] = useState(false);
  const [previewImgUrl, setPreviewimgUrl] = useState("");
  const [dragActive, setDragActive] = useState(false);

  //Handles when file is Changed
  const handleFileChange = async (event) => {
    //gets file from clicking the file space
    let file = event.target.files;
    //sets file to selectedImag
    setSelectedImage(file?.[0]);
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
      //converst file to String src to be uploaded when post is submitted
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
    <div className="tw-flex tw-flex-col tw-my-3">
      <h3 className="tw-font-bold tw-capitalize tw-text-xl tw-m-0 tw-p-0">
        Header Image
      </h3>
      <div className="tw-flex tw-flex-col tw-items-center tw-self-start">
        {previewImgUrl && (
          <div>
            <img
              className="tw-w-[400px] tw-h-64  tw-object-cover"
              src={previewImgUrl}
              alt="headerPreview"
            />
          </div>
        )}
        {String(previewImgUrl).length === 0 ? (
          <label
            onDragEnter={handleDrag}
            htmlFor="dropzone-file"
            className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-[400px] tw-h-64 tw-border-2 tw-border-gray-300 tw-border-dashed tw-rounded-lg tw-cursor-pointer tw-relative tw-bg-gray-50 hover:tw-bg-gray-100"
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
              onChange={handleFileChange}
              accept="image/*"
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
        ) : (
          <button
            onClick={() => setPreviewimgUrl("")}
            className="secondary-btn tw-font-semibold tw-px-6 tw-py-3 tw-my-2"
          >
            Change Image
          </button>
        )}
      </div>
    </div>
  );
};
export default HeaderImage;
