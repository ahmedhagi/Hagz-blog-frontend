import RelatedPosts from "./RelatedPosts";
import { AboutAuthor } from "./AboutAuthor";

//RightSide Post Content that user can interact with
export const PostSideContent = ({postTopic}) => {


  return (
    <div className="tw-ml-2 tw-p-3 max-xl:tw-col-[1] max-lg:tw-col-span-1 max-lg:tw-row-[2]">
      <AboutAuthor />
      <RelatedPosts/>
    </div>
  );
};
