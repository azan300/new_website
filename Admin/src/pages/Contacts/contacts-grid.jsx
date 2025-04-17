import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { collection, getDocs } from "firebase/firestore";

import withRouter from "../../components/Common/withRouter";
import { db } from "../../Firebase/firebaseConfig";

// Components
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import CardContact from "./card-contact";
import Spinners from "../../components/Common/Spinner";

const ContactsGrid = () => {
  // Meta title
  document.title = "User Grid | Skote - Vite React Admin & Dashboard Template";

  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "contacts"));
        const contactsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(contactsData);
      } catch (error) {
        console.error("Error fetching contacts: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Contacts" breadcrumbItem="User Grid" />

          <Row>
            {isLoading ? (
              <Spinners setLoading={setLoading} />
            ) : (
              <>
                <Row>
                  {(users || []).map((user, key) => (
                    <CardContact user={user} key={`_user_${key}`} />
                  ))}
                </Row>

                <Row>
                  <Col xs="12">
                    <div className="text-center my-3">
                      <Link to="#" className="text-success">
                        <i className="bx bx-hourglass bx-spin me-2" />
                        Load more
                      </Link>
                    </div>
                  </Col>
                </Row>
              </>
            )}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(ContactsGrid);
