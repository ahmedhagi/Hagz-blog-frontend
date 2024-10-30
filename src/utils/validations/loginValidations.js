export const username_validation = {
    name: 'username',
    label: 'username',
    type: 'text',
    id: 'username',
    placeholder: 'Username or Email',
    validation: {
      required: {
        value: true,
        message: 'Username or Email has not been entered',
      }
    },
    cnInput: "reg-input",
    cnLabel: "reg-label"
  }

  export const password_validation = {
    name: 'password',
    label: 'password',
    type: 'password',
    id: 'password',
    placeholder: 'Password',
    validation: {
      required: {
        value: true,
        message: 'Password has not been entered',
      }
    },
    cnInput: "reg-input",
    cnLabel: "reg-label"
  }