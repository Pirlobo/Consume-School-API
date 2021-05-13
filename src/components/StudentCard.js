import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
export default class StudentCard extends Component {
  constructor(props) {
    super(props);
    this.handleFirstOptionChange = this.handleFirstOptionChange.bind(this);
    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
    };
  }
  handleFirstOptionChange = (e) => {
    if (e.target.value === "courses") {
      this.props.props.history.push({
        pathname: "/courses",
        state: { permission: "allowed" },
      });
    } else if (e.target.value === "register") {
      this.props.props.history.push({
        pathname: "/searchForClasses",
        state: { permission: "allowed" },
      });
    } else if (e.target.value === "drop") {
      this.props.props.history.push({
        pathname: "/dropClasses",
        state: { permission: "allowed" },
      });
    } else if (e.target.value === "dropStudents") {
      this.props.props.history.push({
        pathname: "/manageCourses/drop",
        state: { permission: "allowed" },
      });
    } else if (e.target.value === "grades") {
      this.props.props.history.push({
        pathname: "/manageCourses/assignment",
        state: { permission: "allowed" },
      });
    } else if (e.target.value === "assignments") {
      this.props.props.history.push({
        pathname: "/assignments",
        state: { permission: "allowed" },
      });
    }
    else if (e.target.value === "gradeStudents") {
      this.props.props.history.push({
        pathname: "/manageCourses/grade",
        state: { permission: "allowed" },
      });
    }
    else if (e.target.value === "transcript") {
      this.props.props.history.push({
        pathname: "/viewTranscript",
        state: { permission: "allowed" },
      });
    }
    else if (e.target.value === "book") {
      this.props.props.history.push({
        pathname: "/manageCourses/addBook",
        state: { permission: "allowed" },
      });
    }
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
      <div
        className="search_student-card"
      >
        <i class="big-icon fas fa-user-graduate"></i>
        <h4 className="profile-name">
          <strong>{currentUser.username}</strong>
        </h4>
        <div className="student-services">
          <ul>
            <li className="nav-item">
              <div className=" inputWithIcon">
                <Link
                  to={{ pathname: "/syllabus", permission: "allowed" }}
                  className="stundent-services-text nav-link"
                >
                  Syllabus
                </Link>
                <i class="big-icon fas fa-file-contract"></i>
              </div>
            </li>
            <li>
              <div className=" inputWithIcon">
                <Link
                  to={{ pathname: "/profile", permission: "allowed" }}
                  className="stundent-services-text nav-link"
                >
                  Profile
                </Link>
                <i class="big-icon fas fa-user-check"></i>
              </div>
            </li>
            <li></li>

            {currentUser.roles == "ROLE_TEACHER" && (
              <li className="nav-item">
                <div className=" inputWithIcon">
                  <Link
                    to={"/inbox"}
                    className="stundent-services-text nav-link"
                  >
                    Inbox
                  </Link>
                  <i class="big-icon fas fa-bullhorn"></i>
                </div>
              </li>
            )}
            {currentUser.roles == "ROLE_USER" && (
              <li className="nav-item">
                <div className=" inputWithIcon">
                  <Link
                    to={"/requiredMaterials"}
                    className="stundent-services-text nav-link"
                  > 
                    Required Books
                  </Link>
                  <i class="big-icon fas fa-book"></i>
                </div>
              </li>
            )}

            {currentUser.roles == "ROLE_TEACHER" ? (
              <div className=" inputWithIcon" id="course">
                <select
                  onChange={this.handleFirstOptionChange}
                  className="stundent-services-text nav-link"
                  id="course_options"
                >
                  {" "}
                  Courses
                  <option selected="true" disabled="disabled">
                    Manage Courses
                  </option>
                  <option value="dropStudents">Drop Students</option>
                  <option value="grades">Assignments</option>
                  <option value="gradeStudents">Grades</option>
                  <option value="book">Add Books</option>
                </select>
                <i class="big-icon fas fa-book-reader"></i>
              </div>
            ) : (
              /* <li className="nav-item">
                <div className=" inputWithIcon">
                  <Link
                    to={"/manageCourses"}
                    className="stundent-services-text nav-link"
                  >
                    Manage Courses
                  </Link>
                  <i class="big-icon fas fa-book-reader"></i>
                </div>
              </li> */
              <div className=" inputWithIcon" id="course">
                <select
                  onChange={this.handleFirstOptionChange}
                  className="stundent-services-text nav-link"
                  id="course_options"
                >
                  {" "}
                  Courses
                  <option selected="true" disabled="disabled">
                    Courses
                  </option>
                  <option value="courses">Registered Classes</option>
                  <option value="register">Register for classes</option>
                  <option value="drop">Drop classes</option>
                  <option value="assignments">Assignments</option>
                  <option value="transcript">Transcript</option>
                </select>
                <i class="big-icon fas fa-book-reader"></i>
              </div>
            )}

            {/* <Link
         to={{pathname: "/courses", permission : "allowed" }} className="stundent-services-text nav-link">
                Courses
              </Link> */}
          </ul>
        </div>
      </div>
    );
  }
}
