import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import StudentCard from "../StudentCard";
import UploadService from "../../services/upload.files.services";
import AuthService from "../../services/auth.service";
function Assignment(props) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [fileInfos, setFileInfos] = useState([]);
  const [assignment, setAssignment] = useState({
    regId: props.match.params.id,
    selectedFiles: undefined,
    currentFile: undefined,
    progress: 0,
    description: "",
    points: undefined,
  });
  let month = selectedDate.getUTCMonth() + 1; //months from 1-12
  let day = selectedDate.getUTCDate() - 1;
  let year = selectedDate.getUTCFullYear();
  let dueDate = month + "/" + day + "/" + year;
  const currentUser = AuthService.getCurrentUser();
  const selectFile = (event) => {
    setAssignment({
      ...assignment,
      selectedFiles: event.target.files,
    });
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleDescriptionChange = (e) => {
    setAssignment({
      ...assignment,
      description: e.target.value,
    });
  };
  const handlePointsChange = (e) => {
    setAssignment({
      ...assignment,
      points: e.target.value,
    });
  };
  const onCreate = () => {
    setError("");
    setIsClicked(!isClicked);
    setAssignment({
      regId: props.match.params.id,
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      currentUser: { username: "" },
      description: "",
      points: undefined,
    });
  };
  const getAssignments = () => {
    UploadService.getAssignments(assignment.regId).then((response) => {
      setFileInfos(response.data);
    });
  };
  useEffect(() => {
    getAssignments();
  }, []);

  const upload = () => {
    setIsClicked(!isClicked);
    let currentFile = assignment.selectedFiles[0];
    setAssignment({
      ...assignment,
      progress: 0,
      ...assignment,
      currentFile: currentFile,
    });

    UploadService.uploadAssignment(
      currentFile,
      assignment.description,
      assignment.points,
      dueDate,
      assignment.regId,
      (event) => {
        setAssignment({
          ...assignment,
          progress: Math.round((100 * event.loaded) / event.total),
        });
      }
    )
      .then((response) => {
        return UploadService.getAssignments(assignment.regId);
      })
      .then((files) => {
        setFileInfos(files.data);
      })
      .catch(() => {
        setError("Could not upload the file!");
        setAssignment({
          ...assignment,
          progress: 0,
          ...assignment,
          currentFile: undefined,
        });
      });

    setAssignment({
      ...assignment,
      selectedFiles: undefined,
    });
  };

  return (
    <div className="profile">
      <StudentCard isActive="true" props={props}></StudentCard>
      <div className="container student-profile ">
        <div className="table" style = {{width: "70%"}}>
        <div id = "title" style = {{"textAlign": "center"}}>
          <h1>List Of Assignments</h1>
          </div>
        {currentUser.roles == 'ROLE_TEACHER' ? 
          <button id="assignment-btn" onClick={onCreate}>
            {!isClicked ? "New" : "Cancel"}
          </button> : 
          null
          }
          <div className="text-alert" role="alert">
            {error}
          </div>
          <table>
            <thead id="assignment">
              <tr>
                <th>Description</th>
                <th>Dowload Links</th>
                <th>Points</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {!isClicked ? (
                fileInfos.map((assignment) => (
                  <tr>
                    <td>{assignment.description}</td>
                    <td>
                      <a href={assignment.url}>{assignment.name}</a>
                    </td>
                    <td>{assignment.points}</td>
                    <td>{assignment.date.substring(0, 10)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>
                    <input
                      value={assignment.description}
                      onChange={handleDescriptionChange}
                      type="text"
                      placeholder="Enter description"
                    ></input>
                  </td>
                  <td>
                    <input type="file" onChange={selectFile} />
                  </td>
                  <td>
                    <input
                      value={assignment.points}
                      type="text"
                      placeholder="Enter points"
                      onChange={handlePointsChange}
                    ></input>
                  </td>
                  <td className="due-date">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        // label="Date picker inline"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className = "centered-btn">
        {!isClicked ? null : (
          <button onClick={upload} id="btn" style = {{marginTop : 30}}>
            Save
          </button>
        )}
        </div>
        </div>
        
      </div>
    </div>
  );
}

export default Assignment;
