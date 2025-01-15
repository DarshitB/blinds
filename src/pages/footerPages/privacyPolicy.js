import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
function PrivacyPolicy() {
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
            <h2>Blinds Privacy Policy</h2>
          </div>
        </section>
        <div className="footerpage-form-main-box">
          <div className="footerpage-detailes-side">
            <div className="footerpage-detailes-side-headding">
              <h2>Privacy And Cookie Policy</h2>
              <ol type="I" className="pt-3">
                <li>Privacy Policy</li>
                <li>Cookies Policy</li>
              </ol>
            </div>
            <h5 className="pt-2">I. PRIVACY POLICY</h5>
            <ol>
              <li>
                <h5 className="pt-2">Blinds APPROACH TO PRIVACY</h5>
                <p>
                  1.1 www.makemyblinds.co.uk is a website and a mobile
                  application (all together our “platform”) owned and operated
                  by Blinds Ltd of Fourth Way, Bristol, BS11 8DL (company
                  number 009680083) (“we”, “our”, “us”). We are committed to
                  protecting and respecting your privacy in accordance with the
                  applicable data protection legislation (the "Data Protection
                  Legislation"). This privacy policy (“Privacy Policy”) sets out
                  how we collect, use and share information that identifies you
                  or is associated with you (“personal data”).
                </p>
                <p>
                  1.2 For the purposes of the Data Protection Legislation, we
                  are the data controller of the personal data we collect and
                  process about you. If you have any questions related to this
                  Privacy Policy, please use the contact details provided in
                  section 13 below to get in touch. In addition, you can contact
                  our Data Privacy Manager at: dpa.officer@makemyblinds.co.uk
                </p>
                <p>
                  1.3 You should also be aware that we use cookies to store and
                  access information whilst providing access to our platform.
                  You can find out more about our use of cookies in our Cookies
                  Policy.
                </p>
              </li>
              <li>
                <h5 className="pt-2">PERSONAL DATA WE COLLECT ABOUT YOU</h5>
                <p>
                  2.1 We collect personal data from you when you voluntarily
                  submit information directly to us or via our platform. This
                  can include information you provide when you register to use
                  the platform, create an account on our platform, set up a
                  profile on Services and interact with other users, visit one
                  of our showrooms, use a tablet or similar device in one of our
                  showrooms, complete a form, provide feedback or reviews on our
                  products or platform, enter competitions through our platform,
                  correspond with us, purchase products from the platform,
                  subscribe to our email lists or respond to surveys or
                  promotions.
                </p>
                <p>
                  2.2 The categories of personal data we collect include the
                  following:
                </p>
                <ol type="a">
                  <li>
                    Contact details: Such as your name, your email address, your
                    telephone number and addresses associated with your account.
                  </li>
                  <li>
                    Profile information: Such as your contact details (as above)
                    and other any information you share when creating a profile
                    on Services.
                  </li>
                  <li>
                    Comments and opinions: Such as, comments and opinions you
                    share on Blinds services, when you provide feedback or
                    reviews on our products or platform, or when you respond to
                    our surveys, competitions and promotions.
                  </li>
                  <li>
                    Messages to us or between users: Messages you send to us
                    such as email and written correspondence and messages to
                    other users using Blinds services.
                  </li>
                  <li>
                    Payment and transaction information: Records of the products
                    and services you purchase from us and the payment method,
                    and credit/ debit card details, you use for the transaction.
                  </li>
                  <li>
                    Your preferences: Choices you make such as notification and
                    messaging preferences or choices about how the platform is
                    displayed.
                  </li>
                  <li>
                    Information about products you have looked at: We collect
                    information about the products that you have looked at on
                    the platform or in one of our showrooms, or that you have
                    added to your basket on the platform or to your wishlist on
                    a tablet or similar device in one of our showrooms.
                  </li>
                  <li>
                    Information about how you use and connect to the online
                    service:
                  </li>
                  <li>
                    We automatically collect information about how you use the
                    platform such as the pages and links you access, the time
                    you access the platform and duration you are on it, the
                    platform you come to the platform from or go to after
                    leaving the platform and selections and choices you make
                    when using the platform.
                  </li>
                  <li>
                    We also automatically collect information about the computer
                    or other electronic devices you use to connect to the
                    platform such as details about the type of device (which can
                    include unique device identifying numbers), its operating
                    system, browser and applications connected to the platform
                    through the device, your Internet service provider or mobile
                    network, your IP address and your device’s telephone number
                    (if it has one).
                  </li>
                  <li>
                    {" "}
                    Typically, the information we collect about how you use or
                    connect to the platform is associated with your device.
                  </li>
                  <li>
                    Information about your location: Other than information you
                    choose to provide to us, we do not collect information about
                    your precise location. Your device’s IP address may help us
                    determine an approximate location but this will be no more
                    precise than the city, state or country you are using your
                    device in.
                  </li>
                  <li>
                    {" "}
                    Information about the location of purchases: We will display
                    a catalogue image of any purchase made through our platform
                    on a searchable map as a way of showing the approximate
                    location of the delivery address which customers give when
                    making a purchase. We do not disclose any personal data on
                    our map and only display our catalogue image of the purchase
                    made by reference to the postcode of the delivery address.
                  </li>
                  <li>
                    Information provided by other users: Sometimes, other
                    visitors to our platform provide your personal data. For
                    example, other visitors may provide your personal data to us
                    when they invite you to use the platform or through Blinds services.
                  </li>
                  <li>
                    Information from fraud prevention organisations: Where
                    permitted by law, if fraudulent activity is suspected
                    relating to your account, we may be provided with
                    information by credit reference, fraud and crime prevention
                    organisations.
                  </li>
                </ol>
                <p>
                  2.3 We may also collect personal data about you from Facebook
                  via its Connect functionality: The received information
                  includes login details and profile information such as your
                  log-in token, user name and photo and other information from
                  that service as permitted by you and that service.
                </p>
              </li>
              <li>
                <h5>HOW WE USE YOUR INFORMATION</h5>
                <p>
                  3.1 We will also use your personal data for the purposes
                  specifically described below:
                </p>
                <ol type="a">
                  <li>
                    Contact details: we will use your contact details so that we
                    can communicate with you directly via phone, SMS messaging,
                    or email, in particular, about queries, issues, problems we
                    have detected or concerns you or other users have. We may
                    also use your contact details to send you information about
                    similar products and services that we think may be of
                    interest to you (such communications will be in accordance
                    with your marketing preferences as explained in more detail
                    in section 5 below).
                  </li>
                  <li>
                    Profile information: we use your profile information to
                    provide Blinds services to you and ensure that you are
                    able to interact with our users as permitted by the
                    functionality of the service and your preferences which you
                    can set by using the ‘my preference’ functionality on your
                    profile page.
                  </li>
                  <li>
                    Comments and opinions: we will use your comments and
                    opinions to determine similar products and services that may
                    be of interest to you and to provide our Blinds service
                    to you and ensure that you are able to interact with our
                    users as permitted by the functionality of the service and
                    your preferences which you can set by using the ‘my
                    preference’ functionality on your profile page.
                  </li>
                  <li>
                    Payment and transaction information: we will use payment and
                    transaction information you provide to process payment for
                    any product or service you purchase from us. We may also use
                    the history of your transactions with us to determine
                    similar products and services that may be of interest to
                    you.
                  </li>
                  <li>
                    Messages to us or other users: we will use messages you send
                    to us to help us respond to any query, issue or concern you
                    raise and to provide Blinds services to you and ensure
                    that you are able to interact with our users as permitted by
                    the functionality of the service and your preferences which
                    you can set by using the ‘my preference’ functionality on
                    your profile page.
                  </li>
                  <li>
                    Information about products you have looked at: we use this
                    information to send you reminders and further information
                    about these products. We will also use this information to
                    determine similar products and services that may be of
                    interest to you.
                  </li>
                  <li>
                    Information about how you use and connect to the online
                    service: we use this information to present the platform to
                    you on your device. We will also use this information to
                    determine similar topics, products and services that may be
                    of interest to you.
                  </li>
                  <li>
                    Information about your location: we may use an approximate
                    location to ensure content on the platform is relevant to
                    the city, state or country you are using your device in. We
                    will not collect or track your precise location without your
                    consent.
                  </li>
                  <li>
                    Information about the location of purchases: we use this
                    information to show what types of purchases are being made
                    in a particular area on a searchable map and to allow users
                    to contact other users about their purchases through
                    depending on your preferences which you can set by using the
                    ‘my preference’ functionality on your profile page.
                  </li>
                  <li>
                    Information provided by other users: we will use your
                    personal data that is contained in messages sent to us by
                    other user to respond to any query, issue or concern they
                    raise or to provide Blinds service to you and ensure
                    that you are able to interact with our users as permitted by
                    the functionality of the service and your preferences. We
                    will use your personal data that is contained in forms
                    submitted by other users to contact you, if you indicate you
                    would like to receive a communication from us.
                  </li>
                  <li>
                    Information about fraudulent activity relating to your
                    account: we will use information about fraudulent activity
                    relating to your account for the purposes of preventing
                    fraud or crime.
                  </li>
                  <li>
                    {" "}
                    All personal data on an aggregated basis: we will use all
                    the personal data we collect to: (i) monitor and improve the
                    platform and our procedures and processes; and (ii) to help
                    us develop new products and services.
                  </li>
                </ol>
                <p>
                  3.2 We may anonymise and aggregate any of the information we
                  collect (so that it does not identify you). We may use
                  anonymised information for purposes that include testing our
                  IT systems, research, data analysis, improving the platform,
                  developing new products and features or displaying information
                  about the purchases made via our platform such as the most
                  popular purchases or purchases based on an approximate
                  location.
                </p>
                <p>
                  3.3. We process your personal data (i) with your consent, (ii)
                  when we need to do this to fulfil a contract with you (for
                  example, the contract of sale), (iii) where we are required to
                  do this by law (for example, where it is necessary to retain
                  it in connection with potential litigation), and/or (iv) when
                  it is in our legitimate interests to do this and when these
                  interests are not overridden by your data protection rights.
                  For example, we have a legitimate interest in offering and
                  providing Made.co products and services, deter fraud and carry
                  out direct marketing.
                </p>
              </li>
              <li>
                <h5>INFORMATION WE SHARE WITH THIRD PARTIES</h5>
                <p>
                  4.1 We may share your personal data with the following
                  parties:
                </p>
                <ol type="a">
                  <li>
                    Our users: we and you may share your information with other
                    users as part of our services service so you are able to
                    interact with our users as permitted by the functionality of
                    the service and your preferences which you can set by using
                    the ‘my preference’ functionality on your profile page.
                  </li>
                  <li>
                    Companies in the same group of companies as us: our
                    subsidiaries (i.e. any organisation we own or control) or
                    our ultimate holding company (i.e. any organisation that
                    owns or controls us) and any subsidiaries it owns. These
                    companies will only use your personal data in the same way
                    as we can under this Privacy Policy.
                  </li>
                  <li>
                    Service providers, partners and advisors: third parties who
                    provide a service to us, partner with us on certain business
                    activities, advise us or that we work within other business
                    capacities. For example, we use a third party delivery
                    service to deliver any products you buy to your postal
                    address.
                  </li>
                  <li>
                    Purchasers of our business: personal data may be disclosed
                    or transferred to buyers or prospective buyers of our
                    business or any of our assets as part of the sale.
                  </li>
                  <li>
                    Law enforcement, regulators and other parties for legal
                    reasons: third parties who we are under a legal obligation
                    to disclose your personal data to or who we need to disclose
                    your personal data to protect our rights, property or safety
                    or the rights, property or safety of others, detect and
                    investigate illegal activities and breaches of any agreement
                    we have with you.
                  </li>
                </ol>
                <h6 className="pt-3">
                  <b>INFORMATION WE COLLECT FROM YOU</b>
                </h6>
                <p>
                  (a) We collect and process some or all of the following types
                  of information from you:
                </p>
                <ul>
                  <li>
                    Information that you provide when you apply for a role. This
                    includes information provided through an online job site,
                    via email, in person at interviews and/or by any other
                    method.
                  </li>
                  <li>
                    In particular, We process personal details such as name,
                    email address, address, qualifications, experience,
                    information relating to your employment history, skills and
                    experience that you provide to Makemyblinds.co.uk
                  </li>
                  <li>
                    {" "}
                    If you contact us, We may keep a record of that
                    correspondence.
                  </li>
                  <li>
                    {" "}
                    A record of your progress through any hiring process that We
                    may conduct.
                  </li>
                  <li>
                    Details of your visits to Makemyblinds.co.uk website
                    including, but not limited to, traffic data, location data,
                    weblogs and other communication data, the site that referred
                    you to Blinds website and the resources that you access.
                  </li>
                  <li>PURPOSES OF PROCESSING</li>
                </ul>
                <p>
                  (b) We use information held about you in the following ways:
                </p>
                <ul>
                  <li>
                    To consider your application in respect of a role for which
                    you have applied.
                  </li>
                  <li>
                    To consider your application in respect of other roles.
                  </li>
                  <li>
                    To communicate with you in respect of the recruitment
                    process.
                  </li>
                  <li>
                    To enhance any information that We receive from you with
                    information obtained from third party data providers.
                  </li>
                  <li>
                    To find appropriate candidates to fill Our job openings.
                  </li>
                  <li>
                    To help Our service providers (such as Blinds and its
                    processors and data providers) and partners (such as the job
                    sites through which you may have applied) improve their
                    services.
                  </li>
                  <li>KLARNA</li>
                </ul>
                <p>
                  (c) In order to be able to offer you Klarna’s payment options,
                  we will pass to Klarna certain of your personal information,
                  such as contact and order details, in order for Klarna to
                  assess whether you qualify for their payment options and to
                  tailor the payment options for you.
                </p>
                <p>
                  You can find general information on Klarna here. Your personal
                  data is handled in accordance with applicable data protection
                  laws and in accordance with the information in Klarna’s
                  privacy policy.
                </p>
                <p>
                  4.2 We do not disclose personal data to anyone else except as
                  set out above, where permitted by law and/or with your
                  consent. We may provide third parties with aggregate
                  statistical information and analytics about users of the
                  platform but we will make sure that no one can be identified
                  from this information before we disclose it.
                </p>
              </li>
              <li>
                <h5>MARKETING AND ADVERTISING</h5>
                <p>
                  5.1 Email Marketing - From time to time we may contact you by
                  email with information about our similar products and services
                  which we think you may be interested in if you agree [at the
                  point of registration / sale]. Thereafter, if you do not want
                  us to send you email marketing, please use the contact details
                  provided in section 13 below. You can also unsubscribe from
                  our marketing emails by clicking on the unsubscribe link in
                  the emails we send to you.
                </p>
                <p>
                  5.2 Email Notifications About Your Order or Changes to the
                  Services We Provide - We may send you email notifications in
                  relation to your order or changes to the way we provide our
                  services to you.
                </p>
                <p>
                  5.3 Advertising on the Site and other social media websites –
                  We, or our advertising partners, may show advertisements to
                  you on our platform or on other platforms. To do this we, or
                  our advertising partners, may collect information about how
                  you use the platform or the types of other web pages, content
                  and ads you, or others who are using the device you connect to
                  the platform, interact with, visit or view. The information
                  collected might also include the IP address of the device you
                  connect to the platform or the e-mail address you provide to
                  us or our platform. We, or our advertising partners, use the
                  information that is collected to make sure adverts you see
                  either on the platform or other platforms or apps (where our
                  partners have advertising space) are more relevant to you.
                </p>
                <p>
                  5.4 The techniques our advertising partners use recognise the
                  device or e-mail address you are using. Typically cookies and
                  similar technologies are used to provide this type of
                  advertising. You can find out more about cookies and how to
                  manage their use by reading our Cookies Policy.
                </p>
              </li>
              <li>
                <h5>STORING AND TRANSFERRING YOUR PERSONAL DATA</h5>
                <p>
                  6.1 International Transfers of your Personal data: the
                  personal data we collect may be transferred to and stored in
                  countries outside of the jurisdiction you are in, including,
                  in particular, outside the European Union. Some of these
                  jurisdictions offer differing levels of protection in respect
                  of personal data and may, in certain instances, be less
                  protective than the jurisdiction you are resident in. We
                  ensure that your personal data is treated securely and in
                  accordance with this Privacy Policy.
                </p>
                <p>
                  6.2 We put in place European Commission approved standard
                  contractual clauses or rely on alternative transfer mechanisms
                  to protect this data. A copy of these clauses is available for
                  your review upon request to us using the contact details
                  provided in section 12 below.
                </p>
              </li>
              <li>
                <h5>YOUR RIGHTS IN RESPECT OF YOUR PERSONAL DATA</h5>
                <p>
                  7.1 You may have various rights with respect to our use of
                  your personal data:
                </p>
                <p>
                  - Marketing: As stated above in section 5, you may opt-out of
                  receiving such emails from us by using the contact details
                  provided in section 13 below, or by clicking on the
                  unsubscribe link in the emails we send to you.
                </p>
                <p>
                  - Cookies: Please see our Cookies Policy for more information
                  about your rights as regards our use of cookies.
                </p>
                <p>
                  - Access, rectify, port, block, complete, delete and update:
                  You have the right to access, rectify, block, port, complete,
                  delete and update your personal data, and to restrict its use.
                  You also have the right to request further information about
                  the processing of your personal data.
                </p>
                <p>
                  - Object: In certain circumstances, you also have the right to
                  object to the processing of your personal data by us.
                </p>
                <p>
                  7.2 You can exercise the above rights by contacting us using
                  the details provided in section 13 below at any time. All
                  requests will be dealt with at the earliest opportunity and
                  any delay will be kept to a minimum.
                </p>
                <p>
                  7.3 There are exceptions to these rights; for example, access
                  may be refused if it would reveal personal data about another
                  person or if we are prevented from disclosing such information
                  by law.
                </p>
                <p>
                  7.4 We hope that we can satisfy queries you may have about the
                  way we process your data. However, if you have unresolved
                  concerns you also have the right to complain to the competent
                  data protection authority.
                </p>
                <p>
                  7.5 When we ask you to supply us with your personal data we
                  will make it clear whether the data we are asking for must be
                  supplied so that we can provide the products and services to
                  you, or whether the supply of any information we ask for is
                  optional.
                </p>
              </li>
              <li>
                <h5> HOW LONG DO WE KEEP YOUR INFORMATION?</h5>
                <p>
                  8.1 We will retain your information, whether or not your
                  account is active, for as long as we believe it is necessary
                  to fulfil our business purposes or to comply with applicable
                  law, audit requirements, regulatory requests or orders from
                  competent courts.
                </p>
              </li>
              <li>
                <h5>LINKS TO THIRD PARTY SITES</h5>
                <p>
                  9.1 The platform may, from time to time, contain links to and
                  from third party platforms of our partner networks,
                  advertisers, partner merchants, news publications, retailers
                  and affiliates. If you follow a link to any of these
                  platforms, please note that these platforms have their own
                  privacy policies and that we do not accept any responsibility
                  or liability for their policies. Please check the individual
                  policies before you submit any information to those platforms.
                </p>
              </li>
              <li>
                <h5>CHANGES TO THIS POLICY</h5>
                <p>
                  10.1 We may update this Privacy Policy from time to time, and
                  when we do so we will update the “last modified” date at the
                  top of this Privacy Policy. Regularly reviewing this page
                  ensures that you are always aware of what information we
                  collect, how we use it and under what circumstances, if any,
                  we will share it with other parties.
                </p>
              </li>
              <li>
                <h5>NOTICE TO YOU</h5>
                <p>
                  11.1 If we need to provide you with information about
                  something, whether for legal, or business related purposes, we
                  will select what we believe is the best way to get in contact
                  with you. We will usually do this through email or by placing
                  a notice on the platform. The fact that we may send notices to
                  you will not stop you from being able to opt out of certain
                  types of contact as described in this Privacy Policy.
                </p>
              </li>
              <li>
                <h5>CONTACTING US</h5>
                <p>
                  12.1 Questions, comments and requests regarding this Privacy
                  Policy are welcome and should be addressed to
                  privacy@makemyblinds.co.uk or Blinds, Fourth Way, BS11
                  8DL, Attn: Privacy Manager.
                </p>
              </li>
            </ol>
            <h5 className="pt-2">II. COOKIES POLICY</h5>
            <ol type="1">
              <li>
                <h5>SUMMARY</h5>
                <p>
                  This cookies policy explains what cookies are and how
                  Blinds Ltd (“we”, “us” or “our”) uses them on
                  www.makemyblinds.co.uk (our “platform”). We encourage you to
                  read the policy in full so that you can understand what
                  information we collect using cookies and how that information
                  is used.
                </p>
              </li>
              <li>
                <h5>WHAT ARE COOKIES OR SIMILAR TECHNOLOGIES?</h5>
                <p>
                  Cookies (or similar technologies) are text files, containing
                  small amounts of information, which are downloaded to your
                  browsing device (such as a computer or smartphone) when you
                  visit a platform. Cookies can be recognised by the platform
                  that downloaded them — or other platforms that use the same
                  cookies. This helps platforms know if the browsing device has
                  visited them before.
                </p>
              </li>
              <li>
                <h5>WHAT ARE COOKIES USED FOR?</h5>
                <p>
                  Cookies do lots of different jobs, like helping us understand
                  how our platform is being used, letting you navigate between
                  pages efficiently, remembering your preferences, and generally
                  improving your browsing experience. Cookies can also help
                  ensure information and advertising you see online is more
                  relevant to you and your interests.
                </p>
              </li>
              <li>
                <h5>WHAT TYPES OF COOKIES ARE USED BY Blinds?</h5>
                <p>
                  The types of cookies used on our platform can generally be put
                  into one of the following categories: strictly necessary;
                  analytics; functionality; advertising; and social media. You
                  can find out more about each of the cookie categories in the
                  table below.
                </p>
                <h6>
                  <b>Strictly Necessary Cookies</b>
                </h6>
                <p>
                  These cookies are essential to make our platform work. They
                  enable you to move around the platform and use its features.
                  Without these cookies, services that are necessary for you to
                  be able to use our platform such as accessing secure areas
                  cannot be provided.
                </p>
                <h6>
                  <b>Analytics Cookies</b>
                </h6>
                <p>
                  These cookies collect information about how people are using
                  our platform, for example, we use Google Analytics cookies to
                  help us understand which pages are visited the most often, how
                  people are moving from one link to another and if they get
                  error messages from certain pages. Overall, these cookies
                  provide us with analytical information about how our platform
                  is performing and how we can improve it.
                </p>
                <h6>
                  <b>Functionality Cookies</b>
                </h6>
                <p>
                  These cookies allow us to remember choices you make and tailor
                  our platform to provide enhanced features and content to you.
                  For example, these cookies can be used to remember your user
                  name, language choice or country selection, they can also be
                  used to remember changes you've made to text size, font and
                  other parts of pages that you can customise.
                </p>
                <h6>
                  <b>Advertising Cookies</b>
                </h6>
                <p>
                  These cookies are used to deliver advertisements that are more
                  relevant to you and your interests. They are also used to
                  limit the number of times you see an advertisement as well as
                  help measure the effectiveness of the advertising campaign.
                  They remember that you have visited a platform and this
                  information may be shared with other organisations such as
                  advertising partners. This means after you have been to our
                  platform you may see some advertisements about our services
                  elsewhere on the Internet.
                </p>
                <h6>
                  <b>Social Media Cookies</b>
                </h6>
                <p>
                  In order to enhance your internet experience and to make the
                  sharing of content easier, some of the pages on our platform
                  may contain tools or applications that are linked to third
                  party social media service providers such as Facebook or
                  Pinterest. Through these tools or applications the social
                  media service provider may set its own cookies on your device.
                  We do not control these cookies and you should check the
                  social media service provider’s platform for further details
                  about how they use cookies.
                </p>
              </li>
              <li>
                <h5>HOW LONG WILL COOKIES STAY ON MY BROWSING DEVICE?</h5>
                <p>
                  The length of time a cookie will stay on your browsing device
                  depends on whether it is a “persistent” or “session” cookie.
                  Session cookies will only stay on your device until you stop
                  browsing. Persistent cookies stay on your browsing device
                  after you have finished browsing until they expire or are
                  deleted.
                </p>
              </li>
              <li>
                <h5>FIRST AND THIRD-PARTY COOKIES</h5>
                <p>
                  “First party cookies” are cookies that belong to us and that
                  we place on your device. “Third-party cookies” are cookies
                  that another party places on your browsing device when you
                  visit our platform. You should check the third party’s website
                  for more information about how they use cookies.
                </p>
              </li>
              <li>
                <h5>HOW TO MANAGE COOKIES FROM THIS PLATFORM</h5>
                <p>
                  You can usually use the browser that you are viewing this
                  platform through to enable, disable or delete cookies. To do
                  this, follow the instructions provided by your browser
                  (usually located within the “Help”, “Tools” or “Edit”
                  settings). Please note that if you set your browser to disable
                  cookies, you may not be able to access secure areas of the
                  platform and other parts of the platform may also not work
                  properly.
                </p>
                <p>
                  Below are links to managing cookies and privacy in the most
                  popular browsers:
                </p>
                <a
                  href="https://support.apple.com/en-gb/HT201265"
                  target="_blank"
                >
                  - Apple iPhone Safari
                </a>
                <a
                  href="https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DAndroid&hl=en"
                  target="_blank"
                >
                  - Android Chrome
                </a>
                <a
                  href="https://support.google.com/chrome/answer/95647?hl=en-GB"
                  target="_blank"
                >
                  - Chrome
                </a>
                <a
                  href="https://support.mozilla.org/en-US/kb/delete-browsing-search-download-history-firefox"
                  target="_blank"
                >
                  - FireFox
                </a>
                <a
                  href="https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd"
                  target="_blank"
                >
                  - Internet Explorer Edge
                </a>
                <a
                  href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d"
                  target="_blank"
                >
                  - Internet Explorer
                </a>
                <p>
                  Some third parties may use Advertising Cookies to help gather
                  information about your browsing activity so that they can
                  deliver platform advertising to you that is relevant to your
                  interests. The advertising industries in EU have developed
                  schemes to help you opt-out of receiving cookies used for
                  these purposes. You can find out more about the EU scheme from
                  www.youronlinechoices.eu.
                </p>
              </li>
              <li>
                <h5>CHANGES</h5>
                <p>
                  Information about the cookies used by us may be updated from
                  time to time, so please check back on a regular basis for any
                  changes. The last modification date of this document is shown
                  at the top of this page.
                </p>
              </li>
              <li>
                <h5>QUESTIONS? </h5>
                <p>
                  Questions, comments and requests regarding this Cookies Policy
                  are welcome and should be addressed to
                  privacy@makemyblinds.co.uk or Blinds, Fourth Way, Bristol,
                  BS11 8DL Attn: Privacy Manager.
                </p>
              </li>
            </ol>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default PrivacyPolicy;
