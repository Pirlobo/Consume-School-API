import axios from "axios";
import Cookies from "js-cookie";
import authHeader from './auth-header';
const API_URL = "http://localhost:8080/api/book/";


class BookService {

    async getAllRequiredBooks(){
        // try {
        //     const response = await axios
        //     .get(API_URL + "getAllRequiredBooks", {
        //         headers: authHeader()
        //     });
        //     return response;
        // } catch (error) {
        //     if (error.response) {
        //         return error.response;
        //     }
        // }
        return axios.get(API_URL + "getAllRequiredBooks", 
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

export default new BookService();
