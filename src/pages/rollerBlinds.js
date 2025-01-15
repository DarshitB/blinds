import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

function RollerBlinds() {
  return (
    <>
      <div className="bliend-information-page-wrapper">
        <Navbar />
        <section className="section-pagetop">
          <div className="container-fluid mainhedof-productlist">
            <h2>Roller Blinds</h2>
          </div>
        </section>
        <div className="abouus-main-text">
          <div className="abouus-main-text-inside">
            <div className="abouus-main-text-inside-detailes">
              <h4>know about Roller Blinds</h4>
              <p>
                Thanks to its ease of installation, use and cleaning; by far,
                Roller Blinds are the most popular and commonly used type of
                blinds at homes across the country, and indeed the world. Our
                selection of Roller Blinds are available in a wide range of
                stunning colours, shades and textures that are sure to enliven
                any room they grace.
              </p>
              <p>
                One of the most important aspects of the Roller Blinds we offer
                is the special child-safety feature that prevents risks that
                kids may face when operating this type of blinds. You can also
                utilise the safety accessories we provide. Our Roller Blinds are
                made of fire retardant and water resistant fabrics; adding an
                extra layer of protection to keep you and your family safe
                always.
              </p>
              <p>
                We also offer a selection of blinds with specialist functions
                such as moisture resistant, wipe clean and ultra-fresh treated
                blinds that are best-suited for kitchens and bathrooms. So, get
                set to complement the interior décor of your home!
              </p>
              <p>
                Day Blinds Ireland manufactures and supplies a range of
                high-quality and cost-effective window solutions. Get an
                attractive quote from our expert staff on live chat, email or
                call our Dublin branch; or the toll-free number now.
              </p>
              <button className="login-btn">Call Us Now</button>
            </div>
            <div className="abouus-main-text-inside-image">
              <img src="assets/img/bathroom-a.jpeg" alt="" />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default RollerBlinds;
