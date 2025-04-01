import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
} from "reactstrap";
import { Link } from "react-router-dom";

import classNames from "classnames";

//import action
import { getChartsData as onGetChartsData } from "/src/store/actions";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

const Dashboard = (props) => {
  const DashboardProperties = createSelector(
    (state) => state.Dashboard,
    (dashboard) => ({
      chartsData: dashboard.chartsData,
    })
  );

  const { chartsData } = useSelector(DashboardProperties);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onGetChartsData("Year"));
  }, [dispatch]);

  //meta title
  document.title = "Dashboard | StraightUp Roofing - Vite React Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title={props.t("Dashboards")} breadcrumbItem={props.t("Dashboard")} />

          <Row>
            <Col xl="3" md="6">
              <Card className="mini-stats-wid">
                <CardBody>
                  <h5 className="text-primary">Chat Notifications</h5>
                  <p className="text-muted mb-0">3 new messages</p>
                </CardBody>
              </Card>
            </Col>

            <Col xl="3" md="6">
              <Card className="mini-stats-wid">
                <CardBody>
                  <h5 className="text-primary">Calendar</h5>
                  <p className="text-muted mb-0">2 upcoming events today</p>
                </CardBody>
              </Card>
            </Col>

            <Col xl="3" md="6">
              <Card className="mini-stats-wid">
                <CardBody>
                  <h5 className="text-primary">Jobs</h5>
                  <p className="text-muted mb-0">5 scheduled jobs</p>
                </CardBody>
              </Card>
            </Col>

            <Col xl="3" md="6">
              <Card className="mini-stats-wid">
                <CardBody>
                  <h5 className="text-primary">Gmail</h5>
                  <p className="text-muted mb-0">4 unread emails</p>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Dashboard);
