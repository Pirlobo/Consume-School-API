import React, { Component } from "react";
import { Switch, Route, Link, Redirect, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ResetPasswordController from "./components/ResetPasswordController.js";
import AuthService from "./services/auth.service";
import Cookies from "universal-cookie";
import Login from "./components/login.component";
import Profile from "./components/profile.component";
import ProtectedRoute from "./services/ProtectedRoute";
import RedirectRoute from "./services/RedirectRoute";
import ResetPasswordForm from "./components/ResetPasswordForm.js";
import HeroSection from "./components/pages/HeroSection.js";
import RegistrationController from "./components/pages/RegistrationController";
import Navbar from "./components/pages/Navbar.js";
import CurrentUserNav from "./components/pages/CurrentUserNav.js";
import Cooky from "js-cookie";
import Course from "./components/pages/Course";
import Search from "./components/search.component";
import { UserContext } from "./useContext";
import YourClasses from "./components/yourClasses.component";
import DropClasses from "./components/dropClasses.component";
import Book from "./components/book.component";
import Inbox from "./components/Inbox";
import CourseStudentInfo from "./components/Course_Student_Info.component";
import EditProfile from "./components/EditProfile.component";
import UploadFiles from "./components/file.component";
import Assignment from "./components/pages/Assignment";
import Grade from "./components/pages/Grade";
// const refreshToken = () => {
//   AuthService.refreshToken();
//   console.log("REFRESHED");
// };
// window.addEventListener("mousemove", refreshToken);

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickResNav = this.handleClickResNav.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleClickResNavLogOut = this.handleClickResNavLogOut.bind(this);
    this.state = {
      currentUser: null,
      isAuth: false,
      isEmailVerified: false,
      isRefreshing: false,
      click: false,
      user: {
        username: undefined,
        email: undefined,
      },
      token: "",
      width: window.innerWidth,
    };
  }
  componentWillUnmount() {
    window.location.reload();
  }

  handleClickResNav = () => {
    this.setState({ click: false });
  };

  handleResize = () => {
    function updateSize() {
      this.setState({
        width: window.innerWidth,
      });
    }
    window.addEventListener("resize", updateSize);
    updateSize();
  };

  handleClick = () => {
    this.setState({
      click: !this.state.click,
    });
  };
  handleClickResNavLogOut = () => {
    localStorage.removeItem("user");
    this.handleClickResNav();
    this.setState({ currentUser: undefined });
    Cooky.remove("remember-me");
    Cooky.remove("current-access");
    this.setState({ isAuth: false });
    window.location.reload();
  };

  componentDidMount() {
    // window.addEventListener("resize", this.handleResize);
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  componentWillMount() {
    const cookies = new Cookies();
    if (cookies.get("remember-me")) {
      this.setState({ isAuth: true });
    } else {
      this.setState({ isAuth: false });
    }
  }
  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser } = this.state;
    let url = `/searchForClasses?title=${this.state.title}`;
    console.log(url);
    return (
      <div>
        <nav className="main-nav navbar navbar-expand navbar-dark">
          <div className="main-logo">
            <span>
              {" "}
              School Management <i class="fas far fa-university"></i>
            </span>
          </div>

          <ul
            className={this.state.click ? "  nav-menu active" : "nav-menu "}
          ></ul>

          {currentUser ? (
            <div className="user second-nav navbar-nav ml-auto ">
              <ul className="nav-menu">
                <li className="nav-item">
                  <Link
                    to={{ pathname: "/profile", permission: "allowed" }}
                    className="nav-transition nav-link"
                  >
                    {currentUser.username}
                  </Link>
                </li>

                <li className="nav-item">
                  <a
                    href="/login"
                    className="nav-transition nav-link"
                    onClick={this.logOut}
                  >
                    LogOut
                  </a>
                </li>
                {this.state.click ? (
                  <div className="menu-icon" onClick={this.handleClick}>
                    <i className="fas fa-times" />
                  </div>
                ) : (
                  <div className="menu-icon" onClick={this.handleClick}>
                    <i className="fas fa-bars" />
                  </div>
                )}
              </ul>
            </div>
          ) : (
            <div className="second-nav navbar-nav ml-auto ">
              {this.state.click ? (
                <div className="user">
                  <ul className=" nav-menu">
                    <div className="menu-icon" onClick={this.handleClick}>
                      <i className="fas fa-times" />
                    </div>
                  </ul>
                </div>
              ) : (
                <ul className="nav-menu">
                  <div className="menu-icon" onClick={this.handleClick}>
                    <i className="fas fa-bars" />
                  </div>

                  <li className="nav-item">
                    <Link to={"/home"} className="nav-transition nav-link">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-transition nav-link">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item nav-transition ">
                    <Link to={"/register"} className="nav-link">
                      Sign Up
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          )}
        </nav>

        {this.state.click ? (
          [
            this.state.currentUser ? (
              <CurrentUserNav
                handleClickResNavLogOut={this.handleClickResNavLogOut}
                handleClick={this.handleClickResNav}
                handleWidthChange={this.handleClick}
              ></CurrentUserNav>
            ) : (
              <Navbar handleClick={this.handleClickResNav}></Navbar>
            ),
          ]
        ) : (
          <Switch>
            <ProtectedRoute
              path="/profile"
              component={Profile}
              isAuth={this.state.isAuth}
            ></ProtectedRoute>

            <ProtectedRoute
              path="/editProfile"
              component={EditProfile}
              isAuth={this.state.isAuth}
            ></ProtectedRoute>

            <ProtectedRoute
              path="/courses"
              component={YourClasses}
              isAuth={this.state.isAuth}
            ></ProtectedRoute>

            <ProtectedRoute
              path="/dropClasses"
              component={DropClasses}
              isAuth={this.state.isAuth}
            ></ProtectedRoute>

            <ProtectedRoute
              exact
              path="/syllabus"
              component={Course}
              isAuth={this.state.isAuth}
            ></ProtectedRoute>

            <ProtectedRoute
              path="/inbox"
              component={Inbox}
              isAuth={this.state.isAuth}
            ></ProtectedRoute>

            <ProtectedRoute
              path="/syllabus/uploadFile/:id"
              component={UploadFiles}
              isAuth={this.state.isAuth}
            ></ProtectedRoute>

            <ProtectedRoute
              path="/syllabus/viewFiles/:id"
              component={UploadFiles}
              isAuth={this.state.isAuth}
            ></ProtectedRoute>

            <ProtectedRoute
              exact
              path="/manageCourses/drop"
              component={Course}
              isAuth={this.state.isAuth}
            ></ProtectedRoute>

            <ProtectedRoute
              exact
              path="/manageCourses/assignment"
              component={Course}
              isAuth={this.state.isAuth}
            ></ProtectedRoute>

            <ProtectedRoute
              path="/manageCourses/drop/:id"
              component={CourseStudentInfo}
              isAuth={this.state.isAuth}
            ></ProtectedRoute>

            <ProtectedRoute
              path="/manageCourses/assignment/:id"
              component={Assignment}
              isAuth={this.state.isAuth}
            ></ProtectedRoute>

            <ProtectedRoute
              exact path="/manageCourses/grade"
              component={Course}
              isAuth={this.state.isAuth}
            ></ProtectedRoute>

            <ProtectedRoute
              path="/manageCourses/grade/:id"
              component={Grade}
              isAuth={this.state.isAuth}
            ></ProtectedRoute>

            <ProtectedRoute
              exact path="/viewTranscript"
              component={Grade}
              isAuth={this.state.isAuth}
            ></ProtectedRoute>

            <ProtectedRoute
              exact path="/manageCourses/addBook"
              component={Course}
              isAuth={this.state.isAuth}
            ></ProtectedRoute>

            <ProtectedRoute
              exact path="/manageCourses/addBook/:id"
              component={Book}
              isAuth={this.state.isAuth}
            ></ProtectedRoute>
            
            <ProtectedRoute
              exact path="/assignments"
              component={Course}
              isAuth={this.state.isAuth}
            ></ProtectedRoute>

            <ProtectedRoute
              path="/assignments/:id"
              component={Assignment}
              isAuth={this.state.isAuth}
            ></ProtectedRoute>

            <ProtectedRoute
              path="/studentInfo/:id"
              component={CourseStudentInfo}
              isAuth={this.state.isAuth}
            ></ProtectedRoute>

            <ProtectedRoute
              path="/requiredMaterials/"
              component={Book}
              isAuth={this.state.isAuth}
            ></ProtectedRoute>

            <ProtectedRoute
              path={"/searchForClasses/page/:id"}
              component={Search}
              isAuth={this.state.isAuth}
            ></ProtectedRoute>

            <ProtectedRoute
              path="/searchForClasses"
              component={Search}
              isAuth={this.state.isAuth}
            ></ProtectedRoute>

            <ProtectedRoute
              path="/searchForClasses?search=:key"
              component={Search}
              isAuth={this.state.isAuth}
            ></ProtectedRoute>

            <Route exact path={["/", "/home"]} component={HeroSection} />

            <Route
              exact
              path="/forgotPassword"
              component={ResetPasswordController}
            />
            <Route
              exact
              path="/resetPassword"
              component={ResetPasswordForm}
            ></Route>

            <RedirectRoute
              path="/login"
              component={Login}
              isAuth={this.state.isAuth}
            ></RedirectRoute>

            <UserContext.Provider value="Username">
              <Route
                exact
                path="/register"
                render={() => <RegistrationController></RegistrationController>}
              />
            </UserContext.Provider>
          </Switch>
        )}
      </div>
    );
  }
}
export default App;
