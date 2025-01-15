import React, { useEffect, useState } from "react";
import "./featuredInfo.css";
import { userRequest } from "../../../requestMethods";
import { CircularProgress } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { logOutfun } from "../../../redux/apiCalls";

function AdminFeaturedInfo() {
  const [revanue, setRevanue] = useState([]);
  const [orderstates, setorderstates] = useState([]);
  const [PercThisMonth, setPercThisMonth] = useState(0);
  const [PercLastMonth, setPercLastMonth] = useState(0);
  const [PercOrders, setPercOrders] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([
      userRequest.get(`/orders/revanue`),
      userRequest.get(`/orders/stats`),
    ])
      .then((responses) => {
        setLoading(false);
        const revanueData = responses[0].data.sort((a, b) => a._id - b._id);
        setRevanue(revanueData);
        console.log("revanueData", revanueData);
        if (revanueData[2]) {
          setPercThisMonth(
            (revanueData[2].total * 100) / revanueData[1].total - 100
          );
        } else {
          setPercThisMonth(0);
        }
        if (revanueData[1]) {
          setPercLastMonth(
            (revanueData[1].total * 100) / revanueData[0].total - 100
          );
        } else {
          setPercLastMonth(2);
        }
        const stateData = responses[1].data.sort((a, b) => a._id - b._id);
        setorderstates(stateData);
        setPercOrders((stateData[1].total * 100) / stateData[0].total - 100);
      })
      .catch((error) => {
        console.log(error.responses.data);
        handlelogout();
      });
  }, []);

  const despatch = useDispatch();

  const handlelogout = async () => {
    await logOutfun(despatch);
    window.location.href = "/";
  };
  if (loading) {
    return (
      <div className="loadding-for-api-cases-analitics">
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className="featured">
      <div
        className={
          PercLastMonth < 0
            ? "featuredItem alert alert-danger"
            : "featuredItem alert alert-success"
        }
      >
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            £{revanue[1]?.total.toFixed(2) || "---"}
          </span>
          <span
            className="featuredMoneyRate"
            style={PercLastMonth < 0 ? { color: "red" } : { color: "green" }}
          >
            <i
              className={
                PercLastMonth < 0 ? "fa fa-arrow-down" : "fa fa-arrow-up"
              }
            ></i>{" "}
            &nbsp;&nbsp;
            {Math.floor(PercLastMonth)}%
          </span>
        </div>
        <span className="featuredSub">Compared to last to last month</span>
      </div>
      <div
        className={
          PercThisMonth < 0
            ? "featuredItem alert alert-danger"
            : "featuredItem alert alert-success"
        }
      >
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            £{revanue[2]?.total.toFixed(2) || "---"}
          </span>
          <span
            className="featuredMoneyRate"
            style={PercThisMonth < 0 ? { color: "red" } : { color: "green" }}
          >
            <i
              className={
                PercThisMonth < 0 ? "fa fa-arrow-down" : "fa fa-arrow-up"
              }
            ></i>{" "}
            &nbsp;&nbsp;
            {Math.floor(PercThisMonth)}%
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem alert alert-primary">
        <span className="featuredTitle">Orders</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{orderstates[2]?.total}</span>
          <span
            className="featuredMoneyRate"
            style={PercThisMonth < 0 ? { color: "red" } : { color: "green" }}
          >
            <i
              className={
                PercThisMonth < 0 ? "fa fa-arrow-down" : "fa fa-arrow-up"
              }
            ></i>{" "}
            &nbsp;&nbsp;{Math.floor(PercOrders)}%
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}

export default AdminFeaturedInfo;
