import * as yup from "yup";


export const schema = yup.object().shape({
    shortDesc: yup.string().required("Short Description was not entered").max(200, 'Exceeded 200-character limit'),
    title: yup.string().required("Title was not entered"),
    content: yup.string().required("Post field is empty"),
    topic: yup.mixed().required("Topic Required"),
           
  });

export const title_validation = {
    name: 'title',
    label: 'title',
    type: 'text',
    id: 'title',
    placeholder: 'Please Enter a title',
    validation: 'title',
    cnInput: "tw-p-2 tw-rounded-md tw-border-solid tw-w-full tw-box-border tw-max-w-[720px] tw-text-2xl tw-outline-none",
    cnLabel: "tw-font-bold tw-text-3xl"

  }

  export const shortDesc_validation = {
    name: 'shortDesc',
    label: 'Short Description',
    type: 'text',
    id: 'shortDesc',
    placeholder: 'Please add a short description',
    validation: 'shortDesc',
    multiline: true,
    cnInput: "tw-px-2 tw-py-4 tw-rounded-md tw-border-solid tw-border-2 tw-box-border tw-font-sans tw-w-full tw-max-w-[400px] tw-text-base tw-h-[120px] tw-resize-none tw-outline-none"
    
    ,
    cnLabel: "tw-font-bold tw-text-xl"

  }

  export const content_validation = {
    name: 'content',
    label: '',
    type: 'text',
    id: 'content',
    placeholder: '',
    validation: {
      required: {
        value: true,
        message: 'Post is empty',
      },
      maxLength: {
        value: 3600,
        message: 'Max Character Limit (3600))',
      }
    },
    cnInput: "tw-p-2 tw-rounded-md tw-border-solid tw-font-sans tw-w-1/2 tw-max-w-84 tw-text-2xl tw-outline-none",
    cnLabel: "multiline-label"

  }