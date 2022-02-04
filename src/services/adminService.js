// import validateEmail from "../utils/validateEmail";
import {
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
    console.log("get food token", this._token);
    return await Axios.get(ADMINSTATS, {
      headers: { authorization: `Bearer ${this._token}` },
    });
  },

  async saveUserFoodById(foodDetail) {
    // console.log("foodDetail service login responding", foodDetail);
    return await Axios.post(NEWFOODENTRY, foodDetail, {
      headers: { authorization: `Bearer ${this._token}` },
    });
  },
};

export default AdminService;
