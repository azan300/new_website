import React, {useEffect, useState} from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";
import {Link} from "react-router-dom";
import SimpleBar from "simplebar-react";
import classnames from "classnames";

// Image
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import Spinners from "../../components/Common/Spinner";
import {get} from "../../helpers/api_helper.jsx";
import {error} from "../../helpers/Toaster.jsx";

const ChatList = ({ userChatOpen, currentRoomId }) => {
  const [menu1, setMenu1] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [isLoading, setLoading] = useState(true);
  const [chatThreads, setChatThreads] = useState([]);

  const [currentUser, setCurrentUser] = useState({
    name: "Henry Wells",
    isActive: true,
  });

  useEffect(() => {
    const fetchChatThreads = async () => {
      try {
        setLoading(true);
        let authUser = localStorage.getItem("authUser");
        if (authUser) {
          authUser = JSON.parse(authUser);
          setCurrentUser(authUser);
          const res = await get(`/chat/spaces?id=${authUser.id}`);
          setChatThreads(res || []);

        }
      } catch (e) {
        error({
          message: "Failed to fetch messages",
        })
      } finally {
        setLoading(false);
      }
    };

    fetchChatThreads();
  }, []);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const searchUsers = () => {
    const input = document.getElementById("search-user");
    const filter = input.value.toUpperCase();
    const ul = document.getElementById("recent-list");
    const li = ul.getElementsByTagName("li");
    for (let i = 0; i < li.length; i++) {
      const a = li[i].getElementsByTagName("a")[0];
      const txtValue = a.textContent || a.innerText;
      li[i].style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? "" : "none";
    }
  };

  return (
    <React.Fragment>
      <div className="chat-leftsidebar me-lg-4">
        <div>
          <div className="py-4 border-bottom">
            <div className="d-flex">
              <div className="align-self-center me-3">
                <img src={avatar1} className="avatar-xs rounded-circle" alt="" />
              </div>
              <div className="flex-grow-1">
                <h5 className="font-size-15 mt-0 mb-1">{currentUser.name}</h5>
                <p className="text-muted mb-0">
                  <i className="mdi mdi-circle text-success align-middle me-2" /> Active
                </p>
              </div>
              <div>
                <Dropdown isOpen={menu1} toggle={() => setMenu1(!menu1)} className="chat-noti-dropdown active">
                  <DropdownToggle tag="a" className="btn">
                    <i className="bx bx-bell bx-tada"></i>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-end">
                    <DropdownItem href="#">Settings</DropdownItem>
                    <DropdownItem href="#">Mute</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </div>

          <div className="search-box chat-search-box py-4">
            <div className="position-relative">
              <Input onKeyUp={searchUsers} id="search-user" type="text" placeholder="Search..." onChange={searchUsers} />
              <i className="bx bx-search-alt search-icon" />
            </div>
          </div>

          <div className="chat-leftsidebar-nav">
            <Nav pills justified>
              <NavItem>
                <NavLink className={classnames({ active: activeTab === "chat" })} onClick={() => toggleTab("chat")}>
                  <i className="bx bx-chat font-size-20 d-sm-none" />
                  <span className="d-none d-sm-block">Chat</span>
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={activeTab} className="py-4">
              <TabPane tabId="chat">
                <div>
                  <h5 className="font-size-14 mb-3">Recent</h5>
                  <ul className="list-unstyled chat-list position-relative" id="recent-list">
                    {isLoading ? (
                      <Spinners />
                    ) : (
                      <SimpleBar style={{ height: "410px" }}>
                        {(chatThreads || []).map((chat, index) => (
                          <li key={index} className={currentRoomId === chat.id ? "active" : ""}>
                            <Link to="#" onClick={() => userChatOpen(chat)}>
                              <div className="d-flex">
                                <div className="align-self-center me-3">
                                  <img src={avatar1} className="rounded-circle avatar-xs" alt="avatar" />
                                </div>
                                <div className="flex-grow-1 overflow-hidden">
                                  <h5 className="text-truncate font-size-14 mb-1">
                                    {chat.name || `Thread ${index + 1}`}
                                  </h5>
                                  <p className="text-truncate mb-0">{chat.snippet || "..."}</p>
                                </div>
                                <div className="font-size-11">{chat.time || ""}</div>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </SimpleBar>
                    )}
                  </ul>
                </div>
              </TabPane>
            </TabContent>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChatList;
