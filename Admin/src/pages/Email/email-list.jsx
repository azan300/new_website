import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";
import { Input, Label, Button } from "reactstrap";
import axios from "axios"; // Import axios for API requests

const MailsList = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState({}); // Store selected emails

  useEffect(() => {
    fetchEmails(); // Fetch Gmail emails when the component loads
  }, []);

  // Fetch Emails from Gmail API via Backend
  const fetchEmails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get-emails"); // Backend API URL
      setEmails(response.data.emails);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  // Toggle Email Selection
  const handleEmailSelection = (emailId) => {
    setSelectedEmails((prevSelected) => ({
      ...prevSelected,
      [emailId]: !prevSelected[emailId],
    }));
  };

  return (
    <React.Fragment>
      <div className="btn-toolbar p-3" role="toolbar">
        <Button type="button" color="primary">
          <i className="fa fa-inbox" />
        </Button>
        <Button type="button" color="primary">
          <i className="fa fa-exclamation-circle" />
        </Button>
        <Button type="button" color="primary">
          <i className="far fa-trash-alt" />
        </Button>
      </div>

      <ul className="message-list">
        {emails.length === 0 ? (
          <p>No emails found.</p>
        ) : (
          emails.map((email, index) => (
            <li key={index}>
              <div className="col-mail col-mail-1">
                <div className="checkbox-wrapper-mail">
                  <Input
                    type="checkbox"
                    checked={!!selectedEmails[email.id]}
                    onChange={() => handleEmailSelection(email.id)}
                  />
                  <Label htmlFor={email.id} className="toggle" />
                </div>
                <Link to="#" className="title">
                  {email.sender}
                </Link>
              </div>
              <div className="col-mail col-mail-2">
                <Link to="#" className="subject">
                  {email.subject} –{" "}
                  <span className="teaser">{email.snippet}</span>
                </Link>
                <div className="date">{email.date}</div>
              </div>
            </li>
          ))
        )}
      </ul>
    </React.Fragment>
  );
};

export default withRouter(MailsList);
