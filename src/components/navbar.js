import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutfun } from "../redux/apiCalls";
import { baseUrlForMedia, publicRequest } from "../requestMethods";
function Navbar() {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);

  const id = user?._id;
  const [username, setUsername] = useState();
  const [Image, setImage] = useState();
  useEffect(() => {
    if (id) {
      publicRequest
        .get(`/user/find/${id}`)
        .then((response) => {
          setUsername(response.data.username);
          setImage(response.data.profileImage);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const despatch = useDispatch();

  /*   useEffect(() => {
    const loginTime = localStorage.getItem("loginTime");
    const currentTime = new Date().getTime();
    const timeElapsed = currentTime - parseInt(loginTime);
    const oneDay = 60 * 1000; // milliseconds in one day
    if (parseInt(loginTime)) {
      if (timeElapsed > oneDay) {
        logout();
      } else {
        const timeout = oneDay - timeElapsed;
        setTimeout(logout, timeout);
      }
    }
  }, []);

  const logout = async () => {
    await logOutfun(despatch);
    localStorage.removeItem("loginTime");
    window.location.href = "/";
  }; */
  const [navbarmobile, getNavbarmobile] = useState(false);
  const [bliedsDropdownNone, getbliedsDropdownNone] = useState(false);

  const handelnavbar = () => {
    getNavbarmobile(!navbarmobile);
  };
  const handlelogout = async (e) => {
    e.preventDefault();
    await logOutfun(despatch);
    window.location.href = "/";
  };

  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 0);
    });
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  useEffect(() => {
    if (searchTerm !== "") {
      fetchSearchSuggestions();
    } else {
      setSearchSuggestions([]);
    }
  }, [searchTerm]);

  const fetchSearchSuggestions = async () => {
    try {
      const response = await publicRequest
        .get(`/product/search?searchTerm=${searchTerm}`)
        .then((response) => {
          setSearchSuggestions(response.data);
        })
        .catch((err) => console.log(err.response.data));
    } catch (error) {
      console.log(error);
    }
  };
  const handelsuggetionempty = () => {
    setSearchSuggestions([]);
    setSearchTerm("");
  };
  return (
    <nav className={`navbar-wrapper `}>
      <div className={`fixedcalss ${scroll ? "fixed" : ""}`}>
        <div className={`navbar navbar-expand-lg flex-column`}>
          <div className="topNav row">
            <div className="logodiv col-md-2 col-6 d-flex overflow-hidden align-items-center">
              <Link className="navbar-brand" to="/">
                <img
                  src="/assets/img/logobgw.png"
                  className="navbar-logo"
                  alt="Logo"
                />
              </Link>
            </div>
            <div className="col-md-6  position-relative">
              <div className="justify-content-left d-flex">
                <input
                  type="text"
                  className="searchbox searchboxNavbar"
                  placeholder="Search For Products"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                />
                <div className="search-icon">
                  <img src="/assets/img/search-i.png" alt="Search" />
                </div>
                {searchSuggestions.length > 0 ? (
                  <div className="search-results">
                    <div className="search-results-inner">
                      {searchSuggestions.map((searchturm) => {
                        return (
                          <Link
                            to={`/Search/${searchturm}`}
                            onClick={handelsuggetionempty}
                          >
                            <p className="m-0">{searchturm}</p>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="d-block col-md-4 col-6">
              <div className="d-flex justify-content-end">
                <div className="paymentimage-container">
                  <img src="/assets/img/headerimg.jpg" alt="payment method" />
                </div>
                <div className="usericon">
                  {user ? (
                    <div className="after-login-account-box">
                      <div className="account-icon">
                        <img src="/assets/img/user-i.png" alt="Us" />
                      </div>
                      <div className="after-loginsystam">
                        <ul>
                          <li className="usernaem-box">
                            <div className="usernaem-box-user-Profile">
                              {Image ? (
                                <img
                                  src={`${baseUrlForMedia}images/profiles/${Image}`}
                                  alt="profile image"
                                />
                              ) : (
                                <img
                                  src="/assets/img/user-i.png"
                                  alt="profile image"
                                />
                              )}
                            </div>
                            <div className="usernaem-box-name">
                              <p>
                                Hey, <br /> {username}
                              </p>
                            </div>
                          </li>
                          <li className="mb-2 orderlink-innavbar">
                            <Link to="/account">
                              <button className="logoutbtn">
                                Account Settings
                              </button>
                            </Link>
                          </li>
                          <li className="mb-2 orderlink-innavbar">
                            <Link to="/yourorder">
                              <button className="logoutbtn">Your Orders</button>
                            </Link>
                          </li>

                          <li className="logoutbuttonli">
                            <button
                              className="logoutbtn"
                              onClick={handlelogout}
                            >
                              Logout
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <Link to="/login">
                      <div className="account-icon">
                        <img src="/assets/img/user-i.png" alt="Ur" />
                      </div>
                    </Link>
                  )}
                </div>
                <div className="cartbutton">
                  <Link to="/cart">
                    <div className="account-icon d-flex">
                      <img src="/assets/img/cart-i.png" alt="Cart" />
                      <div className="floatinfnumber">
                        <p className="mb-0 pb-0 ">{quantity}</p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="hamburgermenu" onClick={handelnavbar}>
                  <div className="account-icon">
                    <i className="fa fa-bars" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
              <div className="number-navbar">
                <div className="d-flex justify-content-end">
                  <img
                    src="/assets/img/call-i.png"
                    style={{ width: "20px", height: "20px" }}
                    alt="Call"
                  />
                  <span className="call-number">
                    <a href="tel: 0793 207 4018">0793 207 4018</a>
                    {" / "}
                    <a
                      href="tel: 0203
                      384 0074"
                    >
                      0203 384 0074
                    </a>
                  </span>
                </div>
              </div>
              <div className="opning-navbar">
                <p className=" m-0" style={{ textAlign: "right" }}>
                  Monday - Saturday: 10 am-7 pm
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            navbarmobile
              ? "navigation dropdwnmenu openNavMobile"
              : "navigation dropdwnmenu closeNavMobile"
          }
        >
          <div className="nav-item-top">
            <Link
              to="/"
              className="mainlink"
              onClick={() => getNavbarmobile(false)}
            >
              <p className="navmanuname">Home</p>
            </Link>
          </div>
          <div className="nav-item-top">
            <Link to="/blindlist" onClick={() => getNavbarmobile(false)}>
              <p className="navmanuname">shop</p>
            </Link>
          </div>
          <div className="nav-item-top">
            <p
              className="navmanuname"
              onClick={() => getbliedsDropdownNone(!bliedsDropdownNone)}
            >
              Blinds
            </p>
            <div
              className={
                bliedsDropdownNone
                  ? "nav-submenu-wrap bliedsDropdown bliedsDropdown-block"
                  : "nav-submenu-wrap bliedsDropdown bliedsDropdown-none"
              }
            >
              <div className="containe py-4">
                <p className="mainhading-afterdowpdown">
                  Various Categories of Blinds
                </p>
                <div className="subnameny-items-container">
                  <Link to="/rollerBlinds">
                    <div className="subnameny-items">
                      <div className="subnav-img-container">
                        <img src="/assets/img/t-Roller.jpg" alt="Roller" />
                      </div>
                      <p className=" w-100">Roller</p>
                    </div>
                  </Link>
                  <Link to="/verticalBlinds">
                    <div className="subnameny-items">
                      <div className="subnav-img-container">
                        <img src="/assets/img/t-Vertical.jpg" alt="Vertical" />
                      </div>
                      <p className=" w-100">Vertical</p>
                    </div>
                  </Link>
                  <Link to="/woodenBlinds">
                    <div className="subnameny-items">
                      <div className="subnav-img-container">
                        <img src="/assets/img/t-wooden.jpg" alt="Wooden" />
                      </div>
                      <p className="w-100">Wooden</p>
                    </div>
                  </Link>
                  <Link>
                    <div className="subnameny-items">
                      <div className="subnav-img-container">
                        <img src="/assets/img/t-sierra.jpg" alt="sierra" />
                      </div>
                      <p className="w-100">Sierra</p>
                    </div>
                  </Link>
                  <Link>
                    <div className="subnameny-items">
                      <div className="subnav-img-container">
                        <img src="/assets/img/t-Patricia.jpg" alt="Patricia" />
                      </div>
                      <p className=" w-100">Patricia</p>
                    </div>
                  </Link>
                  <Link>
                    <div className="subnameny-items">
                      <div className="subnav-img-container">
                        <img src="/assets/img/t-meliso.jpg" alt="meliso" />
                      </div>
                      <p className=" w-100">Meliso</p>
                    </div>
                  </Link>
                  <Link>
                    <div className="subnameny-items">
                      <div className="subnav-img-container">
                        <img
                          src="/assets/img/t-daynight.webp"
                          alt="Day & Nighty"
                        />
                      </div>
                      <p className=" w-100">Luzon</p>
                    </div>
                  </Link>
                  <Link>
                    <div className="subnameny-items">
                      <div className="subnav-img-container">
                        <img src="/assets/img/t-grayson.jpg" alt="Grayson" />
                      </div>
                      <p className=" w-100">Grayson</p>
                    </div>
                  </Link>
                  <Link>
                    <div className="subnameny-items">
                      <div className="subnav-img-container">
                        <img src="/assets/img/t-dorren.jpg" alt="dorren" />
                      </div>
                      <p className=" w-100">Dorren</p>
                    </div>
                  </Link>
                  <Link>
                    <div className="subnameny-items">
                      <div className="subnav-img-container">
                        <img src="/assets/img/t-colby.jpg" alt="colby" />
                      </div>
                      <p className=" w-100">Colby</p>
                    </div>
                  </Link>
                  <Link>
                    <div className="subnameny-items">
                      <div className="subnav-img-container">
                        <img
                          src="/assets/img/t-colby-skylight.jpg"
                          alt="colby-skylight"
                        />
                      </div>
                      <p className=" w-100">Colby Skylight</p>
                    </div>
                  </Link>
                  <Link>
                    <div className="subnameny-items">
                      <div className="subnav-img-container">
                        <img src="/assets/img/t-aric.jpg" alt="aric" />
                      </div>
                      <p className=" w-100">Aric</p>
                    </div>
                  </Link>
                  <Link>
                    <div className="subnameny-items">
                      <div className="subnav-img-container">
                        <img src="/assets/img/t-panel.jpg" alt="panel" />
                      </div>
                      <p className=" w-100">Panel</p>
                    </div>
                  </Link>
                  <Link>
                    <div className="subnameny-items">
                      <div className="subnav-img-container">
                        <img src="/assets/img/t-Roman.jpg" alt="Roman" />
                      </div>
                      <p className=" w-100">Roman</p>
                    </div>
                  </Link>
                  <Link>
                    <div className="subnameny-items">
                      <div className="subnav-img-container">
                        <img
                          src="/assets/img/t-roman-skylight.jpg"
                          alt="roman-skylight"
                        />
                      </div>
                      <p className=" w-100">Roman Skylight</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="nav-item-top">
            <Link to="/contactus">
              <p className="navmanuname">contact us </p>
            </Link>
          </div>
          <div className="nav-item-top">
            <Link to="/aboutus">
              <p className="navmanuname">about us</p>
            </Link>
          </div>
          <div className="nav-item-top">
            <p className="navmanuname">track your order </p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
