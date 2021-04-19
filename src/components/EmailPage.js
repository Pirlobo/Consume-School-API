import React, { Component, useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import validate from "../services/validateInfo";
import useForm from "../hooks/useForm";
const EmailPage = (props) => {
  // Destruring Props
  const { submitForm, didEmailExists, emailNotExistsText } = props;
  const [loading, setLoading] = useState(false);
  const handleSuccessfullEmail = () => {
    setLoading(true);
  }
  const handleIncorrectEmail = () => {
    setLoading(false);
  }
  const handleLoading = () => {
    setLoading(false);
  }
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    didEmailExists,
    validate,
    handleSuccessfullEmail,
    handleIncorrectEmail,
    handleLoading
  );

  const focusRef = useRef();

  useEffect(() => {
    focusRef.current.focus();
  });

  return (
   <div >
        <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              {errors.email && <p className="text-alert">{errors.email}</p>}
            </label>
            <div className="inputWithIcon">
            <input
              ref={focusRef}
              type="text"
              className="form-control"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Please enter your email"
            />
              <i class="fas fa-envelope"></i>
              </div>
            
          </div>
          <div className="form-group">
            <button disabled={loading} type = "submit" className="primary-btn btn btn-primary btn-block">
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
              )}
              Send
            </button>
          </div>

          {emailNotExistsText && (
            <p
              className={
                "text-alert  " + (errors.email ? "text-hidden" : "")
              }
            >
              {emailNotExistsText}
            </p>
          )}
          {/* {verifyEmailText && <p  className={"text-alert text-center " + (errors.email ? 'text-hidden' : '')}>{verifyEmailText}</p>} */}
        </Form>
      </div>
    </div>
   </div>
  );
};

export default EmailPage;