//Header for Main Pages
export default function MainHeader({ heading, paragraph }) {
  return (
    <div className="tw-mt-9">
      <h2 className=" tw-capitalize tw-text-4xl tw-font-extrabold">
        {heading}
      </h2>
      <p className="tw-mt-2.5 tw-text-xl tw-mb-7.5">{paragraph}</p>
    </div>
  );
}
