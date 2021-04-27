import React, { useState, useEffect, useLocation } from "react";
import StudentCard from "./StudentCard";
import CourseService from "../services/course.service";
const Search = (props) => {
  // var parameter = window.location.href.replace('http://localhost:8081/registerForClasses?title=','');

  const urlParams = new URLSearchParams(window.location.search);
  const search = urlParams.get("search");
  const sortField = urlParams.get("sortField");
  const sortDir = urlParams.get("sortDir");
  const [keyword, setKeyword] = useState(search);
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [
    successfulRegisteredClasses,
    setSuccessfulRegisteredClasses,
  ] = useState([]);
  const [fallCourses, setFallCourses] = useState([]);
  const [springCourses, setSpringCourses] = useState([]);
  const [isFallBtnClicked, setIsFallBtnClicked] = useState(false);
  const [isSpringBtnClicked, setIsSpringBtnClicked] = useState(false);
  const [orderBy, setOrderBy] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [pageNo, setPageNo] = useState({
    pageNum: props.match.params.id,
  });
  var styles = {
    color: "red",
  };
  var fall = [];
  var spring = [];

  const onSpring = () => {
    courses.map((course) => {
      if (course.term === "Spring") {
        spring.push(course);
      } else {
        fall.push(course);
      }
    });
    setFallCourses(fall);
    setSpringCourses(spring);
    if (isFallBtnClicked) {
      setIsFallBtnClicked(false);
      setIsSpringBtnClicked(true);
    } else {
      setIsSpringBtnClicked(true);
    }
  };
  const items = [];
  if (totalPages > 1) {
    for (let pageNo = 1; pageNo <= totalPages; pageNo++) {
      items.push(
        <a
          key={pageNo}
          className="default-row-spacer"
          href={`/searchForClasses/page/${pageNo}?search=${keyword}&sortField=reg_id&sortDir=asc`}
        >
          {pageNo}
        </a>
      );
    }
  }

  const onFall = () => {
    courses.map((course) => {
      if (course.term === "Fall") {
        fall.push(course);
      } else {
        spring.push(course);
      }
    });
    setFallCourses(fall);
    setSpringCourses(spring);
    if (isSpringBtnClicked) {
      setIsSpringBtnClicked(false);
      setIsFallBtnClicked(true);
    } else {
      setIsFallBtnClicked(true);
    }
  };
  const onChangeKeyWord = (e) => {
    setKeyword(e.target.value);
  };
  const onSubmit = (e) => {
    if (keyword !== "") {
      setIsSpringBtnClicked(false);
      setIsFallBtnClicked(false);
      CourseService.searchCoursesByTeacherOrTitle(keyword).then((response) => {
        setCourses(response.data.dtoCourses);
        setOrderBy(response.data.orderBy);
        setTotalPages(response.data.totalPages);
        setTotalElements(response.data.totalElements);
        setSuccessfulRegisteredClasses([]);
        setSelectedCourses([]);
      });
      props.history.push({
        pathname: `/searchForClasses?search=${keyword}`,
        state: { permission: "allowed" },
      });
    }
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

  const onRegister = (e) => {
    CourseService.registerForClasses(selectedCourses).then((response) => {
      setSuccessfulRegisteredClasses(response.data);
    });

    if (selectedCourses.length === 0) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  };
  const searchCoursesByTeacherOrTitle = () => {
    CourseService.searchCoursesByTeacherOrTitle(keyword).then((response) => {
      console.log(response.data);
      setCourses(response.data.dtoCourses);
      setOrderBy(response.data.orderBy);
      setTotalPages(response.data.totalPages);
      setTotalElements(response.data.totalElements);
    });
  };
  useEffect(() => {
    if (keyword != null && sortField === null && sortDir === null) {
      searchCoursesByTeacherOrTitle();
    }
  }, []);
  const searchCoursesByTitleAndPage = () => {
    CourseService.searchCoursesByTitleAndPage(
      pageNo.pageNum,
      keyword,
      sortField,
      sortDir
    ).then((response) => {
      setCourses(response.data.dtoCourses);
      setOrderBy(response.data.orderBy);
      setTotalPages(response.data.totalPages);
      setTotalElements(response.data.totalElements);
    });
  };
  useEffect(() => {
    if (keyword != null && sortField !== null && sortDir !== null) {
      searchCoursesByTitleAndPage();
    }
  }, []);

  return (
    <div className="profile">
      <StudentCard isActive="true" props={props}></StudentCard>

      <div className="container student-profile ">
        <div class="wrap">
          <div class="search">
            <input
              onChange={onChangeKeyWord}
              type="text"
              class="searchTerm"
              placeholder="Search by teacher or course's name"
            ></input>
            <button type="submit" class="searchButton" onClick={onSubmit}>
              <i class="fa fa-search"></i>
            </button>
            <div className="semester">
              <button id="fall" onClick={onFall}>
                Fall
              </button>

              <button id="spring" onClick={onSpring}>
                Spring
              </button>
            </div>
          </div>
        </div>
        <div className="table ">
          {successfulRegisteredClasses.length > 0 ? (
            <h1 id="course_list">
              You have successfully registered the following courses
            </h1>
          ) : (
            <h1 id="course_list">Course List</h1>
          )}

          {isSelected && (
            <h5 style={styles}>You have not selected any course</h5>
          )}
          {successfulRegisteredClasses.message && (
            <h4 style={styles}>{successfulRegisteredClasses.message}</h4>
          )}
          <table>
            <thead id="course_header">
              <tr>
                {successfulRegisteredClasses.length > 0 ? null : (
                  <th>Register</th>
                )}
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
                {successfulRegisteredClasses.length > 0 ? null : (
                  <th>Available/ Capacity/ Waitlist</th>
                )}
                <th>Prerequisite</th>
                <th>Term</th>
              </tr>
            </thead>
            {successfulRegisteredClasses.length > 0 ? (
              <tbody>
                {successfulRegisteredClasses.map((course) => (
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
                    <td>{course.prerequisite}</td>
                    <td>{course.term}</td>
                  </tr>
                ))}
              </tbody>
            ) : (
              [
                isFallBtnClicked ? (
                  <tbody key="fall">
                    {fallCourses.map((course) => (
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
                        <td>
                          {course.available} {"/ "} {course.capacity} {"/ "}{" "}
                          {course.waitlist}{" "}
                        </td>
                        <td>{course.prerequisite}</td>
                        <td>{course.term}</td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  [
                    isSpringBtnClicked ? (
                      <tbody key="spring">
                        {springCourses.map((course) => (
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
                            <td>
                              {course.available} {"/ "} {course.capacity} {"/ "}{" "}
                              {course.waitlist}{" "}
                            </td>
                            <td>{course.prerequisite}</td>
                            <td>{course.term}</td>
                          </tr>
                        ))}
                      </tbody>
                    ) : (
                      <tbody key="all">
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
                            <td>
                              {course.available} {"/ "} {course.capacity} {"/ "}{" "}
                              {course.waitlist}{" "}
                            </td>
                            <td>{course.prerequisite}</td>
                            <td>{course.term}</td>
                          </tr>
                        ))}
                      </tbody>
                    ),
                  ]
                ),
              ]
            )}
          </table>

          <div className="flex-row-direction">
            {items.length > 0 &&
              (successfulRegisteredClasses.length === 0 ||
                successfulRegisteredClasses.message) && (
                <p>
                  Total Courses : {totalElements + " "}
                  {items}
                </p>
              )}
            {courses.length > 0 &&
            (successfulRegisteredClasses.length === 0 ||
              successfulRegisteredClasses.message) ? (
              <button id="btn" onClick={onRegister}>
                Register
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
