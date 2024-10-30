import { useFormContext } from "react-hook-form";
import { findInputError, isFormInvalid } from "../../utils/validations";
import { MdErrorOutline } from "react-icons/md";

//Input field for forms
export const Input = ({
  label,
  type,
  id,
  placeholder,
  validation,
  name,
  multiline,
  cnInput,
  cnLabel,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  /*uses the validation hooks to see if there is errors present in
    the current form
    */
  const inputError = findInputError(errors, name);
  const isInvalid = isFormInvalid(inputError);

  return (
    <div className="tw-flex tw-flex-col tw-w-full tw-gap-2">
      <div className="tw-flex tw-containerjustify-between">
        <label htmlFor={id} className={`${cnLabel} tw-capitalize`}>
          {label}
        </label>
      </div>
      {multiline ? (
        <textarea
          id={id}
          type={type}
          className={`${cnInput} ${
            isInvalid ? "tw-border-red-500" : "tw-border-slate-300"
          } focus:tw-border-slate-600 focus:tw-outline-none `}
          placeholder={placeholder}
          {...register(`${name}`, validation)}
        ></textarea>
      ) : (
        <input
          id={id}
          type={type}
          className={`${cnInput} ${
            isInvalid ? "tw-border-red-500" : "tw-border-slate-300"
          } focus:tw-border-slate-600 focus:tw-outline-none `}
          placeholder={placeholder}
          {...register(name, validation)}
        />
      )}
      {isInvalid && (
        <InputError
          message={inputError.error.message}
          key={inputError.error.message}
        />
      )}
    </div>
  );
};

//Error that appears under input field
export const InputError = ({ message }) => {
  return (
    <div className="tw-mb-2">
      <div className="tw-flex tw-items-center tw-gap-1 tw-px-2 tw-font-semibold tw-text-red-500 tw-text-sm">
        <MdErrorOutline />
        {message}
      </div>
    </div>
  );
};
