import React, { useEffect } from "react";
import "../adminStyle.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { DataGrid } from "@material-ui/data-grid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { publicRequest, userRequest } from "../../../requestMethods";

function AdminCanceledOrder() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getProdcut = async () => {
      try {
        const response = await userRequest.get("/orders/Canceled");

        const ordersData = response.data;
        const ordersWithProducts = await Promise.all(
          ordersData.map(async (order) => {
            const productIds = order.produts;
            const productsData = await Promise.all(
              productIds.map(async (productId) => {
                const productResponse = await publicRequest.get(
                  `/product/find/${productId.productId}`
                );
                if (productId.productId === productResponse.data._id) {
                  return {
                    ...productResponse.data,
                    ...productId,
                  };
                }
                return productId;
              })
            );
            return { ...order, produts: productsData };
          })
        );
        const idadta = ordersWithProducts.map((item, index) => {
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

  const columns = [
    {
      field: "id",
      headerName: "ID",
      Width: 90,
      renderCell: (params) => {
        return params.row.id;
      },
    },

    {
      field: "Status",
      headerName: "Status",
      minWidth: 150,
      type: "actions",
      renderCell: (params) => {
        var statusvalue = params.row.orderStatus;
        var calssacourdingstatus = "";
        if (statusvalue === "PENDING") {
          calssacourdingstatus = "btn btn-warning btnpaddingadmin";
        } else if (statusvalue === "PROCESSING") {
          calssacourdingstatus = "btn btn-primary btnpaddingadmin";
        } else if (statusvalue === "SHIPPED") {
          calssacourdingstatus = "btn btn-info btnpaddingadmin";
        } else if (statusvalue === "COMPLETED") {
          calssacourdingstatus = "btn btn-success btnpaddingadmin";
        } else if (statusvalue === "CANCELED") {
          calssacourdingstatus = "btn btn-danger btnpaddingadmin";
        }
        return <span className={calssacourdingstatus}>{statusvalue}</span>;
      },
    },

    {
      field: "produts",
      headerName: "Produts Name",
      minWidth: 250,
      type: "actions",
      flex: 1,
      renderCell: (params) => {
        return (
          <div>
            {params.row.produts.map((indiproduct, index) => {
              return (
                <p key={index} style={{ margin: "0", lineHeight: "1.7" }}>
                  - {indiproduct.title}
                </p>
              );
            })}
          </div>
        );
      },
    },
    {
      field: "orderDate",
      headerName: "Order Date",
      minWidth: 160,
      renderCell: (params) => {
        return params.row.orderDate;
      },
    },
    {
      field: "paymentMethod",
      headerName: "Payment Type",
      minWidth: 170,
      renderCell: (params) => {
        return params.row.paymentMethod;
      },
    },
    {
      field: "amount",
      headerName: "Paid Amount",
      minWidth: 150,
      renderCell: (params) => {
        return <span> £ {params.row.amount}</span>;
      },
    },

    {
      field: "action",
      headerName: "Action",
      minWidth: 125,
      type: "actions",
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/orders/Order-Detailes/${params.row._id}`}>
              <div className="view-button">
                <i className="fa fa-eye"></i>
              </div>
            </Link>
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
          <i className="fa fa-cart-arrow-down icons"></i> Orders
        </h1>
        <div className="productbtncontainer">
          <Link to="/admin/All-orders">
            <button className="productAddButton">Orders</button>
          </Link>
          <Link to="/admin/orders/Completed-Orders">
            <button className="productCompleteButton">Completed Orders</button>
          </Link>
        </div>
      </div>
      <DataGrid
        rows={data}
        getRowHeight={() => "auto"}
        getEstimatedRowHeight={() => 200}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
      />
    </div>
  );
}

export default AdminCanceledOrder;
