import React, { useEffect, useState } from "react";
import "../adminStyle.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import { publicRequest, userRequest } from "../../../requestMethods";
import { toast } from "react-toastify";
import Loader from "../../../components/loader";
function AdminBlindAddAccessories() {
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
  const [AccessoriesName, setAccessoriesName] = useState("");
  const [AccessoriesCode, setAccessoriesCode] = useState("");
  const [AdditionPrice, setAdditionPrice] = useState("");
  const [BlindType, setBlindType] = useState("");
  const [TypeSelect, setTypeSelect] = useState({});

  useEffect(() => {
    const allcites = publicRequest
      .get(`/PriceOfProduct/TypeSelect`)
      .then((response) => setTypeSelect(response.data))
      .catch((error) => console.error(error));
  }, [TypeSelect]);
  const typeElements = Object.values(TypeSelect).map((type) => (
    <option key={type} value={type}>
      {type.charAt(0).toUpperCase() + type.slice(1)} Blinds
    </option>
  ));

  const handleBiledtype = (e) => {
    if (e.target.value === "noSelected") {
      setBlindType("");
    } else {
      setBlindType(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoader(true);
    if (
      AccessoriesName !== "" &&
      AccessoriesCode !== "" &&
      AdditionPrice !== "" &&
      BlindType !== ""
    ) {
      const AccessoriesBlined = {
        AccessoriesName: AccessoriesName,
        AccessoriesCode: AccessoriesCode,
        AdditionPrice: AdditionPrice,
        BlindType: BlindType,
      };
      userRequest
        .post(`/OperatingSystem/Accessories`, AccessoriesBlined)
        .then((response) => {
          toast.success(`Success, You are successfully Added a Accessories.`);
          setShowLoader(false); /* window.location.reload(); */
          /*           history.push("/admin/BlindAccessoriesLIst");
           */
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
        <h1 className="productTitle">Add New Accessories</h1>
      </div>
      <div className="Edit-product-form-container">
        <form onSubmit={handleSubmit}>
          <div className="filed-box">
            <div className="inner-col">
              <label htmlFor="City" className="product-field-label">
                AccessoriesName
              </label>
              <input
                type="text"
                id="AccessoriesName"
                name="AccessoriesName"
                onChange={(e) => setAccessoriesName(e.target.value)}
                className="searchbox"
              />
            </div>
          </div>
          <div className="filed-box">
            <div className="inner-col">
              <label htmlFor="AccessoriesCode" className="product-field-label">
                AccessoriesCode
              </label>
              <input
                type="text"
                id="AccessoriesCode"
                name="AccessoriesCode"
                onChange={(e) => setAccessoriesCode(e.target.value)}
                className="searchbox"
              />
            </div>
          </div>
          <div className="filed-box">
            <div className="inner-col">
              <label htmlFor="AdditionPrice" className="product-field-label">
                AdditionPrice(£)
              </label>
              <input
                type="number"
                id="AdditionPrice"
                name="AdditionPrice"
                onKeyDown={handleKeyDown}
                onChange={(e) => setAdditionPrice(e.target.value)}
                className="searchbox"
              />
            </div>
          </div>
          <div className="filed-box">
            <div className="inner-col">
              <label htmlFor="AdditionPrice" className="product-field-label">
                BlindType
              </label>
              <select
                className="searchbox"
                id="Type"
                onChange={handleBiledtype}
                name="Type"
                required
              >
                <option value="noSelected">Select Blind Type</option>
                {typeElements}
              </select>
            </div>
          </div>

          <button className="login-btn" type="submit">
            {ShowLoader ? <Loader /> : "Add Accessories"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminBlindAddAccessories;
