import React, { useEffect, useState } from "react";
import { Link }                       from "react-router-dom";
import withRouter                     from "../../components/Common/withRouter";
import {
  Button,
  Card,
  Col,
  Container,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  Row
}                                     from "reactstrap";
import classnames                     from "classnames";

// Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

// Import Editor
import { CKEditor }  from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// Static Labels and Chat
import { labelsData, mailChatData } from "../../common/data";
import Spinners                     from "../../components/Common/Spinner";
import { get, post }                from "../../helpers/api_helper.jsx";

const EmailInbox = (props) => {
  document.title = "Inbox | - Vite React Admin & Dashboard Template";

  const [emails, setEmails] = useState([]);
  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [badgeLength, setBadgeLength] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editorData, setEditorData] = useState('');


  useEffect(() => {
    const fetchGmail = async () => {
      try {
        let authUser = localStorage.getItem("authUser");
        if (authUser) {
          authUser = JSON.parse(authUser);
          const res = await get(`/gmail/emails?id=${ authUser.id }`);
          if (Array.isArray(res)) {
            setEmails(res || []);
            setBadgeLength(res.filter(email => !email.read).length);
          }
        }
      }
      catch (err) {
        console.error("Failed to load Gmail emails:", err);
      } finally {
        console.log('7777')
        setLoading(false);

      }
    };

    fetchGmail();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Email" breadcrumbItem="Inbox"/>
          <Row>
            <Col xs="12">
              <Card className="email-leftbar">
                <Button type="button" color="danger" onClick={ () => setModal(!modal) } block>Compose</Button>

                <div className="mail-list mt-4">
                  <Nav tabs className="nav-tabs-custom" vertical role="tablist">
                    <NavItem>
                      <a href="#" className={ classnames({ active: activeTab === "1" }) }
                         onClick={ () => setActiveTab("1") }> <i className="mdi mdi-email-outline me-2"></i> Inbox <span
                        className="ml-1 float-end">{ badgeLength }</span></a>
                    </NavItem>
                  </Nav>
                </div>

                <h6 className="mt-4">Labels</h6>
                <div className="mail-list mt-1">
                  { labelsData.map((item, index) => (
                    <Link to="#" key={ index }><span className={ item.icon }></span>{ item.text }</Link>
                  )) }
                </div>

                <h6 className="mt-4">Chat</h6>
                <div className="mt-2">
                  { mailChatData.map((item, index) => (
                    <Link to="#" className="d-flex" key={ index }>
                      <div className="flex-shrink-0">
                        <img className="d-flex me-3 rounded-circle" src={ item.imageSrc } alt="chat" height="36"/>
                      </div>
                      <div className="flex-grow-1 chat-user-box">
                        <p className="user-title m-0">{ item.userTitle }</p>
                        <p className="text-muted">{ item.textMessage }</p>
                      </div>
                    </Link>
                  )) }
                </div>
              </Card>

              <Modal isOpen={ modal } autoFocus centered toggle={ () => setModal(!modal) }>
                <div className="modal-content">
                  <ModalHeader toggle={ () => setModal(!modal) }>New Message</ModalHeader>

                  <form onSubmit={ async (e) => {
                    e.preventDefault()
                    let authUser = localStorage.getItem("authUser");
                    if (authUser) {
                      authUser = JSON.parse(authUser);
                      const message = await post(`/gmail/emails?id=${ authUser.id }`, {
                        "to": e.currentTarget["to"].value,
                        "subject": e.currentTarget["subject"].value,
                        "message": editorData
                      })
                    }
                    setModal(false);
                  }
                  }>
                    <ModalBody>
                      <div className="mb-3">
                        <Input type="email" placeholder="To" name={ "to" }/>
                      </div>
                      <div className="mb-3">
                        <Input type="text" placeholder="Subject" name={ "subject" }/>
                      </div>
                      <CKEditor editor={ ClassicEditor } data="<p>Hello from CKEditor 5!</p>"
                                onChange={ (event, editor) => {
                                  const data = editor.getData(); // HTML
                                  setEditorData(data);
                                } }/>
                    </ModalBody>
                    <ModalFooter>
                      <Button type="button" color="secondary" onClick={ () => setModal(!modal) }>Close</Button>
                      <Button type="submit" color="primary"> Send <i className="fab fa-telegram-plane ms-1"></i>
                      </Button>
                    </ModalFooter>
                  </form>
                </div>
              </Modal>

              <div className="email-rightbar mb-3">
                <Card>
                  { loading ? (
                    <Spinners/>
                  ) : emails.length > 0 ? (
                    <ul className="message-list">
                      { emails.map((email, key) => {
                        const match = email.from.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
                        const emailAddress = match ? match[0] : '';
                        return (<li key={ key } className="unread">
                            <div className="col-mail col-mail-1">
                              <div className="checkbox-wrapper-mail">
                                <Input type="checkbox" value={ email.id } id={ email.id }/>
                                <Label htmlFor={ email.id } className="toggle"/>
                              </div>
                              <Link to={ `/email-read/${ email.id }` } className="title">{ emailAddress }</Link>
                            </div>
                            <div className="col-mail col-mail-2">
                              <Link to={ `/email-read/${ email.id }` } className="subject">
                                { email.subject || "No Subject" } – <span className="teaser">{ email.snippet }</span>
                              </Link>
                              <div
                                className="date">{ new Date(email.date || email.receivedTime || Date.now()).toLocaleDateString() }</div>
                            </div>
                          </li>
                        )
                      }) }
                    </ul>
                  ) : (
                    <div className="text-center p-4">
                      <i className="mdi mdi-email-outline me-2 display-5"></i>
                      <h4>No Records Found</h4>
                    </div>
                  ) }
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(EmailInbox);
