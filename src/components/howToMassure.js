import React from "react";
import { Link } from "react-router-dom";

function HowToMassure() {
  return (
    <>
      <div className="how-to-massure">
        <div className="massure-mox">
          <div className="masusre-img-container">
            <img src="/assets/img/massuring.jpeg" alt="" />
          </div>
          <div className="massure-datailes-container">
            <div className="massure-detaile-box position-relative">
              <div>
                <h2>Blinds Guides</h2>
                <p>
                  Have confidence completing your DIY project yourself. Simply
                  follow our handy step by step guides.
                </p>
                <Link to="/howToMeasure" style={{ color: "white" }}>
                  <button className="big-btn mr-4 ">How to Measure</button>
                </Link>
                <Link to="/HowtoInstall" style={{ color: "white" }}>
                  <button className="big-btn ">How to Install</button>
                </Link>
                <div className="overlat_num text-uppercase">Measure</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HowToMassure;
