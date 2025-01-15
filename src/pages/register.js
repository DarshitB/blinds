import React, { useState } from "react";
import { Link } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { toast } from "react-toastify";
import Loader from "../components/loader";

function Register({ updaterespons }) {
  const [passwordType, setPasswordType] = useState("password");
  const [eyropacity, setEyropacity] = useState(true);
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      setEyropacity(false);
      return;
    }
    setPasswordType("password");
    setEyropacity(true);
  };

  const [fname, setFname] = useState("");
  const [sname, setSname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
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
  const handelEmaileexist = async (e) => {
    const emailaddess = e.target.value;
    if (emailaddess !== "") {
      await publicRequest
        .get(`/user/findOnRegister/${emailaddess}`)
        .then((response) => {
          if (response.data) {
            toast.error(
              `Error, this email id already exists register yourself with a different email id.`
            );
            setEmail("");
          } else {
            setEmail(emailaddess);
          }
        })
        .catch((error) => {
          toast.error(`Error, Something Went Wrong${error}`);
        });
    }
  };
  const [NotShowOtpsection, setNotShowOtpsection] = useState(true);
  const [setotpfromUser, setSetotpfromUser] = useState("");
  const [OTPonMielSend, setOTPonMielSend] = useState("");
  const [ShowLoader, setShowLoader] = useState(false);
  const handleregistreation = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    if (
      fname !== "" &&
      sname !== "" &&
      email !== "" &&
      password !== "" &&
      cpassword !== ""
    ) {
      await publicRequest
        .get(`/user/findOnRegister/${email}`)
        .then(async (response) => {
          if (response.data) {
            toast.error(
              `Error, this email id already exists, register yourself with a different email id.`
            );
            setShowLoader(false);
            setEmail("");
          } else {
            if (progress == "100%") {
              if (password === cpassword) {
                await publicRequest
                  .post(`/auth/sendVerifcationCode/${email}`)
                  .then((response) => {
                    setOTPonMielSend(response.data);
                    setNotShowOtpsection(false);
                    setShowLoader(false);
                  })
                  .catch((error) => {
                    setShowLoader(false);
                    toast.error(`Error, Something Went Wrong ${error}`);
                  });
              } else {
                setShowLoader(false);
                setCpassword("");
                toast.error(
                  "The passwords are not matched, Please enter the same password"
                );
              }
            } else {
              setShowLoader(false);
              setPassword("");
              setCpassword("");
              setProgress("0%");
              toast.error(
                "Make a password strong before submitting the registration."
              );
            }
          }
        })
        .catch((error) => {
          toast.error(`Error, Something Went Wrong${error}`);
        });
    } else {
      setShowLoader(false);
      toast.error("Some of the field is empty please fill that in first.");
    }
  };
  const handelOTPchaeck = async () => {
    setShowLoader(true);
    if (OTPonMielSend == setotpfromUser) {
      const registration = {
        username: fname + " " + sname,
        email: email,
        password: password,
      };
      const res = await publicRequest.post("/auth/register", registration);
      if (res.status === 201) {
        updaterespons(true);
        toast.success("Your account registration is a success");
        setShowLoader(false);
      } else {
        setShowLoader(false);
        toast.error("Something went wrong, please try again later!");
      }
    } else {
      setShowLoader(false);
      toast.error("Wrong OTP, check once more and then enter.");
    }
  };
  return (
    <>
      <div className="Register-wrapper">
        <div className="logo-container"></div>
        <div className="login-form-wrapper position-relative h-100">
          <div className="container-fluid h-100">
            <div className="row justify-content-center align-items-center h-100">
              <div className="col-mg-8 col-lg-8 col-xl-6">
                <div className="mt-4 login-form-container">
                  <form>
                    {NotShowOtpsection ? (
                      <>
                        <h1>Create New Account</h1>
                        <p>
                          If you have an account, sign in with your email
                          address.
                        </p>
                        <div className="register-name-insert">
                          <div className="fname-box pr-1">
                            <input
                              type="text"
                              className="searchbox"
                              placeholder="First Name"
                              onChange={(e) => setFname(e.target.value)}
                              required
                            />
                          </div>
                          <div className="fname-box pl-1">
                            <input
                              type="text"
                              className="searchbox"
                              placeholder="Last Name"
                              onChange={(e) => setSname(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="email-box">
                          <input
                            type="email"
                            className="searchbox"
                            placeholder="Email Address"
                            defaultValue="sadasd"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={handelEmaileexist}
                            required
                          />
                        </div>
                        <div className="passs-confirm-boxes">
                          <div className="main-password-wrapper">
                            <div className="pass-box">
                              <input
                                type={passwordType}
                                className="searchbox "
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {
                                  setPassword(e.target.value);
                                  handlePassword(e.target.value);
                                }}
                                required
                              />
                              <img
                                src="/assets/img/eye-i.svg"
                                className="passwordshowbtn"
                                onClick={togglePassword}
                                alt=""
                                style={{ opacity: eyropacity ? "0.3" : "1" }}
                                required
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
                            {password.length != 0 ? (
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
                              value={cpassword}
                              onChange={(e) => setCpassword(e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div className="mt-3 mb-2">
                          <button
                            className="login-btn"
                            type="button"
                            onClick={handleregistreation}
                          >
                            {ShowLoader ? <Loader /> : "Create Account"}
                          </button>
                        </div>
                        <div className="login-boxbottomlinks">
                          <span>
                            Alredy have an account? &nbsp;
                            <Link to="/login">LogIn Here</Link>
                          </span>
                          <span style={{ float: "right" }}>
                            <Link to="/">Back to Home</Link>
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <h1>Enter OTP to Verify</h1>
                        <p>
                          Verification Mail has been sent to your email id :{" "}
                          <span style={{ fontWeight: "700" }}>{email}</span>{" "}
                          check and enter here.
                        </p>
                        <div className="email-box">
                          <input
                            type="text"
                            className="searchbox"
                            placeholder="Enter OTP"
                            onChange={(e) => setSetotpfromUser(e.target.value)}
                            required
                          />
                        </div>
                        <button
                          type="button"
                          className="login-btn"
                          onClick={handelOTPchaeck}
                        >
                          Verify
                        </button>
                      </>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
