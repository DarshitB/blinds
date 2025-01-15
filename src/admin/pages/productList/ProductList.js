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
function AdminProductList() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getProdcut = async () => {
      try {
        const response = await userRequest.get("/product");
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
      "Are you sure you want to Delete this Product?"
    );
    if (result) {
      userRequest
        .delete(`/product/${id}`)
        .then((response) => window.location.reload())
        .catch((error) => {
          console.error("Error submitting form data:", error);
        });
    }
  };

  const columns = [
    { field: "id", headerName: "ID", Width: 50 },
    {
      field: "product",
      headerName: "Product",
      minWidth: 200,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              className="productListImg"
              src={`${baseUrlForMedia}images/febrickBlind/${params.row.img[0]}`}
              alt=""
            />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "In-Stock", minWidth: 160 },
    {
      field: "type",
      headerName: "Blind Type",
      minWidth: 160,
    },
    {
      field: "price",
      headerName: "Base Price",
      minWidth: 160,
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin/products/editProduct/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <div
              className="delate-button"
              onClick={() => handleDelete(params.row._id)}
            >
              <i className="fa fa-trash"></i>
            </div>
            {/* <DeleteOutline
                className="productListDelete"
                onClick={() => handleDelete(params.row.id)}
              /> */}
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
          <i className="fa fa-archive icons"></i> Products
        </h1>
        <div className="productbtncontainer">
          <Link to="/admin/products/productPrice">
            <button className="productAddButton">Product Price</button>
          </Link>
          <Link to="/admin/products/AddProduct">
            <button className="productAddButton">Add Product</button>
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

export default AdminProductList;
