export const checkLoggedIn = async () => {
  let token = localStorage.getItem("auth-token");
  if (token === null) {
    localStorage.setItem("auth-token", "");
    token = "";
    //TODO:: DISPLAY ERROR MESSAGE AND REDIRECT TO LOGIN PAGE
  }

  return token;
};
