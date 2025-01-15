import React, { useEffect } from "react";
import "../adminStyle.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { DataGrid } from "@material-ui/data-grid";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  publicRequest,
  userRequest,
  baseUrlForMedia,
} from "../../../requestMethods";
function AdminFebricLinks() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getProdcut = async () => {
      try {
        const response = await publicRequest.get("/Fabrics");
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

  const handleDelete = (id) => {
    const result = window.confirm(
      "Are you sure you want to Delete this Fabric? if yes then make sure this fabric will delete from all the products available."
    );
    if (result) {
      userRequest
        .delete(`/Fabrics/${id}`)
        .then((response) => window.location.reload())
        .catch((error) => {
          console.error("Error submitting form data:", error);
          console.log(error.response.data);
        });
    }
  };

  const columns = [
    { field: "id", headerName: "ID", Width: 50 },
    { field: "fabric", headerName: "fabric", minWidth: 150 },
    {
      field: "FabricName",
      headerName: "Fabric",
      minWidth: 200,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              className="productListImg"
              src={`${baseUrlForMedia}images/fabrics/${params.row.fabImg}`}
              alt=""
            />
            {params.row.fabricName}
          </div>
        );
      },
    },
    {
      field: "band",
      headerName: "Blind band",
      minWidth: 160,
    },
    {
      field: "type",
      headerName: "Blind Type",
      minWidth: 160,
    },

    {
      field: "action",
      headerName: "Action",
      minWidth: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin/Fabrics/editFabric/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <div
              className="delate-button"
              onClick={() => handleDelete(params.row._id)}
            >
              <i className="fa fa-trash"></i>
            </div>
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
          {" "}
          <i className="fa fa-clone icons"></i> Fabrics
        </h1>
        <div className="productbtncontainer">
          <Link to="/admin/Fabrics/addFabric/">
            <button className="productAddButton">Add Fabrics</button>
          </Link>
        </div>
      </div>

      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={100}
        checkboxSelection
      />
    </div>
  );
}

export default AdminFebricLinks;
