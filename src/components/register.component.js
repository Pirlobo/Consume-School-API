import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";
import { UserContext } from "../useContext";
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Minimum 3, Max 20
      </div>
    );
  }
  if (value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Maximum 20 characters
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6) {
    return (
      <div className="alert alert-danger" role="alert">
        Minimum 6 characters
      </div>
    );
  }
  if (value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Maximum 40 characters6 characters
      </div>
    );
  }
};
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: "",
      loading: false,
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
      loading: true,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password
      ).then(
        (response) => {
          this.props.setState();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage,
            loading: false,
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
            {this.state.message && (
              <div className="form-group text-alert">
                <div role="alert">{this.state.message}</div>
              </div>
            )}

            <Form
              onSubmit={this.handleRegister}
              ref={(c) => {
                this.form = c;
              }}
              class="form-center"
            >
              <div class="form-content">
                <div>
                  <div className="form-group ">
                    <label htmlFor="password">Email</label>
                    <div className="inputWithIcon">
                      <Input
                        type="text"
                        className="form-control"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        validations={[required, email]}
                      />
                      <i class="fas fa-envelope"></i>
                    </div>
                  </div>
                </div>
                <div class="form-width">
                  <div>
                    {/* Practice the syntax of UserContext Hook which is used to pass props to any child */}
                    <UserContext.Consumer>
                      {(value) => {
                        return <label>{value}</label>;
                      }}
                    </UserContext.Consumer>
                  </div>

                  <div className="inputWithIcon">
                    <Input
                      type="text"
                      className="form-control"
                      name="username"
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                      validations={[required, vusername]}
                    />
                    <i class="icon fas fa-user"></i>
                  </div>
                </div>
                <div>
                  <div className="form-group ">
                    <label htmlFor="password">Password</label>
                    <div className="inputWithIcon">
                      <Input
                        type="text"
                        className="form-control"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        validations={[required, vpassword]}
                      />
                      <i class="fas fa-lock"></i>
                    </div>
                  </div>
                </div>

                <div className="register-btn">
                  <button
                    disabled={this.state.loading}
                    type="submit"
                    class="primary-btn "
                  >
                    {this.state.loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Register</span>
                  </button>
                </div>

                <div>
                  {this.state.isVerified == "NotVerified" && (
                    <p className="text-alert">Your account is not verified</p>
                  )}
                </div>
              </div>
              <CheckButton
                style={{ display: "none" }}
                ref={(c) => {
                  this.checkBtn = c;
                }}
              />
            </Form>
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
