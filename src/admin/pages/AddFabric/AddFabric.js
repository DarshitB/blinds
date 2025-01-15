import React, { useEffect, useState } from "react";
import "../adminStyle.css";
import {
  publicRequest,
  userRequest,
  baseUrlForMedia,
} from "../../../requestMethods";
import Loader from "../../../components/loader";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
function AdminAddFabric() {
  const history = useHistory();
  const [Bands, setBands] = useState([]);
  const [ShowLoader, setShowLoader] = useState(false);

  const [TypeSelect, setTypeSelect] = useState({});
  useEffect(() => {
    const allcites = publicRequest
      .get(`/PriceOfProduct/TypeSelect`)
      .then((response) => setTypeSelect(response.data))
      .catch((error) => console.error(error));
  }, [TypeSelect]);
  const typeElements = Object.values(TypeSelect).map((type) => (
    <option key={type} value={type}>
      {type.charAt(0).toUpperCase() + type.slice(1)} Blinds
    </option>
  ));

  const handleBiledtype = (e) => {
    if (e.target.value === "noSelected") {
      setFormData({
        ...formData,
        type: [],
      });
    } else {
      setFormData({
        ...formData,
        type: [e.target.value],
      });
    }
    if (e.target.value !== "noSelected") {
      publicRequest
        .get(`/PriceOfProduct/BandSelect/${e.target.value}`)
        .then((response) => {
          setBands(response.data);
        })
        .catch((error) => console.error(error));
    } else {
      setBands([]);
    }
  };
  const BandElements = Object.values(Bands).map((band) => (
    <option key={band} value={band}>
      {band.charAt(0).toUpperCase() + band.slice(1)}
    </option>
  ));

  const [formData, setFormData] = useState({
    fabric: "",
    fabricName: "",
    fabImg: null,
    img: [],
    band: "",
    type: "",
  });

  const handleFabricTitleChange = (e) => {
    setFormData({
      ...formData,
      fabric: e.target.value,
    });
  };
  const handlebandChange = (e) => {
    if (e.target.value === "noSelected") {
      setFormData({
        ...formData,
        band: [],
      });
    } else {
      setFormData({
        ...formData,
        band: [e.target.value],
      });
    }
  };
  const handleFabricNameChange = (e) => {
    setFormData({
      ...formData,
      fabricName: e.target.value,
    });
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

  const [selectedFabricImages, setSelectedFabricImages] = useState(null);
  const handelFabricImage = (e) => {
    const Fabricfiles = e.target.files[0];
    if (Fabricfiles && Fabricfiles.type.startsWith("image/")) {
      setSelectedFabricImages(Fabricfiles);
    } else {
      alert("Sorry but this is not an image, just an image is allowed.");
    }
  };
  const handleFabricImageRemoval = () => {
    setSelectedFabricImages(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoader(true);
    const uniquId = uuidv4();

    const addFabricData = new FormData();
    addFabricData.append("uniquId", uniquId);
    addFabricData.append("fabric", formData.fabric);
    addFabricData.append("fabricName", formData.fabricName);
    addFabricData.append("band", formData.band);
    addFabricData.append("type", formData.type);
    Array.from(selectedImages).forEach((item) => {
      addFabricData.append("img", item);
    });
    addFabricData.append("fabImg", selectedFabricImages);
    if (
      selectedImages.length > 0 &&
      selectedFabricImages !== null &&
      formData.band !== "noSelected" &&
      formData.band !== "" &&
      formData.band !== null
    ) {
      userRequest
        .post("/Fabrics", addFabricData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          toast.success(`Success, You are successfully Added a Product.`);
          setSelectedImages([]);
          setSelectedFabricImages(null);
          setShowLoader(false);
          /*   history.push("/admin/All-Fabrics"); */
        })
        .catch((error) => {
          setShowLoader(false);
          toast.error(`Error, Something Went Wrong ${error}`);
        });
    } else {
      alert("some of the filed is still empty fill that first.");
      setShowLoader(false);
    }
  };

  return (
    <div className="Edit-product-wrapper">
      <div className="productTitleContainer">
        <h1 className="productTitle">Add Fabric</h1>
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
                onChange={handleFabricTitleChange}
                placeholder="Ex. Barras"
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
                onChange={handleFabricNameChange}
                placeholder="Ex. Barras 4073 (fabric with fabric code)"
                required
              />
            </div>
          </div>
          <div className="filed-box">
            <div className="inner-col">
              <label htmlFor="Type" className="product-field-label">
                Type
              </label>
              <select
                className="searchbox"
                id="Type"
                onChange={handleBiledtype}
                name="Type"
                required
              >
                <option value="noSelected">Select Blind Type</option>
                {typeElements}
              </select>
            </div>
            <div className="inner-col">
              <label htmlFor="ProductColor" className="product-field-label">
                band
              </label>
              <select
                className="searchbox"
                id="Type"
                onChange={handlebandChange}
                name="Type"
                required
              >
                <option value="noSelected">Select Band</option>
                {BandElements}
              </select>
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

export default AdminAddFabric;
