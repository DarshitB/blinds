import React, { useEffect, useState } from "react";
import "../adminStyle.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link, useHistory, useLocation } from "react-router-dom";
import { publicRequest, userRequest } from "../../../requestMethods";
import { toast } from "react-toastify";
import Loader from "../../../components/loader";
function AdminEditUser() {
  const location = useLocation();
  const history = useHistory();
  const id = location.pathname.split("/")[4];
  const [loading, setLoading] = useState(true);
  const [ShowLoader, setShowLoader] = useState(false);
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [userid, setuserid] = useState("");

  useEffect(() => {
    userRequest
      .get(`/user/find/` + id)
      .then((response) => {
        setusername(response.data.username);
        setemail(response.data.email);
        setuserid(response.data._id);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleTitleChange = (e) => {
    setusername(e.target.value);
  };
  const handleemailChange = (e) => {
    setemail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoader(true);
    const userdata = new FormData();
    console.log(username);
    console.log(email);
    userdata.append("username", username);
    userdata.append("email", email);
    /*   userdata.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    }); */
    const usermaindata = {
      username: username,
      email: email,
    };
    userRequest
      .put(`/user/${userid}`, usermaindata)
      .then((response) => {
        console.log(response);
        toast.success(`Success, You are successfully Added a Product.`);
        setShowLoader(false);
        history.push("/admin/all-user");
      })
      .catch((error) => {
        toast.error(`Error, Something Went Wrong${error}`);
      });
  };
  if (loading) {
    return (
      <div className="loadding-for-api-admin">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="Edit-product-wrapper">
      <div className="productTitleContainer">
        <h1 className="productTitle">Edit Product</h1>
      </div>
      <div className="Edit-product-form-container">
        <form onSubmit={handleSubmit}>
          <div className="filed-box">
            <div className="inner-col">
              <label htmlFor="title" className="product-field-label">
                uesrname
              </label>
              <input
                type="text"
                id="title"
                defaultValue={username}
                name="title"
                onChange={handleTitleChange}
                className="searchbox"
              />
            </div>
          </div>
          <div className="filed-box">
            <div className="inner-col">
              <label htmlFor="title" className="product-field-label">
                email
              </label>
              <input
                type="text"
                id="email"
                defaultValue={email}
                name="email"
                onChange={handleemailChange}
                className="searchbox"
              />
            </div>
          </div>

          <button className="login-btn" type="submit">
            {ShowLoader ? <Loader /> : "Edit User"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminEditUser;
