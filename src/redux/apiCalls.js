import { publicRequest } from "../requestMethods";
import { loginFalure, loginStart, loginSuccess, logOut } from "./userRedux";
import SetCookie from "../components/cookies/setCookies";
import RemoveCookie from "../components/cookies/removeCookies";

export const login = async (dispatch, user, redirectto) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("auth/login", user);
    if (res.data.isAdmin) {
      window.location.href = "/admin";
    } else if (redirectto === "from_Cart") {
      window.location.href = "/cart";
    }
    dispatch(loginSuccess(res.data));
    const loginTime = new Date().getTime();
    localStorage.setItem("loginTime", loginTime);
    SetCookie("mytocken", res.data.aceesTocken);
  } catch (err) {
    dispatch(loginFalure());
  }
};
export const logOutfun = async (dispatch) => {
  dispatch(logOut());
  RemoveCookie("mytocken");
};
