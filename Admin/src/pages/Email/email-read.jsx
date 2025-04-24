import React, {useEffect, useState} from "react";
import {Card, CardBody, Col, Container, Row} from "reactstrap";
import {useParams} from "react-router-dom";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {get} from "../../helpers/api_helper.jsx";

const EmailRead = () => {
  const { id } = useParams();
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        let authUser = localStorage.getItem("authUser");
        if (authUser) {
          authUser = JSON.parse(authUser);
          const res = await get(`/gmail/emails/thread/${id}?id=${authUser.id}`);
          if (res.length > 0) {
            setEmail(res[0]);
          }
        }
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
                          src={`https://ui-avatars.com/api/?name=${email.sender}`}
                          alt="sender"
                        />
                        <div className="flex-grow-1">
                          <h5 className="font-size-14 mt-1">
                            {email.sender || email.from}
                          </h5>
                          <small className="text-muted">{email.from?.emailAddress?.address}</small>
                        </div>
                      </div>

                      <h4 className="mt-0 font-size-16">{email.subject || "No Subject"}</h4>

                      <div dangerouslySetInnerHTML={{__html: email.body || email.snippet || "<p>No content</p>"}}/>
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
