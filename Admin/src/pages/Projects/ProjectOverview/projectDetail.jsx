import React from "react";
import PropTypes from "prop-types";
import { map, get } from "lodash";
import { Card, CardBody, Col, Row } from "reactstrap";

const ProjectDetail = ({ project }) => {
  const name = project?.name || "Unnamed Project";
  const description = get(project, "description", "No description provided.");
  const points = get(project, "projectDetails.points", []);
  const startDate = get(project, "startDate", "N/A");
  const dueDate = get(project, "dueDate", "N/A");
  const img = get(project, "img");

  return (
    <Card>
      <CardBody>
        <div className="d-flex">
          {img ? (
            <img src={img} alt="project-logo" className="avatar-sm me-4 rounded" />
          ) : (
            <div className="avatar-sm me-4 bg-light rounded d-flex align-items-center justify-content-center">
              <i className="bx bx-image-alt text-muted font-size-20" />
            </div>
          )}

          <div className="flex-grow-1 overflow-hidden">
            <h5 className="text-truncate font-size-15">{name}</h5>
            <p className="text-muted">{description}</p>
          </div>
        </div>

        {points.length > 0 && (
          <>
            <h5 className="font-size-15 mt-4">Project Points:</h5>
            <div className="text-muted mt-2">
              {map(points, (point, index) => (
                <p key={index}>
                  <i className="mdi mdi-chevron-right text-primary me-1" />
                  {point}
                </p>
              ))}
            </div>
          </>
        )}

        <Row className="task-dates mt-4">
          <Col sm="4" xs="6">
            <div>
              <h5 className="font-size-14">
                <i className="bx bx-calendar me-1 text-primary" /> Start Date
              </h5>
              <p className="text-muted mb-0">{startDate}</p>
            </div>
          </Col>

          <Col sm="4" xs="6">
            <div>
              <h5 className="font-size-14">
                <i className="bx bx-calendar-check me-1 text-primary" /> Due Date
              </h5>
              <p className="text-muted mb-0">{dueDate}</p>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

ProjectDetail.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectDetail;
