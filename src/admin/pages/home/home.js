import React, { useEffect, useMemo, useState } from "react";
import "../adminStyle.css";
import AdminFeaturedInfo from "../../components/featuredInfo/featuredInfo";
import AdminChart from "../../components/chart/Chart";
import { userRequest } from "../../../requestMethods";
import { CircularProgress } from "@material-ui/core";
import UserChart from "../../components/userChart/userChart";
import { useDispatch } from "react-redux";
import { logOutfun } from "../../../redux/apiCalls";
function AdminHome() {
  const [loading, setLoading] = useState(true);
  const [orderstates, setorderstates] = useState([]);
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  const despatch = useDispatch();

  const handlelogout = async () => {
    await logOutfun(despatch);
    window.location.href = "/";
  };
  useEffect(() => {
    userRequest
      .get(`/orders/stats`)
      .then((response) => {
        setLoading(false);
        const Data = response.data.sort((a, b) => a._id - b._id);
        Data.map((items) => {
          setorderstates((prev) => [
            ...prev,
            { name: MONTHS[items._id - 1], Orders: items.total },
          ]);
        });
      })
      .catch((error) => {
        console.error(error.response.data);
        handlelogout();
      });
  }, [MONTHS]);

  return (
    <div className="home">
      <AdminFeaturedInfo />
      {loading ? (
        <div className="loadding-for-api-cases-analitics">
          <CircularProgress />
        </div>
      ) : (
        <AdminChart
          data={orderstates}
          title="Order Analytics"
          grid
          dataKey="Orders"
        />
      )}
      <UserChart />
    </div>
  );
}

export default AdminHome;
