//finds Error from errors in react hook given the name of the input
export function findInputError(errors, name) {
    const filtered = Object.keys(errors)
      //checks if name is included in 
      .filter(key => key.includes(name))
      //returns error from input
      .reduce((cur, key) => {
        return Object.assign(cur, { error: errors[key] })
      }, {})
    return filtered
  }