import axios from "axios";
import Cookies from "js-cookie";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/teacher/";
const user = JSON.parse(localStorage.getItem('user'));

// Authorizations: 'Bearer ' + user.accessToken 
class TeacherService {
  sendAnnounement(content) {
    return axios.post(API_URL + "sendAnnounement", {
      content,
    }, 
    {
        headers: authHeader()
    }
    );
  }
  manageCourses() {
    return axios.get(API_URL + "manageCourses", 
    {
        headers: authHeader()
    }
    );
  }
  studentInfo(regId) {
    return axios.get(API_URL + "studentInfo/" + regId, 
    {
        headers: authHeader()
    }
    );
  }
  dropClasses(regId, userName ) {
    return axios.post(API_URL + "drop", 
    {
      regId,
      userName
    },
    {
        headers: authHeader()
    }
    );
  }
}

export default new TeacherService();
