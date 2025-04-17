import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import { Link } from "react-router-dom";
import { map } from "lodash";

const AttachedFiles = ({ files }) => {
  if (!files || files.length === 0) {
    return (
      <Card>
        <CardBody>
          <CardTitle className="mb-4">Attached Files</CardTitle>
          <p className="text-muted">No files attached to this project.</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardBody>
        <CardTitle className="mb-4">Attached Files</CardTitle>
        <div className="table-responsive">
          <Table className="table-nowrap align-middle table-hover mb-0">
            <tbody>
              {map(files, (file, i) => (
                <tr key={`_file_${i}`}>
                  <td style={{ width: "45px" }}>
                    <div className="avatar-sm">
                      <span className="avatar-title rounded-circle bg-primary-subtle text-primary font-size-24">
                        <i className="bx bxs-file-doc" />
                      </span>
                    </div>
                  </td>
                  <td>
                    <h5 className="font-size-14 mb-1">
                      <Link to={file.link || "#"} className="text-dark">
                        {file.name || "Unnamed File"}
                      </Link>
                    </h5>
                    <small>Size: {file.size || "Unknown"}</small>
                  </td>
                  <td>
                    <div className="text-center">
                      <Link to={file.link || "#"} className="text-dark">
                        <i className="bx bx-download h3 m-0" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
};

AttachedFiles.propTypes = {
  files: PropTypes.array,
};

export default AttachedFiles;
