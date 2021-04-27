import React, { useState, useEffect } from "react";
import StudentCard from "../StudentCard";
import TeacherService from "../../services/teacherService";
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";
function Grade(props) {
  const currentLoggedUser = AuthService.getCurrentUser();
  const urlParams = new URLSearchParams(window.location.search);
  const studentName = urlParams.get("studentName");
  const [isClicked, setIsClicked] = useState(false);
  const [letter, setLetter] = useState();
  const [error, setError] = useState("");
  const [percentage, setPercentage] = useState();
  const [currentGradedStudent, setCurrentGradedStudent] = useState();
  const [gradingError, setGradingError] = useState("");
  const [courseGrades, setCourseGrades] = useState([]);
  const [regId, setRegId] = useState({
    regId: props.match.params.id,
  });
  const [finalGrade, setFinalGrade] = useState();
  const [students, setStudents] = useState([]);
  const [userName, setUserName] = useState(studentName);
  const [currentUser, setCurrentUser] = useState(currentLoggedUser);
  const [transcript, setTranscript] = useState({});
  const onClick = (e) => {
    setIsClicked(!isClicked);
    setUserName(e.target.value);
    props.history.push(
      `/manageCourses/grade/${regId.regId}?studentName=${e.target.value}`
    );
  };
  const goBack = () => {
    props.history.push(`/manageCourses/grade/${regId.regId}`);
    window.location.reload();
  };
  useEffect(() => {
    if (currentUser.roles == "ROLE_USER") {
      UserService.getCourseGrades().then((response) => {
        console.log(response.date);
        setCourseGrades(response.data);
      });
      UserService.getTranscript().then((response) => {
        setTranscript(response.data);
      });
    }
  }, []);
  useEffect(() => {
    if (currentUser.roles == "ROLE_TEACHER") {
      if (studentName !== null) {
        TeacherService.findStudentByUsername(regId.regId, userName)
          .then((response) => {
            setCurrentGradedStudent(response.data);
            setIsClicked(!isClicked);
            if (response.data.letter !== null) {
              setLetter(response.data.letter);
            }
            if (response.data.percentage !== null) {
              setPercentage(response.data.percentage);
            }
            if (response.data.finalGrade !== null) {
              setFinalGrade(response.data.finalGrade);
            }
          })
          .catch((error) => {
            setError(
              "Error: Could not find any student with the given name : " +
                userName
            );
          });
      }
    }
  }, []);
  useEffect(() => {
    if (currentUser.roles == "ROLE_TEACHER") {
      TeacherService.getAllStudentsByCourse(regId.regId).then((response) => {
        setStudents(response.data);
      });
    }
  }, []);
  const handleLetterChange = (e) => {
    setLetter(e.target.value);
  };
  const handleFinalGradeChange = (e) => {
    setFinalGrade(e.target.value);
  };
  const handlePercentsChange = (e) => {
    setPercentage(e.target.value);
  };

  const onSubmit = () => {
    if (letter !== undefined && percentage !== undefined && percentage !== "") {
      if (!isNaN(percentage)) {
        TeacherService.grade(
          regId.regId,
          userName,
          letter,
          percentage,
          finalGrade
        ).then((response) => {
          props.history.push(`/manageCourses/grade/${regId.regId}`);
          window.location.reload();
        });
      } else {
        setGradingError("Error: Percentage must be a number!!!");
      }
    } else if (
      letter === undefined &&
      (percentage === undefined || percentage === "")
    ) {
      setGradingError("Error: Required Fields Missing !!!");
    } else if (
      letter === undefined &&
      (percentage !== undefined || percentage !== "")
    ) {
      setGradingError("Error: Letter is required!!!");
    } else {
      setGradingError("Error: Percentage is required!!!");
    }
  };

  return (
    <div className="profile">
      <StudentCard isActive="true" props={props}></StudentCard>
      <div className="container student-profile ">
        <h1 id="assignment-header">Student's Grades</h1>
        <h4 style={{ color: "red" }}>{error}</h4>
        <h4 style={{ color: "red" }}>{gradingError}</h4>
        {currentUser.roles == "ROLE_USER" && (
          <div className="display-transcript">
            <strong>Cumulative GPA : {transcript.cumulativegpa}</strong>
            <strong>Total Earned Credits : {transcript.totalEarnedCredits}</strong>
            <strong>Total Grade Points : {transcript.totalGradePoints}</strong>
          </div>
        )}
        <div className="table grade-table">
          <table id="assignment-table">
            <thead id="assignment">
              {currentUser.roles == "ROLE_TEACHER" ? (
                <tr>
                  <td>Action</td>
                  <td>Student's name</td>
                  <td>Current Grade</td>
                  <td>Percentage</td>
                  <td>Final Grade</td>
                  <td>Term</td>
                </tr>
              ) : (
                <tr>
                  <td>Course</td>
                  <td>Current Grade</td>
                  <td>Percentage</td>
                  <td>Final Grade</td>
                  <td>Term</td>
                </tr>
              )}
            </thead>
            {currentUser.roles == "ROLE_TEACHER" && (
              <tbody>
                {isClicked === true ? (
                  <tr key={userName}>
                    <td>
                      <button className="grade-action" onClick={goBack}>
                        Back
                      </button>
                    </td>
                    <td>{currentGradedStudent.name}</td>
                    <td>
                      <select value={letter} onChange={handleLetterChange}>
                        <option
                          id="grade-options"
                          selected="true"
                          disabled="disabled"
                        >
                          N/A
                        </option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="F">F</option>
                      </select>
                    </td>
                    <td>
                      <input
                        defaultValue={
                          currentGradedStudent.percentage !== null
                            ? currentGradedStudent.percentage
                            : null
                        }
                        value={percentage}
                        onChange={handlePercentsChange}
                        type="text"
                        placeholder="N/A"
                      ></input>
                    </td>
                    <td>
                      <select
                        onChange={handleFinalGradeChange}
                        value={finalGrade}
                      >
                        <option
                          id="grade-options"
                          selected="true"
                          disabled="disabled"
                        >
                          N/A
                        </option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="F">F</option>
                      </select>
                    </td>
                    <td>{currentGradedStudent.term}</td>
                  </tr>
                ) : (
                  students.map((student) => (
                    <tr key={student.name}>
                      <td>
                        <button
                          className="grade-action"
                          value={student.name}
                          onClick={onClick}
                        >
                          {student.letter === null &&
                          student.percentage === null
                            ? "Grade"
                            : "Update"}
                        </button>
                      </td>
                      <td>{student.name}</td>
                      <td>
                        {student.letter === null ? "N/A" : student.letter}
                      </td>
                      <td>
                        {student.percentage === null
                          ? "N/A"
                          : student.percentage}
                      </td>
                      <td>
                        {student.finalGrade === null
                          ? "N/A"
                          : student.finalGrade}
                      </td>
                      <td>{student.term}</td>
                    </tr>
                  ))
                )}
              </tbody>
            )}

            {currentUser.roles == "ROLE_USER" && (
              <tbody>
                {courseGrades.map((courseGrade) => (
                  <tr key={courseGrade.subjectCode}>
                    <td>{courseGrade.subjectCode}</td>
                    <td>
                      {courseGrade.letter === null
                        ? "Not Yet Graded"
                        : courseGrade.letter}
                    </td>
                    <td>
                      {courseGrade.percentage === null
                        ? "Not Yet Graded"
                        : courseGrade.percentage}
                    </td>
                    <td>
                      {courseGrade.finalGrade === null
                        ? "Not Yet Graded"
                        : courseGrade.finalGrade}
                    </td>
                    <td>{courseGrade.term}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {currentUser.roles == "ROLE_TEACHER" && isClicked === true && (
            <button id="btn" className="grade-btn" onClick={onSubmit}>
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default Grade;
