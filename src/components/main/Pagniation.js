import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";


export const Pagniation = ({ offset, setOffset, totalPages }) => {
 

  const handleScrollUp = () => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };

 
  function handlePageChange(index) {
    if (offset !== index) {
      setOffset(index);
      handleScrollUp();
    }
  }

  function handleForward() {
    if (offset < totalPages - 1) {
      setOffset(offset + 1);
      handleScrollUp();
    }
  }

  function handleBack() {
    if (offset > 0) {
      setOffset(offset - 1);
      handleScrollUp();
    }
  }

  return (
    <div className=" tw-flex tw-items-center tw-justify-center tw-py-3">
      <button
        className="tw-w-10 tw-h-10 tw-mx-2 tw-flex tw-justify-center tw-items-center secondary-btn"
        onClick={() => {
          handleBack();
        }}
      >
        <IoIosArrowBack />
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          className={`tw-w-10 tw-h-10 tw-flex tw-justify-center tw-items-center tw-mx-2  ${
            i === offset ? "primary-btn" : "secondary-btn"
          }`}
          onClick={() => {
            handlePageChange(i);
          }}
        >
          {i + 1}
        </button>
      ))}
      <button
        className="tw-w-10 tw-h-10 tw-mx-2 tw-flex tw-justify-center tw-items-center secondary-btn"
        onClick={() => {
          handleForward();
        }}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};
