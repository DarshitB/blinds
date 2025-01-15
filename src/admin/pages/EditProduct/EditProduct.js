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
import Skeliton from "../../../components/loadingSkeleton/Skeliton";
function AdminEditProduct() {
  const location = useLocation();
  const history = useHistory();
  const id = location.pathname.split("/")[4];

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

  const [loading, setLoading] = useState(true);
  const [Product, setProduct] = useState();
  const [keywords, setkeywords] = useState([]);
  const [Fabric, setFabric] = useState([]);
  const [IsFabricLoad, setIsFabricLoad] = useState(true);
  const [ShowLoader, setShowLoader] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    img: [],
    fabrics: [],
    price: 0,
    productCode: "",
    manufactureCode: "",
    isActive: true,
  });
  useEffect(() => {
    publicRequest
      .get(`/product/find/` + id)
      .then((data) => {
        setProduct(data.data);
        setkeywords(data.data.searchKeyword);
        setFormData({
          ...formData,
          title: data.data.title,
          desc: data.data.desc,
          productCode: data.data.productCode,
          manufactureCode: data.data.manufactureCode,
          price: data.data.price,
          isActive: data.data.isActive,
        });
        setLoading(false);
        publicRequest
          .get(`/Fabrics/type/${data.data.type[0]}`)
          .then((response) => {
            setFabric(response.data);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }, []);
  /*   console.log("at top all fabric", Fabric);
   */ const [title, settitle] = useState("");
  const [desc, setDesc] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [ptype, setpType] = useState("");
  const [productCode, setproductCode] = useState("");
  const [manufactureCode, setmanufactureCode] = useState("");
  const [isActive, setisActive] = useState(null);
  const [productImg, setProductImg] = useState([]);
  const [fabrics, setFabrics] = useState([]);

  useEffect(() => {
    if (Product) {
      /* const imageData = Product.img.data.map((e, i) => {
        return {
          data: e,
          contentType: Product.img.contentType[i],
        };
      }); */
      settitle(Product.title);
      setDesc(Product.desc);
      setpType(Product.type[0]);
      setBasePrice(Product.price);
      setProductImg(Product.img);
      setproductCode(Product.productCode);
      setmanufactureCode(Product.manufactureCode);
      setisActive(Product.isActive);
      setFabrics(Product.fabrics);
    }
  }, [Product]);

  const [remainingFabrics, setRemainingFabrics] = useState([]);
  useEffect(() => {
    /*  console.log("allfabrics", Fabric);
    console.log("products", fabrics); */
    const remainingFabrics = Fabric.filter(
      (fabricinn) => !fabrics.includes(fabricinn.uniquId)
    ).sort((a, b) => a.band.localeCompare(b.band));
    setRemainingFabrics(remainingFabrics);
  }, [Fabric]);

  /*   console.log("this product fabric", fabrics);
   */ const [Fabricget, setFabricget] = useState([]);
  const [IsLoadedfabric, setIsLoadedfabric] = useState(true);
  useEffect(() => {
    const getfabric = async () => {
      try {
        setIsLoadedfabric(true);
        {
          const remainingFabrics = Fabric.filter((fabricinn) =>
            fabrics.includes(fabricinn.uniquId)
          ).sort((a, b) => a.band.localeCompare(b.band));
          setFabricget(remainingFabrics);

          setIsLoadedfabric(false);

          /* setTimeout(() => {
            setIsLoadedfabric(false);
          }, 1000); */

          /* var fabrocarraybox = [];
          for (const item of fabrics) {
            const getFabric = await publicRequest.get(
              `/Fabrics?FabricId=${item}`
              );
              await setFabric((Fabricget) =>
              Fabricget.filter((f) => f.uniquId !== getFabric.data[0].uniquId)
              ); 
              let obj = [
                getFabric.data[0].band,
                getFabric.data[0].fabImg,
                getFabric.data[0].fabric,
                getFabric.data[0].fabricName,
                getFabric.data[0].uniquId,
              ];
              fabrocarraybox.push(obj);
            }
            setFabricget(fabrocarraybox); */
        }
      } catch (err) {
        console.log(err);
      }
    };
    getfabric();
  }, [fabrics, Fabric]);
  /*   console.log("Fabricget", Fabricget);
   */ const handleTitleChange = (e) => {
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
    const selectedValue = e.target.value;
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
    const selectedFabric = Fabric.find((f) => selectedFabricId === f.uniquId);
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
  const handleFabricRemovalWhichAded = (fabricId, event) => {
    event.preventDefault();

    const result = window.confirm(
      "Are you sure It will remove the fabric directly from this product, so keep that in mind."
    );
    if (result) {
      userRequest
        .patch(
          `/product/removeExstingFebric?productid=${Product._id}&fabricId=${fabricId}`
        )
        .then((response) => {
          toast.success(`Success, You are successfully Deleted a fabric.`);
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
          toast.error(`Error, Something Went Wrong${error}`);
        });
    }
  };
  const handleblindImageRemoval = (img, event) => {
    event.preventDefault();
    const result = window.confirm(
      "Are you sure It will remove the Blind image directly from this Product, so keep that in mind."
    );
    if (result) {
      userRequest
        .patch(
          `/product/removeExstingblideImage?productid=${Product._id}&Imagename=${img}`
        )
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const handleKeywordChange = (index, value) => {
    const newKeywords = [...keywords];
    newKeywords[index] = value.toLowerCase();
    setkeywords(newKeywords);
  };

  const handleAddKeyword = () => {
    setkeywords([...keywords, ""]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoader(true);
    const filteredKeyword = keywords.filter(
      (input) => input !== null && input !== ""
    );
    const mydata = new FormData();
    mydata.append("title", formData.title);
    mydata.append("desc", formData.desc);
    mydata.append("fabrics", selectedFabricsids);
    mydata.append("searchKeyword", filteredKeyword);
    /* Array.from(selectedFabricsids).forEach((item) => {
      mydata.append("fabrics", item);
    }); */
    mydata.append("price", formData.price);
    mydata.append("productCode", formData.productCode);
    mydata.append("manufactureCode", formData.manufactureCode);

    mydata.append("isActive", formData.isActive);
    Array.from(selectedImages).forEach((item) => {
      mydata.append("img", item);
    });
    /* mydata.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    }); */
    if (!(Fabricget.length === 0 && selectedFabricsids.length === 0)) {
      if (!(productImg.length === 0 && selectedImages.length === 0)) {
        userRequest
          .put(`/product/${Product._id}`, mydata, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((response) => {
            toast.success(`Success, You are successfully Added a Product.`);
            setShowLoader(false);
            history.push("/admin/products-list");
          })
          .catch((error) => {
            toast.error(`Error, Something Went Wrong ${error}`);
          });
      } else {
        alert("Blind images is empty.");
        setShowLoader(false);
      }
    } else {
      alert("Fabric is empty.");
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
        <form onSubmit={handleSubmit}>
          <div className="filed-box">
            <div className="inner-col">
              <label htmlFor="productCode" className="product-field-label">
                Product Code
              </label>
              <input
                type="text"
                id="productCode"
                name="productCode"
                defaultValue={productCode}
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
                defaultValue={manufactureCode}
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
                defaultValue={title}
                name="title"
                onChange={handleTitleChange}
                className="searchbox"
                required
              />
            </div>
            <div className="inner-col">
              <label htmlFor="Type" className="product-field-label">
                Type
              </label>
              <input
                type="text"
                id="Type"
                name="Type"
                value={`${ptype} Blind`}
                className="searchbox"
                required
                disabled
              />
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
                defaultValue={desc}
                name="desc"
                onChange={handleDescChange}
                required
              ></textarea>
            </div>
            <div className="inner-col">
              {/* <div className="inner-col-inner">
                <label htmlFor="ProductColor" className="product-field-label">
                  Color
                </label>
                <input
                  type="text"
                  id="ProductColor"
                  name="ProductColor"
                  defaultValue={color}
                  onChange={handleColorChange}
                  className="searchbox"
                  required
                />
              </div> */}
              <div className="inner-col-inner">
                <label htmlFor="BasePrice" className="product-field-label">
                  Base Price(Є)
                </label>
                <input
                  type="text"
                  id="BasePrice"
                  defaultValue={basePrice}
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
                  name="ActiveInactive"
                  onChange={handleIsActiveChange}
                >
                  <option value="true" selected={isActive ? "true" : ""}>
                    Active
                  </option>
                  <option value="false" selected={isActive ? "" : "false"}>
                    Inactive
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="filed-box">
            <div className="inner-col">
              <label className="product-field-label"> Images</label>
              <div className="upload-img-systam">
                {productImg.map((img, index) => {
                  return (
                    <div key={index} className="upload-mimg-wrapper">
                      <div className="product-image-container">
                        <img
                          src={`${baseUrlForMedia}images/febrickBlind/${img}`}
                        />
                        <button
                          className="delete-febric-button"
                          onClick={(event) =>
                            handleblindImageRemoval(img, event)
                          }
                          /*                         onClick={(event) => handleImageRemoval(file, event)}
                           */
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
                  <label htmlFor="Images" className="upload-produc-img-label">
                    Add New Image
                  </label>
                  <input
                    type="file"
                    id="Images"
                    name="Images"
                    multiple
                    className="searchbox"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="filed-box">
            <div className="inner-col">
              <label className="product-field-label">Fabrics</label>
              <div className="upload-img-systam">
                {IsLoadedfabric ? (
                  <p className="m-0">
                    Loadding...{" "}
                    <span style={{ color: "#ccc" }}>
                      ( Wait for some time )
                    </span>
                  </p>
                ) : (
                  Fabricget.map((fabric) => {
                    /* console.log(fabric["fabricName"]); */
                    return (
                      <div key={fabric["uniquId"]} className="Brackets-box">
                        <label className="febricoption">
                          <img
                            src={`${baseUrlForMedia}images/fabrics/${fabric["fabImg"]}`}
                            className="w-100"
                            alt=""
                          />
                          <p>
                            <span>{fabric["fabricName"]}</span>
                          </p>
                          <button
                            className="delete-febric-button"
                            onClick={(event) =>
                              handleFabricRemovalWhichAded(
                                fabric["uniquId"],
                                event
                              )
                            }
                            style={{
                              display: "flex",
                              height: "25px",
                              width: "25px",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {/* <i className="fa fa-trash" aria-hidden="true"></i> */}
                            <img
                              src="/assets/img/deletebutton.svg"
                              style={{
                                height: "70%",
                                width: "auto",
                                objectFit: "cover",
                              }}
                              alt=""
                            />
                            {/* <span
                              style={{
                                lineHeight: "1",
                                fontWeight: "800",
                                margin: "0 0 1px 0",
                              }}
                            >
                              D
                            </span> */}
                          </button>
                        </label>
                      </div>
                    );
                  })
                )}
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
                {IsLoadedfabric
                  ? ""
                  : remainingFabrics.map((febrics) => (
                      <option key={febrics.uniquId} value={febrics.uniquId}>
                        {febrics.band}, {febrics.fabricName}
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
              {keywords.map((keyword, index) => (
                <div key={index} className="inner-col-inner">
                  <input
                    type="text"
                    value={keyword}
                    className="searchbox"
                    onChange={(e) => handleKeywordChange(index, e.target.value)}
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddKeyword}
                className="login-btn"
              >
                Add More
              </button>
            </div>
          </div>
          <button className="login-btn" type="submit">
            {ShowLoader ? <Loader /> : "Edit Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminEditProduct;
