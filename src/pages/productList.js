import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { Helmet } from "react-helmet";
import AllProducts from "../components/allProducts";
import { Link, useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
function ProductList() {
  const [sort, setsort] = useState("Recommended");
  const location = useLocation();
  const firstvalue = location.pathname.split("/")[1];
  const cat = location.pathname.split("/")[2];
  const [product, setProduct] = useState([]);
  const [productlength, setProductgength] = useState(0);
  useEffect(() => {
    const getProdcut = async () => {
      try {
        let response;
        if (firstvalue === "Search") {
          response = await publicRequest.get(
            `/product/searchBy?searchturm=${cat}`
          );
        } else {
          response = await publicRequest.get(
            cat ? `/product?category=${cat}` : "/product"
          );
        }
        console.log(response.data);
        setProduct(response.data);
        setProductgength(response.data.length);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    getProdcut();
  }, [cat]);

  const [filters, setFilters] = useState({});

  const handelefilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
    console.log(filters);
  };
  const srolllocation = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [srolllocation]);

  const [TypeSelect, setTypeSelect] = useState([]);

  useEffect(() => {
    const allcites = publicRequest
      .get(`/PriceOfProduct/TypeSelect`)
      .then((response) => setTypeSelect(response.data))
      .catch((error) => console.error(error));
  }, [TypeSelect]);

  return (
    <>
      <Helmet>
        <title>Product List - blinds</title>
      </Helmet>
      <div className="ProductList-page-wrapper">
        <Navbar />
        <section className="section-pagetop">
          <div className="container-fluid mainhedof-productlist">
            <h2>
              {firstvalue === "Search" ? (
                <>Search TERM : {cat}</>
              ) : (
                <>{cat ? cat : "ALL"} BLINDS</>
              )}
            </h2>
            <Link to="/">Home</Link> &nbsp; / &nbsp;
            {firstvalue === "Search" ? (
              <>
                <Link to="/blindlist">Blinds</Link> &nbsp; / &nbsp;
                <span>Search Term : {cat}</span>
              </>
            ) : cat ? (
              <>
                <Link to="/blindlist">Blinds</Link> &nbsp; / &nbsp;
                <span>{cat}</span>
              </>
            ) : (
              <span>Blinds</span>
            )}
          </div>
        </section>

        <section className="section-content ">
          <div className="container-fluid">
            <div className="row" style={{ padding: " 0 calc(1.5rem * 0.25)" }}>
              <div className="col-md-12">
                <div className="top-filnInumber-box">
                  <div className="showing-items-box">
                    <p className="m-0">
                      <strong>Total</strong> {productlength} Blinds Found
                    </p>
                  </div>
                  <div className="sort-by-box">
                    <select
                      className=""
                      onChange={(e) => setsort(e.target.value)}
                    >
                      <option value="Recommended">Sort By: Recommended</option>
                      <option value="Letest">Sort By: Latest items</option>
                      <option value="Trending">Sort By: Trending</option>
                      <option value="Popular">Sort By: Most Popular</option>
                      <option value="Cheapest">Sort By: Cheapest</option>
                    </select>
                  </div>
                </div>
              </div>
              <div
                className="col-md-3"
                style={{ padding: " 0 calc(1.5rem * 0.25)" }}
              >
                <div className="main-box-filter">
                  <div className="filter-group heading-filters">
                    <h6>Filters</h6>
                    <span className="clear-filter-button">
                      <Link to="/blindlist" onClick={() => setFilters({})}>
                        Clear
                      </Link>
                    </span>
                  </div>
                  <div className="filter-group">
                    <h6>Blind type</h6>
                    <div className="filter-content">
                      <ul className="list-menu">
                        {TypeSelect.map((type) => {
                          return (
                            <li>
                              <div
                                className={`filter-link ${
                                  cat === type ? "show" : ""
                                }`}
                              >
                                <Link to={`/blindlist/${type}`}>{type}</Link>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  {/* <hr className="hrtage" />
                  <div className="filter-group">
                    <h6>Color</h6>
                    <div className="filter-content">
                      <ul className="list-menu">
                        <li>
                          <div
                            className={`filter-buttons ${
                              filters.color === "White" ? "show" : ""
                            }`}
                          >
                            <input
                              type="button"
                              value="White"
                              className="fbtn"
                              name="color"
                              onClick={handelefilters}
                            />
                          </div>
                        </li>
                        <li>
                          <div
                            className={`filter-buttons ${
                              filters.color === "brown" ? "show" : ""
                            }`}
                          >
                            <input
                              type="button"
                              value="brown"
                              className="fbtn"
                              name="color"
                              onClick={handelefilters}
                            />
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div> */}
                </div>
              </div>
              <main className="col-md-9">
                <div className="row">
                  <AllProducts
                    sort={sort}
                    filters={filters}
                    cat={cat}
                    firstvalue={firstvalue}
                  />
                </div>
              </main>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default ProductList;
