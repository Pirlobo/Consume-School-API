import axios from "axios";
const API_URL = "http://localhost:8080/api";
const user = JSON.parse(localStorage.getItem("user"));
class UploadFilesService {
  upload(file, regId, onUploadProgress) {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("regId", regId);
    return axios.post(API_URL + "/upload", formData, {
      headers: {
        Authorizations: "Bearer " + user.accessToken,
        "Content-Type": "multipart/form-data",
      },
      regId,
      onUploadProgress,
    });
  }
  uploadAssignment(
    file,
    description,
    points,
    selectedDate,
    regId,
    onUploadProgress
  ) {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);
    formData.append("points", points);
    formData.append("selectedDate", selectedDate);
    formData.append("regId", regId);
    return axios.post(API_URL + "/uploadAssignment", formData, {
      headers: {
        Authorizations: "Bearer " + user.accessToken,
        "Content-Type": "multipart/form-data",
      },
      description,
      points,
      selectedDate,
      regId,
      onUploadProgress,
    });
  }
  getFiles(regId) {
    return axios.get(API_URL + "/getFiles/" + regId, {
      headers: {
        Authorizations: "Bearer " + user.accessToken,
        "Content-type": "application/json",
      },
    });
  }
  getAssignments(regId) {
    return axios.get(API_URL + "/getAssignments/" + regId, {
      headers: {
        Authorizations: "Bearer " + user.accessToken,
        "Content-type": "application/json",
      },
    });
  }
}

export default new UploadFilesService();
