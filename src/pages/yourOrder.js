import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/navbar";
import { baseUrlForMedia, publicRequest, userRequest } from "../requestMethods";
import { Link, useHistory } from "react-router-dom";
import Skeliton from "../components/loadingSkeleton/Skeliton";
function YourOrder() {
  const history = useHistory();
  const [orders, setOrder] = useState([]);
  const [IsLoaded, setIsLoaded] = useState(true);
  const [dataisComming, setDataisComming] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const id = user._id;
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await publicRequest.get(`/orders/find/${id}`);
        if (response.data.length !== 0) {
          setDataisComming(false);
        } else {
          setDataisComming(true);
        }
        const ordersData = response.data;
        const productdato = [];
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
            setIsLoaded(false);
            return { ...order, produts: productsData };
          })
        );
        setOrder(ordersWithProducts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrderData();
  }, [id]);
  return (
    <>
      <div className="Your-order-wrapper">
        <Navbar />
        <div className="Your-all-order">
          <section className="section-pagetop">
            <div className="container-fluid mainhedof-productlist">
              <h2>Your Orders</h2>
              <button
                onClick={() => history.goBack()}
                className="big-btn bakbutton"
              >
                back
              </button>
            </div>
          </section>
          <div className="container-fluid">
            <div className="row justify-content-center align-items-center">
              <div className="col-md-11 col-lg-9 col-xl-8">
                {dataisComming ? (
                  <>
                    <div
                      className="container-fluid mainhedof-productlist d-flex flex-column justify-content-center align-items-center"
                      style={{ height: "80vh" }}
                    >
                      <h2>You haven't ordered anything yet, let's order...</h2>
                      <Link to="/blindlist" className="noproductincart">
                        let's order
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    {IsLoaded ? (
                      <Skeliton type="Orderedproduct" />
                    ) : (
                      <>
                        {orders.map((orders) => (
                          <div className="product-wraper" key={orders._id}>
                            <div className="order-id-n-dtiles">
                              <h2 className="mb-0 mr-3">
                                <span>Order Id : </span>
                                {orders._id}
                              </h2>
                              <div className="order-id-n-dtiles-inner">
                                <p className="m-0">
                                  <span>Order Status : </span>
                                  <span
                                    className={
                                      orders.orderStatus === "PENDING"
                                        ? "bg-warning text-dark"
                                        : orders.orderStatus === "PROCESSING"
                                        ? "bg-primary text-white"
                                        : orders.orderStatus === "SHIPPED"
                                        ? "bg-info text-white"
                                        : orders.orderStatus === "COMPLETED"
                                        ? "bg-success text-white"
                                        : orders.orderStatus === "CANCELED"
                                        ? "bg-danger text-white"
                                        : ""
                                    }
                                    style={{
                                      padding: "2px 10px",
                                      borderRadius: "8px",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {orders.orderStatus}
                                  </span>
                                </p>
                                <p className="m-0">
                                  <span>Order Date: </span>
                                  {orders.orderDate}
                                </p>
                                <p className="m-0 EstimatedDelivary">
                                  <span>Estimated Delivary : </span>
                                  {orders.deliveryDate}
                                </p>
                              </div>
                            </div>
                            <div className="all-products-orderd">
                              {orders.produts.map((products) => (
                                <div
                                  key={products._id}
                                  className="product-main-container"
                                >
                                  <div className="product-main-wrapper">
                                    <div className="product-order-image-container">
                                      <img
                                        alt=""
                                        src={`${baseUrlForMedia}images/febrickBlind/${products.img[0]}`}
                                      />
                                    </div>
                                    <div className="product-order-detailes-container">
                                      <h4 className="mb-1">{products.title}</h4>
                                      <p className="m-0 text-capitalize">
                                        <span>Width :</span> {products.Width} MM
                                        | <span>Drop :</span> {products.Drop} MM
                                        |
                                        {products.type === "Colby" ? (
                                          <>
                                            <span>Pleat Size :</span>{" "}
                                            {products.pleatSize} |{" "}
                                          </>
                                        ) : (
                                          ""
                                        )}
                                        {products.type === "Panel" ? (
                                          <>
                                            <span>Track :</span>{" "}
                                            {products.Track} |{" "}
                                          </>
                                        ) : (
                                          ""
                                        )}
                                        {products.type !== "Roman Skylight" &&
                                        products.type !== "Colby Skylight" ? (
                                          <>
                                            <span>Control Option :</span>{" "}
                                            {products.ControlOption} |{" "}
                                          </>
                                        ) : (
                                          ""
                                        )}
                                        <span>Fabric Option :</span>{" "}
                                        {products.FabricOption} |{" "}
                                        {products.type === "Vertical" ||
                                        products.type === "Sierra" ||
                                        products.type === "Panel" ? (
                                          <>
                                            <span>Chain Control :</span>{" "}
                                            {products.ChainControl} |{" "}
                                            <span>Opening Direction :</span>{" "}
                                            {products.OpeningDirection} |{" "}
                                          </>
                                        ) : (
                                          ""
                                        )}
                                        {products.type !== "Roman Skylight" &&
                                        products.type !== "Colby Skylight" ? (
                                          <>
                                            <span>Mounting Bracket :</span>{" "}
                                            {products.MountingBracket} |{" "}
                                            <span>Ball Chain Hanger :</span>{" "}
                                            {products.BallChainHook} |{" "}
                                            {products.type !== "Wooden" &&
                                            products.type !== "Aric" ? (
                                              <>
                                                <span>Metel Ball Chain :</span>{" "}
                                                {products.MetelBallChain} |{" "}
                                              </>
                                            ) : (
                                              ""
                                            )}
                                          </>
                                        ) : (
                                          ""
                                        )}
                                        {products.type === "Roller" ? (
                                          <>
                                            {/*  <span>One Touch Up System :</span>{" "}
                                            {products.OneTouchUpSystem} |{" "}
                                              <span>Headrail :</span>{" "}
                                            {products.Headrail} |{" "} 
                                            <span>Plain Cassette :</span>{" "}
                                            {products.PlainCassette} |{" "}*/}
                                            <span>Add on System :</span>{" "}
                                            {products.AddSystem} |{" "}
                                          </>
                                        ) : (
                                          ""
                                        )}
                                        {products.type === "Meliso" ||
                                        products.type === "Luzon" ||
                                        products.type === "Dorren" ||
                                        products.type === "Grayson" ? (
                                          <>
                                            <span>Decoraruve Cassette :</span>{" "}
                                            {products.DecoraruveCassette} |{" "}
                                          </>
                                        ) : (
                                          ""
                                        )}
                                        {products.type === "Colby" ? (
                                          <>
                                            <span>
                                              Clutch Operating System :
                                            </span>{" "}
                                            {products.ClutchOperating} |{" "}
                                            <span>Day & Night :</span>{" "}
                                            {products.DayNight} |{" "}
                                            <span>
                                              Top Down Bottom Up System :
                                            </span>{" "}
                                            {products.TopDownBottomUpSystem} |{" "}
                                            <span>
                                              Motorised Bottom Down System :
                                            </span>{" "}
                                            {products.MotorisedBottomDownSystem}{" "}
                                            |{" "}
                                          </>
                                        ) : (
                                          ""
                                        )}
                                        {products.type === "Roman" ? (
                                          <>
                                            <span>One Touch Down System :</span>{" "}
                                            {products.OneTouchDownSystem} |{" "}
                                            <span>Lining Option :</span>{" "}
                                            {products.LiningOption} |{" "}
                                          </>
                                        ) : (
                                          ""
                                        )}
                                        {products.type !== "Aric" ? (
                                          <>
                                            <span>{"Operating System"} :</span>{" "}
                                            Motor -{" "}
                                            {
                                              products.OperatingSystem[0]
                                                .Motorised
                                            }{" "}
                                            , RemoteHead -{" "}
                                            {products.OperatingSystem[0].Remote}
                                            {products.type !==
                                              "Roman Skylight" &&
                                            products.type !==
                                              "Colby Skylight" ? (
                                              <>
                                                , Accessories -{" "}
                                                {
                                                  products.OperatingSystem[0]
                                                    .Accessories
                                                }
                                              </>
                                            ) : (
                                              ""
                                            )}
                                          </>
                                        ) : (
                                          ""
                                        )}
                                      </p>
                                    </div>
                                    <div className="product-order-pricequntty-container">
                                      <h4>Qty :</h4>
                                      <p>
                                        {" "}
                                        {String(products.quantity).padStart(
                                          3,
                                          "0"
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {orders.orderTrackLink && orders.orderTrackId ? (
                              <div className="Tracking-wrapper">
                                <div className="Tracking-wrapper-inner">
                                  <div className="Tracking-link">
                                    <h5>Tracking Url</h5>
                                    <a
                                      href={orders.orderTrackLink}
                                      target="_blank"
                                    >
                                      {orders.orderTrackLink}
                                    </a>
                                  </div>
                                  <div className="Tracking-link">
                                    <h5>Tracking Id</h5>
                                    <p>{orders.orderTrackId}</p>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {orders.orderStatus === "COMPLETED" ? (
                              <a
                                href={`/yourorder/Invoice/${orders._id}`}
                                target="_blank"
                              >
                                <div className="inviceBtn_link">
                                  <button className="big-btn inviceBtn">
                                    Invoice
                                  </button>
                                </div>
                              </a>
                            ) : (
                              ""
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default YourOrder;
