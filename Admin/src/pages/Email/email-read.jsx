import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import axios from "axios";

const EmailRead = () => {
  const { id } = useParams();
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const res = await axios.get(`/api/get-email/${id}`);
        setEmail(res.data);
      } catch (err) {
        console.error("Failed to load email:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmail();
  }, [id]);

  document.title = "Read Email | Gmail Viewer";

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Email" breadcrumbItem="Read Email" />
        <Row>
          <Col xs="12">
            <div className="email-rightbar mb-3">
              <Card>
                <CardBody>
                  {loading ? (
                    <p>Loading email...</p>
                  ) : email ? (
                    <>
                      <div className="d-flex mb-4">
                        <img
                          className="d-flex me-3 rounded-circle avatar-sm"
                          src="https://ui-avatars.com/api/?name=Sender"
                          alt="sender"
                        />
                        <div className="flex-grow-1">
                          <h5 className="font-size-14 mt-1">
                            {email.sender || email.from?.emailAddress?.name}
                          </h5>
                          <small className="text-muted">{email.from?.emailAddress?.address}</small>
                        </div>
                      </div>

                      <h4 className="mt-0 font-size-16">{email.subject || "No Subject"}</h4>

                      <div dangerouslySetInnerHTML={{ __html: email.body || "<p>No content</p>" }} />
                    </>
                  ) : (
                    <h5>Email not found.</h5>
                  )}
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EmailRead;
