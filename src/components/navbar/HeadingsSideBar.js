import { useHeadsObserver } from "../../utils/hooks/tableOfContentsHook";
import { useHeadingsData } from "../../utils/hooks/headingsHook";
import { Headings } from "../navbar/Headings";

//Creates Sidebar for Headings
export const HeadingsSideBar = ({ title }) => {
  //Points to specific heading to be highlighted in sidebar
  const { activeId } = useHeadsObserver();
  //gets Headings from the current page
  const { nestedHeadings } = useHeadingsData();

  return (
    <nav className="tw-flex tw-flex-col tw-p-3">
      <div className="tw-text-lg tw-font-bold ">{title}</div>
      <Headings headings={nestedHeadings} activeId={activeId} />
    </nav>
  );
};
export default HeadingsSideBar;
