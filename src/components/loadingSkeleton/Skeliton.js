import React from "react";

function Skeliton({ type }) {
  const COUNTER = 8;
  const ProductListScaliton = () => (
    <div
      className="col-xl-3 col-lg-4 col-md-6 col-6"
      style={{ padding: "0px calc(0.375rem)" }}
    >
      <div className="skboxofcard ">
        <div className="skImgwrap">
          <div className="skimage"></div>
          <div className="skheading"></div>
        </div>
        <div className="skInfoWrao">
          <div className="skPrice"></div>
          <div className="sksamplebtn"></div>
        </div>
      </div>
    </div>
  );
  const NaviGationProduct = () => <div className="SkNavigaionProduct"></div>;
  const Productimages = () => <div className="SkProductimages"></div>;
  const Productaddtocart = () => <div className="SkProductimages"></div>;
  const ProductPrice = () => <div className="SkProductPrice"></div>;
  const Fabricload = () => <div className="SkFabricload"></div>;
  const Addressload = () => <div className="SkAddressload"></div>;
  const ProductDescreaption = () => (
    <>
      <div className="proDisHeading"></div>
      <div className="proDisMesurment">
        <div className="ProDismainMessurment"></div>
        <div className="ProDisDelivaryNPrice"></div>
        <div className="ProdisQunttyNAddcart">
          <div className="proDisQuntty"></div>
          <div className="proDisAddcartBtn"></div>
        </div>
      </div>
    </>
  );
  const Orderedproduct = () => (
    <>
      <div className="ordProducontainer">
        <div className="ordProduID"></div>
        <div className="ordProduStatusOdateEdate">
          <div className="ordProduStatus"></div>
          <div className="ordProduOdate"></div>
          <div className="ordProduEdate"></div>
        </div>
        <div className="orderdproduct"></div>
        <div className="orderdproduct"></div>
      </div>
      <div className="ordProducontainer">
        <div className="ordProduID"></div>
        <div className="ordProduStatusOdateEdate">
          <div className="ordProduStatus"></div>
          <div className="ordProduOdate"></div>
          <div className="ordProduEdate"></div>
        </div>
        <div className="orderdproduct"></div>
        <div className="orderdproduct"></div>
      </div>
    </>
  );
  if (type === "productList")
    return Array(COUNTER).fill(<ProductListScaliton />);
  if (type === "ProductNavigationBar") return <NaviGationProduct />;
  if (type === "ProductimagesBox") return <Productimages />;
  if (type === "ProductDescreaptionBox") return <ProductDescreaption />;
  if (type === "Productaddtocart") return <Productaddtocart />;
  if (type === "ProductPrice") return <ProductPrice />;
  if (type === "Fabricload") return <Fabricload />;
  if (type === "Orderedproduct") return <Orderedproduct />;
  if (type === "Addressload") return <Addressload />;
}

export default Skeliton;
