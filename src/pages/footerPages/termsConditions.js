import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
function TermsConditions() {
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
            <h2>Blinds Terms & Conditions</h2>
          </div>
        </section>
        <div className="footerpage-form-main-box">
          <div className="footerpage-detailes-side">
            <div className="footerpage-detailes-side-headding">
              <h2>Standard Terms and Conditions</h2>
              <p>The slightly less interesting, but still important stuff.</p>
            </div>
            <h5 className="pt-2">1. Product Definitions</h5>
            <p>
              Products are henceforth defined as all goods sold by Blinds.
              This includes, but is not limited to roller blinds, vertical
              blinds, roman blinds, wooden Venetian blinds, aluminium Venetian
              blinds, curtains and any other products sold through this website.
            </p>
            <h5>2. Finalising order sizes</h5>
            <p>
              All blinds are custom-made to the customer’s exact specifications
              entered into the website. Blinds cannot be held liable for any
              inaccuracies or problems that may arise from inaccurate measuring
              on the customer’s side. MakeMyBlinds asks each customer to
              double-check all measurements before placing their order. Our
              blinds are non-refundable after they have been made due to the
              custom nature of the product sold. Our customer services team will
              always repeat orders back to you; please be advised that we do not
              accept claims based on incorrect sizes or products being inputted
              by us; therefore in the case of orders placed over the telephone,
              we cannot accept such claims. After placing the order please check
              the order details on the email confirmation, alterations to your
              order can be made up to 12 hours after your order being placed, or
              until production starts, which in some cases can be sooner. Please
              see section 6.1 for Priority Dispatch orders. If you do not
              receive the email confirmation, please check your junk or spam
              folder, and if it's not arrived please contact us to check the
              email address and have another sent over within 24hours of your
              order being placed. If there is an issue with your order sizes and
              you haven't received the confirmation and haven't let us know you
              haven't received it, we cannot be liable. Refunds and
              cancellations are possible before your order has been started.
              Please also check the colour and fabric you have chosen before
              ordering. Blinds cannot be held responsible for your mistake
              in fabric choice or colour. If you are unsure about anything
              please either order one of our free samples or call us before
              finalising your order. Free samples are used to help show the
              colour of the physical blind, and are labeled on the back if there
              is a difference between the front and the back. Once your order
              has been manufactured we are unable to exchange for a different
              product due to the made-to-measure nature of the product.
            </p>
            <h5>3. Product Tolerance</h5>
            <p>
              Whilst all our blinds are made to measure, due to the custom
              nature of these products we have a +/- 3mm tolerance on all exact
              size, fabric width, and recess size orders. Whilst our highly
              skilled professionals are as accurate as possible, this 3mm
              tolerance is due to the machinery and blades used to cut fabrics
              and wooden slats to size. Where possible we will always make the
              blind slightly smaller than ordered, however, this can not always
              be guaranteed. If the blind is within the correct size and
              tolerance we are unable to replace the blind or accept a return on
              this item. Wooden Blinds are made to measure and due to the way
              they are cut to size, chips on the end of the slats can occur.
              This is inherent with cutting wood and visible chips under 1mm are
              within our product tolerance. Blemishes under 1mm are within
              tolerance. However, Blinds will look at each case on a
              case-by-case basis to resolve any issues with your order. Venetian
              blinds, wooden and faux wood, can sometimes arrive with scratches
              to the face of the headrail on the blind. These are within our
              product tolerance as the headrail is designed to be hidden from
              view with the supplied valance.
            </p>
            <p>
              Roller blinds and Roman blinds over a certain size will require a
              join. If installing 2 blinds together next to each other and both
              require a join, please let us know once you have placed an order
              and we can align the join in the fabric. By default, fabric joins
              may not align.
            </p>
            <p>
              Please be aware that we also have a tolerance between fabric
              batches. Whilst we will try to make the same order from the same
              batch, please be aware that due to the nature of fabric and fabric
              dying there may be a small variance.
            </p>
            <p>
              Perfect Fit brackets come in the following depths: 18mm, 20mm,
              22mm, 24mm, 30mm and 38mm. 38mm brackets can only come as white or
              unpainted (silver). Please select the best range when ordering.
              Please note due to the range of brackets available, there may be
              cases where the frame does not fit flush with the window surround.
              Perfect Fit frames may have subtle paint blemishes in due to their
              manufacturing process.
            </p>
            <h5>4. Prices & Delivery purchase</h5>
            <p>
              All prices calculated online are accurate at the time of order and
              are inclusive of VAT. Orders are not started until orders have
              been paid in full. Delivery to certain areas of the UK (Northern
              Ireland, Chanel Islands) may incur extra delivery fees. These will
              be presented to you before purchase and we will make sure all
              delivery options are presented to you. Blinds accepts debit
              and credit cards alongside PayPal payments.
            </p>
            <h5>5. Payment and cancellation terms</h5>
            <p>
              Payment can be made by debit, credit card as well as PayPal. All
              personal data is stored in compliance with the General Data
              Protection Regulation (GDPR). We do not store credit card details
              and use 3rd party merchant providers to process payments. By
              purchasing blinds from Blinds you are entering into a legally
              binding contract with us. Cancellations are possible if your order
              hasn’t been started yet as all blinds are made to order and custom
              to your specification. As these products fall under the
              tailor-made section of the Consumer Contract Regulations 2014. All
              our products are exempt from this legislation and the 14-day
              cancellation rights. Please ring us on 0117 463 4411 as soon as
              possible to cancel the order. If your order has not been started
              then a refund will be possible. Refunds can take up to 10 business
              days to show on your statement once processed by Blinds.
            </p>
            <h5>6. Delivery</h5>
            <p>
              Blinds will deliver the order to your chosen delivery address
              as selected when placing your order. All products are shown their
              approximate delivery dates, but on average blinds are 8-10 working
              days, with wooden and faux wood blinds 15-20 working days. Any
              amends to this address must be done via phone on 0117 463 4411.
              Delivery address’ can change up to 24 hours before dispatch. All
              products are custom made for each order, therefore the estimated
              delivery date stated when placing the order is subject to change
              due to factors outside of our control. Blinds cannot be held
              liable for any loss or damage sustained by you if we fail to meet
              the initial delivery target. We will always try to keep you
              updated with any delays if they arise. Any delays or damage caused
              by the courier firm chosen by Blinds is the responsibility of
              the courier firm and does not reflect on Blinds in any way.
              Any damages caused by the courier firm must be reported upon the
              signing of the delivery. If there is any damage to the blind
              please get in touch with us on 0117 463 4411. We deliver to
              Northern Ireland, Isle of Man, Isle of Wight and the Scottish
              Highlands for no extra cost. For all delivery terms and conditions
              please check here.
            </p>
            <p>
              <b>COVID-19 Delivery:</b> Couriers are operating on a contactless
              delivery method whilst social distancing is enforced. This means
              that drivers will not hand you anything to sign and will sign on
              your behalf if delivered to your house and accepted by someone. If
              they are leaving the parcel on your doorstep or somewhere safe,
              they will take a photo of the blind. If the parcel is delivered to
              you or a neighbor, they will then sign on your behalf and may or
              may not leave a note. With deliveries, we receive proof of
              delivery from the courier (POD). In the unlikely event that we
              have a POD for your order, but you have not received it, we will
              be able to remake the blind for you, but we will not be able to
              issue a refund. We are sorry for any inconvenience this may cause,
              but due to COVID and delivery drivers trying to social distance
              where possible, this is our temporary update to our delivery terms
              and conditions.
            </p>
            <h5>6.1 Next Week Dispatch Service</h5>
            <p>
              Blinds offer next-week dispatch on specific products on our
              website. These are indicated by the 'Custom Made Next Week” icon
              on the product image and at the checkout. All you need to do is
              place your order with us before 10:00am and we guarantee to
              dispatch the blinds the same day, or the following working day
              (Monday-Friday 9-5) at the very latest, for next-week delivery.
              Orders placed after 10:00am will be leaving us the next working
              day. If we are unable to dispatch your blinds the within this
              timeframe, we will be in contact via email to inform you of when
              they are leaving. A signature is required for all deliveries and
              an attempted delivery on the given delivery date meets our Next
              Week delivery terms. Next day delivery is not guaranteed if events
              outside of our control occur, like snow, storms, and acts of God,
              that means our blinds can't be delivered on time. Please note, if
              you live in the Scottish Highlands, Northern Ireland then Next
              Week is still possible, however, may take more than 1 day to
              arrive at the provided address due to the logistics involved. Due
              to our manufacturing setup to bring you Next Week dispatch orders,
              we have to jump to the front of the manufacturing queue and so our
              normal 12-hour amendment grace period will not apply for these
              orders.
            </p>
            <h5>7. Defective, damaged goods, returns, and remakes.</h5>
            <p>
              All Blinds orders are checked throughout the manufacturing
              process for quality control and the prevention of any faults. If
              you should find any defects or issues with your order please email
              or call us within 7 days of receiving your order and we will
              arrange to correct this for you. We will require images of the
              defective blinds for our quality control. Altering the blinds will
              void any warranty on them. You have 7 days following receipt of
              your order to inform us of any defects, damages or manufacturing
              faults. If the order arrives damaged from the courier please mark
              on the delivery note damaged when signing for the order.
              Blinds will look at each case on a case-by-case basis to resolve
              any issues with your order. Due to the made to measure nature of
              these blinds, they cannot be returned and are exempt from the
              Consumer Contracts Regulations 2014. In the case we need to
              re-make the blind due to a manufacturing error, damage to the
              fabric or damage in transit, we can only remake the blind to the
              exact same specifications as originally requested. Blinds may
              request photos of any issues, or to collect the blind for
              inspection before offering a resolution. Please be aware if a
              blind is collected for inspection by Blinds this process can
              take up to 10 working days to collect, inspect and feedback on our
              checks. As we only sell online, we are unable to send anyone out
              to inspect or fix your blinds. Alterations cannot be made from the
              original order and is a like for like replacement. Blinds will
              not cover the cost, or contribute towards the cost of installation
              of our products personally, or if using a 3rd party contractor. If
              there are any production issues with our products we will remake
              and dispatch for you as soon as possible.
            </p>
            <p>
              Returns costs are paid by you, the customer, and it is your
              responsibility to ensure that goods returned arrive with us
              safely, very well packaged and in a saleable state. In the event
              of loss or damage in transit, it is your responsibility to claim
              compensation from the relevant courier company.
            </p>
            <h5>8. Guarantee</h5>
            <p>
              Blinds offers a lifetimewarranty on all blinds. This covers
              any defects on manufacturing, including fabrics and components.
              What is omitted from the warranty: Any fading, tears of damage to
              the fabric of the blind caused by sunlight or wear and tear,
              damage through misuse or mishandling of the blind, damage through
              incorrect installation. Blinds reserves the right to ask for
              photos of the blind, or for it to be returned for inspection prior
              to a replacement, repair or refund. This does not affect your
              statutory rights.
            </p>
            <h5>9. GDPR</h5>
            <p>
              Blinds stores all personal data in compliance with the General
              Data Protection Regulation (GDPR). We have a separate Privacy
              Policy that can also be viewed. We do not share your details with
              any 3rd parties for marketing purposes. We do need to share your
              data with selected and approved 3rd parties to complete your
              transaction, such as our manufacturing factories and courier
              firms. You can request a copy of any data we hold about you by
              phone or by email and can unsubscribe to any marketing emails at
              any time.
            </p>
            <h5>10. Other</h5>
            <p>
              Blinds reserves the right to cancel and refund your order if
              the following takes place: the fabric is discontinued without our
              knowledge, a pricing error on the website causes the product to be
              sold at below retail price or you have ordered from outside of our
              delivery areas; we have insufficient stock to make and deliver the
              goods ordered. In all these circumstances you will be contacted
              and be informed of the issue. If for any reason beyond our
              reasonable control, we are unable to supply a particular item, we
              will notify you as soon as possible. No discounts or compensation
              can be offered under these unforeseen circumstances. Blinds is
              the trading name of Blinds Limited, registered company number
              09680083. Personal information will not be shared with 3rd
              parties, and MakeMyBlinds will only contact you with offers and
              newsletters if you have given consent to us. You may unsubscribe
              from all emails at any point. All data collected about you will be
              held in compliance with the Data Protection Act 1998.
            </p>
            <p>
              The Company shall not be liable to the Customer for any indirect
              or direct consequential or special loss, damage, failure of
              service or injury whether foreseeable or not to the Customer or to
              the Customer’s property howsoever, whensoever or wheresoever
              arising out of the Customers purchase use or resale of the Goods
              or any breach of contract negligence or breach of any duty by the
              Company and in particular shall not be liable for financial loss,
              loss of profits, loss of business or contracts, loss of operating
              time or loss of use or liability to third parties.
            </p>
            <p>
              The Company in no circumstances whatsoever shall be liable for any
              direct or indirect loss or damage caused by or arising out of the
              supply and/or use of any goods supplied by the Company or caused
              by or arising out of any defect or failure in such Goods.
            </p>
            <p>
              The Customer shall fully indemnify the Company against all costs,
              losses, expenses and damages suffered or incurred by or awarded
              against the Company in respect of such claims. The Company shall
              not be under any liability whether under contract tort or
              otherwise in respect of defects in the Goods or failure to
              correspond to specification or sample or for injury damage or loss
              resulting from such defects or from any installation repair or any
              work done in connection therewith.
            </p>
            <h5>11. Discounts and Promotions</h5>
            <p>
              Blinds will periodically run time-sensitive offers on selected
              products in our catalog. These are limited-time offers and expire
              at midnight on the final day of the promotion. So, for example, an
              offer that runs for a whole month will end at 00:01 on the 1st of
              the new month. Likewise, an offer running on a Friday will expire
              at 00:01 on Saturday morning. Our promotions may either require a
              discount code to be applied to your basket on the 'Order
              Confirmation page or will automatically be applied to the product
              on sale. Please check before purchase to make sure the expected
              discount has been applied. All of our literature will explain what
              is needed for you to claim the discount. Blinds reserves the
              right to amend, alter and cancel promotions with no warning. We
              are unable to retrospectively apply discount codes to your orders,
              or hold the offer for you for longer than the advertised promotion
              period. Discount codes are not always valid across all product
              ranges and maybe product-specific. Social media prizes are
              redeemable within 12 months of winning unless otherwise stated at
              the point of the giveaway. Blinds does not allow for double
              discounting, so discount codes will not work on already discounted
              products on our site.
            </p>
            <p>
              Please note, discount codes will not work on certain products,
              previously or already site-discounted products - including
              PerfectFit, conservatory blinds, skylight blinds, and aluminum
              Venetian blind products. Unless we are running a free shipping
              offer, regular delivery charges still apply. Orders over £179 will
              receive free shipping. Our offers can not be used in conjunction
              with any other offer or discount. Discount codes are not able to
              be applied to already discounted products on the website.
              Blinds will periodically discount selected products on the website
              which will be indicated by the discount 'sticker' on the product
              image and the discount will show on the price generated once your
              sizes have been entered as this is automatically applied.
            </p>
            <h5>12. MeasureSure Cover</h5>
            <p>
              MeasureSure Cover is a mismeasurement policy you can take out on
              your order for an additional £9.99 at the checkout. This is an
              insurance policy against incorrectly measuring any blinds within
              your order.
            </p>
            <ul>
              <li>
                This is only available on made to measure blinds - ready-made
                blinds are exempt.
              </li>
              <li>
                You must let us know within 14 days of delivery that there is an
                issue with your blind size.
              </li>
              <li>
                The replacement must be exactly the same controls, fabric or
                blind style, the only change we can make is against the width
                and drop.
              </li>
              <li>
                If the cost of the replacement is more expensive, then there
                will be a balance due between the original size ordered and the
                new blind.
              </li>
              <li>
                MeasureSure Cover is not available for trade customers or
                wholesale orders.
              </li>
              <li>
                Should the new measurements be smaller than the original
                measurements, if we are able to, we will amend that item rather
                than manufacture a brand new item.
              </li>
              <li>
                Should you activate the MeasureSure Cover, you are liable to pay
                the delivery charge for the new order of £7.99.
              </li>
            </ul>
            {/* <h5>13. Klarna Finance</h5>
            <p>
              In cooperation with Klarna Bank AB (publ), Sveavägen 46, 111 34
              Stockholm, Sweden, we offer you the following payment options.
              Payment is to be made to Klarna:
            </p>
            <ul>
              <li>Pay Later.</li>
              <li>Slice it.</li>
            </ul>
            <p>
              Further information and Klarnas user terms you can find here.
              General information on Klarna you can find here. Your personal
              data is handled in accordance with applicable data protection law
              and in accordance with the information in Klarnas privacy
              statement.
            </p> */}
            <h5>13. Priority & Next Day Orders</h5>
            <p>
              Selected products are available from Blinds on a next day or
              priority shipment. This is indicated on selected products with the
              'Priority Dispatch' or 'Next Day' stickers. Also on the delivery
              times shown on the product page will give a countdown timer until
              the next cut-off and show an estimated delivery date. Priority
              blinds ordered before 10am are made that afternoon, dispatched
              either that evening or the following morning depending on size,
              postcode and courier. They are shipped on a next day service with
              either XDP, DX or DPD. Delays with the couriers are outside of our
              control and upon dispatch the same or next working day will mean
              that Blinds have completed their 'Priority Dispatch' contract
              with the customer. Courier delays are outside of our control and
              for this, we cannot offer compensation. This service is at no
              extra charge.
            </p>
            <p>
              Due to the quick manufacturing process to dispatch the same day,
              we will not be able to amend your priority blind order once
              placed. Priority dispatch blinds are excluded from our normal
              24-hour amendment window.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default TermsConditions;
