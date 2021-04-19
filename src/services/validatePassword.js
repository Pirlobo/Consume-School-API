const validatePassword = (values) => {
    let errors = {};
  
    if (!values.password) {
      errors.password = "This is a required field";
    } else if (values.password.length < 6 || values.password.length > 40) {
      errors.password = "The password must be between 6 and 40 characters.";
    }
  
    if (!values.password2) {
      errors.password2 = "This is a required field";
    } 
 else if (values.password2 !== values.password) {
      errors.password2 = "Password does not match";
    }
  
    return errors;
  };
  export default validatePassword;
  