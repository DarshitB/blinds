import React from "react";
import { Navigation, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Footer from "./footer";
import HowToMassure from "./howToMassure";
import { Link } from "react-router-dom";
function HowItWorks() {
  return (
    <>
      <div className="howItWorkd-contaier">
        <div className="howItWorkd-box container">
          <h2>How it works</h2>
          <div className="main-howitworks row">
            <div className="main-howitworks-items col-md-4">
              <div className="main-howitworks-items-img">
                <img src="/assets/img/scale.png" alt="" />
              </div>
              <p>Measure your windows by following our simple guidelines.</p>
            </div>
            <div className="main-howitworks-items col-md-4">
              <div className="main-howitworks-items-img">
                <img src="/assets/img/tick-check.png" alt="" />
              </div>
              <p>Choose your perfect window blinds and order easily.</p>
            </div>
            <div className="main-howitworks-items col-md-4">
              <div className="main-howitworks-items-img">
                <img src="/assets/img/cart.png" alt="" />
              </div>
              <p>
                Order online in minutes and install easily with our installation
                service.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="sort-by-room">
        <div className="carosel-box">
          <h2>Types of Room</h2>
          <Swiper
            modules={[Navigation, A11y]}
            spaceBetween={24}
            slidesPerView={"auto"}
            grabCursor={true}
            navigation
          >
            <SwiperSlide>
              <Link to="/blindlist">
                <div className="carosl-slide-items">
                  <div className="carosl-slide-items-img">
                    <img src="/assets/img/bathroom-a.jpeg" alt="" />
                  </div>
                  <div className="carosl-slide-items-heading">Bathroom</div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/blindlist">
                <div className="carosl-slide-items">
                  <div className="carosl-slide-items-img">
                    <img src="/assets/img/badroom-a.jpeg" alt="" />
                  </div>
                  <div className="carosl-slide-items-heading">Bedroom</div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/blindlist">
                <div className="carosl-slide-items">
                  <div className="carosl-slide-items-img">
                    <img src="/assets/img/kitchen-a.jpeg" alt="" />
                  </div>
                  <div className="carosl-slide-items-heading">Kitchen</div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/blindlist">
                <div className="carosl-slide-items">
                  <div className="carosl-slide-items-img">
                    <img src="/assets/img/Conservatory-a.jpg" alt="" />
                  </div>
                  <div className="carosl-slide-items-heading">Conservatory</div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/blindlist">
                <div className="carosl-slide-items">
                  <div className="carosl-slide-items-img">
                    <img src="/assets/img/office-a.jpeg" alt="" />
                  </div>
                  <div className="carosl-slide-items-heading">Office</div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/blindlist">
                <div className="carosl-slide-items">
                  <div className="carosl-slide-items-img">
                    <img src="/assets/img/living-b.jpg" alt="" />
                  </div>
                  <div className="carosl-slide-items-heading">Living Room</div>
                </div>
              </Link>
            </SwiperSlide>
          </Swiper>
        </div>
      </div> */}

      <div className="sort-by-room">
        <div className="carosel-box">
          <h2>Type Of Blinds</h2>
          <Swiper
            modules={[Navigation, A11y]}
            spaceBetween={24}
            slidesPerView={"auto"}
            grabCursor={true}
            navigation
          >
            <SwiperSlide>
              <Link to="/blindlist/Roller">
                <div className="carosl-slide-items">
                  <div className="carosl-slide-items-img">
                    <img src="/assets/img/a-roller.jpeg" alt="" />
                  </div>
                  <div className="carosl-slide-items-heading">
                    Roller Blinds
                  </div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/blindlist/Vertical">
                <div className="carosl-slide-items">
                  <div className="carosl-slide-items-img">
                    <img src="/assets/img/t-Vertical.jpg" alt="" />
                  </div>
                  <div className="carosl-slide-items-heading">
                    Vertical Blinds
                  </div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/blindlist/Wooden">
                <div className="carosl-slide-items">
                  <div className="carosl-slide-items-img">
                    <img src="/assets/img/a-wooden.jpeg" alt="" />
                  </div>
                  <div className="carosl-slide-items-heading">
                    Wooden Blinds
                  </div>
                </div>
              </Link>
            </SwiperSlide>

            <SwiperSlide>
              <Link to="/blindlist/Sierra">
                <div className="carosl-slide-items">
                  <div className="carosl-slide-items-img">
                    <img src="/assets/img/t-sierra.jpg" alt="" />
                  </div>
                  <div className="carosl-slide-items-heading">
                    {" "}
                    Sierra Blinds
                  </div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/blindlist/Patricia">
                <div className="carosl-slide-items">
                  <div className="carosl-slide-items-img">
                    <img src="/assets/img/a-Patricia.jpg" alt="" />
                  </div>
                  <div className="carosl-slide-items-heading">
                    {" "}
                    Patricia Blinds
                  </div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/blindlist/Meliso">
                <div className="carosl-slide-items">
                  <div className="carosl-slide-items-img">
                    <img src="/assets/img/t-meliso.jpg" alt="" />
                  </div>
                  <div className="carosl-slide-items-heading">
                    {" "}
                    Meliso Blinds
                  </div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/blindlist/Luzon">
                <div className="carosl-slide-items">
                  <div className="carosl-slide-items-img">
                    <img src="/assets/img/t-daynight.webp" alt="" />
                  </div>
                  <div className="carosl-slide-items-heading">Luzon Blinds</div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/blindlist/Grayson">
                <div className="carosl-slide-items">
                  <div className="carosl-slide-items-img">
                    <img src="/assets/img/t-grayson.jpg" alt="" />
                  </div>
                  <div className="carosl-slide-items-heading">
                    Grayson Blinds
                  </div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/blindlist/Dorren">
                <div className="carosl-slide-items">
                  <div className="carosl-slide-items-img">
                    <img src="/assets/img/t-dorren.jpg" alt="" />
                  </div>
                  <div className="carosl-slide-items-heading">
                    Dorren Blinds
                  </div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/blindlist/Colby">
                <div className="carosl-slide-items">
                  <div className="carosl-slide-items-img">
                    <img src="/assets/img/t-colby.jpg" alt="" />
                  </div>
                  <div className="carosl-slide-items-heading">Colby Blinds</div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/blindlist/Colby%20Skylight">
                <div className="carosl-slide-items">
                  <div className="carosl-slide-items-img">
                    <img src="/assets/img/t-colby-skylight.jpg" alt="" />
                  </div>
                  <div className="carosl-slide-items-heading">
                    Colby Skylight Blinds
                  </div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/blindlist/Aric">
                <div className="carosl-slide-items">
                  <div className="carosl-slide-items-img">
                    <img src="/assets/img/t-aric.jpg" alt="" />
                  </div>
                  <div className="carosl-slide-items-heading">Aric Blinds</div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/blindlist/Panel">
                <div className="carosl-slide-items">
                  <div className="carosl-slide-items-img">
                    <img src="/assets/img/t-panel.jpg" alt="" />
                  </div>
                  <div className="carosl-slide-items-heading">Panel Blinds</div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/blindlist/Roman">
                <div className="carosl-slide-items">
                  <div className="carosl-slide-items-img">
                    <img src="/assets/img/t-Roman.jpg" alt="" />
                  </div>
                  <div className="carosl-slide-items-heading">Roman Blinds</div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/blindlist/Roman%20Skylight">
                <div className="carosl-slide-items">
                  <div className="carosl-slide-items-img">
                    <img src="/assets/img/t-roman-skylight.jpg" alt="" />
                  </div>
                  <div className="carosl-slide-items-heading">
                    Roman Skylight Blinds
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <HowToMassure />
      <div className="main-quality">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="inner-quality-container">
                <div className="inner-quality-box">
                  <h4>The Bespoke Fit</h4>
                  <p>
                    measure your window select your choice of window blinds
                    along with the fabric and mechanism and place an order
                  </p>
                  <div className="overlat_num">01</div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="inner-quality-container">
                <div className="inner-quality-box">
                  <h4>48 hours Dispatch</h4>
                  <p>
                    once the order is placed within 48 hours it will be shipped
                    and delivered in 10 working days.
                  </p>
                  <div className="overlat_num">02</div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="inner-quality-container">
                <div className="inner-quality-box">
                  <h4>Offering 5 Year Warranty</h4>
                  <p>
                    Order products comes with a 5 year warranty so sit back and
                    relax we got you covered!
                  </p>
                  <div className="overlat_num">03</div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="inner-quality-container">
                <div className="inner-quality-box">
                  <h4>Installation service</h4>
                  <p>
                    while placing your order now you can book an installation
                    service for your product in selected areas.
                  </p>
                  <div className="overlat_num">04</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-container">
        <div className="subscribe-for-update">
          <h2>Subscribe For Newsletter</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p>
          <div className="subscribe-inpiut">
            <input
              type="email"
              className="searchbox"
              placeholder="Enter your email address"
            />
            <div className="search-icon">
              <span>Sign Up</span>
            </div>
          </div>
        </div>
        <div className="main-footer">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default HowItWorks;
