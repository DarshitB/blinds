import React from "react";
import { Link } from "react-router-dom";
import { baseUrlForMedia } from "../requestMethods";
function Singleproduct({ item }) {
  return (
    <>
      <div
        className="col-xl-3 col-lg-4 col-md-6 col-6"
        style={{ padding: " 0 calc(1.5rem * 0.25)" }}
      >
        <div className="singuler-box-of-card">
          <Link to={`/blinds/${item._id}`}>
            <div className="img-wrap">
              <span className="badge badge-danger"> NEW </span>
              <img
                alt=""
                src={`${baseUrlForMedia}images/febrickBlind/${item.img[0]}`}
              />
              <div className="fix-height">
                <h5 className="m-0">{item.title}</h5>
                <p className="m-0">{item.type[0]} Blinds</p>
              </div>
            </div>
          </Link>
          <div className="info-wrap">
            {/* <div className="price-wrap my-2">
              <span className="price">£{item.price}</span> &nbsp;
              <del className="price-old">£19.80</del>
            </div> */}
            <Link to="/contactus" type="button" className="sample-order-btn">
              Order Free Sample
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Singleproduct;
