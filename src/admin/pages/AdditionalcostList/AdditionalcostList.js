import React, { useState, useEffect } from "react";
import { publicRequest, userRequest } from "../../../requestMethods";
import "../adminStyle.css";
import { Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
function MatrixTable({ data, type }) {
  const getMinValue = (arr, prop) => {
    return arr.reduce((min, obj) => {
      return obj[prop] < min ? obj[prop] : min; // Compare object's property value with current minimum value
    }, arr[0][prop]); // Set initial value to the first object's property value
  };
  const getMaxValue = (arr, prop) => {
    return arr.reduce((max, obj) => {
      return obj[prop] > max ? obj[prop] : max; // Compare object's property value with current minimum value
    }, arr[0][prop]); // Set initial value to the first object's property value
  };

  const calculateStepValue = (max, min, count) => {
    const stepofband = (max - min) / count;
    return stepofband;
  };
  const [stepDrop, setstepdrop] = useState();
  const [stepWidth, setstepWidth] = useState();

  useEffect(() => {
    const getstepdata = async () => {
      const maxWidthvalue = getMaxValue(data, "width");
      const minWidthvalue = getMinValue(data, "width");
      const widthCount = new Set(data.map((item) => item.width)).size;
      const countMinus1 = widthCount - 1;
      setstepWidth(
        calculateStepValue(maxWidthvalue, minWidthvalue, countMinus1)
      );
    };
    getstepdata();
  }, [data]);

  const min_width = getMinValue(data, "width");
  const max_width = getMaxValue(data, "width");
  const step_size_width = stepWidth;

  const [selectedCell, setSelectedCell] = useState(null);

  // Create an array of column headers representing the width values
  const headers = [];
  for (let w = min_width; w <= max_width; w += step_size_width) {
    headers.push(<th>{w}</th>);
  }
  // Create an array of rows representing the drop values
  const cells = [];
  for (let w = min_width; w <= max_width; w += step_size_width) {
    // Find the corresponding value for this cell
    const cellData = data.find((d) => d.width === w);
    const value = cellData?.price ?? "";

    const isEditing = selectedCell && selectedCell.width === w;

    cells.push(
      <td key={`${w}`} onClick={() => setSelectedCell({ width: w })}>
        {isEditing ? (
          <input
            type="text"
            defaultValue={value}
            style={{ width: "45px" }}
            autoFocus
            onKeyPress={async (e) => {
              if (e.key === "Enter") {
                const newData = data.map((d) => {
                  if (d.width === w) {
                    const update = {
                      price: e.target.value,
                    };
                    publicRequest
                      .put(`/Additionalcost/${d._id}`, update)
                      .then((data) => window.location.reload())
                      .catch((error) => console.error(error));
                  }
                  return d;
                });
              }
            }}
            onBlur={() => {
              setSelectedCell(false);
            }}
          />
        ) : (
          value
        )}
      </td>
    );
  }

  // Render the table with the headers and rows
  return (
    <div className="metrixtable">
      <table>
        <thead>
          <tr>
            <th>Width</th>
            {headers}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th style={{ width: "100px" }}>Cost</th>
            {cells}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
function MatrixTableall({ data, type }) {
  const getMinValue = (arr, prop) => {
    return arr.reduce((min, obj) => {
      return obj[prop] < min ? obj[prop] : min; // Compare object's property value with current minimum value
    }, arr[0][prop]); // Set initial value to the first object's property value
  };
  const getMaxValue = (arr, prop) => {
    return arr.reduce((max, obj) => {
      return obj[prop] > max ? obj[prop] : max; // Compare object's property value with current minimum value
    }, arr[0][prop]); // Set initial value to the first object's property value
  };

  const calculateStepValue = (max, min, count) => {
    const stepofband = (max - min) / count;
    return stepofband;
  };
  const [stepDrop, setstepdrop] = useState();
  const [stepWidth, setstepWidth] = useState();
  /*   const minWidth = getDifference(data, "drop");*/
  useEffect(() => {
    const getstepdata = async () => {
      const maxWidthvalue = getMaxValue(data, "width");
      const minWidthvalue = getMinValue(data, "width");
      const widthCount = new Set(data.map((item) => item.width)).size;
      const countMinus1 = widthCount - 1;
      setstepWidth(
        calculateStepValue(maxWidthvalue, minWidthvalue, countMinus1)
      );
      const maxDropvalue = getMaxValue(data, "drop");
      const minDropvalue = getMinValue(data, "drop");
      const DropCount = new Set(data.map((item) => item.drop)).size;
      const countDropus1 = DropCount - 1;
      await setstepdrop(
        calculateStepValue(maxDropvalue, minDropvalue, countDropus1)
      );
    };
    getstepdata();
  }, [data]);

  console.log("width", stepWidth);
  console.log("drop", stepDrop);

  const min_width = getMinValue(data, "width");
  const max_width = getMaxValue(data, "width");
  const step_size_width = stepWidth;
  const min_drop = getMinValue(data, "drop");
  const max_drop = getMaxValue(data, "drop");
  const step_size_drop = stepDrop;

  const [selectedCell, setSelectedCell] = useState(null);

  // Create an array of column headers representing the width values
  const headers = [];
  for (let w = min_width; w <= max_width; w += step_size_width) {
    headers.push(<th>{w}</th>);
  }
  // Create an array of rows representing the drop values
  const rows = [];
  for (let h = min_drop; h <= max_drop; h += step_size_drop) {
    const cells = [];
    for (let w = min_width; w <= max_width; w += step_size_width) {
      // Find the corresponding value for this cell
      const cellData = data.find((d) => d.width === w && d.drop === h);
      const value = cellData?.price ?? "";

      const isEditing =
        selectedCell && selectedCell.width === w && selectedCell.drop === h;

      cells.push(
        <td
          key={`${h}-${w}`}
          onClick={() => setSelectedCell({ width: w, drop: h })}
        >
          {isEditing ? (
            <input
              type="text"
              defaultValue={value}
              style={{ width: "45px" }}
              autoFocus
              onKeyPress={async (e) => {
                if (e.key === "Enter") {
                  const newData = data.map((d) => {
                    if (d.width === w && d.drop === h) {
                      const update = {
                        price: e.target.value,
                      };
                      publicRequest
                        .put(`/Additionalcost/${d._id}`, update)
                        .then((data) => window.location.reload())
                        .catch((error) => console.error(error));
                    }
                    return d;
                  });
                }
              }}
              onBlur={() => {
                setSelectedCell(false);
              }}
            />
          ) : (
            value
          )}
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

  // Render the table with the headers and rows
  return (
    <div className="metrixtable">
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
    </div>
  );
}
function AdminAdditionalcost() {
  const [data, setData] = useState([]);
  const [typevalue, setTypevalue] = useState("");
  const [loading, setLoading] = useState(false);
  const [BlindType, setBlindType] = useState("");
  const handeleTypeSelect = async (e) => {
    setLoading(true);
    setData([]);
    try {
      await userRequest
        .get(`/Additionalcost/findbyType?blindType=${e.target.value}`)
        .then((response) => {
          setTypevalue(e.target.value);
          setData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error submitting form data:", error);
          setLoading(false);
        });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  // Create an object of data arrays, keyed by band
  const dataByaddingType = data.reduce((acc, d) => {
    if (!acc[d.addingType]) {
      acc[d.addingType] = [];
    }
    acc[d.addingType].push(d);
    return acc;
  }, {});

  // Create a MatrixTable component for each band
  let tables;
  if (data.length !== 0) {
    tables = Object.entries(dataByaddingType).map(([band, data]) => (
      <div key={band} className="matrix-individual-table">
        <h2>Adding Type - {band}</h2>
        {data[0].drop ? (
          <MatrixTableall data={data} type={typevalue} />
        ) : (
          <MatrixTable data={data} type={typevalue} />
        )}
      </div>
    ));
  } else if (loading === true) {
    tables = (
      <div className="loadding-for-api-admin" style={{ width: "100%" }}>
        <CircularProgress />
      </div>
    );
  } else {
    tables = (
      <div className="matrix-individual-table">
        <h5>Select the type to show the Product Pricing...</h5>
      </div>
    );
  }

  const [TypeSelect, setTypeSelect] = useState({});
  useEffect(() => {
    const allcites = publicRequest
      .get(`/PriceOfProduct/TypeSelect`)
      .then((response) => setTypeSelect(response.data))
      .catch((error) => console.error(error));
  }, []);
  const typeElements = Object.values(TypeSelect).map((type) => (
    <option key={type} value={type}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </option>
  ));

  return (
    <div className="product-price-wrapper">
      <div className="productTitleContainer">
        <h1 className="productTitle">Additional cost</h1>
        <div className="productbtncontainer">
          <Link to="/admin/Additionalcost/AddAdditionalcost">
            <button className="productAddButton">Add Additional cost</button>
          </Link>
        </div>
      </div>
      <div className="product-price-type-selector">
        <select
          className="searchbox city"
          placeholder="Type"
          onChange={handeleTypeSelect}
          name="Type"
          required
        >
          <option>Select Type</option>
          {typeElements}
        </select>
      </div>
      <div className="matrix-table-wrapper">{tables}</div>
    </div>
  );
}

export default AdminAdditionalcost;
