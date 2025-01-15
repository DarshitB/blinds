import React, { useEffect, useMemo, useState } from "react";
import "../../pages/adminStyle.css";
import AdminFeaturedInfo from "../../components/featuredInfo/featuredInfo";
import AdminChart from "../../components/chart/Chart";
import { userRequest } from "../../../requestMethods";
import { CircularProgress } from "@material-ui/core";
function UserChart() {
  const [loading, setLoading] = useState(true);
  const [orderstates, setorderstates] = useState([]);
  const [Growth, setGrowth] = useState(0);
  const [secondGrowth, setsecondGrowth] = useState(0);
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
  useEffect(() => {
    const runfunction = async () => {
      await userRequest
        .get(`/user/stats`)
        .then(async (response) => {
          setLoading(false);
          const Data = response.data.sort((a, b) => a.date - b.date);
          await Data.map((items) => {
            setorderstates((prev) => [
              ...prev,
              { name: MONTHS[items.month - 1], Users: items.total },
            ]);
          });
        })
        .catch((error) => console.error(error));
    };
    runfunction();
  }, [MONTHS]);
  useEffect(() => {
    if (orderstates.length < 2) {
      return;
    }
    const lastObject = orderstates[orderstates.length - 1];
    console.log("lastObject", lastObject);
    const secondlastObject = orderstates[orderstates.length - 2];
    console.log("secondlastObject", secondlastObject);
    const thirdlastlastObject = orderstates[orderstates.length - 3];
    console.log("thirdlastlastObject", thirdlastlastObject);
    setGrowth((lastObject.Users * 100) / secondlastObject.Users - 100);
    setsecondGrowth(
      (secondlastObject.Users * 100) / thirdlastlastObject.Users - 100
    );
  }, [orderstates]);

  if (loading) {
    return (
      <div className="loadding-for-api-cases-analitics">
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className="user-data-analitics-wrapper">
      <div className="container m-0">
        <div className="row m-0">
          <div className="col-md-4 p-0">
            <div className="user-analitics-container">
              <div
                className={
                  Growth < 0
                    ? "featuredItemuser alert alert-danger mb-4"
                    : "featuredItemuser alert alert-success mb-4"
                }
              >
                <span className="featuredTitle">New Users Growth</span>
                <div className="featuredMoneyContainer">
                  <span className="featuredMoney">{Math.floor(Growth)}%</span>
                </div>
                <span className="featuredSub">Compared to last month</span>
              </div>
              <div
                className={
                  secondGrowth < 0
                    ? "featuredItemuser alert alert-danger"
                    : "featuredItemuser alert alert-success"
                }
              >
                <span className="featuredTitle">New Users Growth</span>
                <div className="featuredMoneyContainer">
                  <span className="featuredMoney">
                    {Math.floor(secondGrowth)}%
                  </span>
                </div>
                <span className="featuredSub">
                  Compared to last to last month
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-8 p-0">
            <AdminChart
              data={orderstates}
              title="User Analytics"
              grid
              dataKey="Users"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserChart;
