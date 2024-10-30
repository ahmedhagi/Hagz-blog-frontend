import { useEffect } from "react";
import { Controller } from "react-hook-form";
import TagSection from "../tagSection/TagSection";
import Editor from "../editor/Editor";
import { FormProvider } from "react-hook-form";
import { Input, InputError } from "../elements";
import {
  title_validation,
  shortDesc_validation,
} from "../../utils/validations/postValidations";
import { useSelector } from "react-redux";
import HeaderImage from "./HeaderImage";

//Post model represented in a form to be edited or created
const PostEntry = ({ methods }) => {
 
  const { post } = useSelector((state) => state.post);

  //if post is being edit reset the react form to include default values of the orginal post
  useEffect(() => {
    if (post != null) {
      methods.reset(post);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methods.reset]);


  return (
    <FormProvider {...methods}>
      <form>
        <div className="tw-grid tw-gap-3 tw-grid-cols-1 tw-row-[auto,auto,auto] xl:tw-grid-rows-[1fr,auto] xl:tw-grid-cols-[minmax(0,1fr),350px]">
          <div className="tw-flex tw-flex-col tw-flex-grow tw-relative sm:tw-col-[1] sm:tw-row-[1]">
            <Input {...title_validation} value={methods.getValues("title")} />
            <TagSection 
            />
          </div>
          <div className="tw-flex tw-flex-col xl:tw-col-[2] xl:tw-row-[1/3] max-xl:tw-col-span-1 max-xl:tw-row-[2] xl:tw-sticky tw-overflow-auto tw-static tw-top-2 tw-max-h-[calc(100vh-20px)] tw-flex-shrink-0">
            <div className="tw-my-2">
              <Input
                {...shortDesc_validation}
                value={methods.getValues("shortDesc")}
              />
            </div>
            <HeaderImage />
          </div>
          <div className="tw-mt-3 xl:tw-row-[2] xl:tw-col-[1]  max-xl:tw-row-[3]">
            <Controller
              name="content"
              control={methods.control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <Editor
                  value={value}
                  initalValue={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
        </div>
        {methods.formState.errors && methods.formState.errors.content ? (
          <InputError message={methods.formState.errors.content.message} />
        ) : null}
      </form>
    </FormProvider>
  );
};

export default PostEntry;
