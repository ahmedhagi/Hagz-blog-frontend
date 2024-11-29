
import * as yup from "yup";
import { isValidFileSize, isValidFileType } from "./postValidations";

export const schema = yup.object().shape({
    bio: yup.string().max(200, 'Exceeded 200-character limit'),
    imageUrl: yup.mixed()
      .test("is-valid-type", "Not a valid image type",
        (file) =>  isValidFileType(file))
      .test("is-valid-size", "Max allowed size is 2.5MB",
        (file) => isValidFileSize(file) )
                  
  });

export const bio_validation = {
    name: 'bio',
    label: 'Bio',
    type: 'text',
    id: 'bio',
    placeholder: 'Please add a Bio',
    validation: 'bio',
    multiline: true,
    cnInput: "tw-px-2 tw-py-4 tw-rounded-md tw-border-solid tw-border-2 tw-box-border tw-font-sans tw-w-full tw-max-w-[400px] tw-text-base tw-h-[120px] tw-resize-none tw-outline-none"
    ,
    cnLabel: "tw-font-bold tw-text-xl"

  }