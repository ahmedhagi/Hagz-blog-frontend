//Provides list of headings that are on a given page
//headings are able to be accessed when clicked
export const Headings = ({ headings, activeId }) => (
  <ul className="tw-list-none tw-p-0 tw-m-0">
    {headings.map((heading) => (
      <li
        key={heading.id}
        className={`tw-py-1 tw-overflow-hidden tw-whitespace-nowrap tw-text-ellipsis hover:tw-font-bold ${
          heading.id === activeId ? "tw-font-bold" : ""
        }`}
      >
        <a
          className="tw-no-underline tw-text-gray-700 tw-text-base"
          href={`#${heading.id}`}
          onClick={(e) => {
            e.preventDefault();
            document.querySelector(`#${heading.id}`).scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          {heading.title}
        </a>
        {heading.items.length > 0 && (
          <ul className="tw-list-none tw-p-0 tw-m-0">
            {heading.items.map((child) => (
              <li
                key={child.id}
                className={`tw-py-2 tw-ml-2 tw-overflow-hidden tw-whitespace-nowrap tw-text-ellipsis hover:tw-font-bold ${
                  child.id === activeId ? "tw-font-bold" : ""
                }`}
              >
                <a
                  className="tw-no-underline tw-text-gray-700"
                  href={`#${child.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(`#${child.id}`).scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  {child.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ul>
);
