import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

// Import Widgets
import WelcomeWidget from "../../components/WelcomeWidget";
import CalendarWidget from "../../components/CalendarWidget";
import ChatWidget from "../../components/ChatWidget";
import EmailWidget from "../../components/EmailWidget";
import ProjectWidget from "../../components/ProjectWidget";

// Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { getChartsData as onGetChartsData } from "/src/store/actions";

const Dashboard = (props) => {
  const dispatch = useDispatch();

  const DashboardProperties = createSelector(
    (state) => state.Dashboard,
    (dashboard) => ({
      chartsData: dashboard.chartsData,
    })
  );

  const { chartsData } = useSelector(DashboardProperties);

  const [periodData, setPeriodData] = useState([]);
  const [periodType, setPeriodType] = useState("Year");

  useEffect(() => {
    setPeriodData(chartsData);
  }, [chartsData]);

  useEffect(() => {
    dispatch(onGetChartsData("Year"));
  }, [dispatch]);

  // Meta title
  document.title = "Dashboard | Skote Admin Panel";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Breadcrumb */}
          <Breadcrumbs title={props.t("Dashboards")} breadcrumbItem={props.t("Dashboard")} />

          {/* Row 1: Welcome & Projects */}
          <Row>
            <Col xl="4">
              <WelcomeWidget />
            </Col>
            <Col xl="8">
              <ProjectWidget />
            </Col>
          </Row>

          {/* Row 2: Calendar & Chat */}
          <Row>
            <Col xl="6">
              <CalendarWidget />
            </Col>
            <Col xl="6">
              <ChatWidget />
            </Col>
          </Row>

          {/* Row 3: Email */}
          <Row>
            <Col xl="12">
              <EmailWidget />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

Dashboard.propTypes = {
  t: PropTypes.any,
};

export default Dashboard;
