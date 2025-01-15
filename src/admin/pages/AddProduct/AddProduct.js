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
function AdminAddProduct() {
  const history = useHistory();
  const [Fabric, setFabric] = useState([]);
  const [ShowLoader, setShowLoader] = useState(false);

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
    setSelectedFabrics([]);
    if (e.target.value !== "noSelected") {
      publicRequest
        .get(`/Fabrics/type/${e.target.value}`)
        .then((response) => {
          setFabric(response.data);
        })
        .catch((error) => console.error(error));
    } else {
      setFabric([]);
    }
  };

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    img: [],
    type: [],
    fabrics: [],
    price: 0,
    productCode: "",
    manufactureCode: "",
    isActive: true,
  });
  const handleTitleChange = (e) => {
    setFormData({
      ...formData,
      title: e.target.value,
    });
  };
  const handleproductCodeChange = (e) => {
    setFormData({
      ...formData,
      productCode: e.target.value,
    });
  };
  const handlemanufactureCodeChange = (e) => {
    setFormData({
      ...formData,
      manufactureCode: e.target.value,
    });
  };
  const handleDescChange = (e) => {
    setFormData({
      ...formData,
      desc: e.target.value,
    });
  };

  const handlePriceChange = (e) => {
    setFormData({
      ...formData,
      price: e.target.value,
    });
  };

  const handleIsActiveChange = (e) => {
    const selectedValue = e.target.value; // Get the selected value from the select option
    const isActiveValue = selectedValue === "true";
    setFormData({
      ...formData,
      isActive: isActiveValue,
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
  const [selectedFabrics, setSelectedFabrics] = useState([]);
  const [selectedFabricsids, setselectedFabricsids] = useState([]);
  const handleFabricSelection = (e) => {
    e.preventDefault();
    const selectedFabricId = e.target.value;
    const selectedFabric = Fabric.find((f) => f.uniquId === selectedFabricId);
    if (selectedFabric) {
      setSelectedFabrics((prevSelectedFabrics) => [
        ...prevSelectedFabrics,
        selectedFabric,
      ]);
      setselectedFabricsids((prevSelectedFabricsid) => [
        ...prevSelectedFabricsid,
        selectedFabricId,
      ]);
      setFabric((prevFabric) =>
        prevFabric.filter((f) => f.uniquId !== selectedFabricId)
      );
    }
  };
  const handleFabricRemoval = (fabricId, event) => {
    event.preventDefault();

    const selectedFabric = selectedFabrics.find((f) => f.uniquId === fabricId);
    if (selectedFabric) {
      setSelectedFabrics((prevSelectedFabrics) =>
        prevSelectedFabrics.filter((f) => f.uniquId !== fabricId)
      );
      setselectedFabricsids((prevSelectedFabricIds) =>
        prevSelectedFabricIds.filter((id) => id !== fabricId)
      );
      setFabric((prevFabric) => [...prevFabric, selectedFabric]);
    }
  };
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
  const currentDomain =
    window.location.protocol +
    "//" +
    window.location.hostname +
    (window.location.port ? ":" + window.location.port : "");

  const [inputs, setInputs] = useState([""]); // Initial state with one empty input

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value.toLowerCase();
    setInputs(newInputs);
  };
  const handleAddInput = (e) => {
    e.preventDefault();
    setInputs([...inputs, ""]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoader(true);

    const filteredInputs = inputs.filter(
      (input) => input !== null && input !== ""
    );

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("desc", formData.desc);
    Array.from(selectedImages).forEach((item) => {
      formDataToSend.append("img", item);
    });
    formDataToSend.append("type", formData.type);
    formDataToSend.append("fabrics", selectedFabricsids);
    formDataToSend.append("searchKeyword", filteredInputs);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("isActive", formData.isActive);
    formDataToSend.append("productCode", formData.productCode);
    formDataToSend.append("manufactureCode", formData.manufactureCode);
    formDataToSend.append("BaseUrl", currentDomain);

    if (
      formData.type !== "noSelected" &&
      selectedImages.length > 0 &&
      selectedFabricsids.length > 0
    ) {
      userRequest
        .post("/product", formDataToSend)
        .then((response) => {
          toast.success(`Success, You are successfully Added a Product.`);
          setSelectedImages([]);
          setSelectedFabrics([]);
          setselectedFabricsids([]);
          setShowLoader(false);
          history.push("/admin/products-list");
        })
        .catch((error) => {
          toast.error(`Error, Something Went Wrong${error}`);
          /*         console.error("Error submitting form data:", error);
           */ // Perform error handling as needed
        });
    } else {
      alert("some of the filed is still empty fill that first.");
      setShowLoader(false);
    }
  };

  return (
    <div className="Edit-product-wrapper">
      <div className="productTitleContainer">
        <h1 className="productTitle">Add Product</h1>
      </div>
      <div className="Edit-product-form-container">
        <form onSubmit={handleSubmit} enctype="multipart/form-data">
          <div className="filed-box">
            <div className="inner-col">
              <label htmlFor="productCode" className="product-field-label">
                Product Code
              </label>
              <input
                type="text"
                id="productCode"
                name="productCode"
                className="searchbox"
                onChange={handleproductCodeChange}
                required
              />
            </div>
            <div className="inner-col">
              <label htmlFor="manufactureCode" className="product-field-label">
                Manufacture Code
              </label>
              <input
                type="text"
                id="manufactureCode"
                name="manufactureCode"
                className="searchbox"
                onChange={handlemanufactureCodeChange}
                required
              />
            </div>
          </div>
          <div className="filed-box">
            <div className="inner-col">
              <label htmlFor="title" className="product-field-label">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="searchbox"
                onChange={handleTitleChange}
                required
              />
            </div>
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
          </div>
          <div className="filed-box">
            <div className="inner-col">
              <label htmlFor="desc" className="product-field-label">
                Description
              </label>
              <textarea
                className="searchbox"
                rows="4"
                id="desc"
                name="desc"
                required
                onChange={handleDescChange}
              ></textarea>
            </div>
            <div className="inner-col">
              {/*  <div className="inner-col-inner">
                <label htmlFor="ProductColor" className="product-field-label">
                  Color
                </label>
                <input
                  type="text"
                  id="ProductColor"
                  name="ProductColor"
                  className="searchbox"
                  onChange={handleColorChange}
                  required
                />
              </div> */}
              <div className="inner-col-inner">
                <label htmlFor="BasePrice" className="product-field-label">
                  Base Price(Є)
                </label>
                <input
                  type="number"
                  id="BasePrice"
                  name="BasePrice"
                  className="searchbox"
                  onKeyDown={handleKeyDown}
                  onChange={handlePriceChange}
                  required
                />
              </div>
              <div className="inner-col-inner">
                <label htmlFor="Type" className="product-field-label">
                  Active/Inactive
                </label>
                <select
                  className="searchbox"
                  id="ActiveInactive"
                  onChange={handleIsActiveChange}
                  name="ActiveInactive"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>
          </div>
          <div className="filed-box">
            <div className="inner-col">
              <label className="product-field-label"> Images</label>
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
                  <label htmlFor="Images" className="upload-produc-img-label">
                    Add New Image
                  </label>
                  <input
                    type="file"
                    id="Images"
                    name="Images"
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
              <label className="product-field-label">Fabrics</label>
              <div className="upload-img-systam">
                {selectedFabrics.map((fabric, index) => (
                  <div key={index} className="Brackets-box">
                    <label className="febricoption">
                      <img
                        src={`${baseUrlForMedia}images/fabrics/${fabric.fabImg}`}
                        className="w-100"
                        alt=""
                      />
                      <p>
                        <span>{fabric.fabricName}</span>
                      </p>
                      <button
                        className="delete-febric-button"
                        onClick={(event) =>
                          handleFabricRemoval(fabric.uniquId, event)
                        }
                      >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </label>
                  </div>
                ))}
              </div>
              <select
                className="searchbox fabric-selector"
                onChange={handleFabricSelection}
              >
                <option>Add Fabric</option>
                {Fabric.map((febrics) => (
                  <option key={febrics.uniquId} value={febrics.uniquId}>
                    {febrics.fabricName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="filed-box searchbox-keyword">
            <label htmlFor="" className="product-field-label">
              Search Box Keyword ( Optional )
            </label>
            <div className="inner-col">
              {inputs.map((value, index) => (
                <div className="inner-col-inner">
                  <input
                    key={index}
                    type="text"
                    className="searchbox"
                    placeholder=""
                    value={value}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                  />
                </div>
              ))}{" "}
              <button
                type="button"
                onClick={handleAddInput}
                className="login-btn"
              >
                Add More
              </button>
            </div>
          </div>
          {/* <div className="filed-box">
            <div className="inner-col">
              <label htmlFor="Stock" className="product-field-label">
                Stock
              </label>
              <input
                type="number"
                id="Stock"
                name="Stock"
                placeholder="EX. 123"
                className="searchbox"
                onKeyDown={handleKeyDown}
                onChange={handleStockChange}
                required
              />
            </div>
          </div> */}
          <button className="login-btn" type="submit">
            {ShowLoader ? <Loader /> : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminAddProduct;
