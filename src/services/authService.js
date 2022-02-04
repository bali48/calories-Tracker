import Axios from "axios";
import ErrorNotice from "../components/misc/ErrorNotice";
import { USERINFO, LOGIN, LOGOUT } from "../urls/APIURLS";

const AuthService = {
  _url: process.env.API_URL,
  _token: localStorage.getItem("auth-token"),
  async login(loginUser) {
    // console.log("auth service login responding", loginUser);
    return await Axios.post(LOGIN, loginUser);
  },
  async logout() {
    // console.log(this._token);
    await Axios.get(LOGOUT, {
      headers: { authorization: `Bearer ${this._token}` },
    });
    // return Promise.resolve().then(() => {
    localStorage.clear();

    return true;
    // });
  },

  async retrieveUser() {
    try {
      return await Axios.get(USERINFO, {
        headers: { authorization: `Bearer ${this._token}` },
      });
    } catch (error) {
      // return error.message;
    }
  },
};

export default AuthService;
