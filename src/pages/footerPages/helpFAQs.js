import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { Collapse } from "antd";
const { Panel } = Collapse;
function HelpFAQs() {
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
            <h2>Help & FAQs</h2>
          </div>
        </section>
        <div className="footerpage-form-main-box">
          <div className="footerpage-detailes-side">
            <div className="footerpage-detailes-side-headding">
              <h5 className="mb-3">I have a question before ordering</h5>
            </div>
            <Collapse accordion>
              <Panel header="Can you help me place my order?" key="1">
                <p>
                  Our helpful customer service team are on hand 7 days a week,
                  8am - 8pm to help you with any questions or to help you place
                  an order over the phone. Before calling to place an order over
                  the phone, please have your sizes handy as it will help make
                  the ordering process quicker and more accurate. We are
                  available to also talk you through the measuring process and
                  can help explain where and how to measure for your windows.
                </p>
              </Panel>
              <Panel header="Can you help me place a sample order?" key="2">
                <p>
                  Our customer service team are able to place sample orders for
                  you over live chat, email or on the phone. Please just let us
                  know the samples you would like sent to you, your address and
                  email address and we will get them ordered for you. Samples
                  are posted daily by 1st class post.
                </p>
              </Panel>
              <Panel header="How do I get a quote?" key="3">
                <p>
                  If you know your exact sizes (or rough sizes if it’s a quote),
                  please go to a product, and you’ll see a width and drop
                  measurement box. Enter your sizes in there and the website
                  will calculate the price for the blind for you in the sizes
                  give. We can also give you quotes online by email, live chat
                  and over the phone if you know what type of blind, colour and
                  sizes you require.
                </p>
              </Panel>
              <Panel header="I need measuring advice" key="4">
                <p>
                  We have extensive measuring guides and videos for you to
                  follow here: Measuring Guide. If you’re not sure on any part,
                  our customer service team are on hand to help guide you
                  through the process.
                </p>
              </Panel>
              <Panel header="I need installation advice" key="5">
                <p>
                  We have installation guides and videos on our site for you to
                  follow here: Install Guide. Also, every blind is sent out with
                  a installation guide suitable for the blind you have ordered.
                  If you’re missing a copy, we can send you a PDF version by
                  email, or link you to the relevant installation guide online.
                </p>
              </Panel>
            </Collapse>
            <div className="footerpage-detailes-side-headding">
              <h5 className="my-3">I have a question after ordering</h5>
            </div>
            <Collapse accordion>
              <Panel header="Can I amend my sizes?" key="1">
                <p>
                  Due to the made to measure nature of the blinds we make and
                  sell, we are unable to make amendments to your order once it
                  has been placed as they go straight into our production
                  system. If you need to make an amendment or change, please
                  reach out to our customer service team, but please be aware
                  that depending on the time ordered and when it goes into
                  manufacture, we may not be able to amend it in time. We
                  strongly advise to double-check all sizes before placing your
                  order.
                </p>
              </Panel>
              <Panel header="Can I change my delivery address?" key="2">
                <p>
                  If you’re looking to change your delivery address before your
                  order has left us, we can so this but please let us know at
                  least 24 hours before the expected dispatch date. Changing
                  address when it’s already out for delivery? We can try to
                  change this for you, but be aware this can add up to 48 hours
                  to your delivery whilst the courier re-prints an address label
                  and re-routes your delivery. If the order is already out for
                  delivery and scheduled for todays delivery, we are unable to
                  change your address.
                </p>
              </Panel>
              <Panel header="Can I cancel my order?" key="3">
                <p>
                  Due to the made to measure nature of the blinds we make and
                  sell, we are unable to cancel your order once it has been
                  placed as they go straight into our production system. If you
                  need to make an amendment or change, please reach out to our
                  customer service team, but please be aware that depending on
                  the time ordered and when it goes into manufacture, we may not
                  be able to amend it in time. We strongly advise to double
                  check all sizes before placing your order. We are only able to
                  cancel orders if we encounter a delay to manufacturing, e.g.
                  your fabric is out of stock.
                </p>
              </Panel>
            </Collapse>
            <div className="footerpage-detailes-side-headding">
              <h5 className="my-3">I have a delivery question</h5>
            </div>
            <Collapse accordion>
              <Panel header="How do I track my order" key="1">
                <p>
                  Our helpful customer service team are on hand 7 days a week,
                  8am - 8pm to help you with any questions or to help you place
                  an order over the phone. Before calling to place an order over
                  the phone, please have your sizes handy as it will help make
                  the ordering process quicker and more accurate. We are
                  available to also talk you through the measuring process and
                  can help explain where and how to measure for your windows.
                </p>
              </Panel>
              <Panel header="How long will my order take?" key="2">
                <p>
                  Every product page has an estimated delivery date shown, and
                  once your order has entered our production system you will be
                  given a estimated dispatch date. Please note that if you have
                  ordered multiple blinds with different lead times they may be
                  delivered separately. All orders in general take 7-10 days to
                  be made and delivered, but this can vary.
                </p>
              </Panel>
              <Panel header="I think I'm missing part of my delivery" key="3">
                <p>
                  If you think you’re missing part of your delivery, please
                  check your emails to see if you order has been split between
                  different couriers or different delivery dates. This would be
                  because your order has either been made in different
                  locations, one blind is too long and had to be sent with a
                  specialist courier, or that the lead times were different and
                  have been dispatched at different times. If you’re not sure,
                  then please reach out to our customer service who will be
                  happy to help.
                </p>
              </Panel>
              <Panel
                header="My order has arrived but looks like it's damaged"
                key="4"
              >
                <p>
                  Courier drivers don’t always have the softest touch, but if
                  your package looks like it’s damaged please first unbox it and
                  check the contents. If the blinds are OK, then please continue
                  to install them like normal. If you find there is a issue with
                  your blind then please reach out to our customer service team
                  with photos of the box and the blind for us to put this right.
                  Please note, we add extra packaging to our blinds which is
                  designed to take some of the hits. If the blind inside is OK,
                  then the packaging has done it’s job.
                </p>
              </Panel>
              <Panel
                header="My order has arrived but the chains/cords are too short"
                key="5"
              >
                <p>
                  Child safety laws mean we cannot make controls that are within
                  a certain distance from the floor so young children cannot
                  reach them. For blind over a 100cm drop we will make the
                  controls finish 100cm from the top of the blind. For any
                  blinds under a 100cm drop, the controls will be around 50cm
                  long. If you have very long windows, please get in touch
                  before ordering to let us know your installation height.
                </p>
              </Panel>
              <Panel
                header="My order has arrived but it's the wrong size"
                key="5"
              >
                <p>
                  We’re sorry to hear this, before getting in touch please can
                  you check the following. 1. If it’s a wooden blind, we re-use
                  boxes so the sizes on the box may be different to the sizes
                  the blind inside has been made to. 2. If you’ve selected
                  ‘recess’ size when ordering, the blind will be approximately
                  12mm narrower than ordered to account for the brackets. 3.
                  Check the sizes ordered and in your order confirmation email,
                  if we have made and sent you the wrong sizes we will quickly
                  put this right for you with a few photos highlighting our
                  mistake. If you have measure incorrectly, please get in touch
                  and we will see what we can do to assist. Please note as
                  products are made to measure we cannot accept returns.
                </p>
              </Panel>
              <Panel
                header="My order has arrived but I think there is a fault"
                key="6"
              >
                <p>
                  We’re sorry to hear that your blind is not working as
                  expected. Please reach out to our customer service team with a
                  video or image of your problem.
                </p>
              </Panel>
              <Panel header="My order has been returned to you" key="7">
                <p>
                  If your order shows ‘RTS’ (Return to sender) then the blind
                  will be on it’s way back to our factory. From there, we will
                  re-dispatch it for you as soon as possible and ask you to
                  re-confirm your address. If there is a suitable alternative
                  please let us know and we can update this for you.
                </p>
              </Panel>
            </Collapse>
            <div className="footerpage-detailes-side-headding">
              <h5 className="my-3">I have questions about your products</h5>
            </div>
            <Collapse accordion>
              <Panel
                header="Are the blinds supplied with screws and rawl plugs?"
                key="1"
              >
                <p>
                  Some products don’t require screws like our Perfect Fit
                  blinds, but ones that do don’t come with screws or plugs as we
                  don’t know what surface you’re installing into. We do
                  recommend selecting the right type of screws – if that’s
                  brick, metal, plasterboard so you have a secure fixing to
                  attach your blind to. We recommend a 3mm diameter screw to fit
                  through all bracket holes.
                </p>
              </Panel>
              <Panel header="Do you have a showroom?" key="2">
                <p>
                  We are only online so don’t have a showroom that we can
                  demonstrate our blinds in but we do have a free sample service
                  you can use. We also don’t allow any collections from our UK
                  factories due to our setup.
                </p>
              </Panel>
              <Panel header="How accurate are your images?" key="3">
                <p>
                  We take pride in our image creation, but every device and
                  screen setting can be different so because of this we always
                  advise ordering a free sample before ordering.
                </p>
              </Panel>
              <Panel header="How do I get a VAT invoice?" key="4">
                <p>
                  Our order confirmations are followed by an email that contains
                  out VAT number and address that any accountant can use as a
                  valid VAT receipt. If you don’t have this then please reach
                  out to our customer service team and they can resend it to
                  you.
                </p>
              </Panel>
            </Collapse>
            <div className="footerpage-detailes-side-headding">
              <h5 className="my-3">I have questions about your free samples</h5>
            </div>
            <Collapse accordion>
              <Panel
                header="Do I need to place my order before I order a free sample?"
                key="1"
              >
                <p>
                  We always recommend ordering a free sample before your order,
                  we send them out with Royal Mails 1st class post. We try to
                  make our images as accurate as possible but nothing beats the
                  real thing in your home to touch, feel and compare in
                  different lights.
                </p>
              </Panel>
              <Panel header="How do I order my free samples?" key="2">
                <p>
                  Simply click the ‘Free Sample’ button on each product and
                  it’ll be added to your sample basket. From there we need your
                  address to send them to and we will post them out within 24
                  hours.
                </p>
              </Panel>
            </Collapse>
            <div className="footerpage-detailes-side-headding">
              <h5 className="my-3">
                I have a question about your warranty and returns
              </h5>
            </div>
            <Collapse accordion>
              <Panel header="Are my blinds covered under warranty?" key="1">
                <p>
                  Your blinds are covered by our lifetime warranty, so if at any
                  point over the ownership of your blinds you find that they
                  have broken due to a manufacturing fault (not wear and tear)
                  please reach out to us for a replacement or repair. Please see
                  our detailed warranty terms here : Warranty .
                </p>
              </Panel>
              <Panel
                header="I do not like the colour or fabric of my blind, can I return it?"
                key="2"
              >
                <p>
                  Due to our blinds being made to measure, we can’t accept
                  returns based on the colour. We offer a free sample service
                  where you can see and feel the fabric before purchase that we
                  advise customers to take advantage of before purchase.
                </p>
              </Panel>
              <Panel
                header="I've made a mistake on measuring, can I return the blind?"
                key="3"
              >
                <p>
                  Due to the made to measure nature of the blinds we make and
                  sell, we are unable to accept returns due to the bespoke
                  nature. We make your blinds to the sizes given at point of
                  order. If you have ordered the wrong sizes, please reach out
                  to customer service to see what we can do to help. But we
                  won’t be able to accept the blinds as a return.
                </p>
              </Panel>
              <Panel header="Do you accept any returns?" key="4">
                <p>
                  Due to the made to measure nature of the blinds we make and
                  sell, we are unable to accept returns and these products are
                  outside of the returns policy of the Consumer Rights Act of
                  2015.
                </p>
              </Panel>
            </Collapse>
            <div className="footerpage-detailes-side-headding">
              <h5 className="my-3">General Questions</h5>
            </div>
            <Collapse accordion>
              <Panel
                header="Can you make a blind outside the maximum or minimum size?"
                key="1"
              >
                <p>
                  Due to manufacturing and shipping restrictions, our site is
                  set up with maximum and minimum sizes on each blind type. If
                  your requirement is larger than what we have available on the
                  website, then we most likely can’t make your order.
                </p>
              </Panel>
              <Panel header="How does Klarna work?" key="2">
                <p>
                  Klarna is a 3rd party pay later finance agency that offers a
                  pay later (30 days) or a pay in 3 (pay 1/3rd now / 1/3rd in 30
                  days / 1/3rd in 60 days) payment option. This will be shown to
                  qualifying customers at the checkout. We have no bearing on
                  Klarna and all decisions and contracts are between yourself
                  and Klarna as a lender.
                </p>
              </Panel>
              <Panel
                header="Is it safe for me to use my debit/credit card on your website?"
                key="3"
              >
                <p>
                  Our website is protected by the latest security updates and
                  process’ to ensure that your card details are fully secure.
                </p>
              </Panel>
              <Panel
                header="What type of payment methods do you accept?"
                key="4"
              >
                <p>
                  We accept all major credit and debit cards, including American
                  Express. We also accept PayPal and offer Klarna at the
                  checkout.
                </p>
              </Panel>
              <Panel
                header="What child safety procedures do you have in place for your products?"
                key="5"
              >
                <p>
                  All of our blinds are made to the current child safety
                  regulations and requirements. We include any required clips or
                  tie backs to keep your child safe from our blinds.
                </p>
              </Panel>
              <Panel
                header="What happens if my blind fabric is out of stock?"
                key="6"
              >
                <p>
                  In the rare case that your fabric is out of stock we will be
                  in touch with you as soon as possible to let you know. From
                  there we will have a new dispatch date or give you the option
                  to change your fabric or blind to something similar at no
                  extra cost.
                </p>
              </Panel>
              <Panel header="My roller blind cord keeps breaking?" key="7">
                <p>
                  Some of our roller blinds are fitted with 'breakaway chain
                  connectors', which can give the appearance of being broken
                  when they come apart. This is not usually the case - just clip
                  the chain back into the connector to restore. These blinds are
                  built this way to break under pressure, avoiding the risk of
                  strangulation.
                </p>
              </Panel>
              <Panel
                header="What are the differences in the Roman linings offered?"
                key="8"
              >
                <p>
                  We offer a variety of linings for our Roman blinds, so it's
                  worth taking some time to consider which option will best suit
                  you.
                  <br />
                  The standard Luxury lining is a plain cotton lining, designed
                  to suit most living spaces. Blackout linings will darken your
                  blind, only allowing light through the stitch lines - ideal
                  for bedrooms and nurseries. Thermal is a plain lining with a
                  heat conductive coating to help prevent heat from escaping in
                  the winter and to insulate in the summer. Interlining is a
                  bonded fabric which adds a thicker look and feel to your Roman
                  blind.
                  <br />
                  If you're not sure which type of lining will be best you can
                  request a sample by email (hello@makemyblinds.co.uk) or call
                  us on 0117 463 4411.
                </p>
              </Panel>
            </Collapse>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default HelpFAQs;
