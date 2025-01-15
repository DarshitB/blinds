import React from "react";
import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { NavLink } from "react-router-dom";
function AdminSidebar({ isOpen, onLinkClick }) {
  const sidebarClass = isOpen ? "sidebar-container open" : "sidebar-container";
  return (
    <div className={sidebarClass}>
      <div className="sidebar">
        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            {/*           <h3 className="sidebarTitle">Dashboard</h3>
             */}{" "}
            <ul className="sidebarList">
              <NavLink
                to="/admin"
                exact
                className="link"
                activeClassName="active"
                onClick={onLinkClick}
              >
                <li className="sidebarListItem">
                  <LineStyle className="sidebarIcon" />
                  Home
                </li>
              </NavLink>
              <NavLink
                to="/admin/All-orders"
                activeClassName="active"
                className="link"
                onClick={onLinkClick}
              >
                <li className="sidebarListItem">
                  <i className="fa fa-cart-arrow-down icons"></i>
                  Orders
                </li>
              </NavLink>
              <NavLink
                to="/admin/products-list"
                activeClassName="active"
                className="link"
                onClick={onLinkClick}
              >
                <li className="sidebarListItem">
                  <Storefront className="sidebarIcon" />
                  Products
                </li>
              </NavLink>
              <NavLink
                to="/admin/All-Fabrics"
                activeClassName="active"
                className="link"
                onClick={onLinkClick}
              >
                <li className="sidebarListItem">
                  <i className="fa fa-clone icons"></i>
                  Fabrics
                </li>
              </NavLink>
              <NavLink
                to="/admin/All-CityNPostalcodes"
                className="link"
                activeClassName="active"
                onClick={onLinkClick}
              >
                <li className="sidebarListItem">
                  <i className="fa fa-location-arrow icons"></i>
                  City & Postalcode
                </li>
              </NavLink>
              <NavLink
                to="/admin/All-user"
                className="link"
                activeClassName="active"
                onClick={onLinkClick}
              >
                <li className="sidebarListItem">
                  <PermIdentity className="sidebarIcon" />
                  Users
                </li>
              </NavLink>
              {/* ///////////////////////////////////////////////////////////////////////////////////////// */}

              {/* <li className="alert alert-info my-3 py-2">Admin by us</li>
              <NavLink
                to="/admin/BlindMOtorsLIst"
                className="link"
                activeClassName="active"
                onClick={onLinkClick}
              >
                <li className="sidebarListItem">Motors</li>
              </NavLink>
              <NavLink
                to="/admin/BlindRemotesLIst"
                className="link"
                activeClassName="active"
                onClick={onLinkClick}
              >
                <li className="sidebarListItem">Remotes</li>
              </NavLink>
              <NavLink
                to="/admin/BlindAccessoriesLIst"
                className="link"
                activeClassName="active"
                onClick={onLinkClick}
              >
                <li className="sidebarListItem">Accessories</li>
              </NavLink>
              <NavLink
                to="/admin/addproducPriceWithNewCategory"
                className="link"
                activeClassName="active"
                onClick={onLinkClick}
              >
                <li className="sidebarListItem">
                  add producPrice With New Category
                </li>
              </NavLink>
              <NavLink
                to="/admin/Additionalcost"
                className="link"
                activeClassName="active"
                onClick={onLinkClick}
              >
                <li className="sidebarListItem">Additionalcost</li>
              </NavLink> */}
              {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
            </ul>
          </div>

          {/*  <div className="sidebarMenu">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            Manage
          </li>
          <li className="sidebarListItem">
            <Timeline className="sidebarIcon" />
            Analytics
          </li>
          <li className="sidebarListItem">
            <Report className="sidebarIcon" />
            Reports
          </li>
        </ul>
      </div> */}
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
