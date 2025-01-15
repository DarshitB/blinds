import React, { useEffect, useState } from "react";
import "../adminStyle.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  baseUrlForMedia,
  publicRequest,
  userRequest,
} from "../../../requestMethods";
import { toast } from "react-toastify";
import Loader from "../../../components/loader";
function AdminEditFabric() {
  const location = useLocation();
  const history = useHistory();
  const id = location.pathname.split("/")[4];
  const [loading, setLoading] = useState(true);
  const [ShowLoader, setShowLoader] = useState(false);
  const [Fabricname, setFabricname] = useState("");
  const [FabricWithNum, setFabricWithNum] = useState("");
  const [Febrics, setFebrics] = useState();

  useEffect(() => {
    userRequest
      .get(`/Fabrics/${id}`)
      .then((response) => {
        setFebrics(response.data);
        setFabricname(response.data.fabric);
        setFabricWithNum(response.data.fabricName);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleFabricChange = (e) => {
    setFabricname(e.target.value);
  };
  const handleFabricWithNumChange = (e) => {
    setFabricWithNum(e.target.value);
  };

  const [selectedFabricImages, setSelectedFabricImages] = useState(null);
  const handelFabricImage = (e) => {
    e.preventDefault();

    const confirmaddimage = window.confirm(
      "Are you sure you want to Update this Fabric image? if you say yes it will change the existing image."
    );
    if (confirmaddimage) {
      const Fabricfiles = e.target.files[0];
      if (Fabricfiles && Fabricfiles.type.startsWith("image/")) {
        setSelectedFabricImages(Fabricfiles);
      } else {
        alert("Sorry but this is not an image, just an image is allowed.");
      }
    } else {
      return false;
    }
  };
  const handleFabricImageRemoval = () => {
    setSelectedFabricImages(null);
  };

  const [selectedImages, setSelectedImages] = useState([]);
  const handleImageChange = (e) => {
    const files = e.target.files;

    const fileArray = Array.from(files);
    const validImageFiles = fileArray.filter((file) =>
      file.type.startsWith("image/")
    );
    setSelectedImages((prevSelectedImages) => [
      ...prevSelectedImages,
      ...validImageFiles,
    ]);
  };
  const handleImageRemoval = (image, event) => {
    event.preventDefault();
    setSelectedImages((prevSelectedImages) =>
      prevSelectedImages.filter((selectedImage) => selectedImage !== image)
    );
  };

  const handleblindImageRemoval = (img, event) => {
    event.preventDefault();
    const result = window.confirm(
      "Are you sure It will remove the Blind image directly from this Fabric, so keep that in mind."
    );
    if (result) {
      userRequest
        .patch(
          `/Fabrics/removeExstingblideImage?fabricId=${Febrics._id}&Imagename=${img}`
        )
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoader(true);
    const userdata = new FormData();
    userdata.append("fabric", Fabricname);
    userdata.append("fabricName", FabricWithNum);
    userdata.append("fabImg", selectedFabricImages);
    Array.from(selectedImages).forEach((item) => {
      userdata.append("img", item);
    });
    if (!(Febrics.img.length === 0 && selectedImages.length === 0)) {
      userRequest
        .put(`/Fabrics/${Febrics._id}`, userdata, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log(response);
          toast.success(`Success, You are successfully updated a Fabric.`);
          setShowLoader(false);
          history.push("/admin/All-Fabrics");
        })
        .catch((error) => {
          toast.error(`Error, Something Went Wrong ${error}`);
        });
    } else {
      alert("Blind images is empty.");
      setShowLoader(false);
    }
  };
  if (loading) {
    return (
      <div className="loadding-for-api-admin">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="Edit-product-wrapper">
      <div className="productTitleContainer">
        <h1 className="productTitle">Edit Product</h1>
      </div>
      <div className="Edit-product-form-container">
        <form onSubmit={handleSubmit} enctype="multipart/form-data">
          <div className="filed-box">
            <div className="inner-col">
              <label htmlFor="Fabric" className="product-field-label">
                Fabric
              </label>
              <input
                type="text"
                id="Fabric"
                name="Fabric"
                className="searchbox"
                defaultValue={Fabricname}
                onChange={handleFabricChange}
                required
              />
            </div>
            <div className="inner-col">
              <label htmlFor="BasePrice" className="product-field-label">
                Fabric Name
              </label>
              <input
                type="text"
                id="FabricName"
                name="FabricName"
                className="searchbox"
                defaultValue={FabricWithNum}
                onChange={handleFabricWithNumChange}
                required
              />
            </div>
          </div>
          <div className="filed-box">
            <div className="inner-col">
              <label htmlFor="Type" className="product-field-label">
                Type
              </label>
              <input
                type="text"
                id="Type"
                name="Type"
                className="searchbox"
                defaultValue={Febrics.type}
                required
                disabled
              />
            </div>
            <div className="inner-col">
              <label htmlFor="band" className="product-field-label">
                band
              </label>
              <input
                type="text"
                id="band"
                name="band"
                className="searchbox"
                defaultValue={Febrics.band}
                required
                disabled
              />
            </div>
          </div>
          <div className="filed-box">
            <div className="inner-col">
              <label className="product-field-label">
                Blind Image <br />
                <span>
                  ( Note: select the blind image which will show on the main
                  page according to the selection of the fabric. )
                </span>
              </label>
              <div className="upload-img-systam">
                {Febrics.img.map((img, index) => {
                  return (
                    <div key={index} className="upload-mimg-wrapper">
                      <div className="product-image-container">
                        <img
                          src={`${baseUrlForMedia}images/febrickBlind/${img}`}
                          alt={`Image ${index}`}
                        />
                        <button
                          className="delete-febric-button"
                          onClick={(event) =>
                            handleblindImageRemoval(img, event)
                          }
                        >
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                      </div>
                    </div>
                  );
                })}
                {selectedImages.map((file, index) => (
                  <div key={index} className="upload-mimg-wrapper">
                    <div className="product-image-container">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Image ${index}`}
                      />
                      <button
                        className="delete-febric-button"
                        onClick={(event) => handleImageRemoval(file, event)}
                      >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                ))}

                <div className="upload-mimg-wrapper">
                  <label
                    htmlFor="BlindImages"
                    className="upload-produc-img-label"
                  >
                    Add Blind Images
                  </label>
                  <input
                    type="file"
                    id="BlindImages"
                    name="BlindImages"
                    multiple
                    onChange={handleImageChange}
                    className="searchbox"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="filed-box">
            <div className="inner-col">
              <label htmlFor="ProductColor" className="product-field-label">
                Fabric image
              </label>
              <div className="upload-img-systam">
                <div className="upload-mimg-wrapper">
                  <div className="product-image-container">
                    <img
                      src={`${baseUrlForMedia}images/fabrics/${Febrics.fabImg}`}
                      alt={`Fabric Image`}
                    />
                  </div>
                </div>
                {selectedFabricImages ? (
                  <div className="upload-mimg-wrapper">
                    <div className="product-image-container">
                      <img
                        src={URL.createObjectURL(selectedFabricImages)}
                        alt={`Fabric Image`}
                      />
                      <button
                        className="delete-febric-button"
                        onClick={handleFabricImageRemoval}
                      >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="upload-mimg-wrapper">
                  <label
                    htmlFor="FabricImages"
                    className="upload-produc-img-label"
                  >
                    Add Fabric Image
                  </label>
                  <input
                    type="file"
                    id="FabricImages"
                    name="FabricImages"
                    className="searchbox"
                    onChange={handelFabricImage}
                  />
                </div>
              </div>
            </div>
          </div>
          <button className="login-btn" type="submit">
            {ShowLoader ? <Loader /> : "Add Fabric"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminEditFabric;
