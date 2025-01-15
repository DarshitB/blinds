import React, { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import Skeliton from "./loadingSkeleton/Skeliton";
import Singleproduct from "./singleproduct";
function AllProducts({ sort, filters, cat, firstvalue }) {
  const [product, setProduct] = useState([]);
  const [Filtereproduct, setFiltereProduct] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(24);

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
        setProduct(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getProdcut();
  }, [cat]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = product.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(product.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  const renderPageNumbers = pageNumbers.map((number) => {
    const activeClass = currentPage === number ? "active" : "";

    return (
      <li key={number} className={`page-item ${activeClass}`}>
        <button onClick={() => setCurrentPage(number)} className="page-link">
          {" "}
          {number}
        </button>
      </li>
    );
  });
  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };
  useEffect(() => {
    cat &&
      setFiltereProduct(
        product.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [product, cat, filters]);
  useEffect(() => {
    if (sort === "Letest") {
      setFiltereProduct((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "Cheapest") {
      setFiltereProduct((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else if (sort === "Recommended") {
      setFiltereProduct((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);
  return (
    <>
      {cat ? (
        IsLoading ? (
          <Skeliton type="productList" />
        ) : (
          Filtereproduct.map((item) => (
            <Singleproduct item={item} key={item._id} />
          ))
        )
      ) : IsLoading ? (
        <Skeliton type="productList" />
      ) : (
        <>
          {currentProducts.map((item) => (
            <Singleproduct item={item} key={item._id} />
          ))}
          <nav className="mt-4 mx-auto">
            <ul className="pagination">
              <li className="page-item ">
                <button className="page-link mianbtn" onClick={handlePrevClick}>
                  Previous
                </button>
              </li>
              {renderPageNumbers}
              <li className="page-item">
                <button className="page-link mianbtn" onClick={handleNextClick}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </>
  );
}

export default AllProducts;
