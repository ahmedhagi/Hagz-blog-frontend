import * as yup from "yup";


export const schema = yup.object().shape({
    username: yup.string().required("Username not entered"),
    email: yup.string().email("Not a valid email").required("Email not entered "),
    password: yup.string()
                .required("Password not entered")
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                  ),
    confrimPassword : yup.string()
                        .required("Confrim Password not entered")
                        .oneOf([yup.ref("password")], "Passwords do not match")           
  });


export const username_validation = {
    name: 'username',
    label: 'username',
    type: 'text',
    id: 'username',
    placeholder: 'Username',
    validation: 
      "username"
    ,
    cnInput: "reg-input",
    cnLabel: "reg-label"
  }

export const email_validation = {
    name: 'email',
    label: 'email',
    type: 'text',
    id: 'email',
    placeholder: 'Email',
    validation: "email"
      
    ,
    cnInput: "reg-input",
    cnLabel: "reg-label"
  }

  export const password_validation = {
    name: 'password',
    label: 'password',
    type: 'password',
    id: 'password',
    placeholder: 'Password',
    validation: "password"
    ,
    cnInput: "reg-input",
    cnLabel: "reg-label"
  }

  export const confrimPassword_validation = {
    name: 'confrimPassword',
    label: 'confrim password',
    type: 'password',
    id: 'confrimPassword',
    placeholder: 'Confrim Password',
    validation: "confrimPassword",
    cnInput: "reg-input",
    cnLabel: "reg-label"
  }

  

  

  



  
  
