import React, { Component, useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import validate from "../services/validateCode";
import useForm from "../hooks/useForm";
import video from "../asset/videos/video-1.mp4";
const EmailCodePage = (props) => {
  // Destruring Props
  // const { submitForm} = props;
  const [isValidCode, setIsValidCode] = useState(true);
  const [loading, setLoading] = useState(false);
  const submitCode = () => {
    setIsValidCode(false);
  }
  const handleFailedCodeSubmission = () => {
    setLoading(false);
  }
  const handleSuccessfullCodeSubmission = () => {
    setLoading(true);
  }
  const { handleChange, handleSubmit, values, errors } = useForm(
    props.submitCode,
    submitCode, // Check for whether code is valid
    validate,
    handleSuccessfullCodeSubmission,
    handleFailedCodeSubmission,
  );

  
  const focusRef = useRef();

  useEffect(() => {
    focusRef.current.focus();
  });

  return (
    <div className="herosection-container">
      <video src={video} autoPlay loop muted />
      <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <div className="text-center registration-text">Sent code via email</div>
        <Form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              {errors.code && <p className="text-alert">{errors.code}</p>}
            </label>
            <div className="inputWithIcon">
            <input
              ref={focusRef}
              type="text"
              className="form-control"
              name="code"
              // fixing for the error ("A component is changing an uncontrolled input of")
              value={values.code || ""}
              onChange={handleChange}
              placeholder="Enter the code"
            />
            <i class="fas fa-key"></i>
            </div>
           
          </div>

          <div className="form-group">
            <button disabled={loading} type = "submit" className="primary-btn btn btn-primary btn-block">
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
              )}
              <p>Submit Code</p>
            </button>
          </div>
         {!isValidCode &&  <div className = "text-center text-alert">Invalid Code</div>}
        </Form>
      </div>
    </div>
    </div>
    
  );
};

export default EmailCodePage;
