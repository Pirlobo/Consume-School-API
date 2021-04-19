import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/profile/";
const user = JSON.parse(localStorage.getItem("user"));
class ProfileService {
  async editProfile(email) {
    try {
      const response = await axios.post(
        API_URL + "editProfile",
        {
          email,
        },
        {
          headers: authHeader(),
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  }
}

export default new ProfileService();
