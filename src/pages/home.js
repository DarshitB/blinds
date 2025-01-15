import React, { useEffect } from "react";
import Herosection from "../components/herosection";
import Navbar from "../components/navbar";
import HowItWorks from "../components/howItWorks";
import "swiper/css";
import "swiper/css/autoplay";
import { useLocation } from "react-router-dom";
function Home() {
  const srolllocation = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [srolllocation]);
  return (
    <>
      <div className="Home-page-wrapper">
        {/* <div className="maindetailes-nav">
          <div className="swapper-container">
            <Swiper
              modules={[Navigation, A11y, Autoplay]}
              slidesPerView={1}
              navigation
              autoplay={{ delay: 2000 }}
            >
              <SwiperSlide>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </SwiperSlide>
              <SwiperSlide>Lorem Ipsum is simply dummy text</SwiperSlide>
              <SwiperSlide>
                Lorem Ipsum of the printing and typesetting industry.
              </SwiperSlide>
            </Swiper>
          </div>
        </div> */}
        <Navbar />
        <div className="maianhadingtop-heading">
          <div className="d-flex justify-content-center mianhadding-box">
            <div className="d-flex w-75 justify-content-between">
              <div className="d-flex align-items-center">
                <img
                  src="/assets/img/free-delivary.svg"
                  style={{ height: "15px" }}
                  className="mr-3"
                  alt=""
                />
                <p className="mb-0">Free delivery on orders over £149</p>
              </div>
              <div className="d-flex align-items-center">
                <img
                  src="/assets/img/Exelent-review.svg"
                  style={{ height: "15px" }}
                  className="mr-3"
                  alt=""
                />
                <p className="mb-0">We’re rated as 'Excellent'</p>
              </div>
              <div className="d-flex align-items-center">
                <img
                  src="/assets/img/low-price-tag.svg"
                  style={{ height: "15px" }}
                  className="mr-3"
                  alt=""
                />
                <p className="mb-0">Always Low Prices! No Gimmicks!</p>
              </div>
            </div>
          </div>
        </div>
        <Herosection />
        <HowItWorks />
      </div>
    </>
  );
}

export default Home;
