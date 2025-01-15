import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { Link, useHistory } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/loader";
import Skeliton from "../components/loadingSkeleton/Skeliton";
function Addresses() {
  const history = useHistory();

  const logeduser = useSelector((state) => state.user.currentUser);
  const id = logeduser._id;
  const [user, setUser] = useState({});
  const [getinfLoadding, setgetinfLoadding] = useState(true);

  useEffect(() => {
    publicRequest
      .get(`/user/find/${id}`)
      .then((response) => {
        setUser(response.data);
        setgetinfLoadding(false);
      })
      .catch((error) => {
        console.log(error);
      });
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

  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [adress, setadress] = useState("");
  const [Country, setCountry] = useState("United Kingdom");
  const [city, setcity] = useState("");
  const [zipcode, setzipcode] = useState("");
  const [pnumber, setpnumber] = useState("");

  const [ShowLoader, setShowLoader] = useState(false);

  const [postcode, setpostcode] = useState({});
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
  ));
  const handelcityToPostcode = async (e) => {
    const postalcode = e.target.value.toLowerCase();
    const allpostcode = await publicRequest.get(
      `/PostalDelivaryCost/postcode?city=${postalcode}`
    );
    setpostcode(allpostcode.data);
    setcity(postalcode);
  };
  const handelCitysvarification = async () => {
    const allpostcode = await publicRequest.get(
      `/PostalDelivaryCost/findIfExistCity/${city.toLowerCase()}`
    );
    if (allpostcode.data) {
      alert(allpostcode.data);
    } else {
      toast.error("This city is not available for the delivery as of now.");
      setcity("");
    }
  };
  const handelpostcode = (e) => {
    const postalcode = e.target.value.toUpperCase();
    if (city) {
      setzipcode(postalcode);
    } else {
      toast.error("You haven't add city name yet.");
    }
  };
  const handelPostcodesvarification = async () => {
    const allpostcode = await publicRequest.get(
      `/PostalDelivaryCost/findIfExistCityPostalcode/${city.toLowerCase()}/${zipcode}`
    );
    if (allpostcode.data) {
      alert(allpostcode.data);
    } else {
      toast.error("This Zipode is not available for the delivery as of now.");
      setzipcode("");
    }
  };
  const postcodeElements = Object.values(postcode).map((postcode) => (
    <option key={postcode} value={postcode}>
      {postcode}
    </option>
  ));

  const handeladdaddress = async (e) => {
    e.preventDefault();
    const submitButton = e.target.querySelector('button[type="submit"]');
    const submitButtonName = submitButton ? submitButton.name : "";
    setShowLoader(true);
    const address = {
      fname: fname,
      lname: lname,
      adress: adress,
      Country: Country,
      city: city,
      zipcode: zipcode,
      pnumber: pnumber,
    };
    if (submitButtonName === "addAddress") {
      await publicRequest
        .post(`/user/addAddress/${id}`, address)
        .then((response) => {
          setShowLoader(false);
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
          setShowLoader(false);
        });
    } else {
      await publicRequest
        .put(`/user/UpdateAddress/${id}/${GetaddressIDonEdit}`, address)
        .then((response) => {
          setShowLoader(false);
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
          setShowLoader(false);
        });
    }
  };
  const handelRemovaladdress = async (addresId) => {
    const removeaddress = window.confirm(
      "Are you sure? You want to remove this address!"
    );
    if (removeaddress) {
      await publicRequest
        .patch(`/user/removeExstingAddress?userId=${id}&addressId=${addresId}`)
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const [addToUpdate, setaddToUpdate] = useState(true);
  const [GetaddressIDonEdit, setGetaddressIDonEdit] = useState("");
  const handelUpdateaddress = async (assressId, e) => {
    const myElement = document.getElementById("addAddressHeadding");
    myElement.scrollIntoView();
    const filladdress = user.saveAddresses.find(
      (address) => address._id === assressId
    );
    setaddToUpdate(false);
    await publicRequest
      .get(`/PostalDelivaryCost/postcode?city=${filladdress.City}`)
      .then((response) => {
        setpostcode(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    setGetaddressIDonEdit(filladdress._id);
    setfname(filladdress.FirstName);
    setlname(filladdress.LastName);
    setadress(filladdress.Address);
    setcity(filladdress.City);
    setzipcode(filladdress.Postcode);
    setpnumber(filladdress.PhoneNo);
  };
  return (
    <div className="account-Setting-wrapper">
      <Navbar />
      <div className="account-Setting-container">
        <section className="section-pagetop">
          <div className="mainhedof-productlist">
            <h2>Addresses</h2>
            <button
              onClick={() => history.goBack()}
              className="big-btn bakbutton"
            >
              back
            </button>
          </div>
        </section>
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-11 col-lg-9 col-xl-8">
              <div className="account-Setting-list notisaccoutsettingpage">
                <div className="added-addreses-wrapper">
                  <div className="row">
                    {getinfLoadding ? (
                      <Skeliton type="Addressload" />
                    ) : (
                      user.saveAddresses &&
                      user.saveAddresses.map((address, index) => (
                        <div key={index} className="col-md-4 py-2">
                          <div className="added-address-singuler">
                            <div>
                              <p>
                                <b>
                                  {address.FirstName} {address.LastName}
                                </b>
                              </p>
                              <p>{address.Address}</p>
                              <p>
                                {address.Country} - {address.City} -{" "}
                                {address.Postcode}
                              </p>
                              <p>{address.PhoneNo}</p>
                            </div>
                            <div className="updateAdress">
                              <button
                                type="button"
                                onClick={(e) =>
                                  handelRemovaladdress(address._id, e)
                                }
                              >
                                Remove
                              </button>{" "}
                              <button
                                type="button"
                                onClick={(e) =>
                                  handelUpdateaddress(address._id, e)
                                }
                              >
                                Edit
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <div id="addAddressHeadding" className="addAddressHeadding">
                  <h4>Add New Address</h4>
                  {addToUpdate ? (
                    ""
                  ) : (
                    <button
                      className="addAddress-btn-from-update"
                      onClick={() => {
                        setaddToUpdate(true);
                        setpostcode("");
                        setfname("");
                        setlname("");
                        setadress("");
                        setcity("");
                        setzipcode("");
                        setpnumber("");
                      }}
                    >
                      Add New
                    </button>
                  )}
                </div>
                <form onSubmit={handeladdaddress}>
                  <div className="address-wrapper">
                    <div className="register-name-insert">
                      <div className="fname-box pr-1">
                        <input
                          type="text"
                          className="searchbox"
                          placeholder="First Name"
                          value={fname}
                          onChange={(e) => setfname(e.target.value)}
                          required
                        />
                      </div>
                      <div className="fname-box pl-1">
                        <input
                          type="text"
                          className="searchbox"
                          placeholder="Last Name"
                          value={lname}
                          onChange={(e) => setlname(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="addaddress-box">
                      <textarea
                        className="searchbox"
                        placeholder="Street Address"
                        rows="3"
                        required=""
                        lt-bind-click="true"
                        value={adress}
                        onChange={(e) => setadress(e.target.value)}
                        spellcheck="false"
                      ></textarea>
                    </div>
                    <div className="register-name-insert">
                      <div className="addaddress-box pr-1">
                        <input
                          type="text"
                          className="searchbox"
                          value="United Kingdom"
                          required
                        />
                      </div>
                      <div className="addaddress-box pl-1">
                        <input
                          type="text"
                          className="searchbox"
                          value={city}
                          onChange={(e) => setcity(e.target.value)}
                          onBlur={handelCitysvarification}
                          placeholder="City"
                          required
                        />
                        {/*  <select
                          className="searchbox"
                          required
                          value={city}
                          onChange={handelcityToPostcode}
                        >
                          <option>City</option>
                          {cityElements}
                        </select> */}
                      </div>
                    </div>
                    <div className="register-name-insert">
                      <div className="addaddress-box pr-1">
                        <input
                          type="text"
                          className="searchbox"
                          value={zipcode}
                          onChange={handelpostcode}
                          onBlur={handelPostcodesvarification}
                          placeholder="zipcode"
                          required
                        />
                        {/*  <select
                          className="searchbox"
                          required
                          value={zipcode}
                          onChange={(e) => setzipcode(e.target.value)}
                        >
                          <option>Postcode</option>
                          {postcodeElements}
                        </select> */}
                      </div>
                      <div className="phone-box pl-1">
                        <input
                          type="number"
                          className="searchbox"
                          placeholder="Mobile Number"
                          onKeyDown={handleKeyDown}
                          value={pnumber}
                          onChange={(e) => setpnumber(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="buttonssets">
                    <div className="buttonssets-inner">
                      {addToUpdate ? (
                        <button type="submit" name="addAddress">
                          {ShowLoader ? <Loader /> : "Add"}
                        </button>
                      ) : (
                        <button type="submit" name="UpdateAddress">
                          {ShowLoader ? <Loader /> : "Update"}
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addresses;
