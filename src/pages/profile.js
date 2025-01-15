import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { baseUrlForMedia, publicRequest } from "../requestMethods";
import { CircularProgress } from "@material-ui/core";
import Loader from "../components/loader";

function ProfileSettings() {
  /*   const user = useSelector((state) => state.user.currentUser);
   */ const logeduser = useSelector((state) => state.user.currentUser);
  const id = logeduser._id;
  const [user, setUser] = useState([]);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [Image, setImage] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    publicRequest
      .get(`/user/find/${id}`)
      .then((response) => {
        setLoading(false);
        setUser(response.data);
        setUsername(response.data.username);
        setEmail(response.data.email);
        setImage(response.data.profileImage);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const [ShowLoader, setShowLoader] = useState(false);

  const history = useHistory();
  const [selectedProfileImages, setSelectedProfileImages] = useState(null);
  const handleProfileImage = (e) => {
    const prodilefiles = e.target.files[0];
    if (prodilefiles.size <= 1024 * 1024) {
      if (prodilefiles && prodilefiles.type.startsWith("image/")) {
        setSelectedProfileImages(prodilefiles);
      } else {
        toast.error(
          `Sorry but this is not an image, just an image is allowed.`
        );
      }
    } else {
      toast.error(`Image size is more than 1MB, it should be less than 1MB.`);
    }
  };
  const handelProfilesetting = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    const ProfileData = new FormData();
    ProfileData.append("username", username);
    ProfileData.append("profileImage", selectedProfileImages);
    if (username.length > 0) {
      await publicRequest
        .put(`/user/profile/${user._id}`, ProfileData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log(response);
          toast.success(
            `Success, You are successfully updated ProfileSetting.`
          );
          setShowLoader(false);
          window.location.reload();
        })
        .catch((error) => {
          setShowLoader(false);
          console.log(error.response.data);
          toast.error(`Error, Something Went Wrong ${error}`);
        });
    }
  };

  return (
    <div className="account-Setting-wrapper">
      <Navbar />
      <div className="account-Setting-container">
        <section className="section-pagetop">
          <div className="mainhedof-productlist">
            <h2>Profile Setting</h2>
            <button
              onClick={() => history.goBack()}
              className="big-btn bakbutton"
            >
              back
            </button>
          </div>
        </section>
        {loading ? (
          <div className="loadding-for-api">
            <CircularProgress />
          </div>
        ) : (
          <div className="container-fluid">
            <div className="row justify-content-center align-items-center">
              <div className="col-md-11 col-lg-9 col-xl-8">
                <div className="account-Setting-list notisaccoutsettingpage">
                  <form onSubmit={handelProfilesetting}>
                    <div className="form-detailes-profile">
                      <div className="profile-image-selectore">
                        <div className="upload-mimg-wrapper">
                          <label
                            htmlFor="ProfileImage"
                            className="upload-produc-img-label"
                          >
                            {selectedProfileImages !== null ? (
                              <img
                                src={URL.createObjectURL(selectedProfileImages)}
                                alt={`Prodile Image`}
                              />
                            ) : Image ? (
                              <img
                                src={`${baseUrlForMedia}images/profiles/${Image}`}
                                alt="profile image"
                              />
                            ) : (
                              "Add Profile Picture"
                            )}
                          </label>
                          <input
                            type="file"
                            id="ProfileImage"
                            name="ProfileImage"
                            onChange={handleProfileImage}
                            className="searchbox"
                          />
                        </div>
                      </div>
                      <div className="updationdatauser-name">
                        <div className="fname-box pr-1">
                          <input
                            type="text"
                            className="searchbox"
                            value={username}
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                          />
                        </div>
                        <div className="email-box pr-1">
                          <input
                            type="text"
                            className="searchbox"
                            value={email}
                            placeholder="Email"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <div className="buttonssets">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="buttonssets-inner">
                            <button type="submit">
                              {ShowLoader ? <Loader /> : "Submit"}
                            </button>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="buttonssets-inner">
                            <Link to="/account/ChangePassword">
                              <button type="buttom">Change Password</button>
                            </Link>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="buttonssets-inner">
                            <Link to="/account/Addresses">
                              <button type="button">Add Addresses</button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileSettings;
