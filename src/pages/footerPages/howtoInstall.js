import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { Collapse } from "antd";
const { Panel } = Collapse;
function HowtoInstallPage() {
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
            <h2>How To Install</h2>
          </div>
        </section>
        <div className="howtoMessure-wrapper">
          <div className="howtoMessure-container">
            <div
              className="howtoMessure-addition-information"
              style={{ marginBottom: "20px" }}
            >
              <h4 className="m-0">
                Ready to bring your new blinds to life? Follow these
                step-by-step instructions for a seamless installation process:
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
                  Make sure you have a drill, screws, measuring tape, level, and
                  a pencil handy.
                </p>
              </div>
            </div>
            <div className="howtoMessure-points">
              <div className="points-step">
                <h1>2</h1>
              </div>
              <div className="points-description">
                <p>
                  <b>Prepare the area : </b>
                  Clean the window frame or wall where you'll be installing the
                  blinds. Remove any obstructions or old hardware.
                </p>
              </div>
            </div>

            <div className="howtoMessure-points">
              <div className="points-step">
                <h1>3</h1>
              </div>
              <div className="points-description">
                <p>
                  <b>Positioning : </b>
                  Determine whether you'll be mounting the blinds inside or
                  outside the window frame. Mark the desired placement with a
                  pencil.
                </p>
              </div>
            </div>
            <div className="howtoMessure-points">
              <div className="points-step">
                <h1>4</h1>
              </div>
              <div className="points-description">
                <p>
                  <b>Install brackets : </b>
                  Using a level, position and secure the brackets to the window
                  frame or wall with screws. Ensure they are aligned and sturdy.
                </p>
              </div>
            </div>
            <div className="howtoMessure-points">
              <div className="points-step">
                <h1>5</h1>
              </div>
              <div className="points-description">
                <p>
                  <b>Attach the blinds : </b>
                  Place the blinds into the brackets and secure them in place.
                  Follow the manufacturer's instructions for any additional
                  steps, such as attaching the valance or adjusting the cord
                  length.
                </p>
              </div>
            </div>
            <div className="howtoMessure-points">
              <div className="points-step">
                <h1>6</h1>
              </div>
              <div className="points-description">
                <p>
                  <b>Test and adjust : </b>
                  Open and close the blinds to ensure smooth operation. Make any
                  necessary adjustments to ensure they hang evenly and function
                  properly.
                </p>
              </div>
            </div>
            <div className="howtoMessure-points">
              <div className="points-step">
                <h1>7</h1>
              </div>
              <div className="points-description">
                <p>
                  <b>Step back and admire : </b>
                  Stand back and enjoy the beauty and functionality of your
                  newly installed blinds.
                </p>
              </div>
            </div>
          </div>
          <div className="howtoMessure-container">
            <div className="howtoMessure-addition-information">
              <p className="mb-0">
                Remember, if you're unsure about the installation process or
                need assistance, our expert team is always here to help.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default HowtoInstallPage;
