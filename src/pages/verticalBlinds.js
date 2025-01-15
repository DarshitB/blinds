import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

function VerticalBlinds() {
  return (
    <>
      <div className="bliend-information-page-wrapper">
        <Navbar />
        <section className="section-pagetop">
          <div className="container-fluid mainhedof-productlist">
            <h2>Vertical Blinds</h2>
          </div>
        </section>
        <div className="abouus-main-text">
          <div className="abouus-main-text-inside">
            <div className="abouus-main-text-inside-detailes">
              <h4>know about Vertical Blinds</h4>
              <p>
                Traditionally, Vertical Blinds have served as a great
                alternative to cloth curtains. Unlike horizontal blinds,
                Vertical Blinds are less likely to collect dust because they
                stand vertically. Since they draw to the side rather than
                lifting and lowering, they operate better on doors and windows
                that also slide from side to side. Generally they require less
                muscle strength, and are faster to operate.
              </p>
              <p>
                We offer a large range of prints, colours, materials and all
                packages have their own fixtures and fittings. All of our made
                to measure Vertical Blinds come in numerous shades which can be
                matched with those of our Roller Blinds, so you can produce a
                uniform look within the home or office.
              </p>
              <p>
                One of the most important aspects of our Vertical Blinds is the
                special child-safety feature that prevents hazards kids may
                encounter when operating this type of blinds. Our Vertical
                Blinds are also available in water resistant fabrics & Blackout
                Options
              </p>
              <p>
                Blinds manufactures and supplies a range of high-quality and
                cost-effective window solutions. Get an attractive quote on
                Vertical Blinds from our expert staff on 0203 384 0074 or using
                the contact us form. All our Blinds are Made to Measure and
                bespoke to your exact window size and needs.
              </p>
              <p>
                Our Advisor will visit your home in E16, E14 Postcodes that
                covers most of the ares in East London (Most of the Docklands,
                Canary Wharf, Canning Town, Poplar, Silvertown. We also go as
                far as Kidbroke , Blackheath,SE3 etc ) We have provided a number
                of new builds in these area with High Quality Vertical Blinds.
              </p>
              <button className="login-btn">Call Us Now</button>
            </div>
            <div className="abouus-main-text-inside-image">
              <img
                src="assets/img/t-Vertical.jpg"
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

export default VerticalBlinds;
