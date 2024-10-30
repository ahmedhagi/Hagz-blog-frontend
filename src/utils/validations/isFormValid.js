//checks if form is invalid
export const isFormInvalid = err => {
    //if errors are present return true
    if (Object.keys(err).length > 0) return true
    return false
  }