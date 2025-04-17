import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Card, CardBody, CardTitle, Col, Container, Row, Table
} from "reactstrap";
import withRouter from "../../../components/Common/withRouter";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../Firebase/firebaseConfig";

import Breadcrumbs from "/src/components/Common/Breadcrumb";
import MiniCards from "./mini-card";
import ApexRevenue from "../ApexRevenue";
import TableContainer from "/src/components/Common/TableContainer";

import profile1 from "/src/assets/images/profile-img.png";

const ContactsProfile = () => {
  document.title = "Profile | Skote - Vite React Admin & Dashboard Template";

  const [userProfile, setUserProfile] = useState(null);

  const miniCards = [
    { title: "Completed Projects", iconClass: "bx-check-circle", text: "125" },
    { title: "Pending Projects", iconClass: "bx-hourglass", text: "12" },
    { title: "Total Revenue", iconClass: "bx-package", text: "$36,524" },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userRef = doc(db, "contacts", "YOUR_CONTACT_ID_HERE"); // Replace with actual contact ID
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserProfile(userSnap.data());
        } else {
          console.warn("No such contact in Firestore");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const columns = useMemo(() => [
    { header: "#", accessorKey: "id" },
    { header: "Project", accessorKey: "name" },
    { header: "Start Date", accessorKey: "startDate" },
    { header: "Deadline", accessorKey: "deadline" },
    { header: "Budget", accessorKey: "budget" },
  ], []);

  if (!userProfile) {
    return <p>Loading...</p>;
  }

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Contacts" breadcrumbItem="Profile" />

        <Row>
          <Col xl="4">
            <Card className="overflow-hidden">
              <div className="bg-primary-subtle">
                <Row>
                  <Col xs="7">
                    <div className="text-primary p-3">
                      <h5 className="text-primary">Welcome Back !</h5>
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
                        src={userProfile.img || profile1}
                        alt=""
                        className="img-thumbnail rounded-circle"
                      />
                    </div>
                    <h5 className="font-size-15 text-truncate">{userProfile.name}</h5>
                    <p className="text-muted mb-0 text-truncate">{userProfile.designation}</p>
                  </Col>
                  <Col sm="8">
                    <div className="pt-4">
                      <Row>
                        <Col xs="6">
                          <h5 className="font-size-15">{userProfile.projectCount || 0}</h5>
                          <p className="text-muted mb-0">Projects</p>
                        </Col>
                        <Col xs="6">
                          <h5 className="font-size-15">${userProfile.revenue || 0}</h5>
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
                <Table className="table-nowrap mb-0">
                  <tbody>
                    <tr><th>Full Name :</th><td>{userProfile.name}</td></tr>
                    <tr><th>Mobile :</th><td>{userProfile.phone}</td></tr>
                    <tr><th>Email :</th><td>{userProfile.email}</td></tr>
                    <tr><th>Location :</th><td>{userProfile.location}</td></tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <CardTitle className="mb-5">Experience</CardTitle>
                <ul className="verti-timeline list-unstyled">
                  {(userProfile.experiences || []).map((exp, i) => (
                    <li key={i} className={exp.id === 1 ? "event-list active" : "event-list"}>
                      <div className="event-timeline-dot">
                        <i className={`bx bx-right-arrow-circle${exp.id === 1 ? " bx-fade-right" : ""}`} />
                      </div>
                      <div className="d-flex">
                        <div className="me-3">
                          <i className={`bx ${exp.iconClass} h4 text-primary`} />
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="font-size-15">
                            <Link to={exp.link} className="text-dark">{exp.designation}</Link>
                          </h5>
                          <span className="text-primary">{exp.timeDuration}</span>
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
              {miniCards.map((card, i) => (
                <MiniCards {...card} key={i} />
              ))}
            </Row>

            <Card>
              <CardBody>
                <CardTitle className="mb-4">Revenue</CardTitle>
                <ApexRevenue dataColors='["--bs-primary"]' />
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <CardTitle className="mb-4">My Projects</CardTitle>
                <TableContainer
                  columns={columns}
                  data={userProfile.projects || []}
                  isGlobalFilter={false}
                  tableClass='table-nowrap table-hover mb-0'
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default withRouter(ContactsProfile);
