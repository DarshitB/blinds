import React, { useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  pdf,
} from "@react-pdf/renderer";
import { CircularProgress, colors } from "@material-ui/core";
import { PDFViewer } from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import { saveAs } from "file-saver";
import { toBlob } from "html-to-image";
import { publicRequest } from "../requestMethods";
import Loader from "./loader";
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    padding: 20,
    fontFamily: "Helvetica",
  },
  section: {
    padding: "40px 20px 15px",
  },
  invoiceText: {
    fontSize: 28,
    textTransform: "uppercase",
    color: "#043642",
    backgroundColor: "rgb(250, 250, 250)",
    padding: "15px 20px 10px",
    border: "1px solid rgb(225, 225, 225)",
    borderRadius: 14,
    margin: 0,
  },
  infoSection: {
    padding: "0px 20px 15px",
  },
  infoSectionInner: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: "15px 20px 15px",
    borderRadius: 14,
    border: "1px solid rgb(225, 225, 225)",
  },
  infoBox: {
    width: "48%",
  },
  infoText: {
    fontSize: 12,
    color: "#444",
  },
  infoTextBold: {
    fontWeight: "bolder",
    fontSize: 16,
    color: "#000",
  },
  textRight: {
    textAlign: "right",
  },
  tableSection: {
    padding: "0px 20px 15px",
  },
  tableSectionInner: {
    padding: "10px 20px 15px",
    borderRadius: 14,
    border: "1px solid rgb(225, 225, 225)",
  },
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    color: "#043642",
    borderBottom: "1px solid rgb(225, 225, 225)",
  },
  tableHeaderCell: {
    fontSize: 12,
    textTransform: "uppercase",
    padding: "8px 0px",
  },
  nameanddtales: {
    width: "55%",
    textAlign: "left",
  },
  fiftineenPer: {
    textAlign: "center",
    width: "15%",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    color: "#043642",
    borderBottom: "1px solid rgb(225, 225, 225)",
  },
  tableCell: {
    fontSize: 12,
    padding: "8px 0px",
    color: "#000",
  },
  innertableCell: {
    fontSize: 10,
    color: "#999",
  },
  totleProductPrice: {
    color: "rgb(19, 107, 129)",
  },
  tableFooter: {
    padding: "0px 20px 15px",
  },
  tableFooterInner: {
    padding: "10px 20px 10px",
    borderRadius: 14,
    border: "1px solid rgb(225, 225, 225)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableFooterbottom: {
    padding: "0px 20px 15px",
  },
  tableFooterbottomText: {
    color: "#043642",
    backgroundColor: "rgb(250, 250, 250)",
    padding: "12px 20px 10px",
    border: "1px solid rgb(225, 225, 225)",
    borderRadius: 14,
    fontSize: 10,
    textAlign: "center",
  },
  tableFooterRow: {
    width: "48%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableFooterRowInner: {
    width: "49%",
  },
  tableFooterCell: {
    fontSize: 12,
    color: "#777",
    textAlign: "right",
    padding: "2px 0",
  },
  tableFooterCellHead: {
    fontSize: 12,
    color: "#444",
    padding: "2px 0",
  },
  tableFooterCellHeadTotal: {
    color: "rgb(19, 107, 129)",
    borderTop: "1px solid rgb(225, 225, 225)",
    padding: "5px 0 0",
  },
  tableFooterCelltotal: {
    textAlign: "right",
    color: "rgb(19, 107, 129)",
    borderTop: "1px solid rgb(225, 225, 225)",
    padding: "5px 0 0",
  },
});
function Invoice() {
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const [instalationservice, setInstalationservice] = useState("");
  const [ordersData, setOrdersData] = useState([]);
  const [billingdata, setbillingdata] = useState("");
  const [OrdersProduct, setOrdersProduct] = useState([]);
  const [loadings, setLoadings] = useState(true);

  useEffect(() => {
    publicRequest
      .get(`/orders/findSingle/${id}`)
      .then(async (response) => {
        const ordersData = response.data;
        const productIds = ordersData.produts;
        const productsData = await Promise.all(
          productIds.map(async (productId) => {
            const productResponse = await publicRequest.get(
              `/product/find/${productId.productId}`
            );
            if (productId.productId === productResponse.data._id) {
              return {
                ...productResponse.data,
                ...productId,
              };
            }
            return productId;
          })
        );
        const userdetsilesarray = [];
        const userdetsiles = publicRequest
          .get(`/user/find/${ordersData.userId}`)
          .then((response) => {
            userdetsilesarray.push(response.data);
          })
          .catch((error) => {
            console.error(error);
            console.error("646");
          });
        ordersData.userData = userdetsilesarray;
        ordersData.produts = productsData;

        setbillingdata(ordersData.BillingAddress[0]);
        setOrdersProduct(ordersData.produts);
        setInstalationservice(ordersData.installationServices[0]);
        setOrdersData(ordersData);
        setLoadings(false);
      })
      .catch((error) => {
        console.log(error);
        console.log("something wents wrong");
      });
  }, []);
  const customerInfo = {
    name: billingdata.FirstName + " " + billingdata.LastName,
    orderDate: ordersData.orderDate,
    orderId: ordersData._id,
  };
  const addressInfo = {
    address: billingdata.Address,
    City: billingdata.City,
    Postcode: billingdata.Postcode,
    email: billingdata.Email,
    phone: billingdata.PhoneNo,
  };
  const products = OrdersProduct;
  console.log(addressInfo);
  const MyDoc = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.invoiceText}>blind-Invoice</Text>
        </View>
        <View style={styles.infoSection}>
          <View style={styles.infoSectionInner}>
            <View style={styles.infoBox}>
              <Text style={[styles.infoText, styles.infoTextBold]}>
                {customerInfo.name}
              </Text>
              <Text style={styles.infoText}>
                Order Date: {customerInfo.orderDate}
              </Text>
              <Text style={styles.infoText}>
                Invoice ID: {customerInfo.orderId}
              </Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={[styles.infoText, styles.textRight]}>
                {addressInfo.address}
              </Text>
              <Text style={[styles.infoText, styles.textRight]}>
                {addressInfo.City} , {addressInfo.Postcode}
              </Text>
              <Text style={[styles.infoText, styles.textRight]}>
                {addressInfo.email}
              </Text>
              <Text style={[styles.infoText, styles.textRight]}>
                {addressInfo.phone}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.tableSection}>
          <View style={styles.tableSectionInner}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, styles.nameanddtales]}>
                Name / Details
              </Text>
              <Text style={[styles.tableHeaderCell, styles.fiftineenPer]}>
                Price
              </Text>
              <Text style={[styles.tableHeaderCell, styles.fiftineenPer]}>
                Quantity
              </Text>
              <Text style={[styles.tableHeaderCell, styles.fiftineenPer]}>
                Total
              </Text>
            </View>
            {products.map((product, index) => {
              const productproce = product.productcost
                ? "£" + parseFloat(product.productcost) * product.quantity
                : "-";
              return (
                <View key={index} style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.nameanddtales]}>
                    {product.title} {"\n"}
                    <Text style={styles.innertableCell}>
                      Width : {product.Width}MM | Drop : {product.Drop}MM |
                      Control Option : {product.ControlOption} | Fabric Option :{" "}
                      {product.FabricOption} |{" "}
                      {product.type === "Roller" ? (
                        <>
                          Size Option : {product.SizeOption} | Wrapped Option :{" "}
                          {product.WrappedOption} | Top Fixing :{" "}
                          {product.TopFixing} |{" "}
                        </>
                      ) : product.type === "Vertical" ? (
                        <>
                          Chain Control : {product.ChainControl} | Opening
                          Direction : {product.OpeningDirection} | Mounting
                          Bracket : {product.MountingBracket} | Ball Chain Hook
                          : {product.BallChainHook} | Metel Ball Chain :{" "}
                          {product.MetelBallChain} |{" "}
                        </>
                      ) : (
                        ""
                      )}
                      Operating System: MotoreHead -{" "}
                      {product.OperatingSystem[0].Motorised}, RemoteHead -{" "}
                      {product.OperatingSystem[0].Remote}, Accessories -{" "}
                      {product.OperatingSystem[0].Accessories}
                    </Text>
                  </Text>
                  <Text style={[styles.tableCell, styles.fiftineenPer]}>
                    {product.productcost ? "£" + product.productcost : "-"}
                  </Text>
                  <Text style={[styles.tableCell, styles.fiftineenPer]}>
                    {product.quantity}
                  </Text>
                  <Text
                    style={[
                      styles.tableCell,
                      styles.fiftineenPer,
                      styles.totleProductPrice,
                    ]}
                  >
                    {productproce}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.tableFooter}>
          <View style={styles.tableFooterInner}>
            <View style={styles.tableFooterRow}></View>
            <View style={styles.tableFooterRow}>
              <View style={styles.tableFooterRowInner}>
                <Text style={styles.tableFooterCellHead}>Vat</Text>
                <Text style={styles.tableFooterCellHead}>Discount</Text>
                <Text style={styles.tableFooterCellHead}>
                  Sub Total Inc. Vat
                </Text>
                <Text style={styles.tableFooterCellHead}>Delivery Cost</Text>
                <Text style={styles.tableFooterCellHead}>
                  Installation Cost
                </Text>
                <Text style={styles.tableFooterCellHeadTotal}>Total</Text>
              </View>
              <View style={styles.tableFooterRowInner}>
                <Text style={styles.tableFooterCell}>+20%</Text>
                <Text style={styles.tableFooterCell}>
                  {ordersData.Discount ? "-" + ordersData.Discount : "-"}
                </Text>
                <Text style={styles.tableFooterCell}>
                  {ordersData.subTotalIncVAt
                    ? "£" + ordersData.subTotalIncVAt
                    : "-"}
                </Text>
                <Text style={styles.tableFooterCell}>
                  {ordersData.shipingCost ? "+£" + ordersData.shipingCost : "-"}
                </Text>
                <Text style={styles.tableFooterCell}>
                  {instalationservice.cost
                    ? "+£" + instalationservice.cost
                    : "-"}
                </Text>
                <Text style={styles.tableFooterCelltotal}>
                  £{ordersData.amount}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.tableFooterbottom}>
          <Text style={styles.tableFooterbottomText}>
            Thank You for Purchasing :)
          </Text>
        </View>
      </Page>
    </Document>
  );
  const [url, setUrl] = useState(null);
  console.log(url);
  useEffect(() => {
    if (url) {
      window.close();
    }
  }, [url]);
  return (
    <div className="invocedownloadContainer">
      <PDFDownloadLink
        document={<MyDoc />}
        fileName="invoice.pdf"
        onRender={() => setUrl("url")}
        className="invocedownloadlink"
        onClick={() => setUrl("url")}
      >
        {({ blob, url, loading, error }) =>
          loadings ? (
            <Loader />
          ) : loading ? (
            "Loading document..."
          ) : (
            "Download Invoice"
          )
        }
      </PDFDownloadLink>
    </div>
  );
}

export default Invoice;
