import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
const useForm = (callback1, callback2, validate, callback3, callback4, callback5) => {
  const [errors, setErrors] = useState({});

  const [values, setValues] = useState({
    email: "",
    password: "",
    password2: "",
    code: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      callback3();
      setErrors(validate(values));
      setIsSubmitting(true);
    } catch (e) {
      setErrors(validate(values));
      setIsSubmitting(true);
    }
  };

  useEffect(() => {
    let unmounted = false;
    if (Object.keys(errors).length == 0 && isSubmitting) {
      const email = values.email;
      const password = values.password;
      const password2 = values.password2;
      if (email !== "") {
        AuthService.sendEmail(email).then((response) => {
          console.log(response.status);
          if (response.status == 404) {
            if(!unmounted){
              callback5();
              callback2();
            }
          } else {
            // did we mount the component yet ?
            if(!unmounted){ 
            localStorage.setItem("currentEmail", email);
            callback1()
            }
          }
        });
        // when the component is unmounted, this function will be called
        return () => {
          unmounted = true;
        }
      }
      const code = values.code;
      if (code !== "") {
        AuthService.getUserByCode(code).then((response) => {
          if (response.status) {
            callback4();
            callback2();
          
          } else {
            localStorage.setItem("code", code);
            callback1();
            callback4();
          }
        }); 
      }
     
      if (password !== "" && password2 !== "") {
        let currentEmail = localStorage.getItem("currentEmail");
        let code = localStorage.getItem("code");
        AuthService.resetPassword(
          currentEmail,
          code,
          password,
          password2
        ).then((response) => {
          localStorage.clear()
          callback1();
        });
      }
    } 
    
    try{
      console.log("error");
    callback4();
    }
    catch(e){
      return;
    }
    // else if (Object.keys(errors).length != 0) {
    //   // error sẽ bị in ra 2 lần bởi vì. Khi click submit, có error , nên callback4 bị gọi.
    //   // Error sẽ đc in ra lần 1 , sau khi callback4 bị gọi, state changed, re-render lại, error bị gọi lần thứ 2
    //   // kết thúc life cycle
     
    // }
    // errors can be changed anytime, so that including states errors are nesscarry which tells 
    // react that useEffect will be called if error changes occur
  });
  return { handleChange, handleSubmit, values, errors };
};

export default useForm;
