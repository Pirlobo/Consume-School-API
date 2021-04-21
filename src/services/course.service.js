import axios from "axios";
import authHeader from './auth-header';
const API_URL = "http://localhost:8080/api/course/";
const user = JSON.parse(localStorage.getItem('user'));
class CourseService {
    
    searchCoursesByTeacherOrTitle(search){
        return axios.get(API_URL + "searchCoursesByTeacherOrTitle?search=" + search, {
            headers: authHeader()
        } );
    }
    searchCoursesByTitleAndPage(pageNo, search, sortField, sortDir){
        return axios.get(API_URL + "page/" + pageNo + "?search=" + search + "&sortField=" + sortField + "&sortDir=" + sortDir, {
            headers: authHeader()
        } );
    }
    
    registerForClasses(regIdClasses){
        return axios
        .post(API_URL + "register", {
           regIdClasses
        }, {
            headers: authHeader()
        } )
    }
    getCurrentRegisteredClasses(){
        return axios
        .get(API_URL + "getCurrentRegisteredClasses", 
         {
            headers: authHeader()
        } )
    }
    getAllRegisteredClasses(){
        return axios
        .get(API_URL + "getAllRegisteredClasses", 
         {
            headers: authHeader()
        } )
    }
    dropClasses(regIdClasses){
        return axios
        .post(API_URL + "dropClasses", {
            regIdClasses
        }, {
            headers: authHeader()
        } )
    }
 
}

export default new CourseService();
