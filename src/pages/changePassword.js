import React, { useState } from "react";
import Navbar from "../components/navbar";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/loader";
import { useSelector } from "react-redux";
import { publicRequest } from "../requestMethods";

function ChangePassword() {
  const user = useSelector((state) => state.user.currentUser);
  const history = useHistory();

  const [passwordType, setPasswordType] = useState("password");
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const [OldPassword, setOldPassword] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [ShowLoader, setShowLoader] = useState(false);

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

  const handelChangePassword = (e) => {
    e.preventDefault();
    setShowLoader(true);
    if (OldPassword !== "" && Password !== "" && ConfirmPassword !== "") {
      const passwordfortrue = {
        password: OldPassword,
      };
      publicRequest
        .put(`/auth/CheckOldPass/${user._id}`, passwordfortrue)
        .then((response) => {
          if (response.data) {
            setShowLoader(false);
            if (progress == "100%") {
              if (Password === ConfirmPassword) {
                const passwordforUpdate = {
                  password: Password,
                };
                publicRequest
                  .put(`/user/changePass/${user._id}`, passwordforUpdate)
                  .then((response) => {
                    setShowLoader(false);
                    setPassword("");
                    setConfirmPassword("");
                    setOldPassword("");
                    setProgress("0%");
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
                  "The password are not matched, Please enter the same password."
                );
              }
            } else {
              setShowLoader(false);
              setPassword("");
              setConfirmPassword("");
              setProgress("0%");
              toast.error(
                "Make a password strong before submitting the registration."
              );
            }
          } else {
            setShowLoader(false);
            toast.error(
              "The old password are not matched, Please enter the valid password."
            );
          }
        })
        .catch((error) => {
          setShowLoader(false);
          toast.error(`Error, Something Went Wrong ${error}`);
        });
    } else {
      setShowLoader(false);
      toast.error(`Error, Some of the fields are empty!`);
    }
  };
  return (
    <div className="account-Setting-wrapper">
      <Navbar />
      <div className="account-Setting-container">
        <section className="section-pagetop">
          <div className="mainhedof-productlist">
            <h2>Change Password</h2>
            <button
              onClick={() => history.goBack()}
              className="big-btn bakbutton"
            >
              back
            </button>
          </div>
        </section>
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-8 col-lg-6">
              <div className="account-Setting-list notisaccoutsettingpage">
                <form>
                  <div className="form-detailes-profile changepassword">
                    <div className="updationdatauser-name">
                      <div className="pass-box ">
                        <input
                          type={passwordType}
                          className="searchbox"
                          placeholder="Old Password"
                          value={OldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          required
                        />
                      </div>
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
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="buttonssets">
                    <div className="buttonssets-inner">
                      <button type="buttom" onClick={handelChangePassword}>
                        {ShowLoader ? <Loader /> : "Change Password"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
