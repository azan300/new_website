import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import ChatList from "./ChatList";
import UserChat from "./UserChat";
import axios from "axios";

const Chat = () => {
  document.title = "Chat - Vite React Admin & Dashboard Template";

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentRoomId, setCurrentRoomId] = useState(1);
  const [Chat_Box_Username, setChat_Box_Username] = useState("Steven Franklin");
  const [Chat_Box_User_Status, setChat_Box_User_Status] = useState("online");

  useEffect(() => {
    const fetchGoogleChatMessages = async () => {
      try {
        const tokenRes = await axios.get("/api/get-access-token");
        const token = tokenRes.data.access_token;

        const res = await axios.post("/api/get-google-chat-messages", { access_token: token });
        setMessages(res.data.messages || []);
      } catch (err) {
        console.error("Failed to load Google Chat messages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGoogleChatMessages();
  }, [currentRoomId]);

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

                <UserChat
                  Chat_Box_Username={Chat_Box_Username}
                  Chat_Box_User_Status={Chat_Box_User_Status}
                  messages={messages}
                  loading={loading}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Chat;
