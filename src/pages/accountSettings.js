import React from "react";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";

function AccountSettings() {
  return (
    <div className="account-Setting-wrapper">
      <Navbar />
      <div className="account-Setting-container">
        <section className="section-pagetop">
          <div className="container-fluid mainhedof-productlist">
            <h2>Account Settings</h2>
          </div>
        </section>
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-11 col-lg-9 col-xl-8">
              <div className="account-Setting-list">
                <div className="row ">
                  <div className="col-md-4 p-0">
                    <Link to="/account/ProfileSettings" className="p-0">
                      <div className="account-Setting-list-li">
                        <div className="Setting-list-image">
                          <img src="/assets/img/user-i.svg" alt="" />
                        </div>
                        <h4>profile setting</h4>
                        <p>Your Personal Details/Profile Picture</p>
                      </div>
                    </Link>
                  </div>
                  <div className="col-md-4 p-0">
                    <Link to="/account/Addresses">
                      <div className="account-Setting-list-li">
                        <div className="Setting-list-image">
                          <img src="/assets/img/adresses-i.svg" alt="" />
                        </div>
                        <h4>Add Address</h4>
                        <p>Add/Edit Your Address</p>
                      </div>
                    </Link>
                  </div>
                  <div className="col-md-4 p-0">
                    <Link to="/account/ChangePassword">
                      <div className="account-Setting-list-li">
                        <div className="Setting-list-image">
                          <img src="/assets/img/password-i.svg" alt="" />
                        </div>
                        <h4>change password</h4>
                        <p>Add/Edit Your Address</p>
                      </div>
                    </Link>
                  </div>
                  <div className="col-md-4 p-0">
                    <Link to="/yourorder" className="p-0">
                      <div className="account-Setting-list-li">
                        <div className="Setting-list-image">
                          <img src="/assets/img/orders-i.svg" alt="" />
                        </div>
                        <h4>Your Orders</h4>
                        <p>Add/Edit Your Address</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
