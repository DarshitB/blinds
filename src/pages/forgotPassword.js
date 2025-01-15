import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/loader";
import { publicRequest } from "../requestMethods";
import { toast } from "react-toastify";
function ForgotPassword() {
  const history = useHistory();
  const [passwordType, setPasswordType] = useState("password");
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const [ShowLoader, setShowLoader] = useState(false);
  const [uapdatepassword, setUapdatepassword] = useState(true);
  const [email, setEmail] = useState("");
  const [setotpfromUser, setSetotpfromUser] = useState("");
  const [OTPonMielSend, setOTPonMielSend] = useState("");

  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const handelEmaileexist = async (e) => {
    const emailaddess = e.target.value;
    setEmail(emailaddess);
  };
  const [progress, setProgress] = useState("0%");
  const [message, setMessage] = useState("");
  const handlePassword = (passwordValue) => {
    const strengthChecks = {
      length: 0,
      hasUpperCase: false,
      hasLowerCase: false,
      hasDigit: false,
      hasSpecialChar: false,
    };

    strengthChecks.length = passwordValue.length >= 8 ? true : false;
    strengthChecks.hasUpperCase = /[A-Z]+/.test(passwordValue);
    strengthChecks.hasLowerCase = /[a-z]+/.test(passwordValue);
    strengthChecks.hasDigit = /[0-9]+/.test(passwordValue);
    strengthChecks.hasSpecialChar = /[^A-Za-z0-9]+/.test(passwordValue);

    let verifiedList = Object.values(strengthChecks).filter((value) => value);

    let strength =
      verifiedList.length == 5
        ? "Strong"
        : verifiedList.length >= 2
        ? "Medium"
        : "Weak";

    setPassword(passwordValue);
    setProgress(`${(verifiedList.length / 5) * 100}%`);
    setMessage(strength);
  };
  const getActiveColor = (type) => {
    if (type === "Strong") return "#8BC926";
    if (type === "Medium") return "#FEBD01";
    return "#FF0054";
  };
  const handelsendOTPForgot = async () => {
    setShowLoader(true);
    if (email !== "") {
      await publicRequest
        .get(`/user/findOnRegister/${email}`)
        .then((response) => {
          if (response.data) {
            publicRequest
              .post(`/auth/sendVerifcationCode/${email}`)
              .then((response) => {
                setOTPonMielSend(response.data);
                setShowLoader(false);
                toast.success(
                  `Success, OTP has been sent to your email id. check that out!`
                );
              })
              .catch((error) => {
                setShowLoader(false);
                console.log(error.response.data);
                toast.error(`Error, Something Went Wrong ${error}`);
              });
          } else {
            toast.error(
              `Error, Invalid email does  not exist in the database.`
            );
            setShowLoader(false);
            setEmail("");
          }
        })
        .catch((error) => {
          toast.error(`Error, Something Went Wrong${error}`);
        });
    } else {
      setShowLoader(false);
    }
  };
  const handelCheckOTPForgot = () => {
    setShowLoader(true);

    if (OTPonMielSend == setotpfromUser) {
      setShowLoader(false);
      setUapdatepassword(false);
    } else {
      setShowLoader(false);
      toast.error(`Error, OTP is not matched`);
    }
  };
  const handelUpdatePassword = () => {
    setShowLoader(true);
    if (progress == "100%") {
      if (Password === ConfirmPassword) {
        const passwordforUpdate = {
          password: Password,
        };
        publicRequest
          .put(`/user/forgotPass/${email}`, passwordforUpdate)
          .then((response) => {
            setShowLoader(false);
            history.push("/login");
            toast.success(`Success, Password is changed`);
          })
          .catch((error) => {
            setShowLoader(false);
            toast.error(`Error, Something Went Wrong ${error}`);
          });
      } else {
        setShowLoader(false);
        setConfirmPassword("");
        toast.error(
          "The passwords are not matched, Please enter the same password"
        );
      }
    } else {
      setShowLoader(false);
      setPassword("");
      setConfirmPassword("");
      setProgress("0%");
      toast.error("Make a password strong before submitting the registration.");
    }
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
                  <div className="col-md-6">
                    <div className="login-form-container">
                      <h1>Forgot Password</h1>
                      <form>
                        {uapdatepassword ? (
                          <div>
                            <div className="email-box">
                              <input
                                type="text"
                                className="searchbox"
                                placeholder="Email..."
                                onBlur={handelEmaileexist}
                              />
                            </div>
                            <div className="email-box mt-1">
                              <input
                                type="text"
                                className="searchbox"
                                placeholder="OTP"
                                onChange={(e) =>
                                  setSetotpfromUser(e.target.value)
                                }
                              />
                            </div>
                            <div className="mt-3 mb-2">
                              {OTPonMielSend === "" ? (
                                <button
                                  className="login-btn"
                                  type="button"
                                  onClick={handelsendOTPForgot}
                                >
                                  {ShowLoader ? <Loader /> : "Send OTP"}
                                </button>
                              ) : (
                                <button
                                  className="login-btn"
                                  type="button"
                                  onClick={handelCheckOTPForgot}
                                >
                                  {ShowLoader ? <Loader /> : "Check OTP"}
                                </button>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="main-password-wrapper">
                              <div className="pass-box">
                                <input
                                  type={passwordType}
                                  className="searchbox"
                                  placeholder="Password..."
                                  value={Password}
                                  onChange={(e) => {
                                    setPassword(e.target.value);
                                    handlePassword(e.target.value);
                                  }}
                                />
                                <img
                                  src="/assets/img/eye-i.svg"
                                  className="passwordshowbtn"
                                  onClick={togglePassword}
                                  alt=""
                                />
                              </div>
                              <div className="progress-bg">
                                <div
                                  className="progress"
                                  style={{
                                    width: progress,
                                    backgroundColor: getActiveColor(message),
                                  }}
                                ></div>
                              </div>
                            </div>
                            <div>
                              {Password.length != 0 ? (
                                <p
                                  className="message mb-1"
                                  style={{ color: getActiveColor(message) }}
                                >
                                  Your password is {message}
                                </p>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="pass-box">
                              <input
                                type={passwordType}
                                className="searchbox"
                                placeholder="Confirm Password"
                                value={ConfirmPassword}
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                                required
                              />
                            </div>
                            <div className="mt-3 mb-2">
                              <button
                                className="login-btn"
                                type="button"
                                onClick={handelUpdatePassword}
                              >
                                {ShowLoader ? <Loader /> : "Update"}
                              </button>
                            </div>
                          </div>
                        )}
                      </form>
                      <span>
                        Go back to login? &nbsp;
                        <Link to="/login">Go now</Link>
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
      </div>
    </>
  );
}

export default ForgotPassword;
