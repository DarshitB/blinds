import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/loader";
function Login() {
  const history = useHistory();
  const location = useLocation();
  const redirectto = location.pathname.split("/")[2];
  const [passwordType, setPasswordType] = useState("password");
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ShowLoader, setShowLoader] = useState(false);
  const [desablelogin, setdesablelogin] = useState(true);
  const despatch = useDispatch();
  const { isFetching, error, currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    if (currentUser === null) {
      setdesablelogin(false);
    }
  }, [currentUser]);
  const handlelogin = (e) => {
    e.preventDefault();
    login(despatch, { username, password }, redirectto);

    /*   if (login(despatch, { username, password })) {
      history.push("/admin");
      window.location.reload();
    } */
    setShowLoader(true);
  };

  return (
    <>
      <div className="login-wrapper-main">
        <div className="logo-container"></div>
        <div className="position-relative">
          <div className="login-wrapper">
            <div className="login-form-wrapper h-100">
              <div className="container-fluid h-100">
                <div className="row justify-content-center align-items-center h-100">
                  <div className="col-mg-8 col-lg-8 col-xl-6">
                    <div className="login-form-container">
                      <h1>Log Into KDB Blinds</h1>
                      <p>
                        If you have an account, sign in with your email address.
                      </p>
                      <form>
                        <div className="email-box">
                          <input
                            type="text"
                            className="searchbox"
                            placeholder="Email..."
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                        <div className="pass-box">
                          <input
                            type={passwordType}
                            className="searchbox"
                            placeholder="Password..."
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <img
                            src="/assets/img/eye-i.svg"
                            className="passwordshowbtn"
                            onClick={togglePassword}
                            alt=""
                          />
                        </div>
                        <div className="pb-2">
                          <input type="checkbox" id="Remamberme" /> &nbsp;
                          <label htmlFor="Remamberme">Remamber me</label>
                        </div>
                        <Link to="/forgotPassword">Forgot Password?</Link>
                        <div className="mt-3 mb-2">
                          <button
                            className="login-btn"
                            onClick={handlelogin}
                            disabled={desablelogin}
                          >
                            {ShowLoader && !error ? <Loader /> : "Log In"}
                          </button>
                        </div>
                      </form>
                      <div className="login-boxbottomlinks">
                        <span>
                          Don't have an account yet? &nbsp;
                          <Link to="/register">Create New</Link>
                        </span>
                        <span style={{ float: "right" }}>
                          <Link to="/">Back to Home</Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="login-wrapper" style={{ height: "auto" }}>
            <div className="container-fluid">
              <div className="row justify-content-center align-items-center">
                <div className="col-md-8 pb-5">
                  <h1 className="text-uppercase font-weight-bold mb-4">
                    fun facts about blinds{" "}
                  </h1>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum
                  </p>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum
                  </p>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum
                  </p>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
