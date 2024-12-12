import { useState, useEffect } from "react";
import Select from "react-select";
import topicStlyes from "./TagSectionStyles.tsx";
import topicService from "../../services/topic.services.js";
import { useFormContext, Controller } from "react-hook-form";
import { InputError } from "../elements/Input.js";
import "../../resources/css/TagSection.css";

//TagSection for PostEntry Form
const TagSection = () => {
  //topic options
  const [topics, setTopics] = useState([]);
  //tag options
  const [tags, setTags] = useState([]);

  const methods = useFormContext();

//gets Topics from database
  useEffect(() => {
    topicService.getTopics().then(
      (response) => {
        setTopics(response.data);
      },
      (error) => {
        const _topics =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setTopics(_topics);
      }
    );
  }, []);

  //filter function that returns values not present in the seperate array
  function notIn(array) {
    //item are values in the initial array
    return function(item) {
      const val = array.findIndex(obj => (obj.id === item.id)) < 0
      return val;
    };
}

  //when topic or tags change to change the options available to user
  useEffect(() => {
    //new selected topic
    const topic = methods.getValues("topic");
    //selected tags by user
    const selected_tags = (methods.getValues("tag"))
    if (topic != null) {
      //set tag options and filiter out selected tags
      if(selected_tags != null){
        //all Tags in topic
        const allTags = (topic.tags)
        //get all available tags by filtering out selected tags
        const available_tags = allTags.filter(notIn(selected_tags));
        setTags(available_tags)
      }
      else{
        setTags(topic.tags)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methods.watch("topic"), methods.watch("tag")]);

  return (
    <div>
      <div className="tw-flex tw-flex-col sm:tw-flex-row">
        <div className="tw-mr-5 tw-z-10">
          <label className="tw-text-xl tw-font-bold tw-mt-3 tw-mb-2">
            {" "}
            Please Select a Topic
          </label>
          <Controller
            name="topic"
            control={methods.control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <Select
                options={topics}
                getOptionLabel={(option) => option.name}
                className="topic-multi-select tw-w-80"
                classNamePrefix="topic"
                inputId="topic"
                styles={topicStlyes}
                hideSelectedOptions={true}
                value={value}
                getOptionValue={(option) => option}
                onChange={(val) => {
                  onChange(val);
                }}
              />
            )}
          />
          {methods.formState.errors && methods.formState.errors.topic ? (
            <InputError message={methods.formState.errors.topic.message} />
          ) : null}
        </div>
        <div className="tw-z-10">
          <label className="tw-text-xl tw-font-bold tw-mb-2">Select Tags</label>
          <Controller
            name="tags"
            control={methods.control}
            render={({ field: { value, onChange } }) => (
              <Select
                isMulti
                inputId="tags"
                options={tags}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option}
                onChange={(val) => {
                  onChange(val);
                }}
                className="tags-multi-select tw-w-80 tw-mb-3"
                hideSelectedOptions={true}
                classNamePrefix="tags"
                value={value}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default TagSection;
