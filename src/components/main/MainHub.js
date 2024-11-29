import Error from "../../pages/error/Error";
import MainHeader from "./MainHeader";
import PostCard from "./PostCard";
import HagzSideBar from "../navbar/Sidebar";
import ProfileHeader from "./ProfileHeader";
import { Pagniation } from "./Pagniation";

//Main Page which consists of PostCards
export const MainHub = ({
  mHeading,
  mParagraph,
  posts,
  profile,
  showResults,
  offset,
  setOffset,
  totalPages,
  totalResults
}) => {
  return (
    <>
      {posts && posts instanceof Array ? (
        <div className="tw-flex">
          <HagzSideBar />
          <div className="tw-flex tw-flex-col tw-flex-grow tw-mb-10 max-[800px]:tw-px-4 max-[1200px]:tw-px-8 tw-px-12">
            {!profile ? (
              <MainHeader heading={mHeading} paragraph={mParagraph} />
            ) : (
              <ProfileHeader />
            )}
            {showResults && (
              <div className="tw-my-2 tw-ml-1">{totalResults} Posts</div>
            )}

            <div
              className="
            tw-grid
            tw-grid-cols-[repeat(auto-fill,minmax(280px,1fr))]
            tw-gap-12
            -tw-mt-2.5
            tw-mx-0
            tw-mb-12
            tw-relative
            "
            >
              {posts.map((post, index) => {
                return <PostCard key={index} post={post} />;
              })}
            </div>
            { totalPages > 0 && 
            (<Pagniation
              offset={offset}
              setOffset={setOffset}
              totalPages={totalPages}
            />)
          }
          </div>
        </div>
      ) : (
        <Error />
      )}
    </>
  );
};
