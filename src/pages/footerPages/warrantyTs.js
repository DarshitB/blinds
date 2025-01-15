import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
function WarrantyTs() {
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
            <h2>The Blinds Warranty</h2>
          </div>
        </section>
        <div className="footerpage-form-main-box">
          <div className="footerpage-detailes-side">
            <p>
              From design to production, every Make My Blinds product is crafted
              to endure a lifetime of everyday use. If your product does not
              function due to a manufacturing defect, we will work to resolve
              the issue by replacing it free of charge.
            </p>
            <p>
              Make My Blinds is so confident in the workmanship and overall
              quality of all of our blinds we offer an unrivaled and
              straightforward lifetime warranty on all purchases. It’s not just
              the customer service we pride ourselves on, but the choice of
              components and focus on quality. We like to take a common-sense
              approach with things, but for reasons, we need to list a few
              things that are not covered:
            </p>
            <ul>
              <li>Improper use outside of normal wear and tear</li>
              <li>
                Fabric fading over time due to direct sunlight or abrasive
                cleaning
              </li>
              <li>
                Accidents and cosmetic damage including marks, spills and
                scratches
              </li>
              <li>
                Water damage if the product is not sold as waterproof. See
                individual product pages for full details
              </li>
              <li>
                Heat warping if the product is not sold as being suitable for
                conservatories. See individual product pages for full details
              </li>
              <li>
                Any alterations made to the blinds including shortening widths
                or drops
              </li>
              <li>
                Installation issues where our How to Install guidelines have not
                been followed
              </li>
              <li>Non-domestic use</li>
              <li>Loss or theft once delivered</li>
            </ul>
            <h5>Further details can be found below.</h5>
            <ol>
              <li>
                MakeMyBlinds (Henceforth referred to as MMB) offers an unrivaled
                lifetime warranty on all blinds sold via our website. This
                warranty covers the following parts and components for general
                wear and tear, so: brackets, roller components, top tube, bottom
                bar, venetian pulls and wands, slats, roller chains, chain
                links, bottom bars, motor, remote, cassette, internal
                components, strings, tapes, cords, and the fabric – except
                fading, cuts and any homemade alterations.
              </li>
              <li>Proof of purchase is required to progress with any claim.</li>
              <li>
                Blinds fitted in a non-domestic environment are not covered
                under our lifetime warranty, nor is Make My Blinds liable for
                any damage or injury that may arise from these blinds being
                installed within a non-domestic environment. We supply blinds
                for residential settings inside the UK, so hotels, hostels,
                schools, B&B’s, holiday lets, overseas locations (outside the UK
                and Ireland), etc. aren’t covered under this warranty.
              </li>
              <li>
                Damage to the blinds, for example spilling red wine on the
                fabric, or your dog biting the wooden slats, are not covered
                under our warranty. So if you see any issues around your blind
                when you come to install them, please make us aware as soon as
                possible - ideally within 7 days of delivery.
              </li>
              <li>
                Any homemade alterations to the blind will void our warranty.
                Come on guys, if you can’t cut straight we can’t be held
                responsible for that. Each case will be looked at on a
                case-by-case basis, but every blind is made to measure to your
                exact size requirements at the point of order, and alterations
                to this or your blind will void the warranty.
              </li>
              <li>
                Blinds may need to be returned to MMB for inspection before a
                replacement or repair is offered. This is undertaken at the
                customer’s expense. Before this stage, we will require some
                photos to show and assist our quality control team with their
                inspections.
              </li>
              <li>
                In the event that we no longer sell your specific blind, a
                like-for-like alternative will be offered. There is no cash
                alternative.
              </li>
              <li>
                In no event shall MMB be liable or responsible for incidental or
                consequential damages for any other direct or indirect damage,
                loss, cost, expense or fee.
              </li>
              <li>
                Misuse or incorrect installation in the correct environment will
                also void the MMB lifetime warranty. E.g. don’t install a blind
                in the bathroom that is not suitable for damp conditions, don’t
                put the roller blind fabric in the wash, don’t wipe clean the
                fabrics with bleach etc. Each case will be looked at on a
                case-by-case basis. Our customer advisors will be able to advise
                you on the best location to install each blind type before
                purchase.
              </li>
              <li>
                This guarantee is exclusive and in lieu of all other obligations
                liabilities or warranties. In no event shall Make My Blinds be
                liable or responsible for incidental or consequential damages or
                for any other direct or indirect damage, loss, cost, expense, or
                fee. This guarantee does not affect the consumer’s statutory
                rights under applicable national laws in force.
              </li>
            </ol>
            <p>
              We’ve tried to keep these as simple and straightforward as
              possible, with common sense applied to each point. If you have any
              questions or concerns over any of our products please get in touch
              via email, in the UK on 0117 463 4411, or start a webchat with us
              to discuss with one of our customer advisors – they’re pretty
              knowledgeable on what works best where and how to look after and
              care for your new blinds.
            </p>
            <p>
              Please see our Trustpilot reviews from 1000’s of unbiased
              customers to see what they think of Make My Blinds after purchase.
              These reviews are collected independently and reflect customer
              opinions after dealing with us. Make My Blinds will always try to
              do the right thing if an issue arises as long as it does not
              breach the points listed above.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default WarrantyTs;
