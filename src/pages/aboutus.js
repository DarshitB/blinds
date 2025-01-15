import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

function Aboutus() {
  const srolllocation = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [srolllocation]);
  return (
    <>
      <div className="aboutus-page-wrapper">
        <Navbar />
        <section className="section-pagetop">
          <div className="container-fluid mainhedof-productlist">
            <h2>about BLINDS</h2>
          </div>
        </section>
        <div className="abouus-main-text">
          <div className="abouus-main-text-inside">
            <div className="abouus-main-text-inside-detailes">
              <h4>know about our company</h4>
              <p>
                Blinds offers a fully fitted service for window blinds
                covering most parts of East London. We produce an extensive
                range of quality blinds that are available in a spectrum of
                textures, colors and shades. Compatible with all types of
                windows, we transform and enhance the beauty and functionality
                of homes in the most special way.
              </p>
              <p>
                At Blinds, we adhere to transparency in business, so you
                need not worry about pressure tactics or hidden costs. Our
                manufacturing facility is based in the Midlands and we work on
                high volumes, the savings are passed on to you, our valued
                customer. It’s a win-win deal for you!
              </p>
              <p>
                You can always depend on our fast turnaround times, competitive
                prices and competent service. We encourage you to consult us on
                the materials and fabrics available, and their suitability for
                your property.
              </p>
              <p>
                <b>
                  Call us today for a no-obligation "measure & quote" service
                  and benefit from great prices and fast turn around times.
                </b>
              </p>
              <button className="login-btn">Call Us Now</button>
            </div>
            <div className="abouus-main-text-inside-image">
              <img src="assets/img/aboutus.webp" alt="" />
            </div>
          </div>
        </div>
        <div className="abouus-main-text">
          <div className="abouus-howitworks-text-inside">
            <div className="abouus-main-text-inside-detailes">
              <h4>How It Works</h4>
              <div className="stages-howItWorks">
                <p>
                  <b>Step 1: Book an appointment</b>
                </p>
                <p>
                  No long waiting times. We have early and convenient
                  appointment times available.
                </p>
                <p>
                  <b>Step 2: Home visit & design consultation</b>
                </p>
                <p>
                  Our trained specialist will visit you in your home. This is a
                  no-obligation measure & quote service. We will take you
                  through our catalogue of fabrics to show you our extensive
                  range or textures, colours and designs allowing you to see and
                  feel our range.
                </p>
                <p>
                  <b>Step 3: Blinds fitted.</b>
                </p>
                <p>
                  Super fast manufacturing and quick fitting dates despite all
                  orders being custom made. All products are professionally
                  fitted.
                </p>
                <p>
                  Get started now, call or write to us using the number/form
                  below.
                </p>
              </div>
              <button className="login-btn">Call Us Now</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Aboutus;
