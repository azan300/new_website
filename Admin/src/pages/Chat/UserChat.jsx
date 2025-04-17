import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Input, Row } from "reactstrap";
import SimpleBar from "simplebar-react";
import Spinners from "../../components/Common/Spinner";

const UserChat = ({ Chat_Box_Username, Chat_Box_User_Status }) => {
  const scrollRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [curMessage, setCurMessage] = useState("");
  const [isDisable, setDisable] = useState(false);

  // Fetch messages from Google Chat API
  useEffect(() => {
    const fetchGoogleChatMessages = async () => {
      try {
        // Replace with your backend endpoint to call Google Chat API
        const res = await fetch("/api/get-google-chat-messages");
        const data = await res.json();
        setMessages(data.messages || []);
      } catch (err) {
        console.error("Failed to fetch Google Chat messages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGoogleChatMessages();
  }, []);

  const sendMessage = async () => {
    if (!curMessage) return;
    try {
      setDisable(true);

      // Replace with your backend API to send messages
      await fetch("/api/send-google-chat-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: curMessage }),
      });

      setCurMessage("");
      setDisable(false);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-100 user-chat">
      <Card>
        <div className="p-4 border-bottom">
          <Row>
            <Col md={6}>
              <h5 className="font-size-15 mb-1">{Chat_Box_Username}</h5>
              <p className="text-muted mb-0">
                <i className={`mdi mdi-circle ${Chat_Box_User_Status === "online" ? "text-success" : "text-muted"} align-middle me-2`} />
                {Chat_Box_User_Status === "online" ? "Active now" : "Offline"}
              </p>
            </Col>
          </Row>
        </div>

        <div className="chat-conversation p-3">
          <SimpleBar ref={scrollRef} style={{ height: "470px" }}>
            {loading ? (
              <Spinners setLoading={setLoading} />
            ) : (
              <ul className="list-unstyled" id="users-conversation">
                {messages.map((msg, idx) => (
                  <li key={idx} className={msg.sender === "me" ? "right" : ""}>
                    <div className="conversation-list">
                      <div className="ctext-wrap">
                        <div className="conversation-name">{msg.sender}</div>
                        <p>{msg.text}</p>
                        <p className="chat-time mb-0">{msg.timestamp}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </SimpleBar>
        </div>

        <div className="p-3 chat-input-section">
          <Row>
            <Col>
              <Input
                type="text"
                value={curMessage}
                onChange={(e) => {
                  setCurMessage(e.target.value);
                  setDisable(true);
                }}
                onKeyPress={onKeyPress}
                className="chat-input"
                placeholder="Enter Message..."
              />
            </Col>
            <Col className="col-auto">
              <Button
                type="button"
                color="primary"
                disabled={!isDisable}
                onClick={sendMessage}
                className="btn btn-primary btn-rounded chat-send w-md"
              >
                <span className="d-none d-sm-inline-block me-2">Send</span>
                <i className="mdi mdi-send" />
              </Button>
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
};

export default UserChat;
