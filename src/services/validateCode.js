const validatePassword = (values) => {
    let errors = {};
  
    if (!values.code) {
      errors.code = "This is a required field";
    } else if (values.code.length !== 6) {
      errors.code = "The code should contain 6 digits.";
    }
    return errors;
  };
  export default validatePassword;
  