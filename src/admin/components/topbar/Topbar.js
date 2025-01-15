import React, { useState } from "react";
import "./topbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logOutfun } from "../../../redux/apiCalls";
function AdminTopbar({ onHamburgerClick }) {
  const user = useSelector((state) => state.user.currentUser);
  const despatch = useDispatch();
  const handlelogout = async (e) => {
    e.preventDefault();
    await logOutfun(despatch);
    window.location.href = "/";
  };

  const [opensettingmenu, setopensettingmenu] = useState(false);
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">blind-Admin</span>
        </div>
        <div className="topRight">
          <div className="account-main-wrapper">
            <div
              className="setting-login-box"
              onClick={() => setopensettingmenu(!opensettingmenu)}
            >
              <img src="/assets/img/user-i.png" alt="" />
            </div>
            <div
              className={
                opensettingmenu ? "after-loginsystam open" : "after-loginsystam"
              }
            >
              <ul>
                <li className="usernaem-box">Hey, {user.username}</li>
                <li className="logoutbuttonli">
                  <button className="logoutbtn" onClick={handlelogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
            <div className="mobile-hamburger-box" onClick={onHamburgerClick}>
              <i className="fa fa-bars" aria-hidden="true"></i>
            </div>
            {/* <img
            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="topAvatar"
          /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminTopbar;
