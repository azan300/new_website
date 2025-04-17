import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import { size } from "lodash";

const CardContact = ({ user }) => {
  if (!user) return null;

  const displayTags = user.tags?.slice(0, 2) || [];
  const extraTagCount = user.tags?.length > 2 ? user.tags.length - 2 : 0;

  return (
    <React.Fragment>
      <Col xl={3} sm={6}>
        <Card className="text-center">
          <CardBody>
            {!user.img ? (
              <div className="avatar-sm mx-auto mb-4">
                <span className={
                  `avatar-title rounded-circle bg-${user.color || "primary"}-subtle text-${user.color || "primary"} font-size-16`
                }>
                  {user.name?.charAt(0) || "?"}
                </span>
              </div>
            ) : (
              <div className="mb-4">
                <img
                  className="rounded-circle avatar-sm"
                  src={user.img}
                  alt="Profile"
                />
              </div>
            )}

            <h5 className="font-size-15 mb-1">
              <Link to="#" className="text-dark">
                {user.name || "Unnamed"}
              </Link>
            </h5>
            <p className="text-muted">{user.designation || "Unknown"}</p>

            <div>
              {displayTags.map((tag, index) => (
                <Link
                  to="#"
                  className="badge bg-primary font-size-11 m-1"
                  key={`_skill_${user.id}_${index}`}
                >
                  {tag}
                </Link>
              ))}
              {extraTagCount > 0 && (
                <Link
                  to="#"
                  className="badge bg-primary font-size-11 m-1"
                  key={`_skill_more_${user.id}`}
                >
                  {extraTagCount}+ more
                </Link>
              )}
            </div>
          </CardBody>

          <CardFooter className="bg-transparent border-top">
            <div className="contact-links d-flex font-size-20">
              <div className="flex-fill">
                <Link to="#" id={`message${user.id}`}>
                  <i className="bx bx-message-square-dots" />
                  <UncontrolledTooltip target={`message${user.id}`} placement="top">
                    Message
                  </UncontrolledTooltip>
                </Link>
              </div>
              <div className="flex-fill">
                <Link to="#" id={`project${user.id}`}>
                  <i className="bx bx-pie-chart-alt" />
                  <UncontrolledTooltip target={`project${user.id}`} placement="top">
                    Projects
                  </UncontrolledTooltip>
                </Link>
              </div>
              <div className="flex-fill">
                <Link to="#" id={`profile${user.id}`}>
                  <i className="bx bx-user-circle" />
                  <UncontrolledTooltip target={`profile${user.id}`} placement="top">
                    Profile
                  </UncontrolledTooltip>
                </Link>
              </div>
            </div>
          </CardFooter>
        </Card>
      </Col>
    </React.Fragment>
  );
};

CardContact.propTypes = {
  user: PropTypes.object.isRequired,
};

export default CardContact;
