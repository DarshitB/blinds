import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
function DeliveryTnC() {
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
            <h2>Blinds Delivery Info - Ts & Cs</h2>
          </div>
        </section>
        <div className="footerpage-form-main-box">
          <div className="footerpage-detailes-side">
            <p>
              1. Blinds will always ship with our preferred service partner
              DPD, XDP or Tuffnels, depending on your geographical location. If
              for any reason we cannot ship with them, for instance if the item
              is too heavy or long, Blinds reserves the right to ship with
              any other carrier in the UK at our discretion. We may also ship
              only the oversize blind with one courier and the remaining blinds
              with another. Blinds from different locations will also be split
              and delivered on different days by different couriers.
            </p>
            <p>
              2. Delivery times advertised on the website are purely for
              guidance and Blinds cannot be held liable or accountable to
              changes to the given timescale. As made to measure products cannot
              be made in advance, they have tight production timelines and
              sometimes issues such as adverse weather and quality control
              issues can cause delays. All items are built to order and we
              always aim for the quickest build times. Blinds cannot be held
              financially responsible for any delay or expenditure from
              pre-organised events due to a delay in receiving your order.
            </p>
            <p>
              3. At Blinds we strive to keep you up to date regarding your
              order and its delivery status. We will inform you when the order
              is received, when the order has been started, when the order is
              ready for dispatch and then when it is with the courier on its way
              to you. You can further track the order with the courier tracking
              link above.
            </p>
            <p>
              4. Blinds will always send out a tracking code as soon as we
              have one from the courier.
            </p>
            <p>
              5. Couriers will try to deliver your order up to 3 times before
              returning it to Blinds or their local depo. If this occurs we
              will get in touch with you to let you know what has happened and
              rearrange delivery.
            </p>
            <p>
              6. If you need to change your delivery address please inform Make
              My Blinds before dispatch to avoid any delay with the shipping.
              While we can amend delivery addresses when the product is in
              transit, please expect an extra day for delivery.
            </p>
            <p>
              7. All packages are insured during transport. If there is any
              damage to the packaging upon delivery please note this when you
              sign for the order. Upon receipt of a damaged package, photograph
              the box and take note of whether this has damaged the order
              inside. Please then contact us along with your order number. We
              will speak to the courier company.
            </p>
            <p>
              8. Blinds will replace or repair damaged orders at our
              discretion upon receiving photo evidence. We may ask for the
              product to be returned before replacing the damaged blind.
            </p>
            <p>
              9. Our delivery charge is just £7.99, no matter how many blinds
              are in your order.
            </p>
            <p>
              10. We offer a Next Week Dispatch Service, available on any blinds
              with the "Custom Made Next Week" sticker. If you select this
              option, this will be charged at £14.99. Next Week Dispatch refers
              to your order being dispatched from our factory the next working
              day (Monday To Friday).
            </p>
            <p>
              We all know what couriers can be like! Once the blinds have left
              us we are really at their mercy and will help in any way we can to
              make sure any issues are resolved.
            </p>
            <p>
              As always, if you have any questions please get in touch on 0117
              463 4411 or on our live chat.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default DeliveryTnC;
