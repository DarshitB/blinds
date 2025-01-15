import React, { useEffect, useState } from "react";
import "../adminStyle.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link, useHistory, useLocation } from "react-router-dom";
import { publicRequest, userRequest } from "../../../requestMethods";
import { toast } from "react-toastify";
import Loader from "../../../components/loader";
function AdminEditCityNPostalcode() {
  const location = useLocation();
  const history = useHistory();
  const id = location.pathname.split("/")[4];

  const handleKeyDown = (event) => {
    if (
      event.key === "Backspace" ||
      event.key === "ArrowLeft" ||
      event.key === "Tab" ||
      event.key === "ArrowRight"
    ) {
      return;
    }
    if (!/\d/.test(event.key)) {
      event.preventDefault();
    }
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
    }
  };

  const [loading, setLoading] = useState(true);
  const [ShowLoader, setShowLoader] = useState(false);
  const [city, setcity] = useState("");
  const [postcode, setpostcode] = useState("");
  const [delivaryCost, setdelivaryCost] = useState("");
  const [postNcityId, setpostNcityId] = useState("");

  useEffect(() => {
    userRequest
      .get(`/PostalDelivaryCost/` + id)
      .then((response) => {
        setcity(response.data.city);
        setpostcode(response.data.postcode);
        setdelivaryCost(response.data.delivaryCost);
        setpostNcityId(response.data._id);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoader(true);
    if (city !== "" && postcode !== "" && delivaryCost !== "") {
      const postlcodeNCityData = {
        city: city.toLowerCase(),
        postcode: postcode.toUpperCase(),
        delivaryCost: delivaryCost,
      };
      userRequest
        .put(`/PostalDelivaryCost/${postNcityId}`, postlcodeNCityData)
        .then((response) => {
          toast.success(`Success, You have successfully Updated Data.`);
          setShowLoader(false);
          history.push("/admin/All-CityNPostalcodes");
        })
        .catch((error) => {
          setShowLoader(false);
          toast.error(`Error, ${error.response.data}`);
        });
    } else {
      toast.error(`Error, Empty Field.`);
    }
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
        <h1 className="productTitle">Add new Delivery Cost</h1>
      </div>
      <div className="Edit-product-form-container">
        <form onSubmit={handleSubmit}>
          <div className="filed-box">
            <div className="inner-col">
              <label htmlFor="City" className="product-field-label">
                City Name
              </label>
              <input
                type="text"
                id="City"
                defaultValue={city}
                name="City"
                onChange={(e) => setcity(e.target.value)}
                className="searchbox"
              />
            </div>
          </div>
          <div className="filed-box">
            <div className="inner-col">
              <label htmlFor="Postlcode" className="product-field-label">
                Postlcode
              </label>
              <input
                type="text"
                id="Postlcode"
                defaultValue={postcode}
                name="Postlcode"
                onChange={(e) => setpostcode(e.target.value)}
                className="searchbox"
              />
            </div>
          </div>
          <div className="filed-box">
            <div className="inner-col">
              <label htmlFor="DelivaryCost" className="product-field-label">
                Delivary Cost(£)
              </label>
              <input
                type="number"
                id="DelivaryCost"
                defaultValue={delivaryCost}
                name="DelivaryCost"
                onKeyDown={handleKeyDown}
                onChange={(e) => delivaryCost(e.target.value)}
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

export default AdminEditCityNPostalcode;
