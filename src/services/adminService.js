// import validateEmail from "../utils/validateEmail";
import {
  ADMINDELETEFOODENTRY,
  ADMINFOODLIST,
  ADMINSTATS,
  FOODLIST,
  NEWFOODENTRY,
  Nutritionix,
} from "../urls/APIURLS";
import Axios from "axios";

const AdminService = {
  _url: process.env.REACT_APP_API_URL,
  _token: localStorage.getItem("auth-token"),

  async retrieveStats() {
    // console.log("get food token", this._token);
    return await Axios.get(ADMINSTATS, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("auth-token")}`,
      },
    });
  },
  async adminFoodList(page, size = 3) {
    // console.log("get food token", this._token);
    //localhost:5000/admin/foodList?page=1&size=1
    return await Axios.get(`${ADMINFOODLIST}?page=${page}&size=${size}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("auth-token")}`,
      },
    });
  },
  async adminDeleteFood(id) {
    return await Axios.delete(`${ADMINDELETEFOODENTRY}/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("auth-token")}`,
      },
    });
  },

  async saveUserFoodById(foodDetail) {
    // console.log("foodDetail service login responding", foodDetail);
    return await Axios.post(NEWFOODENTRY, foodDetail, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("auth-token")}`,
      },
    });
  },
};

export default AdminService;
