import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

function WoodenBlinds() {
  return (
    <>
      <div className="bliend-information-page-wrapper">
        <Navbar />
        <section className="section-pagetop">
          <div className="container-fluid mainhedof-productlist">
            <h2>Wooden Blinds</h2>
          </div>
        </section>
        <div className="abouus-main-text">
          <div className="abouus-main-text-inside">
            <div className="abouus-main-text-inside-detailes">
              <h4>Wood Venetian Blinds With Tapes</h4>
              <p>
                Our range of Wooden Venetian Blinds with Tapes, for those who
                value enhanced aesthetics, are a modern way of controlling the
                light into any room. Not only are we conscious about where our
                wood comes from, but we strive to ensure it makes your home as
                energy efficient and kind to the environment as possible.
              </p>
              <p>
                Wood is a natural insulator, helping to keep the cold out during
                the winter months while the white stained woods will reflect the
                sun and help keep your interior space cool during the summer.
              </p>
              <p>
                The blinds are carefully made by our own skilled team using
                precision equipment. As we make everything ourselves, we have
                complete control over the manufacturing process and can
                therefore easily accommodate any special requests you may have.
              </p>

              <button className="login-btn">Call Us Now</button>
            </div>
            <div className="abouus-main-text-inside-image">
              <img
                src="assets/img/a-wooden.jpeg"
                style={{ objectPosition: "center" }}
                alt=""
              />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default WoodenBlinds;
