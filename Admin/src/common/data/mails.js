// Removed placeholder email data to allow Gmail API integration

const inboxmails = [];
const starredmails = [];
const importantmails = [];
const draftmails = [];
const sentmails = [];
const trashmails = [];

const mailDB = {
  allmail: [],
  folders: [
    { id: 0, handle: 'inbox', title: 'Inbox' },
    { id: 1, handle: 'important', title: 'Important' },
    { id: 2, handle: 'drafts', title: 'Drafts' },
    { id: 3, handle: 'sent', title: 'Sent' },
    { id: 4, handle: 'trash', title: 'Trash' }
  ]
};

const labelsData = [
  { id: 1, icon: "mdi mdi-arrow-right-drop-circle text-info float-end", text: "Theme Support" },
  { id: 2, icon: "mdi mdi-arrow-right-drop-circle text-warning float-end", text: "Freelance" },
  { id: 3, icon: "mdi mdi-arrow-right-drop-circle text-primary float-end", text: "Social" },
  { id: 4, icon: "mdi mdi-arrow-right-drop-circle text-danger float-end", text: "Friends" },
  { id: 5, icon: "mdi mdi-arrow-right-drop-circle text-success float-end", text: "Family" }
];

const mailChatData = [];

export {
  inboxmails,
  starredmails,
  importantmails,
  draftmails,
  sentmails,
  trashmails,
  mailDB,
  labelsData,
  mailChatData
};
