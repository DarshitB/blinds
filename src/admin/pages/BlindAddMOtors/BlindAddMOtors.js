import React, { useEffect, useState } from "react";
import "../adminStyle.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import { publicRequest, userRequest } from "../../../requestMethods";
import { toast } from "react-toastify";
import Loader from "../../../components/loader";
function AdminBlindAddMOtors() {
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
  const [MotorName, setMotorName] = useState("");
  const [MotorCode, setMotorCode] = useState("");
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
      MotorName !== "" &&
      MotorCode !== "" &&
      AdditionPrice !== "" &&
      BlindType !== ""
    ) {
      const MotosBlined = {
        MotorName: MotorName,
        MotorCode: MotorCode,
        AdditionPrice: AdditionPrice,
        BlindType: BlindType,
      };
      userRequest
        .post(`/OperatingSystem/Motore`, MotosBlined)
        .then((response) => {
          toast.success(`Success, You are successfully Added a Motore.`);
          setShowLoader(false); /*  window.location.reload(); */
          /*           history.push("/admin/BlindMOtorsLIst");
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
        <h1 className="productTitle">Add New Motor</h1>
      </div>
      <div className="Edit-product-form-container">
        <form onSubmit={handleSubmit}>
          <div className="filed-box">
            <div className="inner-col">
              <label htmlFor="City" className="product-field-label">
                MotorName
              </label>
              <input
                type="text"
                id="MotorName"
                name="MotorName"
                onChange={(e) => setMotorName(e.target.value)}
                className="searchbox"
              />
            </div>
          </div>
          <div className="filed-box">
            <div className="inner-col">
              <label htmlFor="MotorCode" className="product-field-label">
                MotorCode
              </label>
              <input
                type="text"
                id="MotorCode"
                name="MotorCode"
                onChange={(e) => setMotorCode(e.target.value)}
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
            {ShowLoader ? <Loader /> : "Add Motor"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminBlindAddMOtors;
