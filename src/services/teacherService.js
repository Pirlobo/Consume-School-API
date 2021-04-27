import axios from "axios";
import Cookies from "js-cookie";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/teacher/";

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
  findStudentByUsername(regId, studentName) {
    return axios.get(API_URL + "findStudentByUsername/" + regId + "?studentName=" + studentName, 
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
  getAllStudentsByCourse(regId) {
    return axios.get(API_URL + "getAllStudentsByCourse/" + regId, 
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
  grade(regId, userName, letter, percentage, finalGrade) {
    return axios.post(API_URL + "grade", 
    {
      regId,
      userName,
      letter,
      percentage,
      finalGrade
    },
    {
        headers: authHeader()
    }
    );
  }
  addBook(regId, isbn, title, publisher, listOfAuthors, imageUrl){
    return axios.post(API_URL + "addBook", 
    {
      regId,
      isbn,
      title,
      publisher,
      listOfAuthors,
      imageUrl
    },
    {
        headers: authHeader()
    }
    );
  }
  getRequiredBooksByCourse(regId) {
    return axios.get(API_URL + "getRequiredBooksByCourse/" + regId, 
    {
        headers: authHeader()
    }
    );
  }
}

export default new TeacherService();
