import React, { Component } from "react";
import UploadService from "../services/upload.files.services";
import StudentCard from "./StudentCard";
import AuthService from "../services/auth.service";
export default class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);
    this.getFiles = this.getFiles.bind(this);
    this.state = {
      regId: props.match.params.id,
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",
      currentUser: { username: "" },
      fileInfos: [],
    };
  }

  getFiles() {
    UploadService.getFiles(this.state.regId).then((response) => {
      this.setState({
        fileInfos: response.data,
      });
    });
  }
  selectFile(event) {
    this.setState({
      selectedFiles: event.target.files,
    });
  }
  componentWillMount() {
    this.getFiles();
  }

  upload() {
    let currentFile = this.state.selectedFiles[0];

    this.setState({
      progress: 0,
      currentFile: currentFile,
    });

    UploadService.upload(currentFile, this.state.regId, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        this.setState({
          message: response.data.message,
        });
        return UploadService.getFiles(this.state.regId);
      })
      .then((files) => {
        this.setState({
          fileInfos: files.data,
        });
      })
      .catch(() => {
        this.setState({
          progress: 0,
          message: "Could not upload the file!",
          currentFile: undefined,
        });
      });

    this.setState({
      selectedFiles: undefined,
    });
  }
  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/login" });
    this.setState({ currentUser: currentUser, userReady: true });
  }

  render() {
    const {
      selectedFiles,
      currentFile,
      progress,
      message,
      fileInfos,
    } = this.state;

    return (
      <div className="profile">
        <StudentCard props={this.props}></StudentCard>
        <div className="container student-profile">
          <div style={{ width: "600px" }}>
            {this.state.currentUser.roles == "ROLE_TEACHER" ? (
              <div>
                <h3>List Of Files</h3>
                {currentFile && (
                  <div className="progress">
                    <div
                      className="progress-bar progress-bar-info progress-bar-striped"
                      role="progressbar"
                      aria-valuenow={progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: progress + "%" }}
                    >
                      {progress}%
                    </div>
                  </div>
                )}

                <div className="alert alert-light" role="alert">
                  {message}
                </div>

                <div className="upload-btn">
                  <label>
                    <input type="file" onChange={this.selectFile} />
                  </label>
                  <button
                    className="btn btn-success"
                    disabled={!selectedFiles}
                    onClick={this.upload}
                  >
                    Upload
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h2>List of files</h2>
                <h4>Please download and review for more details</h4>
              </div>
            )}

            <div className="card">
              <div className="card-header">List of Files</div>
              <ul className="list-group list-group-flush">
                {fileInfos &&
                  fileInfos.map((file, index) => (
                    <li className="list-group-item" key={index}>
                      <a href={file.url}>{file.name}</a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
