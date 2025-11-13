import { useForm, Controller, FormProvider } from "react-hook-form";
import { InputError } from "../elements";
import CommentEditor from "../editor/CommentEditor";
import { useDispatch } from "react-redux";
import { addNewComment, updateComment } from "../../actions/comment";


//Comment Form for user to submit comment to post
export const CommentEntry = ({ postID, commentID, comment, edit, setEdit }) => {
  const methods = useForm();
  const dispatch = useDispatch();


  //Add comment to Post
  const handleSubmit = methods.handleSubmit(async (data) => {
    //e.preventDefault();
    const comment = data.editor;
    await dispatch(addNewComment(postID, comment)).then(() => {
    
      methods.reset();
    });
  });

  //Updates comment
  const handleUpdate = methods.handleSubmit(async (data) => {
    const comment = data.editor;

    await dispatch(updateComment(commentID, comment)).then(() => {
      methods.reset();
      setEdit(false);
    });
  });

  return (
    <FormProvider {...methods}>
      <form className="tw-mt-2 new-comment-form tw-w-full">
        <Controller
          name="editor"
          control={methods.control}
          rules={{
            required: {
              value: true,
              message: "Comment Empty",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <div className="xl:tw-w-3/4 tw-max-w-5xl tw-w-full">
              <CommentEditor
                initalValue={value}
                commentContent={comment}
                onChange={onChange}
              />
            </div>
          )}
        />
        {methods.formState.errors && methods.formState.errors.editor ? (
          <InputError message="Comment is empty" />
        ) : null}
        <div className="tw-mt-2">
          {edit === true ? (
            <>
              <button
                className="primary-btn tw-px-3 tw-py-1 tw-text-base  tw-mb-3"
                onClick={(e) => handleUpdate(e)}
              >
                Update
              </button>
              <button
                className="primary-btn tw-px-3 tw-py-1 tw-text-base tw-ml-2 tw-mb-3"
                onClick={() => {
                  setEdit(false);
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="primary-btn tw-px-4 tw-py-2 tw-text-base  tw-mb-3"
              onClick={(e) => handleSubmit(e)}
            >
              Comment
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};
