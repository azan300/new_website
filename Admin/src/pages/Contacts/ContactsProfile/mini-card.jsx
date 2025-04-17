import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import withRouter from "../../../components/Common/withRouter";
import { Card, CardBody, CardTitle, Col, Container, Row, Table } from "reactstrap";

// TableContainer
import TableContainer from "/src/components/Common/TableContainer";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";

//Import mini card widgets
import MiniCards from "./mini-card";

//Import Images
import profile1 from "/src/assets/images/profile-img.png";

// import charts
import ApexRevenue from "../ApexRevenue";
import { getUserProfile } from "/src/store/actions";

const ContactsProfile = (props) => {
  document.title = "Profile | Skote - Vite React Admin & Dashboard Template";

  const { userProfile, onGetUserProfile } = props;

  const miniCards = [
    {
      title: "Completed Projects",
      iconClass: "bx-check-circle",
      text: userProfile.completedProjects || "0",
    },
    {
      title: "Pending Projects",
      iconClass: "bx-hourglass",
      text: userProfile.pendingProjects || "0",
    },
    {
      title: "Total Revenue",
      iconClass: "bx-package",
      text: userProfile.revenue ? `$${userProfile.revenue}` : "$0",
    },
  ];

  useEffect(() => {
    onGetUserProfile();
  }, [onGetUserProfile]);

  const columns = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "id",
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "Project",
        accessorKey: "name",
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "Start Date",
        accessorKey: "startDate",
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "Deadline",
        accessorKey: "deadline",
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "Budget",
        accessorKey: "budget",
        enableColumnFilter: false,
        enableSorting: false,
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Contacts" breadcrumbItem="Profile" />

          <Row>
            <Col xl="4">
              <Card className="overflow-hidden">
                <div className="bg-primary-subtle">
                  <Row>
                    <Col xs="7">
                      <div className="text-primary p-3">
                        <h5 className="text-primary">Welcome Back!</h5>
                        <p>It will seem like simplified</p>
                      </div>
                    </Col>
                    <Col xs="5" className="align-self-end">
                      <img src={profile1} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <Row>
                    <Col sm="4">
                      <div className="avatar-md profile-user-wid mb-4">
                        <img
                          src={userProfile.img}
                          alt=""
                          className="img-thumbnail rounded-circle"
                        />
                      </div>
                      <h5 className="font-size-15 text-truncate">{userProfile.name}</h5>
                      <p className="text-muted mb-0 text-truncate">{userProfile.designation}</p>
                    </Col>

                    <Col sm={8}>
                      <div className="pt-4">
                        <Row>
                          <Col xs="6">
                            <h5 className="font-size-15">{userProfile.projectCount}</h5>
                            <p className="text-muted mb-0">Projects</p>
                          </Col>
                          <Col xs="6">
                            <h5 className="font-size-15">${userProfile.revenue}</h5>
                            <p className="text-muted mb-0">Revenue</p>
                          </Col>
                        </Row>
                        <div className="mt-4">
                          <Link to="#" className="btn btn-primary btn-sm">
                            View Profile <i className="mdi mdi-arrow-right ms-1" />
                          </Link>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Personal Information</CardTitle>
                  <p className="text-muted mb-4">{userProfile.personalDetail}</p>
                  <div className="table-responsive">
                    <Table className="table-nowrap mb-0">
                      <tbody>
                        <tr>
                          <th scope="row">Full Name :</th>
                          <td>{userProfile.name}</td>
                        </tr>
                        <tr>
                          <th scope="row">Mobile :</th>
                          <td>{userProfile.phone}</td>
                        </tr>
                        <tr>
                          <th scope="row">E-mail :</th>
                          <td>{userProfile.email}</td>
                        </tr>
                        <tr>
                          <th scope="row">Location :</th>
                          <td>{userProfile.location}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardTitle className="mb-5">Experience</CardTitle>
                  <ul className="verti-timeline list-unstyled">
                    {(userProfile.experiences || [])?.map((experience, i) => (
                      <li
                        className={experience.id === 1 ? "event-list active" : "event-list"}
                        key={"_exp_" + i}
                      >
                        <div className="event-timeline-dot">
                          <i
                            className={
                              experience.id === 1
                                ? "bx bx-right-arrow-circle bx-fade-right"
                                : "bx bx-right-arrow-circle"
                            }
                          />
                        </div>
                        <div className="d-flex">
                          <div className="me-3">
                            <i className={`bx ${experience.iconClass} h4 text-primary`} />
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="font-size-15">
                              <Link to={experience.link} className="text-dark">
                                {experience.designation}
                              </Link>
                            </h5>
                            <span className="text-primary">{experience.timeDuration}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            </Col>

            <Col xl="8">
              <Row>
                {miniCards.map((card, key) => (
                  <MiniCards
                    title={card.title}
                    text={card.text}
                    iconClass={card.iconClass}
                    key={"_card_" + key}
                  />
                ))}
              </Row>

              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Revenue</CardTitle>
                  <div id="revenue-chart">
                    <ApexRevenue dataColors='["--bs-primary"]' />
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardTitle className="mb-4">My Projects</CardTitle>
                  <TableContainer
                    columns={columns}
                    data={userProfile.projects || []}
                    isGlobalFilter={false}
                    tableClass="table-nowrap table-hover mb-0"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

ContactsProfile.propTypes = {
  userProfile: PropTypes.object,
  onGetUserProfile: PropTypes.func,
};

const mapStateToProps = ({ contacts }) => ({
  userProfile: contacts.userProfile,
});

const mapDispatchToProps = (dispatch) => ({
  onGetUserProfile: () => dispatch(getUserProfile()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ContactsProfile));
