import React, { useEffect } from "react";
import "../adminStyle.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { DataGrid } from "@material-ui/data-grid";
import { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { publicRequest, userRequest } from "../../../requestMethods";
import { WrapText } from "@material-ui/icons";
import Loader from "../../../components/loader";
function AdminOrdersDetailes() {
  const history = useHistory();
  const location = useLocation();
  const id = location.pathname.split("/")[4];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ShowLoader, setShowLoader] = useState(false);
  const [Trackshow, setTrackshow] = useState(true);
  const [ordeSetus, setordeSetus] = useState("");
  const [ordeSetusBg, setordeSetusBg] = useState("");
  const [ordeSetusheadding, setordeSetusheadding] = useState("");
  const [DesabalingonComplateorCancel, setDesabalingonComplateorCancel] =
    useState(false);
  useEffect(() => {
    const getProdcut = async () => {
      try {
        const response = await publicRequest.get(`/orders/findSingle/${id}`);
        const ordersData = response.data;
        const productIds = ordersData.produts;
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
        const userdetsilesarray = [];
        const userdetsiles = publicRequest
          .get(`/user/find/${ordersData.userId}`)
          .then((response) => {
            userdetsilesarray.push(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
        const productsDatawithid = productsData.map((item, index) => {
          const id = index + 1;
          return { ...item, id };
        });
        ordersData.userData = userdetsilesarray;
        ordersData.produts = productsDatawithid;

        if (ordersData.orderStatus === "PENDING") {
          setordeSetusBg("rgba(255, 193, 7,0.12)");
          setordeSetusheadding("rgba(255, 193, 7,1)");
          setDesabalingonComplateorCancel(false);
          setTrackshow(true);
        } else if (ordersData.orderStatus === "PROCESSING") {
          setordeSetusBg("rgba(0, 123, 255,0.12)");
          setordeSetusheadding("rgba(0, 123, 255,1)");
          setDesabalingonComplateorCancel(false);
          setTrackshow(true);
        } else if (ordersData.orderStatus === "SHIPPED") {
          setordeSetusBg("rgba(23, 162, 184,0.12)");
          setordeSetusheadding("rgba(23, 162, 184,1)");
          setDesabalingonComplateorCancel(false);
          setTrackshow(false);
        } else if (ordersData.orderStatus === "COMPLETED") {
          setordeSetusBg("rgba(40, 167, 69,0.15)");
          setordeSetusheadding("rgba(40, 167, 69,1)");
          setDesabalingonComplateorCancel(true);
          setTrackshow(true);
        } else if (ordersData.orderStatus === "CANCELED") {
          setordeSetusBg("rgba(220, 53, 69,0.1)");
          setordeSetusheadding("rgba(220, 53, 69,1)");
          setDesabalingonComplateorCancel(true);
          setTrackshow(true);
        }
        setordeSetus(ordersData.orderStatus);
        setData(ordersData);
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
      headerName: "Orders",
      Width: 90,
      renderCell: (params) => {
        return params.row.id;
      },
    },
    {
      field: "Drop",
      headerName: "Drop",
      Width: 90,
      renderCell: (params) => {
        return params.row.Drop;
      },
    },
    {
      field: "Width",
      headerName: "Width",
      Width: 90,
      renderCell: (params) => {
        return params.row.Width;
      },
    },
    {
      field: "type",
      headerName: "Blind Type",
      Width: 150,
      renderCell: (params) => {
        return params.row.type;
      },
    },
    {
      field: "FabricOption",
      headerName: "Fabric",
      minWidth: 150,
      renderCell: (params) => {
        return params.row.FabricOption;
      },
    },
    {
      field: "ControlOption",
      headerName: "Control Option",
      minWidth: 150,
      renderCell: (params) => {
        return params.row.ControlOption;
      },
    },
    {
      field: "Track",
      headerName: "Track",
      minWidth: 150,
      renderCell: (params) => {
        return params.row.Track || "-";
      },
    },
    {
      field: "pleatSize",
      headerName: "pleat Size",
      minWidth: 150,
      renderCell: (params) => {
        return params.row.pleatSize || "-";
      },
    },
    /*  {
      field: "Headrail",
      headerName: "Headrail",
      minWidth: 150,
      renderCell: (params) => {
        return params.row.Headrail || "-";
      },
    }, */
    {
      field: "OneTouchUpSystem",
      headerName: "One Touch Up System",
      minWidth: 150,
      renderCell: (params) => {
        return params.row.OneTouchUpSystem || "-";
      },
    },
    {
      field: "PlainCassette",
      headerName: "Plain Cassette",
      minWidth: 150,
      renderCell: (params) => {
        return params.row.PlainCassette || "-";
      },
    },
    {
      field: "ChainControl",
      headerName: "Chain Control",
      minWidth: 150,
      renderCell: (params) => {
        return params.row.ChainControl || "-";
      },
    },
    {
      field: "OpeningDirection",
      headerName: "Opening Direction",
      minWidth: 150,
      renderCell: (params) => {
        return params.row.OpeningDirection || "-";
      },
    },
    {
      field: "MountingBracket",
      headerName: "Mounting Bracket",
      minWidth: 150,
      renderCell: (params) => {
        return params.row.MountingBracket || "-";
      },
    },
    {
      field: "BallChainHook",
      headerName: "Ball Chain Hook",
      minWidth: 150,
      renderCell: (params) => {
        return params.row.BallChainHook || "-";
      },
    },
    {
      field: "MetelBallChain",
      headerName: "Metel Ball Chain",
      minWidth: 150,
      renderCell: (params) => {
        return params.row.MetelBallChain || "-";
      },
    },
    {
      field: "DecoraruveCassette",
      headerName: "Decorative Cassette",
      minWidth: 150,
      renderCell: (params) => {
        return params.row.DecoraruveCassette || "-";
      },
    },
    {
      field: "AddSystem",
      headerName: "Add On System",
      minWidth: 150,
      renderCell: (params) => {
        return params.row.AddSystem || "-";
      },
    },
    {
      field: "ClutchOperating",
      headerName: "Clutch Operating",
      minWidth: 150,
      renderCell: (params) => {
        return params.row.ClutchOperating || "-";
      },
    },

    {
      field: "DayNight",
      headerName: "Day Night",
      minWidth: 150,
      renderCell: (params) => {
        return params.row.DayNight || "-";
      },
    },
    {
      field: "TopDownBottomUpSystem",
      headerName: "Top Down Bottom Up System",
      minWidth: 150,
      renderCell: (params) => {
        return params.row.TopDownBottomUpSystem || "-";
      },
    },
    {
      field: "OneTouchDownSystem",
      headerName: "One Touch Down System",
      minWidth: 150,
      renderCell: (params) => {
        return params.row.OneTouchDownSystem || "-";
      },
    },
    {
      field: "MotorisedBottomDownSystem",
      headerName: "Motorised Bottom Down System",
      minWidth: 150,
      renderCell: (params) => {
        return params.row.MotorisedBottomDownSystem || "-";
      },
    },
    {
      field: "LiningOption",
      headerName: "Lining Option",
      minWidth: 150,
      renderCell: (params) => {
        return params.row.LiningOption || "-";
      },
    },
    {
      field: "OperatingSystem",
      headerName: "Operating System",
      type: "actions",
      minWidth: 350,
      renderCell: (params) => {
        return (
          <>
            {params.row.OperatingSystem ? (
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <span style={{ lineHeight: "1.5" }}>
                  Accessories:{" "}
                  <span style={{ fontWeight: "700" }}>
                    {params.row.OperatingSystem[0].Accessories || "no"}
                  </span>{" "}
                  ,{" "}
                </span>
                <span style={{ lineHeight: "1.5" }}>
                  Motor:{" "}
                  <span style={{ fontWeight: "700" }}>
                    {params.row.OperatingSystem[0].Motorised || "no"}
                  </span>{" "}
                  ,
                </span>
                <span style={{ lineHeight: "1.5" }}>
                  Remote:{" "}
                  <span style={{ fontWeight: "700" }}>
                    {params.row.OperatingSystem[0].Remote || "no"}
                  </span>
                </span>
              </div>
            ) : (
              "-"
            )}
          </>
        );
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      minWidth: 120,
      renderCell: (params) => {
        return params.row.quantity;
      },
    },
  ];

  let filteredColumns = columns;
  const fieldsToCheck = [
    "ControlOption",
    /*     "Headrail",
     */ "OneTouchUpSystem",
    "PlainCassette",
    "AddSystem",
    "pleatSize",
    "Track",
    "ChainControl",
    "OpeningDirection",
    "MountingBracket",
    "BallChainHook",
    "MetelBallChain",
    "DecoraruveCassette",
    "ClutchOperating",
    "MotorisedBottomDownSystem",
    "DayNight",
    "TopDownBottomUpSystem",
    "OneTouchDownSystem",
    "LiningOption",
    "OperatingSystem",
  ];
  if (data.produts && data.produts.length > 0) {
    fieldsToCheck.forEach((field) => {
      const hasField = data.produts.some((product) => product[field]);
      if (!hasField) {
        filteredColumns = filteredColumns.filter(
          (column) => column.field !== field
        );
      }
    });
  }

  const handelOrderStatus = (e) => {
    const checkNotAccidet = window.confirm(
      `Are you sure you want to Update order status? selected order status is : "${e.target.value}"`
    );
    if (checkNotAccidet) {
      userRequest
        .patch(
          `/orders/UpdateStatus?Orderid=${data._id}&UdateStatus=${e.target.value}`
        )
        .then((response) => {
          if (e.target.value === "COMPLETED" || e.target.value === "CANCELED") {
            history.push("/admin/products-list");
          } else {
            window.location.reload();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      e.target.value = ordeSetus; // Prevents the change in the select option tag
      return;
    }
  };
  const [trackLink, setTrackLink] = useState("");
  const [trackId, setTrackId] = useState("");
  const handeltrackLink = (e) => {
    setTrackLink(e.target.value);
  };
  const handeltrackid = (e) => {
    setTrackId(e.target.value);
  };
  const handelTracksubmit = (e) => {
    if (trackLink !== "" && trackId !== "") {
      setShowLoader(true);
      userRequest
        .patch(
          `/orders/UpdateTrack?Orderid=${data._id}&trackLink=${trackLink}&trackId=${trackId}`
        )
        .then((response) => {
          setShowLoader(false);
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("some of the filed is still empty fill that first.");
      setShowLoader(false);
    }
  };
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
          <i className="fa fa-cart-arrow-down icons"></i> Orders Details
        </h1>
      </div>
      <div className="MainWrapper-for-order-detailes">
        <div
          className="main-detailes-oforders"
          style={{ backgroundColor: ordeSetusBg }}
        >
          <div className="ganeral-detailes-order main-detailes-inner">
            <h4 style={{ color: ordeSetusheadding }}>General details</h4>
            <div className="filed-box">
              <div className="inner-col">
                <label htmlFor="orderId">Order Id:</label>
                <input
                  className="searchbox fullborderinput"
                  type="text"
                  value={data._id}
                  name="orderId"
                  id="orderId"
                  disabled
                />
              </div>
            </div>
            <div className="filed-box">
              <div className="inner-col">
                <label htmlFor="orderdate">Order Date:</label>
                <input
                  className="searchbox fullborderinput"
                  type="text"
                  value={data.orderDate}
                  name="orderdate"
                  id="orderdate"
                  disabled
                />
              </div>
            </div>
            <div className="filed-box">
              <div className="inner-col">
                <label htmlFor="orderdate">Order Status:</label>
                <select
                  className="searchbox fullborderinput"
                  defaultValue={ordeSetus}
                  onChange={handelOrderStatus}
                  disabled={DesabalingonComplateorCancel}
                >
                  <option value="PENDING">Pending</option>
                  <option value="PROCESSING">Processing</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELED">Canceled</option>
                </select>
              </div>
            </div>
            <div className="filed-box">
              <div className="inner-col">
                <label htmlFor="orderdate">Track Link:</label>
                <input
                  className="searchbox fullborderinput"
                  type="text"
                  name="AddTrackLink"
                  id="AddTrackLink"
                  placeholder="Add Track Link"
                  defaultValue={data.orderTrackLink}
                  onChange={handeltrackLink}
                  disabled={Trackshow}
                />
              </div>
            </div>
            <div className="filed-box">
              <div className="inner-col">
                <label htmlFor="orderdate">Track Id:</label>
                <input
                  className="searchbox fullborderinput"
                  type="text"
                  name="AddTrackId"
                  id="AddTrackId"
                  placeholder="Add Track Id"
                  defaultValue={data.orderTrackId}
                  onChange={handeltrackid}
                  disabled={Trackshow}
                />
              </div>
            </div>
            <div className="filed-box">
              <div className="inner-col">
                <button
                  className="btn btn-success"
                  type="submit"
                  disabled={Trackshow}
                  onClick={handelTracksubmit}
                  name="submit"
                  id="submit"
                  style={{ width: "calc(100% - 10px)" }}
                >
                  {ShowLoader ? <Loader /> : "Add Track Details"}
                </button>
              </div>
            </div>
          </div>
          <div className="address-detailes-order main-detailes-inner">
            <h4 style={{ color: ordeSetusheadding }}>Shipping Address</h4>
            <div className="address-detailes">
              <label>Address:</label>
              <p>
                {data.ShippingAddress[0].FirstName}{" "}
                {data.ShippingAddress[0].LastName}
              </p>
              <p>{data.ShippingAddress[0].Address}</p>
              <p>
                {data.ShippingAddress[0].City} -{" "}
                {data.ShippingAddress[0].Postcode}
              </p>
            </div>
            <div className="address-detailes">
              <label>Phone Number:</label>
              <p>{data.ShippingAddress[0].PhoneNo}</p>
            </div>
            <div className="address-detailes">
              <label>Email:</label>
              <p>{data.ShippingAddress[0].Email}</p>
            </div>
            <h4 style={{ color: ordeSetusheadding }}>Installation Service</h4>
            <div className="d-flex">
              <div className="address-detailes instalattionservice-left">
                <label>Installation Area:</label>
                <p>
                  {data.installationServices[0].installationArea ||
                    "Not Reqested"}
                </p>
              </div>
              <div className="address-detailes instalattionservice-right">
                <label>Appointment date:</label>
                <p>
                  {data.installationServices[0].Appointment || "Not Reqested"}
                </p>
              </div>
            </div>
          </div>
          <div className="otherServices-detailes-order main-detailes-inner">
            <h4 style={{ color: ordeSetusheadding }}>Billing Address</h4>
            <div className="address-detailes">
              <label>Address:</label>
              <p>
                {data.BillingAddress[0].FirstName}{" "}
                {data.BillingAddress[0].LastName}
              </p>
              <p>{data.BillingAddress[0].Address}</p>
              <p>
                {data.BillingAddress[0].City} -{" "}
                {data.BillingAddress[0].Postcode}
              </p>
            </div>
            <div className="address-detailes">
              <label>Phone Number:</label>
              <p>{data.BillingAddress[0].PhoneNo}</p>
            </div>
            <div className="address-detailes">
              <label>Email:</label>
              <p>{data.BillingAddress[0].Email}</p>
            </div>
            <h4 className="mt-2" style={{ color: ordeSetusheadding }}>
              Shipping Method -{" "}
              <span style={{ color: "#198754" }}>{data.shipingMathod}</span>
            </h4>

            {/* <h4>User Information</h4>
            <div className="address-detailes">
              <label>Username:</label>
              <p>{data.userData[0]?.username}</p>
            </div> */}
          </div>
        </div>
      </div>
      <h5 className="mb-3 ">
        <i className="fa fa-cart-arrow-down icons"></i>{" "}
        <span style={{ fontWeight: "600" }}>Orderd Products</span>
      </h5>
      <div className="MainWrapper-for-order-items">
        <DataGrid
          rows={data.produts}
          disableSelectionOnClick
          columns={filteredColumns}
          pageSize={10}
          /*           checkboxSelection
           */
        />
      </div>
    </div>
  );
}

export default AdminOrdersDetailes;
