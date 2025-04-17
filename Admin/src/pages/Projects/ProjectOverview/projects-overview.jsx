import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig"; // Adjust path if needed
import { Col, Container, Row } from "reactstrap";
import { isEmpty } from "lodash";

// Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";

// Component imports
import ProjectDetail from "./projectDetail";
import TeamMembers from "./teamMembers";
import OverviewChart from "./overviewChart";
import AttachedFiles from "./attachedFiles";
import Comments from "./comments";

const ProjectsOverview = () => {
  // Page title
  document.title = "Project Overview | Skote - Vite React Admin & Dashboard Template";

  // Get project ID from URL
  const { id } = useParams();

  // Local state to hold project detail
  const [projectDetail, setProjectDetail] = useState(null);

  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        const docRef = doc(db, "projects", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProjectDetail({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("No such project exists!");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProjectDetail();
  }, [id]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Projects" breadcrumbItem="Project Overview" />

          {!isEmpty(projectDetail) && (
            <>
              <Row>
                <Col lg="8">
                  <ProjectDetail project={projectDetail} />
                </Col>

                <Col lg="4">
                  <TeamMembers team={projectDetail.team} />
                </Col>
              </Row>

              <Row>
                <Col lg="4">
                  <OverviewChart dataColors='["--bs-primary"]' stats={projectDetail?.progressStats || []} />
                </Col>

                <Col lg="4">
                  <AttachedFiles files={projectDetail.files || []} />
                </Col>

                <Col lg="4">
                  <Comments comments={projectDetail.comments || []} />
                </Col>
              </Row>
            </>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ProjectsOverview;
