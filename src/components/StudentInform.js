import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
export default class StudentInform extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
    };
  }
  onClick = () => {
    const { history } = this.props.props;
    history.push("/editProfile");
  };
  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/login" });
    this.setState({ currentUser: currentUser, userReady: true });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    const { currentUser } = this.state;

    return (
      <div>
        {this.state.userReady ? (
          <div>
            <header className="profile-card container jumbotron">
              <h3>
                <strong>{currentUser.username}</strong> Profile
              </h3>
            </header>

            <p>
              <strong>Id:</strong> {currentUser.id}
            </p>
            <p>
              <strong>Email:</strong> {currentUser.email}
            </p>
            <strong>Authorities:</strong>
            <ul>
              {currentUser.roles &&
                currentUser.roles.map((role, index) => (
                  <li key={index}>{role}</li>
                ))}
            </ul>
            {currentUser.roles == 'ROLE_USER' ? 
            <button
              className="left-btn"
              id="btn"
              onClick={(e) => {
                this.onClick();
              }}
            >
              Edit <i class="fas fa-marker"></i>
            </button>
            : null
            }
          </div>
        ) : null}
      </div>
    );
  }
}
















{/* <p>
              <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)}{" "}
              ...{" "}
              {currentUser.accessToken.substr(
                currentUser.accessToken.length - 20
              )}
            </p> */}
