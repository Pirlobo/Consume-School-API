import React, { useState, useEffect } from "react";
import StudentCard from "./StudentCard";
import CourseService from "../services/course.service";
const YourClasses = (props) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    CourseService.getAllRegisteredClasses().then((response) => {
      setCourses(response.data);
    });
  }, []); // run only once

  return (
    <div className="profile">
      <StudentCard isActive="true" props={props}></StudentCard>

      <div className="container student-profile ">
        <div className="table ">
          <h1 id="course_list">Registered Classes</h1>
          <table>
            <thead id="course_header">
              <tr>
                <th>Title</th>
                <th>Reg_Id</th>
                <th>From</th>
                <th>To</th>
                <th>Section</th>
                <th>Room</th>
                <th>Instructor</th>
                <th>In</th>
                <th>Out</th>
                <th>Avail/ Cap/ Wait</th>
                {/* <th>Prerequisite</th> */}
                <th>Term</th>
                <th>Register Status</th>
                <th>Register Rank</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.regId}>
                  <td>{course.title}</td>
                  <td>{course.regId}</td>
                  <td>{course.startDay}</td>
                  <td>{course.endDay}</td>
                  <td>{course.section}</td>
                  <td>{course.room}</td>
                  <td>{course.instructor}</td>
                  <td>{course.from}</td>
                  <td>{course.to}</td>
                  <td>
                    {course.available} {"/ "} {course.capacity} {"/ "}{" "}
                    {course.waitlist}{" "}
                  </td>
                  {/* <td>{course.prerequisite}</td> */}
                  <td>{course.term}</td>
                  <td>{course.registerStatus}</td>
                  <td>{course.rank}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default YourClasses;
