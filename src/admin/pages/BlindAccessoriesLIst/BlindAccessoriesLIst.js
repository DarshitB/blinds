import React, { useEffect } from "react";
import "../adminStyle.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { DataGrid } from "@material-ui/data-grid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { publicRequest, userRequest } from "../../../requestMethods";
function AdminBlindAccessoriesLIst() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getProdcut = async () => {
      try {
        const response = await userRequest.get("/OperatingSystem/Accessories");
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
      "Are you sure you want to Delete this Accessorie?"
    );
    if (result) {
      userRequest
        .delete(`/OperatingSystem/Accessories/${id}`)
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

    {
      field: "AccessoriesName",
      headerName: "Accessories Name",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "AccessoriesCode",
      headerName: "Accessories Code",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "AdditionPrice",
      headerName: "Addition Price",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "BlindType",
      headerName: "Blind Type",
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
          <i className="fa fa-location-arrow icons"></i> Accessories
        </h1>
        <div className="productbtncontainer">
          <Link to="/admin/BlindAccessories/addBlindAccessories">
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

export default AdminBlindAccessoriesLIst;
