import Cookies from "js-cookie";

const SetCookie = (cookiename, ursin) => {
  Cookies.set(cookiename, ursin, {
    sameSite: "strict",
  });
};

export default SetCookie;
