import React, { useEffect } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { Link, useLocation } from "react-router-dom";
function ContactUs() {
  const srolllocation = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [srolllocation]);
  return (
    <>
      <div className="contactus-page-wrapper">
        <Navbar />
        <section className="section-pagetop">
          <div className="container-fluid mainhedof-productlist">
            <h2>contact us</h2>
          </div>
        </section>
        <div className="contact-form-main-box">
          <div className="contact-detailes-side">
            <div className="contact-detailes-side-headding">
              <h2>Contact Information</h2>
              <p>
                If you have any queries, you can ride to our location or just
                pick up a mobile and call us during our open hours.
              </p>
            </div>
            <h5 className="pt-2">Address :</h5>
            <p> 15 Western Gateway, London E16 1AP, UK</p>
            <h5>Phones :</h5>
            <p>
              {" "}
              <a href="tel: 0793 207 4018">0793 207 4018</a> /{" "}
              <a href="tel: 0203 384 0074">0203 384 0074</a>
            </p>
            <h5>We Are Open :</h5>
            <p> Monday - Saturday: 10 am-7 pm</p>
          </div>
          <div className="contact-form-side">
            <div className="contact-form-side-heading">
              <h2>Get in Touch</h2>
              <p>
                If you have any general enquiries, we'd love to hear from you.
                <br />
                feel free to contact us.
              </p>
            </div>
            <div className="register-name-insert">
              <div className="fname-box pr-1">
                <input
                  type="text"
                  className="searchbox"
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="fname-box pl-1">
                <input
                  type="text"
                  className="searchbox"
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>
            <div className="register-name-insert">
              <div className="email-box ">
                <input
                  type="email"
                  className="searchbox"
                  placeholder="Email Address"
                  required
                />
              </div>
              <div className="phone-box">
                <input
                  type="email"
                  className="searchbox"
                  placeholder="Phone Number"
                  required
                />
              </div>
            </div>
            <div className="Massage-box subject">
              <input
                type="email"
                className="searchbox"
                placeholder="Subject"
                required
              />
            </div>
            <div className="Massage-box">
              <textarea
                className="searchbox"
                placeholder="Message"
                rows="5"
                required
              ></textarea>
            </div>
            <button className="login-btn">Send</button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ContactUs;
