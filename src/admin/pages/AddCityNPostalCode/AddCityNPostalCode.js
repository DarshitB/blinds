import React, { useEffect, useState } from "react";
import "../adminStyle.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import { publicRequest, userRequest } from "../../../requestMethods";
import { toast } from "react-toastify";
import Loader from "../../../components/loader";
function AdminAddCityNPostalCode() {
  const history = useHistory();

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

  const [ShowLoader, setShowLoader] = useState(false);
  const [city, setcity] = useState("");
  const [postcode, setpostcode] = useState("");
  const [delivaryCost, setdelivaryCost] = useState("");
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
        .post(`/PostalDelivaryCost`, postlcodeNCityData)
        .then((response) => {
          toast.success(
            `Success, You are successfully Added a Delivary cost according to city and postalcode.`
          );
          setShowLoader(false);
          history.push("/admin/All-CityNPostalcodes");
        })
        .catch((error) => {
          setShowLoader(false);
          toast.error(`Error, ${error.response.data}`);
        });
    } else {
      setShowLoader(false);
      toast.error(`Error, Empty Field.`);
    }
  };
  return (
    <div className="Edit-product-wrapper">
      <div className="productTitleContainer">
        <h1 className="productTitle">
          Edit Postalcode or City or Delivery Cost
        </h1>
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
                name="DelivaryCost"
                onKeyDown={handleKeyDown}
                onChange={(e) => setdelivaryCost(e.target.value)}
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

export default AdminAddCityNPostalCode;
