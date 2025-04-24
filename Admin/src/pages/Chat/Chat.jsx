import React, {useState} from "react";
import {Col, Container, Row} from "reactstrap";
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import ChatList from "./ChatList";
import UserChat from "./UserChat";

const Chat = () => {
  document.title = "Chat - Vite React Admin & Dashboard Template";

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentRoomId, setCurrentRoomId] = useState(1);
  const [Chat_Box_Username, setChat_Box_Username] = useState(null);
  const [Chat_Box_User_Status, setChat_Box_User_Status] = useState("online");

  const userChatOpen = (chat) => {
    setChat_Box_Username(chat.name);
    setChat_Box_User_Status(chat.status);
    setCurrentRoomId(chat.roomId);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Skote" breadcrumbItem="Chat" />

          <Row>
            <Col lg="12">
              <div className="d-lg-flex">
                <ChatList userChatOpen={userChatOpen} currentRoomId={currentRoomId} />
                {Chat_Box_Username ?
                  <UserChat
                    Chat_Box_Username={Chat_Box_Username}
                    Chat_Box_User_Status={Chat_Box_User_Status}
                    messages={messages}
                    loading={loading}
                  /> : <></>}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Chat;
