import React, { useState, useEffect } from "react";
import StudentCard from "./StudentCard";
import CourseService from "../services/course.service";
const DropClasses = (props) => {
  const [keyword, setKeyword] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [successfulDroppedClasses, setSuccessfulDroppedClasses] = useState([]);
  var styles = {
    color: "red",
  };
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
    } else {
      removeElement(selectedCourses, e.target.value);
      setSelectedCourses([...selectedCourses]);
    }
  };
  const handleDrop = () => {
    CourseService.dropClasses(selectedCourses).then((response) => {
      setSuccessfulDroppedClasses(response.data);
    });

    if (selectedCourses.length === 0) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  };
  const onDrop = (e) => {
    if (selectedCourses.length > 0) {
      var bool = window.confirm("Do you want to drop these classes ? ");
      if (bool) {
        handleDrop();
      }
    } else {
      handleDrop();
    }
  };
  const onReverse = () => {
    window.location.reload();
  };

  useEffect(() => {
    CourseService.getIntendedDroppedCourses().then((response) => {
      setCourses(response.data);
    });
  }, []); // run only once

  return (
    <div className="profile">
      <StudentCard isActive="true" props={props}></StudentCard>

      <div className="container student-profile ">
        <div className="table assignment-table">
          {successfulDroppedClasses.length > 0 ? (
            <h1 id="course_list">
              You have successfully dropped the following classes
            </h1>
          ) : (
            <h1 id="course_list">Course List</h1>
          )}

          {isSelected && (
            <h5 style={styles}>You have not selected any course</h5>
          )}
          {/* {successfulDroppedClasses.message && <h4 style={styles}>{successfulDroppedClasses.message}</h4>} */}
          <table>
            <thead id="course_header">
              <tr>
                {successfulDroppedClasses.length > 0 ? null : <th>Drop</th>}
                <th>Reg_Id</th>
                <th>Title</th>
                <th>Units</th>
                <th>From</th>
                <th>To</th>
                <th>Section</th>
                <th>Room</th>
                <th>Instructor</th>
                <th>In</th>
                <th>Out</th>

                {/* <th>Prerequisite</th> */}
                <th>Term</th>
              </tr>
            </thead>
            {successfulDroppedClasses.length > 0 ? (
              <tbody>
                {successfulDroppedClasses.map((course) => (
                  <tr key={course.regId}>
                    <td>{course.regId}</td>
                    <td>{course.title}</td>
                    <td>{course.units}</td>
                    <td>{course.startDay}</td>
                    <td>{course.endDay}</td>
                    <td>{course.section}</td>
                    <td>{course.room}</td>
                    <td>{course.instructor}</td>
                    <td>{course.from}</td>
                    <td>{course.to}</td>
                    <td>{course.term}</td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                {courses.map((course) => (
                  <tr key={course.regId}>
                    <td>
                      <input
                        type="checkbox"
                        value={course.regId}
                        onClick={onClick}
                      ></input>
                    </td>
                    <td>{course.regId}</td>
                    <td>{course.title}</td>
                    <td>{course.units}</td>
                    <td>{course.startDay}</td>
                    <td>{course.endDay}</td>
                    <td>{course.section}</td>
                    <td>{course.room}</td>
                    <td>{course.instructor}</td>
                    <td>{course.from}</td>
                    <td>{course.to}</td>
                    {/* <td>{course.prerequisite}</td> */}
                    <td>{course.term}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {courses.length > 0 &&
          (successfulDroppedClasses.length === 0 ||
            successfulDroppedClasses.message) ? (
            <div className="centered-btn">
              <button id="btn" className="grade-btn" onClick={onDrop}>
                Drop
              </button>
            </div>
          ) : (
            [
              successfulDroppedClasses.length > 0 ? (
                <div>
                  <button id="btn" className="grade-btn" onClick={onReverse}>
                    Back
                  </button>
                </div>
              ) : null,
            ]
          )}
        </div>
      </div>
    </div>
  );
};

export default DropClasses;
