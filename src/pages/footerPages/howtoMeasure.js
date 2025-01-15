import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { Collapse } from "antd";
const { Panel } = Collapse;
function HowtoMeasurePage() {
  const srolllocation = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [srolllocation]);
  return (
    <>
      <div className="footerpage-wrapper">
        <Navbar />
        <section className="section-pagetop">
          <div className="container-fluid mainhedof-productlist">
            <h2>How To Measure</h2>
          </div>
        </section>
        <div className="howtoMessure-wrapper">
          <div className="howtoMessure-container">
            <div
              className="howtoMessure-addition-information"
              style={{ marginBottom: "20px" }}
            >
              <h4 className="m-0">
                Proper measurements are the key to achieving a flawless fit for
                your blinds. Follow these simple steps to ensure precise
                measurements:
              </h4>
            </div>
          </div>
          <div className="howtoMessure-container">
            <div className="howtoMessure-points">
              <div className="points-step">
                <h1>1</h1>
              </div>
              <div className="points-description">
                <p>
                  <b> Gather your tools : </b>
                  Grab a metal measuring tape, pencil, and a notepad to record
                  your measurements.
                </p>
              </div>
            </div>
            <div className="howtoMessure-points">
              <div className="points-step">
                <h1>2</h1>
              </div>
              <div className="points-description">
                <p>
                  <b>Decide on inside or outside mount : </b>
                  Determine whether you want your blinds to fit inside the
                  window frame or outside on the wall.
                </p>
              </div>
            </div>

            <div className="howtoMessure-points">
              <div className="points-step">
                <h1>3</h1>
              </div>
              <div className="points-description">
                <p>
                  <b>Inside mount measurements : </b>
                  Measure the width at the top, middle, and bottom of the
                  window. Note down the narrowest width. Next, measure the
                  height from the top to the sill or desired length.
                </p>
              </div>
            </div>
            <div className="howtoMessure-points">
              <div className="points-step">
                <h1>4</h1>
              </div>
              <div className="points-description">
                <p>
                  <b>Outside mount measurements : </b>
                  Measure the width and height of the window area you want to
                  cover. Add extra inches for overlap and desired coverage.
                </p>
              </div>
            </div>
            <div className="howtoMessure-points">
              <div className="points-step">
                <h1>5</h1>
              </div>
              <div className="points-description">
                <p>
                  <b>Double-check and confirm : </b>
                  Take a final look at your measurements to ensure accuracy
                  before placing your order.
                </p>
              </div>
            </div>
          </div>
          <div className="howtoMessure-container">
            <div className="howtoMessure-addition-information">
              <p>
                Remember, it's always best to consult with our experts for
                professional guidance and advice on measuring blinds for your
                specific window types.
              </p>
              <p className="mb-0">
                Achieve the perfect fit and elevate your space with custom-made
                blinds. Start your measurement journey today!
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default HowtoMeasurePage;
