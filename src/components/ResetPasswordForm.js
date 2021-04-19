import React, { Component, useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import validate from "../services/validatePassword";
import useForm from "../hooks/useForm";
import video from "../asset/videos/video-1.mp4";
const ResetPasswordForm = (props) => {
  // Destruring Props
  const { resetPassword, didEmailExists, emailNotExistsText } = props;
  const { handleChange, handleSubmit, values, errors } = useForm(
    resetPassword,
    null,
    validate,
    null,
    null
  );
  const user = JSON.parse(localStorage.getItem("resetPasswordUser"));

  return (
    <div className="herosection-container">
      <video src={video} autoPlay loop muted></video>
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />
          <div>
            {user && (
              <p className="reset-password-text registration-text">
                This reset password form is for : {user.username}
              </p>
            )}
          </div>
          <Form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                {errors.password && (
                  <p className="text-alert">{errors.password}</p>
                )}
              </label>
              <div className="inputWithIcon">
                <input
                  type="text"
                  className="form-control"
                  name="password"
                  // fixing for the error ("A component is changing an uncontrolled input of")
                  value={values.password || ""}
                  onChange={handleChange}
                  placeholder="Enter new password"
                />
                <i class="fas fa-lock"></i>
              </div>
            </div>

            <div className="form-group">
              <label>
                {errors.password2 && (
                  <p className="text-alert">{errors.password2}</p>
                )}
              </label>
              <div className="inputWithIcon">
                <input
                  type="text"
                  className="form-control"
                  name="password2"
                  // fixing for the error ("A component is changing an uncontrolled input of")
                  value={values.password2 || ""}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                />
                <i class="fas fa-lock"></i>
              </div>
            </div>

            <div className="form-group">
              <button className="primary-btn btn btn-primary btn-block">
                <p>Reset Password</p>
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
