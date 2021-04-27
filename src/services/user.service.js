import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/course/";
class UserService {
  getCourseGrades() {
    return axios.get(API_URL + "getCourseGrades", {
      headers: authHeader(),
    });
  }
  getTranscript() {
    return axios.get(API_URL + "getTranscript", {
      headers: authHeader(),
    });
  }
}

export default new UserService();
