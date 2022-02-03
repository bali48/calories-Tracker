import Axios from "axios";
import { USERINFO, LOGIN } from "../urls/APIURLS";

const AuthService = {
  _url: process.env.API_URL,
  _token: localStorage.getItem("auth-token"),
  async login(loginUser) {
    console.log("auth service login responding", loginUser);
    return await Axios.post(LOGIN, loginUser);
  },
  logout() {
    return Promise.resolve().then(() => {
      localStorage.clear();

      return true;
    });
  },

  async retrieveUser() {
    return await Axios.get(USERINFO, {
      headers: { authorization: `Bearer ${this._token}` },
    });
  },
};

export default AuthService;
