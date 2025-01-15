import React, { useState, useEffect } from "react";
import { publicRequest, userRequest } from "../../../requestMethods";
import "../adminStyle.css";
import Loader from "../../../components/loader";
import { BorderColor } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
function MatrixTable({ type }) {
  const history = useHistory();
  let min_width, max_width, step_size_width, min_drop, max_drop, step_size_drop;
  if (type === "Roller") {
    min_width = 600;
    max_width = 3200;
    step_size_width = 200;
    min_drop = 600;
    max_drop = 4000;
    step_size_drop = 200;
  } else if (type === "Vertical") {
    min_width = 500;
    max_width = 4000;
    step_size_width = 250;
    min_drop = 600;
    max_drop = 4000;
    step_size_drop = 200;
  } else if (type === "Aric") {
    min_width = 800;
    max_width = 2800;
    step_size_width = 200;
    min_drop = 1000;
    max_drop = 2600;
    step_size_drop = 200;
  } else if (type === "Colby") {
    min_width = 600;
    max_width = 3000;
    step_size_width = 200;
    min_drop = 600;
    max_drop = 4000;
    step_size_drop = 200;
  } else if (type === "Colby Skylight") {
    min_width = 600;
    max_width = 2000;
    step_size_width = 200;
    min_drop = 500;
    max_drop = 4000;
    step_size_drop = 500;
  } else if (type === "Dorren" || type === "Luzon") {
    min_width = 600;
    max_width = 2800;
    step_size_width = 200;
    min_drop = 600;
    max_drop = 3000;
    step_size_drop = 200;
  } else if (type === "Grayson") {
    min_width = 600;
    max_width = 2800;
    step_size_width = 200;
    min_drop = 1000;
    max_drop = 3000;
    step_size_drop = 200;
  } else if (type === "Meliso") {
    min_width = 600;
    max_width = 2600;
    step_size_width = 200;
    min_drop = 600;
    max_drop = 3000;
    step_size_drop = 200;
  } else if (type === "Panel") {
    min_width = 1000;
    max_width = 4000;
    step_size_width = 200;
    min_drop = 1000;
    max_drop = 4000;
    step_size_drop = 200;
  } else if (type === "Patricia") {
    min_width = 800;
    max_width = 3000;
    step_size_width = 200;
    min_drop = 1500;
    max_drop = 4500;
    step_size_drop = 200;
  } else if (type === "Roman") {
    min_width = 600;
    max_width = 2800;
    step_size_width = 200;
    min_drop = 800;
    max_drop = 3000;
    step_size_drop = 200;
  } else if (type === "Roman Skylight") {
    min_width = 600;
    max_width = 2000;
    step_size_width = 200;
    min_drop = 500;
    max_drop = 4000;
    step_size_drop = 500;
  } else if (type === "Sierra") {
    min_width = 600;
    max_width = 4000;
    step_size_width = 200;
    min_drop = 1000;
    max_drop = 2800;
    step_size_drop = 200;
  } else if (type === "Wooden") {
    min_width = 600;
    max_width = 3000;
    step_size_width = 200;
    min_drop = 800;
    max_drop = 3000;
    step_size_drop = 200;
  }

  const [priceArray, setPriceArray] = useState([]);
  const [Band, setBand] = useState("");
  const [Track, setTrack] = useState("");
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
  const handelinputchanges = (value, drop, width, band, Track, type) => {
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
        let newObject;
        if (Track !== "") {
          newObject = {
            width: width,
            drop: drop,
            band: band,
            type: type,
            price: value,
            trackFilter: Track,
          };
        } else {
          newObject = {
            width: width,
            drop: drop,
            band: band,
            type: type,
            price: value,
          };
        }
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
        <td key={`cell${h}-${w}`}>
          <input
            type="number"
            onKeyDown={handleKeyDown}
            onChange={(event) =>
              handelinputchanges(event.target.value, h, w, Band, Track, type)
            }
            style={{ width: "45px" }}
            name="priceNumber"
            required
          />
        </td>
      );
    }
    rows.push(
      <tr key={"row" + h}>
        <th style={{ width: "100px" }}>{h}</th>
        {cells}
      </tr>
    );
  }

  const [BandExist, setBandExist] = useState(false);
  const [bendforgetexistance, setbendforgetexistance] = useState("");
  const [Trackforgetexistance, setTrackforgetexistance] = useState("");
  const handelTrackchanges = (e) => {
    if (e.target.value) {
      if (bendforgetexistance !== "") {
        setTrackforgetexistance(e.target.value);
        publicRequest
          .get(
            `/PriceOfProduct/band?band=${bendforgetexistance.toUpperCase()}&type=${type}&track=${
              e.target.value
            }`
          )
          .then((response) => {
            if (response) {
              setBandExist(response.data);
              setBand(bendforgetexistance.toUpperCase());
              setTrack(e.target.value);
              if (priceArray.length > 0) {
                // Update the band property of all objects in the array
                const updatedArray = priceArray.map((obj) => {
                  return { ...obj, band: e.target.value.toUpperCase() };
                });

                // Update the state with the new array of objects
                setPriceArray(updatedArray);
              }
            } else {
              setBandExist(response.data);
            }
          })
          .catch((error) => console.error(error));
      } else {
        setTrackforgetexistance("");
        toast.error("The band field is empty");
      }
    }
  };
  const handelbandchanges = (e) => {
    if (e.target.value) {
      if (type === "Panel") {
        setTrackforgetexistance("");
        selectTrackDistict();
        setbendforgetexistance(e.target.value);
      } else {
        publicRequest
          .get(
            `/PriceOfProduct/band?band=${e.target.value.toUpperCase()}&type=${type}`
          )
          .then((response) => {
            if (response) {
              setBandExist(response.data);
              setBand(e.target.value.toUpperCase());
              if (priceArray.length > 0) {
                // Update the band property of all objects in the array
                const updatedArray = priceArray.map((obj) => {
                  return { ...obj, band: e.target.value.toUpperCase() };
                });

                // Update the state with the new array of objects
                setPriceArray(updatedArray);
              }
            } else {
              setBandExist(response.data);
            }
          })
          .catch((error) => console.error(error));
      }
    }
  };
  const [TrackSelect, setTrackSelect] = useState([]);
  const selectTrackDistict = async () => {
    await publicRequest
      .get(`/PriceOfProduct/TrackSelect`)
      .then((response) => {
        setTrackSelect(response.data);
      })
      .catch((error) => console.error(error));
  };
  const handelsubmitproductprice = (e) => {
    e.preventDefault();
    setShowLoader(true);
    if (!BandExist) {
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
    } else {
      toast.error(`Error, The Band is already exists.`);
    }
  };

  return (
    <div className="metrixtable">
      <form onSubmit={handelsubmitproductprice}>
        <h2 className="d-flex align-items-center">
          <span className="individual-band-track">
            Band{" "}
            <span>
              <input
                type="text"
                name="bandname"
                required
                style={{
                  border: BandExist ? "1px solid #721c24" : "1px solid black",
                  backgroundColor: BandExist ? "#f8d7da" : "#fff",
                  color: BandExist ? "#721c24" : "#000",
                  width: "40px",
                  marginLeft: "0.5rem",
                  marginRight: "0.5rem",
                  textAlign: "center",
                }}
                onChange={handelbandchanges}
              />
            </span>
          </span>
          {type === "Panel" ? (
            <>
              <span className="individual-band-track">
                <span> Track </span>
                <span>
                  <select
                    className="searchbox"
                    placeholder="Track"
                    name="Trackname"
                    onChange={handelTrackchanges}
                    value={Trackforgetexistance}
                    style={{
                      border: BandExist
                        ? "1px solid #721c24"
                        : "1px solid black",
                      backgroundColor: BandExist ? "#f8d7da" : "#fff",
                      color: BandExist ? "#721c24" : "#000",
                      width: "150px",
                      marginLeft: "0.5rem",
                      marginRight: "0.5rem",
                      textAlign: "center",
                      padding: "1px 2px",
                      borderRadius: "0px",
                    }}
                    required
                  >
                    <option>Select Track</option>
                    {TrackSelect.map((track, index) => {
                      return (
                        <option key={"Track" + index} value={track}>
                          {track}
                        </option>
                      );
                    })}
                  </select>

                  {/* <input
                  type="text"
                  name="Trackname"
                  required
                  style={{
                    border: BandExist ? "1px solid #721c24" : "1px solid black",
                    backgroundColor: BandExist ? "#f8d7da" : "#fff",
                    color: BandExist ? "#721c24" : "#000",
                    width: "150px",
                    marginLeft: "0.5rem",
                    marginRight: "0.5rem",
                    textAlign: "center",
                  }}
                  value={Trackforgetexistance}
                  onChange={handelTrackchanges}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace") {
                      // Prevent the default backspace behavior of going back in the browser
                      e.preventDefault();
                      const inputValue = e.target.value;
                      // Remove the last character from the input value
                      const updatedValue = inputValue.slice(0, -1);
                      setTrackforgetexistance(updatedValue);
                    }
                  }}
                /> */}
                </span>
              </span>
            </>
          ) : (
            ""
          )}
          {BandExist ? (
            <p
              className="alert alert-danger py-1 m-0"
              style={{ width: "100%" }}
            >
              This band already exists in a database please change it.
            </p>
          ) : (
            ""
          )}
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
function AdminAddproductPrice() {
  const [typevalue, setTypevalue] = useState("");
  const [showmetrix, setshowmetrix] = useState(false);

  const handeleTypeSelect = (e) => {
    setTypevalue(e.target.value);
    console.log(e.target.value);
    if (e.target.value) {
      setshowmetrix(true);
    } else {
      setshowmetrix(false);
    }
  };

  const [TypeSelect, setTypeSelect] = useState({});
  useEffect(() => {
    const allcites = publicRequest
      .get(`/PriceOfProduct/TypeSelect`)
      .then((response) => setTypeSelect(response.data))
      .catch((error) => console.error(error));
  }, [TypeSelect]);
  const typeElements = Object.values(TypeSelect).map((type) => (
    <option key={"type" + type} value={type}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </option>
  ));

  return (
    <div className="product-price-wrapper">
      <div className="productTitleContainer">
        <h1 className="productTitle">Add Product Price</h1>
      </div>
      <div className="product-price-type-selector">
        <select
          className="searchbox city"
          placeholder="Type"
          onChange={handeleTypeSelect}
          name="Type"
          required
        >
          <option value="">Select Type</option>
          {typeElements}
        </select>
      </div>
      <div className="matrix-table-wrapper">
        <div className="matrix-individual-table">
          {showmetrix ? (
            <MatrixTable type={typevalue} />
          ) : (
            <h5>Select the type to show the Product Pricing...</h5>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminAddproductPrice;
