import React, { useState, useEffect } from "react";
import StudentCard from "../StudentCard";
import "./Course.css";
import TeacherService from "../../services/teacherService";
import AuthService from "../../services/auth.service";
import CourseService from "../../services/course.service";
function Course(props) {
  const [path, setPath] = useState(props.location.pathname);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const authenticatedUser = AuthService.getCurrentUser();
  const onClick = (regId) => {
    if (path === "/syllabus") {
      if (currentUser.roles == "ROLE_USER") {
        props.history.push(`/syllabus/viewFiles/${regId}`);
      } else if (currentUser.roles == "ROLE_TEACHER") {
        props.history.push(`/syllabus/uploadFile/${regId}`);
      }
    } else if (path === "/manageCourses") {
      props.history.push(`/studentInfo/${regId}`);
    }
    else if (path === '/manageCourses/drop'){
      props.history.push({
        pathname:  `/manageCourses/drop/${regId}`,
      });
    }
    else if (path === '/manageCourses/assignment'){
      props.history.push(`/manageCourses/assignment/${regId}`);
    }
    else if (path === "/assignments") {
      props.history.push(`/assignments/${regId}`);
    }
    else if (path === "/manageCourses/grade") {
      props.history.push(`/manageCourses/grade/${regId}`);
    }
    else if (path === "/manageCourses/addBook") {
      props.history.push(`/manageCourses/addBook/${regId}`);
    }
  };
  useEffect(() => {

    setCurrentUser(authenticatedUser);
  }, []);
  useEffect(() => {
    if (currentUser.roles == "ROLE_USER") {
      CourseService.getCurrentRegisteredClasses().then((response) => {
        setCourses(response.data);
      });
    } else if (currentUser.roles == "ROLE_TEACHER") {
      TeacherService.manageCourses().then((response) => {
        setCourses(response.data);
      });
    }
  }, [currentUser]);

  return (
    <div>
      <div className="profile">
        <StudentCard props={props}></StudentCard>
        {/* <Counter></Counter> */}
        <div className="container student-profile">
          <ul className="course-flex">
            {courses.map((course, i) => (
              <li key={course.regId}>
                <div class="course-card">
                  <div class="course-header">
                    {/* href= {`/manageCourses/${course.regId}`} */}
                    <a
                      className="course-title"
                      onClick={(e) => {
                        onClick(course.regId);
                      }}
                    >
                      <p>
                        {course.title + " -"} {course.section}{" "}
                      </p>
                    </a>
                  </div>
                  <div class="course-container">
                    <p>{course.courseDescription}</p>
                    <p>
                      {course.term + " "} {course.year}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Course;
