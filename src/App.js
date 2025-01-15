import "./App.css";
import Home from "./pages/home";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import ProductList from "./pages/productList";
import Products from "./pages/products";
import Login from "./pages/login";
import Register from "./pages/register";
import Cart from "./pages/cart";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Success from "./pages/success";
import YourOrder from "./pages/yourOrder";
import ContactUs from "./pages/contactUs";
import Aboutus from "./pages/aboutus";
import RollerBlinds from "./pages/rollerBlinds";
import WoodenBlinds from "./pages/woodenBlinds";
import VerticalBlinds from "./pages/verticalBlinds";
import MatrixTableMain from "./pages/matrixTable";
import AdminHome from "./admin/pages/home/home";
import AdminTopbar from "./admin/components/topbar/Topbar";
import AdminSidebar from "./admin/components/sidebar/Sidebar";
import AdminProductList from "./admin/pages/productList/ProductList";
import AdminproductPrice from "./admin/pages/producPrice/productPrice";
import Adminuser from "./admin/pages/user/user";
import AdminEditProduct from "./admin/pages/EditProduct/EditProduct";
import AdminAddProduct from "./admin/pages/AddProduct/AddProduct";
import AdminAddproductPrice from "./admin/pages/addproducPrice/addProductPrice";
import AdminFebricLinks from "./admin/pages/FabricList/FabricList";
import AdminAddFabric from "./admin/pages/AddFabric/AddFabric";
import AdminEditFabric from "./admin/pages/EditFabric/EditFabric";
import AdminEditUser from "./admin/pages/EditUser/EditUser";
import AdminOrdersList from "./admin/pages/OrdersList/OrdersList";
import AdminOrdersDetailes from "./admin/pages/OrdersDetailes/OrdersDetailes";
import AdminCompletedOrder from "./admin/pages/CompletedOrder/CompletedOrder";
import AdminCanceledOrder from "./admin/pages/CanceledOrders/CanceledOrders";
import AccountSettings from "./pages/accountSettings";
import ProfileSettings from "./pages/profile";
import ChangePassword from "./pages/changePassword";
import Addresses from "./pages/addresses";
import ForgotPassword from "./pages/forgotPassword";
import AdminCityNPostalcode from "./admin/pages/cityNPostalcode/cityNPostalcode";
import AdminEditCityNPostalcode from "./admin/pages/EditCityNPostalcode/EditCityNPostalcode";
import AdminAddCityNPostalCode from "./admin/pages/AddCityNPostalCode/AddCityNPostalCode";
import TermsConditions from "./pages/footerPages/termsConditions";
import PrivacyPolicy from "./pages/footerPages/privacyPolicy";
import HelpFAQs from "./pages/footerPages/helpFAQs";
import DeliveryTnC from "./pages/footerPages/deliveryTnC";
import WarrantyTs from "./pages/footerPages/warrantyTs";
import Invoice from "./components/invoice";
import CircularProgress from "@material-ui/core/CircularProgress";
import AdminBlindMOtorsLIst from "./admin/pages/BlindMOtorsLIst/BlindMOtorsLIst";
import AdminBlindAddMOtors from "./admin/pages/BlindAddMOtors/BlindAddMOtors";
import AdminBlindRemotesLIst from "./admin/pages/BlindRemotesLIst/BlindRemotesLIst";
import AdminBlindAddRemotes from "./admin/pages/BlindAddRemotes/BlindAddRemotes";
import AdminBlindAccessoriesLIst from "./admin/pages/BlindAccessoriesLIst/BlindAccessoriesLIst";
import AdminBlindAddAccessories from "./admin/pages/BlindAddAccessories/BlindAddAccessories";
import AdminaddproducPriceWithNewCatagog from "./admin/pages/addproducPriceWithNewCatagog/addproducPriceWithNewCatagog";
import AdminAdditionalcost from "./admin/pages/AdditionalcostList/AdditionalcostList";
import AdminaddAdditionalcost from "./admin/pages/addAdditionalcost/addAdditionalcost";
import HowtoMeasurePage from "./pages/footerPages/howtoMeasure";
import HowtoInstallPage from "./pages/footerPages/howtoInstall";
function App() {
  const [admin, setadmin] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    if (user) {
      setadmin(user.isAdmin);
    }
  }, [user]);
  const [Redirectreggister, setRedirectreggister] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the delay time as needed

    return () => clearTimeout(timeout);
  }, []);

  /* useEffect(() => {
    window.onload = () => {
      setIsLoading(false);
    };
  }, []); */

  if (isLoading) {
    return (
      <div className="loadding-for-order-placed">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      {/* {admin ? (
        <>
          <Router>
            <AdminTopbar
              onHamburgerClick={() => setIsSidebarOpen(!isSidebarOpen)}
            />
            <ToastContainer />
            <div className="container-fluide position-relative">
              <AdminSidebar
                isOpen={isSidebarOpen}
                onLinkClick={() => setIsSidebarOpen(!isSidebarOpen)}
              />
              <Switch>

                <Route path="/admin/products-list">
                  <AdminProductList />
                </Route>
                <Route path="/admin/products/productPrice">
                  <AdminproductPrice />
                </Route>
                <Route path="/admin/products/editProduct/:id">
                  <AdminEditProduct />
                </Route>
                <Route path="/admin/products/AddProduct">
                  <AdminAddProduct />
                </Route>
                <Route path="/admin/products/AddproductPrice">
                  <AdminAddproductPrice />
                </Route>

                <Route path="/admin/All-user">
                  <Adminuser />
                </Route>
                <Route path="/admin/user/edituser/:id">
                  <AdminEditUser />
                </Route>
                
                <Route path="/admin/All-Fabrics">
                  <AdminFebricLinks />
                </Route>
                <Route path="/admin/Fabrics/addFabric">
                  <AdminAddFabric />
                </Route>
                <Route path="/admin/Fabrics/editFabric/:id">
                  <AdminEditFabric />
                </Route>

                <Route path="/admin/All-orders">
                  <AdminOrdersList />
                </Route>
                <Route path="/admin/orders/Order-Detailes/:id">
                  <AdminOrdersDetailes />
                </Route>
                <Route path="/admin/orders/Completed-Orders">
                  <AdminCompletedOrder />
                </Route>
                <Route path="/admin/orders/Canceled-Orders">
                  <AdminCanceledOrder />
                </Route>

                <Route path="/admin/All-CityNPostalcodes">
                  <AdminCityNPostalcode />
                </Route>
                <Route path="/admin/CityNPostalcodes/edit/:id">
                  <AdminEditCityNPostalcode />
                </Route>
                <Route path="/admin/addCityNPostalcodes">
                  <AdminAddCityNPostalCode />
                </Route>

                <Route path="/admin" exact>
                  <AdminHome />
                </Route>

                <Route path="/" exact>
                  <AdminHome />
                </Route>
                <Route path="*">
                  <h2>pagenot found</h2>
                </Route>
              </Switch>
            </div>
          </Router>
        </>
      ) : ( */}
      <Router>
        <ToastContainer />
        <Switch>
          {/* main webpage */}
          <Route path="/account/Addresses">
            <Addresses />
          </Route>
          <Route path="/account/ChangePassword">
            <ChangePassword />
          </Route>
          <Route path="/account/ProfileSettings">
            <ProfileSettings />
          </Route>
          <Route path="/account" exact>
            <AccountSettings />
          </Route>

          <Route path="/yourorder" exact>
            <YourOrder />
          </Route>
          <Route path="/success">
            <Success />
          </Route>

          <Route path="/blindlist">
            <ProductList />
          </Route>
          <Route path="/blindlist/:id" exact>
            <ProductList />
          </Route>
          <Route path="/blinds">
            <Products />
          </Route>
          <Route path="/blinds/:id">
            <Products />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/cart/:from">
            <Cart />
          </Route>

          <Route path="/contactus">
            <ContactUs />
          </Route>
          <Route path="/aboutus">
            <Aboutus />
          </Route>
          <Route path="/rollerBlinds">
            <RollerBlinds />
          </Route>
          <Route path="/woodenBlinds">
            <WoodenBlinds />
          </Route>
          <Route path="/verticalBlinds">
            <VerticalBlinds />
          </Route>

          <Route path="/MatrixTableMain">
            <MatrixTableMain />
          </Route>

          <Route path="/yourorder/Invoice/:id">
            <Invoice />
          </Route>

          <Route path="/TermsConditions">
            <TermsConditions />
          </Route>
          <Route path="/PrivacyPolicy">
            <PrivacyPolicy />
          </Route>
          <Route path="/HelpFAQs">
            <HelpFAQs />
          </Route>
          <Route path="/DeliveryTnC">
            <DeliveryTnC />
          </Route>
          <Route path="/WarrantyTs">
            <WarrantyTs />
          </Route>
          <Route path="/howToMeasure">
            <HowtoMeasurePage />
          </Route>
          <Route path="/HowtoInstall">
            <HowtoInstallPage />
          </Route>

          <Route path="/forgotPassword">
            <ForgotPassword />
          </Route>
          <Route path="/login">
            {" "}
            {user ? <Redirect to="/" /> : <Login />}{" "}
          </Route>
          <Route path="/register">
            {Redirectreggister ? (
              <Redirect to="/login" />
            ) : (
              <Register updaterespons={setRedirectreggister} />
            )}
          </Route>
          <Route path="/Search/:searchturm">
            <ProductList />
          </Route>

          <Route path="/" exact>
            <Home />
          </Route>
          {/* admin webpage */}
          <div>
            <AdminTopbar
              onHamburgerClick={() => setIsSidebarOpen(!isSidebarOpen)}
            />
            <div className="container-fluide position-relative">
              <AdminSidebar
                isOpen={isSidebarOpen}
                onLinkClick={() => setIsSidebarOpen(!isSidebarOpen)}
              />

              <Route path="/admin/products-list">
                <AdminProductList />
              </Route>
              <Route path="/admin/products/productPrice">
                <AdminproductPrice />
              </Route>
              <Route path="/admin/products/editProduct/:id">
                <AdminEditProduct />
              </Route>
              <Route path="/admin/products/AddProduct">
                <AdminAddProduct />
              </Route>
              <Route path="/admin/products/AddproductPrice">
                <AdminAddproductPrice />
              </Route>

              <Route path="/admin/All-user">
                <Adminuser />
              </Route>
              <Route path="/admin/user/edituser/:id">
                <AdminEditUser />
              </Route>

              <Route path="/admin/All-Fabrics">
                <AdminFebricLinks />
              </Route>
              <Route path="/admin/Fabrics/addFabric">
                <AdminAddFabric />
              </Route>
              <Route path="/admin/Fabrics/editFabric/:id">
                <AdminEditFabric />
              </Route>

              <Route path="/admin/All-orders">
                <AdminOrdersList />
              </Route>
              <Route path="/admin/orders/Order-Detailes/:id">
                <AdminOrdersDetailes />
              </Route>
              <Route path="/admin/orders/Completed-Orders">
                <AdminCompletedOrder />
              </Route>
              <Route path="/admin/orders/Canceled-Orders">
                <AdminCanceledOrder />
              </Route>

              <Route path="/admin/All-CityNPostalcodes">
                <AdminCityNPostalcode />
              </Route>
              <Route path="/admin/CityNPostalcodes/edit/:id">
                <AdminEditCityNPostalcode />
              </Route>
              <Route path="/admin/addCityNPostalcodes">
                <AdminAddCityNPostalCode />
              </Route>

              {/* for our adminnistratoin */}

              <Route path="/admin/BlindMOtorsLIst">
                <AdminBlindMOtorsLIst />
              </Route>
              <Route path="/admin/BlindMOtors/addBlindMOtors">
                <AdminBlindAddMOtors />
              </Route>
              <Route path="/admin/BlindRemotesLIst">
                <AdminBlindRemotesLIst />
              </Route>
              <Route path="/admin/BlindRemotes/addBlindRemotes">
                <AdminBlindAddRemotes />
              </Route>
              <Route path="/admin/BlindAccessoriesLIst">
                <AdminBlindAccessoriesLIst />
              </Route>
              <Route path="/admin/BlindAccessories/addBlindAccessories">
                <AdminBlindAddAccessories />
              </Route>
              <Route path="/admin/addproducPriceWithNewCategory">
                <AdminaddproducPriceWithNewCatagog />
              </Route>
              <Route path="/admin/Additionalcost" exact>
                <AdminAdditionalcost />
              </Route>
              <Route path="/admin/Additionalcost/AddAdditionalcost">
                <AdminaddAdditionalcost />
              </Route>

              <Route path="/admin" exact>
                <AdminHome />
              </Route>
            </div>
          </div>
          <Route path="*">
            <h2>pagenot found</h2>
          </Route>
        </Switch>
      </Router>
      {/*   )} */}
    </>
  );
}

export default App;
