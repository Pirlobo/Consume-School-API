import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import Cookies from "universal-cookie";
import "./pages/SignUp.css";
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.state = {
      username: "",
      password: "",
      loading: false,
      message: "",
      isVerified: "",
      isChecked: false,
    };
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  onCheck() {
    this.setState({ isChecked: !this.state.isChecked });
  }
  handleLogin(e) {
    e.preventDefault();
    if (this.state.isVerified === "NotVerified") {
      this.setState({
        isVerified: "",
      });
    }
    this.setState({
      message: "",
      loading: true,
    });
    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        (response) => {
          const isActive = response.acive;
          if (isActive) {
            if (this.state.isChecked) {
              const cookies = new Cookies();
              cookies.set("remember-me", "rememeber-me-cookie", {
                path: "/",
                expires: new Date(Date.now() + 3600000),
              });
              cookies.set("current-access", "current-access-cookie", {
                path: "/",
              });
              this.props.history.push({
                pathname: "/profile",
                state: { permission: "denied" },
              });
              window.location.reload();
            } else {
              const cookies = new Cookies();
              cookies.set("current-access", "current-access-cookie", {
                path: "/",
              });
              this.props.history.push({
                pathname: "/profile",
                state: { permission: "allowed" },
              });
              window.location.reload();
            }
          } else {
            this.setState({ isVerified: "NotVerified" });
            this.setState({ loading: false });
          }
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage,
          });
        }
      );
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
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
            <div>
              {this.state.isVerified == "NotVerified" && (
                <div className="form-group text-alert">
                  <div role="alert">
                    Your account has not been verified yet !!!
                  </div>
                </div>
              )}
            </div>
            {this.state.message && (
              <div className="form-group text-alert">
                <div role="alert">{this.state.message}</div>
              </div>
            )}
            <Form
              onSubmit={this.handleLogin}
              ref={(c) => {
                this.form = c;
              }}
              class="form-center"
            >
              <div class="form-content">
                <div class="form-width">
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <div className="inputWithIcon">
                      <Input
                        type="text"
                        className="form-control inline"
                        name="username"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        validations={[required]}
                      />
                      <i class="icon fas fa-user"></i>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="form-group">
                    <div className="inputWithIcon">
                      <Input
                        type="text"
                        className="form-control"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        validations={[required]}
                      />
                      <i class="fas fa-lock"></i>
                    </div>
                  </div>
                </div>

                <div className="remember_me_text">
                  <Input
                    onChange={this.onCheck}
                    type="checkbox"
                    id="scales"
                    name="scales"
                  />{" "}
                  <p>Remember me</p>
                </div>

                <button
                  disabled={this.state.loading}
                  type="submit"
                  class="primary-btn"
                >
                  {this.state.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  Log in
                </button>
              </div>
              <CheckButton
                style={{ display: "none" }}
                ref={(c) => {
                  this.checkBtn = c;
                }}
              />
            </Form>
            <div class="links">
              <a href="/forgotPassword">
                <span class="txt">Forgot Password</span>
              </a>
            </div>
            <div class="or">
              <hr class="bar" />
              <p>OR</p>
              <hr class="bar bar2" />
            </div>
            <a href="/register" class="secondary-btn">
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
}
