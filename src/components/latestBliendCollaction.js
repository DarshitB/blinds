import React from "react";
import { Navigation, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
function LatestBliendCollaction() {
  return (
    <>
      <div className="sort-by-room">
        <div className="carosel-box">
          <h2>Letest Blinds collaction</h2>
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
                    <img src="/assets/img/slide-interior-3.jpg" alt="" />
                  </div>
                  <div className="carosl-slide-items-heading">lorem</div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/blindlist">
                <div className="carosl-slide-items">
                  <div className="carosl-slide-items-img">
                    <img src="/assets/img/slide-interior-3.jpg" alt="" />
                  </div>
                  <div className="carosl-slide-items-heading">lorem</div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/blindlist">
                <div className="carosl-slide-items">
                  <div className="carosl-slide-items-img">
                    <img src="/assets/img/slide-interior-3.jpg" alt="" />
                  </div>
                  <div className="carosl-slide-items-heading">lorem</div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/blindlist">
                <div className="carosl-slide-items">
                  <div className="carosl-slide-items-img">
                    <img src="/assets/img/slide-interior-3.jpg" alt="" />
                  </div>
                  <div className="carosl-slide-items-heading">lorem</div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/blindlist">
                <div className="carosl-slide-items">
                  <div className="carosl-slide-items-img">
                    <img src="/assets/img/slide-interior-3.jpg" alt="" />
                  </div>
                  <div className="carosl-slide-items-heading">lorem</div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/blindlist">
                <div className="carosl-slide-items">
                  <div className="carosl-slide-items-img">
                    <img src="/assets/img/slide-interior-3.jpg" alt="" />
                  </div>
                  <div className="carosl-slide-items-heading">lorem</div>
                </div>
              </Link>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default LatestBliendCollaction;
