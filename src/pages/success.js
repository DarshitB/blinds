import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { emptyCart } from "../redux/cartRedux";
import { publicRequest } from "../requestMethods";
function Success() {
  const history = useHistory();
  const location = useLocation();
  const [loadding, setloadding] = useState(true);
  const paypal = location.state.paypalData;
  console.log(paypal);
  const cart = location.state.order;
  const user = useSelector((state) => state.user.currentUser);
  const token = user.accessToken;
  const config = {
    headers: { token: `Bearer ${token}` },
  };
  const dispatch = useDispatch();

  useEffect(() => {
    const createorder = async () => {
      try {
        const response = await publicRequest.post(`/orders`, cart, config);
        if (response.status === 200) {
          const cartempty = dispatch(emptyCart());
          setloadding(false);
        }
      } catch (err) {
        console.log(err);
        history.push("/cart");
      }
    };
    cart && createorder();
  }, [paypal, cart]);
  return (
    <div>
      {loadding ? (
        <div className="loadding-for-order-placed">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="sucess-header">
            <img src="/assets/img/logobgw.png" className="sucess-logo" alt="" />
          </div>
          <div className="ordrder-confirmation">
            <div className="container-fluid px-5 py-4">
              <div className="row justify-content-center align-items-center">
                <div className="col-md-8">
                  <div className="order-confirmd-box">
                    <img
                      className="loading-image"
                      src="/assets/img/confirm-order.gif"
                    />
                    <h1 className="text-center">Your Order is Confirmed.</h1>
                    <h5 className="text-center">
                      Thank you for your purchasing!
                    </h5>
                    <Link to="/blindlist">Continue Shopping</Link>
                  </div>
                  <div className="product-detailes">
                    <div className="product-main-detailes">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="order-detailes">
                            <span>order Date</span>
                            <p>{cart.orderDate}</p>
                          </div>
                        </div>
                        {/* <div className="col-md-3">
                      <div className="order-detailes">
                        <span>order Id</span>
                        <p>{cart.orderDate}</p>
                      </div>
                    </div> */}
                        <div className="col-md-4">
                          <div className="order-detailes">
                            <span>payment method</span>
                            <p>{cart.paymentMethod}</p>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="order-detailes">
                            <span>shipping address</span>
                            <p>{cart.ShippingAddress[0].Address}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Success;
