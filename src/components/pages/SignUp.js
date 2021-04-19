import React, { userState, useEffect, useRef } from "react";
import "./SignUp.css";
import validate from "../../services/validateInfo";
import useForm from "../../hooks/useForm";
function SignUp({ submitForm }) {
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    null,
    validate
  );

  return (
    <div id="wrapper">
      <div id="left">
        <div id="signin">
          <div class="logo">
            <img
              src="https://image.ibb.co/hW1YHq/login-logo.png"
              alt="Sluralpright"
            />
          </div>
          <form onSubmit={handleSubmit} method="post" class="form-center">
            <div class="form-content">
              <div class="form-width">
                <div>
                  <label>
                    {" "}
                    {!errors.email && (
                      <p className="signIn-label">Email or username</p>
                    )}{" "}
                    {errors.email && (
                      <p className="signIn-label text-alert">{errors.email}</p>
                    )}
                  </label>
                </div>
                <input
                  type="text"
                  class="text-input"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div>
                  <label>
                    {" "}
                    {!errors.password && (
                      <p className="signIn-label">Password</p>
                    )}{" "}
                    {errors.password && (
                      <p className="text-alert">{errors.password}</p>
                    )}{" "}
                  </label>
                </div>
                <input
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  type="password"
                  class="text-input"
                />
              </div>
              <input type="checkbox" />
              <span class="remember_me_text"> Remember Me</span>

              <button type="submit" class="primary-btn">
                Sign In
              </button>
            </div>
          </form>
          <div class="links">
            <a href="#">
              <span class="txt">Forgot Password</span>
            </a>
          </div>
          <div class="or">
            <hr class="bar" />
            <span>OR</span>
            <hr class="bar" />
          </div>
          <a href="#" class="secondary-btn">
            Create an account
          </a>
        </div>
      </div>

      <div id="right ">
        <div id="showcase">
          <div className="content-center">
            <h1 class="showcase-text">
              Let's create the future <strong>together</strong>
            </h1>
            <a href="#" class="secondary-btn">
              Start a FREE 10-day trial
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
