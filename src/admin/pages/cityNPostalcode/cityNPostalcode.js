import React, { useEffect } from "react";
import "../adminStyle.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { DataGrid } from "@material-ui/data-grid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { publicRequest, userRequest } from "../../../requestMethods";
function AdminCityNPostalcode() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getProdcut = async () => {
      try {
        const response = await userRequest.get("/PostalDelivaryCost/getAll");
        const idadta = response.data.map((item, index) => {
          const id = index + 1;
          return { ...item, id };
        });
        setData(idadta);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getProdcut();
  }, []);

  const [data, setData] = useState([]);
  const handleDelete = (id) => {
    const result = window.confirm(
      "Are you sure you want to Delete this Delivery costs?"
    );
    if (result) {
      userRequest
        .delete(`/PostalDelivaryCost/${id}`)
        .then((response) => window.location.reload())
        .catch((error) => {
          console.error("Error submitting form data:", error);
        });
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      Width: 90,
    },

    { field: "city", headerName: "City", minWidth: 200, flex: 1 },
    { field: "postcode", headerName: "postcode", minWidth: 200, flex: 1 },
    {
      field: "delivaryCost",
      headerName: "Delivary Cost",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin/CityNPostalcodes/edit/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            {params.row.isAdmin ? (
              ""
            ) : (
              <div
                className="delate-button"
                onClick={() => handleDelete(params.row._id)}
              >
                <i className="fa fa-trash"></i>
              </div>
            )}
          </>
        );
      },
    },
  ];
  if (loading) {
    return (
      <div className="loadding-for-api-admin">
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className="productList">
      <div className="productTitleContainer">
        <h1 className="productTitle">
          <i className="fa fa-location-arrow icons"></i> Delivery costs
          according to City and Postal code Area
        </h1>
        <div className="productbtncontainer">
          <Link to="/admin/addCityNPostalcodes">
            <button className="productAddButton">Add New</button>
          </Link>
        </div>
      </div>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
      />
    </div>
  );
}

export default AdminCityNPostalcode;
