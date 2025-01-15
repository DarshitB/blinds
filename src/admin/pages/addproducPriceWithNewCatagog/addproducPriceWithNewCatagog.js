import React, { useState, useEffect } from "react";
import { publicRequest, userRequest } from "../../../requestMethods";
import "../adminStyle.css";
import Loader from "../../../components/loader";
import { BorderColor } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
function MatrixTable({
  type,
  minWidth,
  maxWidth,
  maxDrop,
  minDrop,
  stepWidth,
  stepDrop,
}) {
  const history = useHistory();
  let min_width, max_width, step_size_width, min_drop, max_drop, step_size_drop;
  min_width = parseInt(minWidth);
  max_width = parseInt(maxWidth);
  step_size_width = parseInt(stepWidth);
  min_drop = parseInt(minDrop);
  max_drop = parseInt(maxDrop);
  step_size_drop = parseInt(stepDrop);

  console.log(maxWidth);
  const [priceArray, setPriceArray] = useState([]);
  const [Band, setBand] = useState("");
  const [ShowLoader, setShowLoader] = useState(false);
  // Create an array of column headers representing the width values
  const headers = [];
  for (let w = min_width; w <= max_width; w += step_size_width) {
    headers.push(<th>{w}</th>);
  }
  // Create an array of rows representing the drop values
  const rows = [];
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
  const handelinputchanges = (value, drop, width, band, type) => {
    setPriceArray((prevState) => {
      if (!prevState) {
        // If prevState is undefined, initialize it as an empty array
        prevState = [];
      }
      const updatedArray = [...prevState];
      // Check if the object already exists in the array
      const existingObjectIndex = updatedArray.findIndex(
        (obj) => obj.drop === drop && obj.width === width
      );
      if (existingObjectIndex !== -1) {
        // Update the existing object with the new value
        updatedArray[existingObjectIndex].price = value;
      } else {
        // Create a new object with the specified schema
        const newObject = {
          width: width,
          drop: drop,
          band: band,
          type: type,
          price: value,
        };
        // Add the new object to the array
        updatedArray.push(newObject);
      }
      return updatedArray;
    });
  };
  for (let h = min_drop; h <= max_drop; h += step_size_drop) {
    const cells = [];
    for (let w = min_width; w <= max_width; w += step_size_width) {
      cells.push(
        <td key={`${h}-${w}`}>
          <input
            type="number"
            onKeyDown={handleKeyDown}
            onChange={(event) =>
              handelinputchanges(event.target.value, h, w, Band, type)
            }
            style={{ width: "45px" }}
            name="priceNumber"
            required
          />
        </td>
      );
    }
    rows.push(
      <tr key={h}>
        <th style={{ width: "100px" }}>{h}</th>
        {cells}
      </tr>
    );
  }
  const handelbandchanges = (e) => {
    if (e.target.value) {
      setBand(e.target.value.toUpperCase());
    }
  };
  const handelsubmitproductprice = (e) => {
    e.preventDefault();
    setShowLoader(true);
    userRequest
      .post(`/PriceOfProduct/`, priceArray)
      .then((response) => {
        console.log(response);
        setShowLoader(false);
        toast.success(`Success, You are successfully Added a Product Prices`);
        history.push("/admin/products/productPrice");
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error, Something Went Wrong`);
      });
  };
  // Render the table with the headers and rows
  return (
    <div className="metrixtable">
      <form onSubmit={handelsubmitproductprice}>
        <h2 className="d-flex align-items-center">
          Band{" "}
          <span style={{ width: "8%" }}>
            <input
              type="text"
              name="bandname"
              required
              style={{
                border: "1px solid black",
                backgroundColor: "#fff",
                color: "#000",
                width: "40px",
                marginLeft: "0.5rem",
                textAlign: "center",
              }}
              onChange={handelbandchanges}
            />
          </span>
        </h2>
        <table>
          <thead>
            <tr>
              <th>
                Width/
                <br />
                Drop
              </th>
              {headers}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
        <button className="productAddButton mt-3 w-100" type="submit">
          {ShowLoader ? <Loader /> : "Add All Product Price"}
        </button>
      </form>
    </div>
  );
}
function AdminaddproducPriceWithNewCatagog() {
  const [typevalue, setTypevalue] = useState("");
  const [MaxWidthvalue, setMaxWidthvalue] = useState("");
  const [MinWidthvalue, setMinWidthvalue] = useState("");
  const [MaxDropvalue, setMaxDropvalue] = useState("");
  const [minDropvalue, setMinDropvalue] = useState("");
  const [stapDropvalue, setstapDropvalue] = useState("");
  const [stapWidthvalue, setstapWidthvalue] = useState("");
  const [showmetrix, setshowmetrix] = useState(false);

  const handeleTypeSelect = (e) => {
    const { name, value } = e.target;
    if (name === "Type") {
      setTypevalue(value);
    } else if (name === "MaxWidth") {
      setMaxWidthvalue(value);
    } else if (name === "Maxdrop") {
      setMaxDropvalue(value);
    } else if (name === "MinWidth") {
      setMinWidthvalue(value);
    } else if (name === "MinDrop") {
      setMinDropvalue(value);
    } else if (name === "StepsizeWidth") {
      setstapWidthvalue(value);
    } else if (name === "StepsizeDrop") {
      setstapDropvalue(value);
    }
  };
  const handelgetmetrix = () => {
    if (
      typevalue !== "" &&
      MaxWidthvalue !== "" &&
      MinWidthvalue !== "" &&
      MaxDropvalue !== "" &&
      minDropvalue !== "" &&
      stapDropvalue !== "" &&
      stapWidthvalue !== ""
    ) {
      setshowmetrix(true);
    } else {
      setshowmetrix(false);
    }
  };
  return (
    <div className="product-price-wrapper">
      <div className="productTitleContainer">
        <h1 className="productTitle">Add Product Price</h1>
      </div>
      <div className="product-price-type-selector">
        <input
          type="text"
          className="searchbox city"
          placeholder="Type"
          onChange={handeleTypeSelect}
          name="Type"
          required
        />
        <div className="d-flex">
          <input
            type="text"
            className="searchbox city"
            placeholder="Min Width"
            onChange={handeleTypeSelect}
            name="MinWidth"
            required
          />
          <input
            type="text"
            className="searchbox city"
            placeholder="Max Width"
            onChange={handeleTypeSelect}
            name="MaxWidth"
            required
          />
        </div>
        <div className="d-flex">
          <input
            type="text"
            className="searchbox city"
            placeholder="Min drop"
            onChange={handeleTypeSelect}
            name="MinDrop"
            required
          />
          <input
            type="text"
            className="searchbox city"
            placeholder="Max drop"
            onChange={handeleTypeSelect}
            name="Maxdrop"
            required
          />
        </div>
        <div className="d-flex">
          <input
            type="text"
            className="searchbox city"
            placeholder="Step size Width"
            onChange={handeleTypeSelect}
            name="StepsizeWidth"
            required
          />
          <input
            type="text"
            className="searchbox city"
            placeholder="step size drop"
            onChange={handeleTypeSelect}
            name="StepsizeDrop"
            required
          />
        </div>
        <button onClick={handelgetmetrix} className="productAddButton">
          get
        </button>
      </div>
      <div className="matrix-table-wrapper">
        <div className="matrix-individual-table">
          {showmetrix ? (
            <MatrixTable
              type={typevalue}
              minWidth={MinWidthvalue}
              maxWidth={MaxWidthvalue}
              minDrop={minDropvalue}
              maxDrop={MaxDropvalue}
              stepWidth={stapWidthvalue}
              stepDrop={stapDropvalue}
            />
          ) : (
            <h5>Select the type to show the Product Pricing...</h5>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminaddproducPriceWithNewCatagog;
