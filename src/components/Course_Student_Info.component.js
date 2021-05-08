import React, { useState, useEffect } from "react";
import StudentCard from "./StudentCard";
import TeacherService from "../services/teacherService";
import CourseService from "../services/course.service"
function CourseStudentInfo(props) {
  const [regId, setRegId] = useState({
    regId: props.match.params.id,
  });
 console.log(props.location.state);
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [successfulDroppedClasses, setSuccessfulDroppedClasses] = useState([]);
  const [isAnyClassSelected, setAnyClassSelected] = useState(false);
  const [courseDescription, setCourseDescription] = useState("");
  useEffect(() => {
    TeacherService.studentInfo(regId.regId).then((response) => {
      setCourses(response.data);
    });
    CourseService.getCourseDescriptionByRegId(regId.regId).then((response) => {
        setCourseDescription(response.data.message);
      })
  }, []);

  function removeElement(array, elem) {
    var index = array.indexOf(elem);
    if (index > -1) {
      array.splice(index, 1);
    }
  }
  const onClick = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedCourses([...selectedCourses, e.target.value]);
      console.log(selectedCourses.length);
    } else {
      removeElement(selectedCourses, e.target.value);
      setSelectedCourses([...selectedCourses]);
      console.log(selectedCourses);
    }
  };
  const handleDrop = () => {
    TeacherService.dropClasses(regId.regId, selectedCourses).then(
      (response) => {
        setSuccessfulDroppedClasses(response.data);
        window.location.reload();
      }
    );

    if (selectedCourses.length === 0) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  };
  const onDrop = (e) => {
    // alert("Hello! I am an alert box!");
    if (selectedCourses.length > 0) {
      if (selectedCourses.length > 0) {
        var bool = window.confirm("Do you want to drop these students ? ");
        if (bool) {
          handleDrop();
        }
      } else {
        handleDrop();
      }
    } else {
      setAnyClassSelected(true);
    }
  };

  return (
    <div>
      <div className="profile">
        <StudentCard props = {props}></StudentCard>
        <div className="container student-profile ">
          <h1 id="course_list">{courseDescription}</h1>
          <div className="table assignment-table">
            {isAnyClassSelected && (
              <h4 style={{ color: "red" }}>Please, select at least a student </h4>
            )}
            <table>
              <thead id="course_header">
                <tr>
                  <th>Drop</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Register Status</th>
                  <th>Available/ Capacity/ Wailist</th>
                  <th>Registration Rank</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        value={course.userName}
                        onClick={onClick}
                      ></input>
                    </td>
                    <td>{course.userName}</td>
                    <td>{course.email}</td>
                    <td>{course.registerStatus}</td>
                    <td>
                      {course.available + "/ "} {course.capacity  + "/ "} {course.waitList}
                    </td>
                    <td>{course.wailistedRank}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {courses.length > 0 && (
              <div className="">
                <button id="btn" className="grade-btn" onClick={onDrop}>
                  Drop
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseStudentInfo;
