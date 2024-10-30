import { Link } from "react-router-dom";

//Form Header for Auth Pages
export default function Header({
  heading,
  paragraph,
  linkName,
  linkUrl = "#",
}) {
  return (
    <div className="tw-mt-9">
      <h2 className=" tw-text-4xl tw-font-extrabold">{heading}</h2>
      <p className="tw-mt-2.5 text-xl tw-mb-7.5">
        {paragraph}{" "}
        <Link to={linkUrl} className="tw-font-medium tw-text-primary">
          {linkName}
        </Link>
      </p>
    </div>
  );
}
