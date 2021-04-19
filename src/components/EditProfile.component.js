import React, { useState, useEffect } from "react";
import StudentCard from "./StudentCard";
import "./EditProfile.css";
import validate from "../services/validateInfo";
import ProfileService from "../services/profile.service";
function EditProfile(props) {
  let errors = {};
  const [values, setValues] = useState({
    email: "",
    username: "",
  });
  const [emailErrors, setEmailErrors] = useState({});
  const [isClicked, setIsClicked] = useState(false);
  const authenticatedUser = JSON.parse(localStorage.getItem("user"));
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const email = authenticatedUser.email;
  const validateNewEmail = (e) => {
    if (email === values.email) {
      errors.email = "New email is required";
      setEmailErrors(errors);
    }
  };

  const handleSubmit = (e) => {
    setIsClicked(true);
    e.preventDefault();
    setEmailErrors(validate(values));
    validateNewEmail();
  };
  // Username can not be changed
  useEffect(() => {
    if (!emailErrors.email && isClicked) {
      ProfileService.editProfile(values.email).then((response) => {
        if (response.status == 400) {
          console.log(response.status);
          errors.email = "Email is already in use !";
          setEmailErrors(errors);
        } else {
          const u = authenticatedUser;
          delete u.email;
          u.email = values.email;
          localStorage.setItem("user", JSON.stringify(u));
          props.history.push("/profile");
        }
      });
    }
  }, [emailErrors]);
  return (
    <div className="profile">
      <StudentCard props={props}></StudentCard>
      <div className="container student-profile">
        <div>
          <div className="flex-container">
            <div className="flex-row">
              <p className="edit-profile-text">Email : </p>
              <p style={{ color: "red" }}> {emailErrors.email}</p>
            </div>
            <input
              type="text"
              className="email"
              onChange={handleChange}
              name="email"
              value={values.email}
            ></input>
          </div>
        </div>
        <div>
        </div>
        <button id="btn" style={{ margin: ".5rem" }} onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
