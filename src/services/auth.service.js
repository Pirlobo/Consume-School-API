import axios from "axios";
import Cookies from "js-cookie";
import authHeader from './auth-header';
const API_URL = "http://localhost:8080/api/auth/";
class AuthService {
  async login(username, password) {
    const response = await axios
      .post(API_URL + "signin", {
        username,
        password,
      });
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }
  refreshToken() {
    return axios
      .get(API_URL + "refreshToken", {
      })
  }
 

  async getUserByCode(code) {
    try {
      const response = await axios
        .post(API_URL + "findByCode", {
          code,
        });
      return response.data;
    } catch (error) {
      return error.response
    }
  }


  async getUserByToken(token) {
    const resetToken = JSON.parse(localStorage.getItem("passwordResetToken"));
    const response = await axios
      .get(API_URL + "findByToken?resetToken=" + resetToken, {
        token,
      });
    return response.data;
  }

  async isActive(username) {
    const response = await axios
      .post(API_URL + "isUserActive", {
        username,
      });
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");

    if (Cookies.get("remember-me")) {
      Cookies.remove("remember-me");
    }
    if (Cookies.get("current-access")) {
      Cookies.remove("current-access");
    }
   
  }

  
  async sendEmail(email) {
    try {
      const response = await axios.post(API_URL + "sendEmail", {
        email,
      });
      return response.data;
    } catch (error) {
      console.log(error.response);
      return error.response
    }
  }

  async resetPassword(email, code, password, password2) {
    const response = await axios
      .post(API_URL + "resetPassword", {
        email,
        code,
        password,
        password2,
      });
    return response.data;
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

 
  async editProfile(email, username){
    const response = await axios.post("http://localhost:8080/api/profile/" + "editProfile", {
      email,
      username
    });
    return response.data;
  }
  

  
}


export default new AuthService();
