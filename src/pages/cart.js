import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import { Link, useHistory, useLocation } from "react-router-dom";
import { baseUrlForMedia, publicRequest } from "../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import {
  removeProduct,
  decreaseCart,
  increaseCart,
  emptyCart,
} from "../redux/cartRedux";
import Model from "../components/model";
import { PayPalButton } from "react-paypal-button-v2";
import { toast } from "react-toastify";
import axios from "axios";
import Navbar from "../components/navbar";
import Skeliton from "../components/loadingSkeleton/Skeliton";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
function Cart() {
  const cart = useSelector((state) => state.cart);

  const [ViewD, setViewD] = useState({});
  const logeduser = useSelector((state) => state.user.currentUser);
  const id = logeduser?._id;
  const [userforAddress, setuserforAddress] = useState({});
  const [getinfLoadding, setgetinfLoadding] = useState(true);

  useEffect(() => {
    if (id) {
      publicRequest
        .get(`/user/find/${id}`)
        .then((response) => {
          setuserforAddress(response.data);
          setgetinfLoadding(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const handleKeyDown = (event) => {
    if (
      event.key === "Backspace" ||
      event.key === "ArrowLeft" ||
      event.key === "Tab" ||
      event.key === "ArrowRight"
    ) {
      return;
    }
    if (!/\d/.test(event.key)) {
      event.preventDefault();
    }
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
    }
  };

  const [aponitmentPackDate, setaponitmentPackDate] = useState();
  useEffect(() => {
    publicRequest
      .get(`/orders/appointments`)
      .then((response) => {
        setaponitmentPackDate(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [aponitmentPackDate]);
  const viewDetailes = (e) => {
    const proId = e.target.name;
    const perticulerpid = e.target.id;
    setViewD({
      perpro: perticulerpid,
    });
  };

  (function () {
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    Date.prototype.getDayName = function () {
      return days[this.getDay()];
    };
  })();

  const current = new Date();
  const standardDate = current.getDate();
  const nextMpnth = new Date(
    current.getFullYear(),
    current.getMonth() + 1,
    standardDate
  );

  const currentformaxdateinsto = new Date();
  const standardDateMaxDateinsto = currentformaxdateinsto.getDate();
  const nextMpnthMaxDateForTntalation = new Date(
    currentformaxdateinsto.getFullYear(),
    currentformaxdateinsto.getMonth() + 2,
    standardDateMaxDateinsto
  );
  const [mindatefroinstalationcalender, setmindatefroinstalationcalender] =
    useState(nextMpnth);
  const [maxdatefroinstalationcalender, setmaxdatefroinstalationcalender] =
    useState(nextMpnthMaxDateForTntalation);

  const standerdmonth = nextMpnth.toLocaleString("default", { month: "short" });
  const standerddayname = nextMpnth.getDayName();

  const nextweek = current;
  nextweek.setDate(nextweek.getDate() + 1 * 14);
  const nextweekforintalationMaxDate = new Date();
  nextweekforintalationMaxDate.setDate(
    nextweekforintalationMaxDate.getDate() + 1 * 44
  );

  const NextWeekDate = nextweek.getDate();
  const NextWeekmonth = nextweek.toLocaleString("default", { month: "short" });
  const nextdayname = nextweek.getDayName();
  const nextdayYear = nextweek.getFullYear();
  const [delivarydate, setDelivarydate] = useState(
    standardDate + " " + standerdmonth + "," + standerddayname
  );
  const ordarinfcurrent = new Date();
  const [Currentdate, setCurrentdate] = useState(
    ordarinfcurrent.getDate() +
      " " +
      ordarinfcurrent.toLocaleString("default", { month: "short" }) +
      "," +
      ordarinfcurrent.getDayName()
  );
  const currentYear = current.getFullYear();
  const [delivaryname, setDelivaryname] = useState("Standard Delivery");
  const [delivarycost, setDelivarycost] = useState(0.0);

  const [ExVetcost, setExVetcost] = useState(cart.total);
  const Vet = 20;
  var INvatcostwoutdiscount = parseFloat(ExVetcost) + (ExVetcost * 20) / 100;
  const [INvatcost, setINvatcost] = useState(INvatcostwoutdiscount);

  const [stddelivary, setstdDelivary] = useState(0.0);
  const [stddelivaryc, setstdDelivaryc] = useState(0.0);
  const [nextdaydelivary, setnextdayDelivary] = useState(0.0);
  useEffect(() => {
    if (INvatcost < 300.0) {
      if (delivaryname === "Standard Delivery") {
        setDelivarycost(4.99);
      } else if (delivaryname === "Next Week Dispatch") {
        setDelivarycost(19.98);
      }
      setnextdayDelivary(19.98);
      setstdDelivaryc(4.99);
      setstdDelivary(4.99);
    } else {
      if (delivaryname === "Standard Delivery") {
        setDelivarycost(0.0);
      } else if (delivaryname === "Next Week Dispatch") {
        setDelivarycost(14.99);
      }
      setnextdayDelivary(14.99);
      setstdDelivaryc(0.0);
      setstdDelivary(0.0);
    }
  }, [stddelivary]);
  const [DiscountCoupen, setDiscountCoupen] = useState(0);
  useEffect(() => {
    if (INvatcost > 2000.0) {
      const discountedValue =
        INvatcostwoutdiscount - (INvatcostwoutdiscount * 5) / 100;
      setINvatcost(parseFloat(discountedValue.toFixed(2)));
    }
  }, [INvatcost]);
  const [Installationapointdate, setInstallationapointdate] = useState();
  const [Installationname, setInstallationname] = useState("");

  const [instalcheck, setInstallcheck] = useState(false);
  const [Installationcost, setInstallationcost] = useState(0);
  const handleinstal = () => {
    setInstallcheck(!instalcheck);
    if (instalcheck !== false) {
      let Operatingbyname = document.querySelector(
        "input[type=radio][name=installlocation]:checked"
      );
      if (Operatingbyname.checked) {
        Operatingbyname.checked = false;
      }
      INvatcost = INvatcost - Installationcost;
      setInstallationapointdate(null);
      setInstallationname("");
      setInstallationcost(0);
    }
  };

  const [openmodel, setopenmodel] = useState(false);
  const hanlearea = (e) => {
    const areaname = e.target.id;
    setInstallationapointdate(null);
    if (areaname !== "none") {
      setInstallationname(areaname);
      setopenmodel(true);
      document.body.style.overflow = "hidden";
      if (areaname === "Bedfordshire") {
        setInstallationcost(19);
      } else if (areaname === "Cambridgeshire") {
        setInstallationcost(20);
      } else if (areaname === "Staffordshire") {
        setInstallationcost(21);
      } else if (areaname === "Surrey") {
        setInstallationcost(22);
      } else if (areaname === "Lancashire") {
        setInstallationcost(23);
      } else if (areaname === "London") {
        setInstallationcost(24);
      } else if (areaname === "Cornwall") {
        setInstallationcost(25);
      } else if (areaname === "none") {
        setInstallationcost(30);
      } else {
        setInstallationcost(0);
      }
    }
  };

  const delivarymethod = (e) => {
    const value = e.target.value;
    if (value === "Standard Delivery") {
      setDelivaryname(value);
      setDelivarycost(stddelivaryc);
      setmindatefroinstalationcalender(nextMpnth);
      setmaxdatefroinstalationcalender(nextMpnthMaxDateForTntalation);
      setDelivarydate(
        standardDate + " " + standerdmonth + "," + standerddayname
      );
    } else if (value === "Next Week Dispatch") {
      setDelivaryname(value);
      setDelivarycost(nextdaydelivary);
      setmindatefroinstalationcalender(nextweek);
      setmaxdatefroinstalationcalender(nextweekforintalationMaxDate);
      setDelivarydate(NextWeekDate + " " + NextWeekmonth + "," + nextdayname);
    }

    setInstallcheck(false);
    setInstallationapointdate(null);
    setInstallationname("");
    setInstallationcost(0);
  };
  /*  console.log("min", mindatefroinstalationcalender);
  console.log("max", maxdatefroinstalationcalender); */
  const srolllocation = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [srolllocation]);
  const dispatch = useDispatch();
  const [apiPostcodecost, setapiPostcodecost] = useState(4.99);
  const handaledelproduct = (producttodel) => {
    dispatch(removeProduct(producttodel));
    setExVetcost(
      (
        cart.total -
        producttodel.Pricewithaddition * producttodel.Qtyvalue
      ).toFixed(2)
    );
    var afterDeletecost =
      parseInt(
        (
          cart.total -
          producttodel.Pricewithaddition * producttodel.Qtyvalue
        ).toFixed(2)
      ) +
      ((
        cart.total -
        producttodel.Pricewithaddition * producttodel.Qtyvalue
      ).toFixed(2) *
        20) /
        100;
    if (afterDeletecost < 300.0) {
      if (delivaryname === "Standard Delivery") {
        setDelivarycost(apiPostcodecost);
      } else if (delivaryname === "Next Week Dispatch") {
        setDelivarycost(apiPostcodecost + 14.99);
      }
      setnextdayDelivary(apiPostcodecost + 14.99);
      setstdDelivaryc(apiPostcodecost);
    }
    setINvatcost(afterDeletecost);
  };

  const handelDecreas = (productwhole, e) => {
    e.preventDefault();
    const minus = dispatch(decreaseCart(productwhole));
    if (minus) {
      if (minus.payload.Qtyvalue > 1) {
        setExVetcost((cart.total - minus.payload.Pricewithaddition).toFixed(2));
        var chanedcost =
          parseInt((cart.total - minus.payload.Pricewithaddition).toFixed(2)) +
          ((cart.total - minus.payload.Pricewithaddition).toFixed(2) * 20) /
            100;

        if (chanedcost < 300.0) {
          if (delivaryname === "Standard Delivery") {
            setDelivarycost(apiPostcodecost);
          } else if (delivaryname === "Next Week Dispatch") {
            setDelivarycost(apiPostcodecost + 14.99);
          }
          setnextdayDelivary(apiPostcodecost + 14.99);
          setstdDelivaryc(apiPostcodecost);
        }
        if (chanedcost > 2000.0) {
          const discountedValue = chanedcost - (chanedcost * 5) / 100;
          setINvatcost(parseFloat(discountedValue.toFixed(2)));
        } else {
          setINvatcost(chanedcost);
        }
      }
    }
  };
  const handleIncrease = (productwhole, e) => {
    e.preventDefault();
    const plus = dispatch(increaseCart(productwhole));
    if (plus) {
      setExVetcost((cart.total + plus.payload.Pricewithaddition).toFixed(2));
      var chanedcost =
        parseInt((cart.total + plus.payload.Pricewithaddition).toFixed(2)) +
        ((cart.total + plus.payload.Pricewithaddition).toFixed(2) * 20) / 100;
      if (chanedcost > 300.0) {
        if (delivaryname === "Standard Delivery") {
          setDelivarycost(0.0);
        } else if (delivaryname === "Next Week Dispatch") {
          setDelivarycost(14.99);
        }
        setstdDelivaryc(0.0);
        setnextdayDelivary(14.99);
      }
      if (chanedcost > 2000.0) {
        const discountedValue = chanedcost - (chanedcost * 5) / 100;
        setINvatcost(parseFloat(discountedValue.toFixed(2)));
      } else {
        setINvatcost(chanedcost);
      }
    }
  };
  const user = useSelector((state) => state.user.currentUser);
  const [skdredy, setsdkredy] = useState({
    Payment: "",
    adress: "",
    Country: "",
    city: "",
    fname: "",
    lname: "",
    pnumver: "",
    zipcode: "",
  });
  const [isaddscript, setisaddscript] = useState(false);
  const [paymentmethod, setpaymentmethod] = useState();
  /*   const [postcode, setpostcode] = useState({});
   */ const handaleaddresschnage = async (addressid, e) => {
    setchckoutpayment(false);
    const filladdress = userforAddress.saveAddresses.find(
      (address) => address._id === addressid
    );
    const newData = {
      adress: filladdress.Address,
      Country: filladdress.Country,
      city: filladdress.City,
      fname: filladdress.FirstName,
      lname: filladdress.LastName,
      pnumver: filladdress.PhoneNo,
      zipcode: filladdress.Postcode,
    };
    const postalcodePrice = await publicRequest.get(
      `/PostalDelivaryCost?postcode=${filladdress.Postcode}`
    );
    if (postalcodePrice.data) {
      const postalstddelPrice = postalcodePrice.data.delivaryCost;
      const postalnextdelPrice = postalcodePrice.data.delivaryCost + 14.99;
      setapiPostcodecost(postalstddelPrice);

      if (INvatcost < 300.0) {
        if (delivaryname === "Standard Delivery") {
          setDelivarycost(postalstddelPrice);
        } else if (delivaryname === "Next Week Dispatch") {
          setDelivarycost(postalnextdelPrice);
        }
        setstdDelivaryc(postalstddelPrice);
        setnextdayDelivary(postalnextdelPrice);
      }
    }
    setsdkredy((prevState) => ({
      ...prevState,
      ...newData,
    }));
  };
  const [billingAdd, setBillingAdd] = useState({
    adress: "",
    Country: "",
    city: "",
    fname: "",
    lname: "",
    pnumver: "",
    zipcode: "",
  });
  const handalebillingaddresschnage = (addressid, e) => {
    setchckoutpayment(false);
    const filladdress = userforAddress.saveAddresses.find(
      (address) => address._id === addressid
    );
    const newData = {
      adress: filladdress.Address,
      Country: filladdress.Country,
      city: filladdress.City,
      fname: filladdress.FirstName,
      lname: filladdress.LastName,
      pnumver: filladdress.PhoneNo,
      zipcode: filladdress.Postcode,
    };
    setBillingAdd((prevState) => ({
      ...prevState,
      ...newData,
    }));
  };
  const handelepayoption = async (e) => {
    const { name, value } = e.target;
    setsdkredy({ ...skdredy, [name]: value });
    /* if (e.target.name === "city") {
      const postalcode = e.target.value.toLowerCase();
      const allpostcode = await publicRequest.get(
        `/PostalDelivaryCost/postcode?city=${postalcode}`
      );
      setpostcode(allpostcode.data);
    }
    if (e.target.name === "zipcode") {
      const postalcode = e.target.value.toUpperCase();
      const postalcodePrice = await publicRequest.get(
        `/PostalDelivaryCost?postcode=${postalcode}`
      );
      if (postalcodePrice.data) {
        const postalstddelPrice = postalcodePrice.data.delivaryCost;
        const postalnextdelPrice = postalcodePrice.data.delivaryCost + 14.99;
        setapiPostcodecost(postalstddelPrice);
        if (INvatcost < 300.0) {
          if (delivaryname === "Standard Delivery") {
            setDelivarycost(postalstddelPrice);
          } else if (delivaryname === "Next Week Dispatch") {
            setDelivarycost(postalnextdelPrice);
          }
          setstdDelivaryc(postalstddelPrice);
          setnextdayDelivary(postalnextdelPrice);
        } else {
          if (delivaryname === "Standard Delivery") {
            setDelivarycost(0.0);
          } else if (delivaryname === "Next Week Dispatch") {
            setDelivarycost(14.99);
          }
          setstdDelivaryc(0.0);
          setnextdayDelivary(14.99);
        }
      } else {
        if (INvatcost < 300.0) {
          if (delivaryname === "Standard Delivery") {
            setDelivarycost(4.99);
          } else if (delivaryname === "Next Week Dispatch") {
            setDelivarycost(19.98);
          }
          setnextdayDelivary(19.98);
          setstdDelivaryc(4.99);
        } else {
          if (delivaryname === "Standard Delivery") {
            setDelivarycost(0.0);
          } else if (delivaryname === "Next Week Dispatch") {
            setDelivarycost(14.99);
          }
          setstdDelivaryc(0.0);
          setnextdayDelivary(14.99);
        }
      }
    } */
  };
  /* const postcodeElements = Object.values(postcode).map((postcode) => (
    <option key={postcode} value={postcode}>
      {postcode}
    </option>
  )); 
  const [cities, setcities] = useState({});
  useEffect(() => {
    const allcites = publicRequest
      .get(`/PostalDelivaryCost/city`)
      .then((response) => setcities(response.data))
      .catch((error) => console.error(error));
  }, []);
  const cityElements = Object.values(cities).map((city) => (
    <option key={city} value={city}>
      {city.charAt(0).toUpperCase() + city.slice(1)}
    </option>
  ));*/
  useEffect(() => {
    if (
      skdredy.Payment !== "" &&
      skdredy.adress !== "" &&
      skdredy.city !== "" &&
      skdredy.fname !== "" &&
      skdredy.lname !== "" &&
      skdredy.pnumver !== "" &&
      skdredy.zipcode !== "" &&
      user !== null
    ) {
      if (skdredy.Payment === "Paypal") {
        setpaymentmethod(skdredy.Payment);
        setisaddscript(true);
      } else {
        setpaymentmethod(skdredy.Payment);
        setisaddscript(false);
      }
    }
  }, [skdredy]);

  const [notlogin, setnotlogin] = useState(true);
  const [chckoutpayment, setchckoutpayment] = useState(false);
  const handelvalidetclick = () => {
    if (!user) {
      setnotlogin(false);
      toast.error("You need to login first to place the order.");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else if (skdredy.adress === "") {
      toast.error("You have not selected a shipping address.");
    } else if (billingAdd.adress === "") {
      toast.error("You have not selected a billing address.");
    } else {
      setchckoutpayment(true);
    }
  };
  const handelordersubmit = (e) => {
    e.preventDefault();
  };
  /*  cart.products.forEach((pro) => {
    console.log(pro.Chain?.optionData || null);
  }); */
  var PayebleAmount = (INvatcost + delivarycost + Installationcost).toFixed(2);
  const history = useHistory();
  const succeespayment = async (paymentresult, data) => {
    if (paymentresult.status === "COMPLETED") {
      const orderdetailes = {
        orderID: data.orderID,
        orderDate: Currentdate + " " + currentYear,
        deliveryDate: delivarydate + " " + nextdayYear,
        userId: user._id,
        produts: cart.products.map((item) => ({
          productId: item._id,
          productcost: item.Pricewithaddition,
          Width: item.width,
          Drop: item.drop,
          type: item.type[0],
          /* ----- */
          pleatSize: item.pleat?.optionData,
          Track: item.SelectTrack?.optionData,
          /* ----- */
          ControlOption: item.Control?.optionData,
          FabricOption: item.Fabric.optionData,
          /* ----- */
          /*           Headrail: item.Headrail?.optionData || null,
            OneTouchUpSystem: item.OneTouchUp?.optionData || null,
          PlainCassette: item.PlainCassette?.optionData || null,*/
          AddSystem: item.AddSystem?.optionData || null,
          /* --- */
          ChainControl: item.Chain?.optionData || null,
          OpeningDirection: item.Stacking?.optionData || null,
          MountingBracket: item.Mount?.optionData || null,
          BallChainHook: item.Hanger?.optionData || null,
          MetelBallChain: item.Metel?.optionData || null,
          /*  */
          DecoraruveCassette: item.Cassette?.optionData || null,
          /*  */
          ClutchOperating: item.Clutch?.optionData || null,
          MotorisedBottomDownSystem: item.BottomDown?.optionData || null,
          DayNight: item.DayNight?.optionData || null,
          TopDownBottomUpSystem: item.TopDownBottomUp?.optionData || null,
          /*  */
          OneTouchDownSystem: item.OneTouchDown?.optionData || null,
          LiningOption: item.LiningOption?.optionData || null,
          /*  */
          OperatingSystem: [
            {
              Motorised: item.SelectMotores?.Motorecode,
              Remote: item.SelectRemote?.Remotecode,
              Accessories: item.SelectAccessories?.Accessoriescode,
            },
          ],
          quantity: item.Qtyvalue,
        })),
        amount: PayebleAmount,
        ShippingAddress: [
          {
            FirstName: skdredy.fname,
            LastName: skdredy.lname,
            Address: skdredy.adress,
            City: skdredy.city,
            Postcode: skdredy.zipcode,
            PhoneNo: skdredy.pnumver,
            Email: user.email,
          },
        ],
        BillingAddress: [
          {
            FirstName: billingAdd.fname,
            LastName: billingAdd.lname,
            Address: billingAdd.adress,
            City: billingAdd.city,
            Postcode: billingAdd.zipcode,
            PhoneNo: billingAdd.pnumver,
            Email: user.email,
          },
        ],
        shipingMathod: delivaryname,
        shipingCost: delivarycost,
        installationServices: [
          {
            installationArea: Installationname,
            Appointment: Installationapointdate,
            cost: Installationcost,
          },
        ],
        subTotalIncVAt: INvatcost.toFixed(2),
        Discount: INvatcostwoutdiscount > 2000 ? "5%" : "0%",
        paymentMethod: "Paypal",
        Status: paymentresult.status,
      };
      history.push("/success", {
        paypalData: paymentresult,
        paypalMoreData: data,
        order: orderdetailes,
      });
    } else {
      toast.error("Something went wrong payment is not succeeded");
    }
  };
  const maynewfunction = (details, data) => {
    console.log("status", details);
    console.log("orderID", data);
  };
  return (
    <>
      <div className="caret-main-wapper">
        <Navbar />
        {/* <div className="navbar navbar-expand-lg flex-column">
          <div className="topNav row">
            <div className="logodiv col-md-2">
              <Link className="navbar-brand" to="/">
                <img
                  src="/assets/img/logobgw.png"
                  className="navbar-logo"
                  alt=""
                />
              </Link>
            </div>
          </div>
        </div> */}
        <div className="top-div-shoping-cart">
          <section className="section-pagetop">
            {cart.total === 0 ? (
              <div
                className="container-fluid mainhedof-productlist d-flex flex-column justify-content-center align-items-center"
                style={{ height: "80vh" }}
              >
                <h2>There is no Product in Cart Add Some...</h2>
                <Link to="/blindlist" className="noproductincart">
                  Add some Blinds to cart
                </Link>
              </div>
            ) : (
              <div className="container-fluid mainhedof-productlist">
                <h2>Sopping Cart</h2>
              </div>
            )}
          </section>
          {cart.total !== 0 ? (
            <div className="container-fluid shopingcartdetailes">
              <form onSubmit={handelordersubmit}>
                <div className="row">
                  <div className="col-lg-8">
                    <div
                      className={`login-detiles login-a ${
                        notlogin ? "" : "notvalicate"
                      }`}
                    >
                      <div className="w-75">
                        <h4>Login*</h4>
                        <p className="m-0">
                          {user ? "My Name - " + user.username : ""}
                        </p>
                      </div>
                      <div className="w-25 ">
                        {user ? (
                          ""
                        ) : (
                          <Link to="/login/from_Cart">
                            <button className="change-login-btn" type="button">
                              Login
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>
                    <div className="login-detiles Shipping-b">
                      <div className="w-100">
                        <h4>Shipping Address*</h4>
                        <div className="addreses-wrapper">
                          <div className="row m-0">
                            {user ? (
                              getinfLoadding ? (
                                <Skeliton type="Addressload" />
                              ) : (
                                userforAddress.saveAddresses &&
                                userforAddress.saveAddresses.map(
                                  (address, index) => (
                                    <div
                                      key={"Shipping" + index}
                                      className="col-md-4 py-2 position-relative"
                                    >
                                      <input
                                        type="radio"
                                        id={address.FirstName + index}
                                        name="Addres"
                                        className="address-inputtag"
                                        onChange={(e) =>
                                          handaleaddresschnage(address._id, e)
                                        }
                                        required
                                        /*  value={items[4]}
                                  title={items[2]} */
                                      />
                                      <label
                                        htmlFor={address.FirstName + index}
                                      >
                                        <div className="added-address-singuler">
                                          <div>
                                            <p>
                                              <b>
                                                {address.FirstName}{" "}
                                                {address.LastName}
                                              </b>
                                            </p>
                                            <p>{address.Address}</p>
                                            <p>
                                              {address.Country} - {address.City}{" "}
                                              - {address.Postcode}
                                            </p>
                                            <p>{address.PhoneNo}</p>
                                          </div>
                                        </div>
                                      </label>
                                    </div>
                                  )
                                )
                              )
                            ) : (
                              <p
                                className="text-center m-0 bg-light py-5"
                                style={{ borderRadius: "14px" }}
                              >
                                Log in for more details and make order.
                              </p>
                            )}
                            <div className="col-md-12 mt-3">
                              {user ? (
                                <Link to="/account/Addresses">
                                  <button className="add-adress-btn">
                                    Add new address
                                  </button>
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                        {/*  <div className="d-flex mt-4 mb-3">
                          <div className="namebox pr-1">
                            <input
                              type="text"
                              className="searchbox fname"
                              placeholder="First Name"
                              name="fname"
                              onChange={handelepayoption}
                              required
                            />
                          </div>
                          <div className="namebox pl-1">
                            <input
                              type="text"
                              className="searchbox sname"
                              placeholder="Last Name"
                              name="lname"
                              onChange={handelepayoption}
                              required
                            />
                          </div>
                        </div>
                        <textarea
                          placeholder="Street Address"
                          className="address-box mb-3 sadress"
                          maxlength="255"
                          onChange={handelepayoption}
                          name="adress"
                        ></textarea>
                        <div className="d-flex mb-3">
                          <div className="namebox pr-1">
                            <input
                              type="text"
                              className="searchbox"
                              placeholder="Country"
                              name="country"
                              value="United Kingdom"
                              required
                            />
                          </div>
                          <div className="namebox pl-1">
                          
                            <select
                              className="searchbox city"
                              placeholder="City"
                              onChange={handelepayoption}
                              name="city"
                              required
                            >
                              <option>City</option>
                              {cityElements}
                            </select>
                          </div>
                        </div>
                        <div className="d-flex mb-3">
                          <div className="namebox pr-1">
                            <select
                              className="searchbox zipcode"
                              placeholder="Postcode"
                              name="zipcode"
                              onChange={handelepayoption}
                              required
                            >
                              <option>Postcode</option>
                              {postcodeElements}
                            </select>
                          </div>
                          <div className="namebox pl-1">
                            <input
                              type="text"
                              className="searchbox pnumber"
                              placeholder="Phone Number"
                              name="pnumver"
                              onChange={handelepayoption}
                              required
                            />
                          </div>
                        </div> */}
                      </div>
                    </div>
                    <div className="login-detiles Billing-c">
                      <div className="w-100">
                        <h4>Billing Address*</h4>
                        <div className="addreses-wrapper">
                          <div className="row m-0">
                            {user ? (
                              getinfLoadding ? (
                                <Skeliton type="Addressload" />
                              ) : (
                                userforAddress.saveAddresses &&
                                userforAddress.saveAddresses.map(
                                  (address, index) => (
                                    <div
                                      key={"Billing" + index}
                                      className="col-md-4 py-2 position-relative"
                                    >
                                      <input
                                        type="radio"
                                        id={
                                          "billing" + address.FirstName + index
                                        }
                                        name="billingAddres"
                                        className="address-inputtag"
                                        onChange={(e) =>
                                          handalebillingaddresschnage(
                                            address._id,
                                            e
                                          )
                                        }
                                        required
                                        /*  value={items[4]}
                                  title={items[2]} */
                                      />
                                      <label
                                        htmlFor={
                                          "billing" + address.FirstName + index
                                        }
                                      >
                                        <div className="added-address-singuler">
                                          <div>
                                            <p>
                                              <b>
                                                {address.FirstName}{" "}
                                                {address.LastName}
                                              </b>
                                            </p>
                                            <p>{address.Address}</p>
                                            <p>
                                              {address.Country} - {address.City}{" "}
                                              - {address.Postcode}
                                            </p>
                                            <p>{address.PhoneNo}</p>
                                          </div>
                                        </div>
                                      </label>
                                    </div>
                                  )
                                )
                              )
                            ) : (
                              <p
                                className="text-center m-0 bg-light py-5"
                                style={{ borderRadius: "14px" }}
                              >
                                Log in for more details and make order.
                              </p>
                            )}
                            <div className="col-md-12 mt-3">
                              {user ? (
                                <Link to="/account/Addresses">
                                  <button className="add-adress-btn">
                                    Add new address
                                  </button>
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="login-detiles Shipping-d">
                      <div className="w-100">
                        <h4>Shipping Method</h4>
                        <div className="d-flex mt-4">
                          <div className="Brackets-box">
                            <input
                              type="radio"
                              id="ceiling"
                              value="Standard Delivery"
                              name="Brackets"
                              onChange={delivarymethod}
                            />
                            <label htmlFor="ceiling">
                              Standard Delivery - £{stddelivaryc}
                            </label>
                          </div>
                          <div className="Brackets-box">
                            <input
                              type="radio"
                              id="wall"
                              name="Brackets"
                              value="Next Week Dispatch"
                              onChange={delivarymethod}
                            />
                            <label htmlFor="wall">
                              Next Week Dispatch - £{nextdaydelivary}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="login-detiles installation-e">
                      <div className="w-100">
                        <h4>Installation Services</h4>
                        <div className=" mt-4">
                          <div className="Brackets-box">
                            <input
                              type="radio"
                              id="installation"
                              name="installation"
                              onClick={handleinstal}
                              checked={instalcheck}
                            />
                            <label htmlFor="ceiling">
                              Click to add blind installation service
                            </label>
                          </div>
                          <div
                            className={`Brackets-box instalation-bracket-box ${
                              instalcheck ? "show" : ""
                            }`}
                          >
                            <div
                              className={`instlation-areabox ${
                                instalcheck ? "show" : ""
                              }`}
                            >
                              <div className="mb-3">
                                <p className="select-loc-head m-0">
                                  Select Your Area{" "}
                                </p>
                                <span>
                                  {Installationapointdate
                                    ? " (Appointment date - " +
                                      Installationapointdate +
                                      " And Area - (" +
                                      Installationname +
                                      "))"
                                    : ""}
                                </span>
                              </div>
                              <div className="instlation-areabox-innerbox">
                                <div className="locatoinselector-box">
                                  <input
                                    type="radio"
                                    name="installlocation"
                                    id="Bedfordshire"
                                    checked={
                                      Installationname === "Bedfordshire"
                                    }
                                    onChange={hanlearea}
                                  />
                                  <label htmlFor="Bedfordshire">
                                    Bedfordshire
                                  </label>
                                </div>
                                <div className="locatoinselector-box">
                                  <input
                                    type="radio"
                                    name="installlocation"
                                    id="Cambridgeshire"
                                    checked={
                                      Installationname === "Cambridgeshire"
                                    }
                                    onChange={hanlearea}
                                  />
                                  <label htmlFor="Cambridgeshire">
                                    Cambridgeshire
                                  </label>
                                </div>
                                <div className="locatoinselector-box">
                                  <input
                                    type="radio"
                                    name="installlocation"
                                    id="Staffordshire"
                                    checked={
                                      Installationname === "Staffordshire"
                                    }
                                    onChange={hanlearea}
                                  />
                                  <label htmlFor="Staffordshire">
                                    Staffordshire
                                  </label>
                                </div>
                                <div className="locatoinselector-box">
                                  <input
                                    type="radio"
                                    name="installlocation"
                                    id="Surrey"
                                    checked={Installationname === "Surrey"}
                                    onChange={hanlearea}
                                  />
                                  <label htmlFor="Surrey">Surrey</label>
                                </div>
                                <div className="locatoinselector-box">
                                  <input
                                    type="radio"
                                    name="installlocation"
                                    id="Lancashire"
                                    checked={Installationname === "Lancashire"}
                                    onChange={hanlearea}
                                  />
                                  <label htmlFor="Lancashire">Lancashire</label>
                                </div>
                                <div className="locatoinselector-box">
                                  <input
                                    type="radio"
                                    name="installlocation"
                                    id="London"
                                    checked={Installationname === "London"}
                                    onChange={hanlearea}
                                  />
                                  <label htmlFor="London">London</label>
                                </div>
                                <div className="locatoinselector-box">
                                  <input
                                    type="radio"
                                    name="installlocation"
                                    id="Cornwall"
                                    checked={Installationname === "Cornwall"}
                                    onChange={hanlearea}
                                  />
                                  <label htmlFor="Cornwall">Cornwall</label>
                                </div>
                                <div className="locatoinselector-box">
                                  <input
                                    type="radio"
                                    name="installlocation"
                                    id="none"
                                    checked={Installationname === "none"}
                                    onChange={hanlearea}
                                  />
                                  <label htmlFor="none">
                                    none of the above
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="login-detiles order-summery-amount">
                      <div className="w-100">
                        <h4>Order Summary</h4>
                        {cart.products.map((product, index) => (
                          <div key={"CartProduct" + index}>
                            <div className="orderd-items mt-4">
                              <div className="orderd-item-img">
                                <img
                                  alt=""
                                  src={`${baseUrlForMedia}images/febrickBlind/${product.img[0]}`}
                                />
                              </div>
                              <div className="order-item-name">
                                <h6 className="m-0">{product.title}</h6>
                                <div className="mt-2 d-flex">
                                  <button
                                    onClick={(e) => handleIncrease(product, e)}
                                    className="qty-plus-btns"
                                  >
                                    +
                                  </button>
                                  <input
                                    type="type"
                                    value={product.Qtyvalue}
                                    className="qty-number-box"
                                  />
                                  <button
                                    onClick={(e) => handelDecreas(product, e)}
                                    className="qty-minus-btns"
                                  >
                                    -
                                  </button>
                                  <button
                                    className="product-delele-btn"
                                    onClick={() => handaledelproduct(product)}
                                  >
                                    <div
                                      className="d-flex justify-content-center align-item-center"
                                      style={{ width: "50px" }}
                                    >
                                      <img
                                        src="/assets/img/delet-i.png"
                                        alt=""
                                      />
                                    </div>
                                  </button>
                                </div>
                              </div>
                              <div className="order-items-price">
                                <h6 className="m-0">
                                  £
                                  {(
                                    product.Pricewithaddition * product.Qtyvalue
                                  ).toFixed(2)}
                                </h6>
                              </div>
                            </div>
                            <div className="order-moredetailes">
                              <div className="blanck-space"></div>
                              <div className="ordermore-detiles">
                                <h6 className="m-0 mb-1">
                                  <input
                                    type="button"
                                    value="View Detailes"
                                    className="viewmorebtn"
                                    name={product._id}
                                    onClick={viewDetailes}
                                    id={product.randomnumber}
                                  />
                                </h6>
                                {ViewD.perpro === product.randomnumber ? (
                                  <>
                                    <p className="m-0 text-capitalize">
                                      <span>Width :</span> {product.width} MM |{" "}
                                      <span>Drop :</span> {product.drop} MM |{" "}
                                      {product.type[0] === "Colby" ? (
                                        <>
                                          <span>
                                            {product.pleat.OptionName} :
                                          </span>{" "}
                                          {product.pleat.optionData} |{" "}
                                        </>
                                      ) : (
                                        ""
                                      )}
                                      {product.type[0] === "Panel" ? (
                                        <>
                                          <span>
                                            {product.SelectTrack.OptionName} :
                                          </span>{" "}
                                          {product.SelectTrack.optionData} |{" "}
                                        </>
                                      ) : (
                                        ""
                                      )}
                                      {product.type[0] !== "Roman Skylight" &&
                                      product.type[0] !== "Colby Skylight" ? (
                                        <>
                                          <span>
                                            {product.Control.OptionName} :
                                          </span>{" "}
                                          {product.Control.optionData} |{" "}
                                        </>
                                      ) : (
                                        ""
                                      )}
                                      <span>{product.Fabric.OptionName} :</span>{" "}
                                      {product.Fabric.optionData} |{" "}
                                      {product.type[0] === "Vertical" ||
                                      product.type[0] === "Sierra" ||
                                      product.type[0] === "Panel" ? (
                                        <>
                                          <span>
                                            {product.Chain.OptionName} :
                                          </span>{" "}
                                          {product.Chain.optionData}|{" "}
                                          <span>
                                            {product.Stacking.OptionName} :
                                          </span>{" "}
                                          {product.Stacking.optionData} |{" "}
                                        </>
                                      ) : (
                                        ""
                                      )}
                                      {product.type[0] !== "Roman Skylight" &&
                                      product.type[0] !== "Colby Skylight" ? (
                                        <>
                                          <span>
                                            {product.Mount.OptionName} :
                                          </span>{" "}
                                          {product.Mount.optionData} |{" "}
                                          <span>
                                            {product.Hanger.OptionName} :
                                          </span>{" "}
                                          {product.Hanger.optionData} |{" "}
                                          {product.type[0] !== "Wooden" &&
                                          product.type[0] !== "Aric" ? (
                                            <>
                                              <span>
                                                {product.Metel.OptionName} :
                                              </span>{" "}
                                              {product.Metel.optionData} |{" "}
                                            </>
                                          ) : (
                                            ""
                                          )}
                                        </>
                                      ) : (
                                        ""
                                      )}
                                      {product.type[0] === "Roller" ? (
                                        <>
                                          {/*  <span>
                                            {product.OneTouchUp.OptionName} :
                                          </span>{" "}
                                          {product.OneTouchUp.optionData} |{" "}
                                          <span>
                                            {product.Headrail.OptionName} :
                                          </span>{" "}
                                          {product.Headrail.optionData} |{" "} 
                                          <span>
                                            {product.PlainCassette.OptionName} :
                                          </span>{" "}
                                          {product.PlainCassette.optionData} |{" "}*/}
                                          <span>
                                            {product.AddSystem.OptionName} :
                                          </span>{" "}
                                          {product.AddSystem.optionData} |{" "}
                                        </>
                                      ) : (
                                        ""
                                      )}
                                      {product.type[0] === "Meliso" ||
                                      product.type[0] === "Luzon" ||
                                      product.type[0] === "Dorren" ||
                                      product.type[0] === "Grayson" ? (
                                        <>
                                          <span>
                                            {product.Cassette.OptionName} :
                                          </span>{" "}
                                          {product.Cassette.optionData} |{" "}
                                        </>
                                      ) : (
                                        ""
                                      )}
                                      {product.type[0] === "Colby" ? (
                                        <>
                                          <span>
                                            {product.Clutch.OptionName} :
                                          </span>{" "}
                                          {product.Clutch.optionData} |{" "}
                                          <span>
                                            {product.DayNight.OptionName} :
                                          </span>{" "}
                                          {product.DayNight.optionData} |{" "}
                                          <span>
                                            {product.TopDownBottomUp.OptionName}{" "}
                                            :
                                          </span>{" "}
                                          {product.TopDownBottomUp.optionData} |{" "}
                                          <span>
                                            Motorised Bottom Down System :
                                          </span>{" "}
                                          {product.SelectMotores.MotoreHead} -{" "}
                                          {product.SelectMotores.Motorecode} ,{" "}
                                          {product.SelectRemote.RemoteHead} -{" "}
                                          {product.SelectRemote.Remotecode},{" "}
                                          {
                                            product.SelectAccessories
                                              .AccessoriesHead
                                          }{" "}
                                          -{" "}
                                          {
                                            product.SelectAccessories
                                              .Accessoriescode
                                          }
                                        </>
                                      ) : (
                                        ""
                                      )}
                                      {product.type[0] === "Roman" ? (
                                        <>
                                          <span>
                                            {product.OneTouchDown.OptionName} :
                                          </span>{" "}
                                          {product.OneTouchDown.optionData} |{" "}
                                          <span>
                                            {product.LiningOption.OptionName} :
                                          </span>{" "}
                                          {product.LiningOption.optionData} |{" "}
                                        </>
                                      ) : (
                                        ""
                                      )}
                                      {product.type[0] !== "Colby" &&
                                      product.type[0] !== "Aric" ? (
                                        <>
                                          <span>{"Operating System"} :</span>{" "}
                                          {product.SelectMotores.MotoreHead} -{" "}
                                          {product.SelectMotores.Motorecode} ,{" "}
                                          {product.SelectRemote.RemoteHead} -{" "}
                                          {product.SelectRemote.Remotecode},{" "}
                                          {product.type[0] !==
                                            "Roman Skylight" &&
                                          product.type[0] !==
                                            "Colby Skylight" ? (
                                            <>
                                              {
                                                product.SelectAccessories
                                                  .AccessoriesHead
                                              }{" "}
                                              -{" "}
                                              {
                                                product.SelectAccessories
                                                  .Accessoriescode
                                              }
                                            </>
                                          ) : (
                                            ""
                                          )}
                                        </>
                                      ) : (
                                        ""
                                      )}
                                    </p>
                                  </>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </div>
                        ))}

                        <hr />
                        <table className="table-of-order-prices">
                          <tr>
                            <th>Vat</th>
                            <td>+{Vet}%</td>
                          </tr>
                          {INvatcostwoutdiscount > 2000 ? (
                            <tr>
                              <th>Discount</th>
                              <td>-5%</td>
                            </tr>
                          ) : (
                            ""
                          )}
                          <tr>
                            <th>Sub Total Inc. Vat</th>
                            <td>£{INvatcost.toFixed(2)}</td>
                          </tr>
                          <tr>
                            <th>
                              <span>Delivery With</span>
                              <span>{delivaryname}</span>
                            </th>
                            <td>
                              <div className="tooltip-box-container">
                                <div className="tooltip-box">
                                  <div className="tooltip-box-container">
                                    <i
                                      className="fa fa-info-circle"
                                      aria-hidden="true"
                                    ></i>{" "}
                                  </div>
                                  <span className="tooltiptext">
                                    Free standard delivery for{" "}
                                    <b>Sub Total Inc. Vat</b> is more than £300.
                                  </span>
                                </div>
                                <span> +£{delivarycost}</span>
                              </div>
                            </td>
                          </tr>
                          {instalcheck ? (
                            <tr>
                              <th>
                                <span>Installation At</span>
                                <span>
                                  {Installationname} {Installationapointdate}
                                </span>
                              </th>
                              <td>+£{Installationcost}</td>
                            </tr>
                          ) : (
                            ""
                          )}
                          <tr>
                            <th>
                              <hr />
                            </th>
                            <td>
                              <hr />
                            </td>
                          </tr>
                          <tr className="totalcostbold">
                            <th>
                              <span className="maintotal">Total</span>
                              <span>Estimated Delivery Date:</span>
                              <span className="delivarydate">
                                {delivarydate}
                              </span>
                            </th>
                            <td>£{PayebleAmount}</td>
                          </tr>
                        </table>
                        <div className="button-forplacingorder">
                          {isaddscript ? (
                            <div className="pypal-btn-container">
                              {/*  <div className="paypal-btn">
                                <PayPalButton
                                  amount={PayebleAmount}
                                  onSuccess={succeespayment}
                                  currency="GBP"
                                />
                              </div> */}
                              <button className="order-pace" disabled>
                                Proceed to Payment
                              </button>
                            </div>
                          ) : (
                            <button
                              className="order-pace"
                              type="submit"
                              onClick={handelvalidetclick}
                            >
                              Proceed to Payment
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    {chckoutpayment ? (
                      <div className="login-detiles Payment-f">
                        <div className="w-100">
                          <h4>Payment Method*</h4>
                          <div className="mt-4">
                            <PayPalScriptProvider
                              options={{
                                "client-id":
                                  "AS6kLn9scYSzE57NLjQv12OdZTumoaDRn5PkXm0e16A_NEP3_FmjsDpw9pO6fX-Uew55dRzDnKMZyZus",
                                components: "buttons",
                                currency: "GBP",
                              }}
                            >
                              <div>
                                <PayPalButtons
                                  forceReRender={[PayebleAmount, "GBP"]}
                                  createOrder={(data, actions) => {
                                    return actions.order
                                      .create({
                                        purchase_units: [
                                          {
                                            amount: {
                                              currency_code: "GBP",
                                              value: PayebleAmount,
                                            },
                                          },
                                        ],
                                        application_context: {
                                          shipping_preference: "NO_SHIPPING", // Disable shipping address fields
                                          user_action: "PAY_NOW",
                                          payment_method: {
                                            payer_selected: "PAYPAL",
                                            payee_preferred:
                                              "IMMEDIATE_PAYMENT_REQUIRED",
                                          },
                                          no_shipping: 1, // Remove billing address fields
                                          address_override: 1,
                                        },
                                        payer: {
                                          name: {
                                            given_name: billingAdd.fname, // Prefill first name
                                            surname: billingAdd.lname, // Prefill last name
                                          },
                                          email_address: user.email, // Provide a valid email address
                                          phone: {
                                            phone_type: "MOBILE",
                                            phone_number: {
                                              national_number:
                                                billingAdd.pnumver, // Provide a valid phone number
                                            },
                                          },
                                          address: {
                                            address_line_1: billingAdd.adress, // Prefill address line 1
                                            address_line_2: "", // Prefill address line 2 (optional)
                                            admin_area_2: billingAdd.city, // Prefill city
                                            admin_area_1: "GB", // Prefill state
                                            postal_code: billingAdd.zipcode, // Prefill postal code
                                            country_code: "GB", // Prefill country code
                                          },
                                        },
                                      })
                                      .then((orderId) => {
                                        // Your code here after creating the order
                                        return orderId;
                                      });
                                  }}
                                  onApprove={(data, actions) => {
                                    return actions.order
                                      .capture()
                                      .then((details) => {
                                        succeespayment(details, data);
                                      })
                                      .catch((error) => {
                                        toast.error("Payment failed");
                                        console.log(error);
                                      });
                                  }}
                                />
                              </div>
                            </PayPalScriptProvider>

                            {/* <div className="payment-options ">
                            <input
                              type="radio"
                              id="Credit"
                              name="Payment"
                              value="Credit"
                              onChange={handelepayoption}
                              required
                            />
                            <label htmlFor="Credit">
                              {" "}
                              &nbsp;&nbsp;&nbsp;
                              <img
                                src="/assets/img/card-i.svg"
                                alt=""
                                className="caditcardimg"
                              />{" "}
                              &nbsp; Credit Card
                            </label>
                          </div>
                          <div className="payment-options p-0">
                            <input
                              type="radio"
                              id="Paypal"
                              name="Payment"
                              value="Paypal"
                              onChange={handelepayoption}
                              required
                            />
                            <label htmlFor="Paypal">
                              {" "}
                              &nbsp;&nbsp;&nbsp;
                              <img
                                src="/assets/img/paypal-i.svg"
                                alt=""
                                className="caditcardimg"
                              />{" "}
                              &nbsp; Paypal
                            </label>
                          </div> */}
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </form>
            </div>
          ) : (
            ""
          )}
          <Footer />
        </div>
      </div>
      {openmodel ? (
        <Model
          closemodel={setopenmodel}
          modelheading="Available dates for Installation"
          areaname={Installationname}
          setapointdate={setInstallationapointdate}
          mindateOfCalender={mindatefroinstalationcalender}
          maxdateOfCalender={maxdatefroinstalationcalender}
          DisableingDate={aponitmentPackDate}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default Cart;
