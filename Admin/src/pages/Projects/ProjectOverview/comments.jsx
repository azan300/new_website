import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";

const Comments = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return (
      <Card>
        <CardBody>
          <CardTitle className="mb-4">Comments</CardTitle>
          <p className="text-muted">No comments yet.</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardBody>
        <CardTitle className="mb-4">Comments</CardTitle>
        {(comments || []).map((comment, index) => (
          <div className="d-flex mb-4" key={index}>
            <div className="me-3">
              {comment.userImg ? (
                <img
                  className="media-object rounded-circle avatar-xs"
                  alt=""
                  src={comment.userImg}
                />
              ) : (
                <div className="avatar-xs">
                  <span className="avatar-title rounded-circle bg-primary-subtle text-primary font-size-16">
                    {comment.username?.charAt(0) || "U"}
                  </span>
                </div>
              )}
            </div>

            <div className="flex-grow-1">
              <h5 className="font-size-13 mb-1">
                {comment.username || "Unknown User"}
              </h5>
              <p className="text-muted mb-1">{comment.comment || ""}</p>

              {comment.reply && (
                <div className="d-flex mt-3">
                  <div className="flex-shrink-0 me-3">
                    <div className="avatar-xs">
                      {comment.reply.userImg ? (
                        <img
                          className="media-object rounded-circle avatar-xs"
                          alt=""
                          src={comment.reply.userImg}
                        />
                      ) : (
                        <span className="avatar-title rounded-circle bg-primary-subtle text-primary font-size-16">
                          {comment.reply.username?.charAt(0) || "R"}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="font-size-13 mb-1">
                      {comment.reply.username || "Reply User"}
                    </h5>
                    <p className="text-muted mb-1">
                      {comment.reply.comment || ""}
                    </p>
                  </div>
                  <div className="ms-3">
                    <Link to="#" className="text-primary">
                      Reply
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="ms-3">
              <Link to="#" className="text-primary">
                Reply
              </Link>
            </div>
          </div>
        ))}

        <div className="text-center mt-4 pt-2">
          <Link to="#" className="btn btn-primary btn-sm">
            View more
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};

Comments.propTypes = {
  comments: PropTypes.array,
};

export default Comments;
