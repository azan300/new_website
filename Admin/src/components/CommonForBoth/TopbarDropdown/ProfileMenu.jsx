import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle,} from "reactstrap";

//i18n
import {withTranslation} from "react-i18next";

// Redux
import {connect} from "react-redux";
import {Link, useParams, useSearchParams} from "react-router-dom";
import withRouter from "../../Common/withRouter";

// users
import {get} from "../../../helpers/api_helper.jsx";

const ProfileMenu = (props) => {
  // Declare a new state variable, which we'll call "menu"
  const [searchParams, setSearchParams] = useSearchParams();
  const [menu, setMenu] = useState(false);

  const [username, setusername] = useState("Admin");

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      if (import.meta.env.VITE_APP_DEFAULTAUTH === "firebase") {
        (async () => {
          let userId = searchParams.get("id");
          if (!userId) {
            userId = localStorage.getItem("userId");
          }
          let authDetail = localStorage.getItem("authUser");
          console.log(!authDetail)
          if (!authDetail) {
            authDetail = await get(`/auth/me/${userId}`)
            localStorage.setItem("authUser", JSON.stringify(authDetail.detail))
          } else {
            authDetail = JSON.parse(authDetail)
          };
          setusername(authDetail.email);
        })()
      } else if (
        import.meta.env.VITE_APP_DEFAULTAUTH === "fake" ||
        import.meta.env.VITE_APP_DEFAULTAUTH === "jwt"
      ) {
        const obj = JSON.parse(localStorage.getItem("authUser"));
        setusername(obj.username);
      }
    }
  }, [props.success]);

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          <div
            className="rounded-circle"
            style={{
              width: "36px",
              height: "36px",
              backgroundColor: "black",
              display: "inline-block"
            }}
          ></div>
          <span className="d-none d-xl-inline-block ms-2 me-1">{username}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" href="/profile">
            {" "}
            <i className="bx bx-user font-size-16 align-middle me-1" />
            {props.t("Profile")}{" "}
          </DropdownItem>
          <DropdownItem tag="a" href="/crypto-wallet">
            <i className="bx bx-wallet font-size-16 align-middle me-1" />
            {props.t("My Wallet")}
          </DropdownItem>
          <DropdownItem tag="a" href="#">
            <span className="badge bg-success float-end">11</span>
            <i className="bx bx-wrench font-size-16 align-middle me-1" />
            {props.t("Settings")}
          </DropdownItem>
          <DropdownItem tag="a" href="auth-lock-screen">
            <i className="bx bx-lock-open font-size-16 align-middle me-1" />
            {props.t("Lock screen")}
          </DropdownItem>
          <div className="dropdown-divider" />
          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>{props.t("Logout")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
};

const mapStatetoProps = (state) => {
  const { error, success } = state.Profile;
  return { error, success };
};

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
);
