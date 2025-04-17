import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";

const TeamMembers = ({ team }) => {
  return (
    <Card>
      <CardBody>
        <CardTitle className="mb-4">Team Members</CardTitle>
        <div className="list-group">
          {(team || []).map((member, index) => (
            <div
              key={index}
              className="d-flex align-items-center mb-3 border-bottom pb-2"
            >
              <div className="flex-shrink-0 me-3">
                {member.img && member.img !== "Null" ? (
                  <img
                    src={member.img}
                    alt={member.name || "member"}
                    className="rounded-circle avatar-xs"
                  />
                ) : (
                  <div
                    className={`avatar-xs rounded-circle bg-${member.color || "secondary"} text-white d-flex align-items-center justify-content-center`}
                  >
                    <span className="font-size-14">
                      {member.name ? member.name.charAt(0) : "?"}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-grow-1">
                <h5 className="font-size-14 mb-1">
                  <Link to="#" className="text-dark">
                    {member.fullname || member.name || "Unnamed"}
                  </Link>
                </h5>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

TeamMembers.propTypes = {
  team: PropTypes.array.isRequired,
};

export default TeamMembers;
