import React from "react";
import { Navigate } from "react-router-dom";

// Pages Component
import Chat from "../pages/Chat/Chat";

// // File Manager
import FileManager from "../pages/FileManager/index";

// // Profile
import UserProfile from "../pages/Authentication/user-profile";

// Pages Calendar
import Calendar from "../pages/Calendar/index";

// // //Tasks
import TasksList from "../pages/Tasks/tasks-list";
import TasksCreate from "../pages/Tasks/tasks-create";
import TasksKanban from "../pages/Tasks/tasks-kanban";

// // //Projects
import ProjectsGrid from "../pages/Projects/projects-grid";
import ProjectsList from "../pages/Projects/projects-list";
import ProjectsOverview from "../pages/Projects/ProjectOverview/projects-overview";
import ProjectsCreate from "../pages/Projects/projects-create";

// //Email
import EmailInbox from "../pages/Email/email-inbox";
import EmailRead from "../pages/Email/email-read";
import EmailBasicTemplte from "../pages/Email/email-basic-templte";
import EmailAlertTemplte from "../pages/Email/email-template-alert";
import EmailTemplateBilling from "../pages/Email/email-template-billing";

// //Invoices
import InvoicesList from "../pages/Invoices/invoices-list";
import InvoiceDetail from "../pages/Invoices/invoices-detail";

// // Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

// // Dashboard
import Dashboard from "../pages/Dashboard/index";
import DashboardSaas from "../pages/Dashboard-saas/index";
import DashboardJob from "../pages/DashboardJob/index";

// // Charts
import ChartApex from "../pages/Charts/Apexcharts";
import ChartjsChart from "../pages/Charts/ChartjsChart";
import EChart from "../pages/Charts/EChart";
import SparklineChart from "../pages/Charts/SparklineChart";
import ChartsKnob from "../pages/Charts/charts-knob";
import ReCharts from "../pages/Charts/ReCharts";

// // Maps
import MapsGoogle from "../pages/Maps/MapsGoogle";

// //Icons
import IconBoxicons from "../pages/Icons/IconBoxicons";
import IconDripicons from "../pages/Icons/IconDripicons";
import IconMaterialdesign from "../pages/Icons/IconMaterialdesign";
import IconFontawesome from "../pages/Icons/IconFontawesome";

// //Tables
import BasicTables from "../pages/Tables/BasicTables";
import DatatableTables from "../pages/Tables/DatatableTables";

// // Forms
import FormElements from "../pages/Forms/FormElements";
import FormLayouts from "../pages/Forms/FormLayouts";
import FormAdvanced from "../pages/Forms/FormAdvanced/index";
import FormEditors from "../pages/Forms/FormEditors";
import FormValidations from "../pages/Forms/FormValidations";
import FormMask from "../pages/Forms/FormMask";
import FormRepeater from "../pages/Forms/FormRepeater";
import FormUpload from "../pages/Forms/FormUpload";
import FormWizard from "../pages/Forms/FormWizard";
import DualListbox from "../pages/Tables/DualListbox";

// //Ui
import UiAlert from "../pages/Ui/UiAlerts/index";
import UiButtons from "../pages/Ui/UiButtons/index";
import UiCards from "../pages/Ui/UiCard/index";
import UiCarousel from "../pages/Ui/UiCarousel";
import UiColors from "../pages/Ui/UiColors";
import UiDropdown from "../pages/Ui/UiDropdown/index";
import UiOffCanvas from "../pages/Ui/UiOffCanvas";

import UiGeneral from "../pages/Ui/UiGeneral";
import UiGrid from "../pages/Ui/UiGrid";
import UiImages from "../pages/Ui/UiImages";
import UiLightbox from "../pages/Ui/UiLightbox";
import UiModal from "../pages/Ui/UiModal/index";


import UiTabsAccordions from "../pages/Ui/UiTabsAccordions";
import UiTypography from "../pages/Ui/UiTypography";
import UiVideo from "../pages/Ui/UiVideo";
import UiSessionTimeout from "../pages/Ui/UiSessionTimeout";
import UiRating from "../pages/Ui/UiRating";
import UiRangeSlider from "../pages/Ui/UiRangeSlider";
import UiNotifications from "../pages/Ui/UINotifications";

import UiPlaceholders from "../pages/Ui/UiPlaceholders";
import UiToasts from "../pages/Ui/UiToast";
import UiUtilities from "../pages/Ui/UiUtilities";

// //Pages
import PagesStarter from "../pages/Utility/pages-starter";
import PagesMaintenance from "../pages/Utility/pages-maintenance";
import PagesComingsoon from "../pages/Utility/pages-comingsoon";
import PagesTimeline from "../pages/Utility/pages-timeline";
import PagesFaqs from "../pages/Utility/pages-faqs";
import PagesPricing from "../pages/Utility/pages-pricing";
import Pages404 from "../pages/Utility/pages-404";
import Pages500 from "../pages/Utility/pages-500";

// //Contacts
import ContactsGrid from "../pages/Contacts/contacts-grid";
import ContactsList from "../pages/Contacts/ContactList/contacts-list";
import ContactsProfile from "../pages/Contacts/ContactsProfile/index";
import UiProgressbar from "../pages/Ui/UiProgressbar";
// import UiProgressbar from "../../src/pages/Ui/UiProgressbar"

const authProtectedRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/dashboard-saas", element: <DashboardSaas /> },
  { path: "/dashboard-job", element: <DashboardJob /> },


  //chat
  { path: "/chat", element: <Chat /> },

  //File Manager
  { path: "/apps-filemanager", element: <FileManager /> },

  // //calendar
  { path: "/calendar", element: <Calendar /> },

  //   // //profile
  { path: "/profile", element: <UserProfile /> },

  //   //Email
  { path: "/email-inbox", element: <EmailInbox /> },
  { path: "/email-read/:id?", element: <EmailRead /> },
  { path: "/email-template-basic", element: <EmailBasicTemplte /> },
  { path: "/email-template-alert", element: <EmailAlertTemplte /> },
  { path: "/email-template-billing", element: <EmailTemplateBilling /> },

  //   //Invoices
  { path: "/invoices-list", element: <InvoicesList /> },
  { path: "/invoices-detail", element: <InvoiceDetail /> },
  { path: "/invoices-detail/:id?", element: <InvoiceDetail /> },

  //   // Tasks
  { path: "/tasks-list", element: <TasksList /> },
  { path: "/tasks-create", element: <TasksCreate /> },
  { path: "/tasks-kanban", element: <TasksKanban /> },

  //   //Projects
  { path: "/projects-grid", element: <ProjectsGrid /> },
  { path: "/projects-list", element: <ProjectsList /> },
  { path: "/projects-overview", celement: <ProjectsOverview /> },
  { path: "/projects-overview/:id", element: <ProjectsOverview /> },
  { path: "/projects-create", element: <ProjectsCreate /> },

  // Contacts
  { path: "/contacts-grid", element: <ContactsGrid /> },
  { path: "/contacts-list", element: <ContactsList /> },
  { path: "/contacts-profile", element: <ContactsProfile /> },

  //   //Charts
  { path: "/apex-charts", element: <ChartApex /> },
  { path: "/chartjs-charts", element: <ChartjsChart /> },
  { path: "/e-charts", element: <EChart /> },
  { path: "/sparkline-charts", element: <SparklineChart /> },
  { path: "/charts-knob", element: <ChartsKnob /> },
  { path: "/re-charts", element: <ReCharts /> },

  //   // Icons
  { path: "/icons-boxicons", element: <IconBoxicons /> },
  { path: "/icons-dripicons", element: <IconDripicons /> },
  { path: "/icons-materialdesign", element: <IconMaterialdesign /> },
  { path: "/icons-fontawesome", element: <IconFontawesome /> },

  //   // Tables
  { path: "/tables-basic", element: <BasicTables /> },
  { path: "/tables-datatable", element: <DatatableTables /> },

  //   // Maps
  { path: "/maps-google", element: <MapsGoogle /> },

  //   // Forms
  { path: "/form-elements", element: <FormElements /> },
  { path: "/form-layouts", element: <FormLayouts /> },
  { path: "/form-advanced", element: <FormAdvanced /> },
  { path: "/form-editors", element: <FormEditors /> },
  { path: "/form-mask", element: <FormMask /> },
  { path: "/form-repeater", element: <FormRepeater /> },
  { path: "/form-uploads", element: <FormUpload /> },
  { path: "/form-wizard", element: <FormWizard /> },
  { path: "/form-validation", element: <FormValidations /> },
  { path: "/dual-listbox", element: <DualListbox /> },

  //   // Ui
  { path: "/ui-alerts", element: <UiAlert /> },
  { path: "/ui-buttons", element: <UiButtons /> },
  { path: "/ui-cards", element: <UiCards /> },
  { path: "/ui-carousel", element: <UiCarousel /> },
  { path: "/ui-colors", element: <UiColors /> },
  { path: "/ui-dropdowns", element: <UiDropdown /> },
  { path: "/ui-offcanvas", element: <UiOffCanvas /> },
  { path: "/ui-general", element: <UiGeneral /> },
  { path: "/ui-grid", element: <UiGrid /> },
  { path: "/ui-images", element: <UiImages /> },
  { path: "/ui-lightbox", element: <UiLightbox /> },
  { path: "/ui-modals", element: <UiModal /> },
  { path: "/ui-progressbars", element: <UiProgressbar /> },
  { path: "/ui-tabs-accordions", element: <UiTabsAccordions /> },
  { path: "/ui-typography", element: <UiTypography /> },
  { path: "/ui-video", element: <UiVideo /> },
  { path: "/ui-session-timeout", element: <UiSessionTimeout /> },
  { path: "/ui-rating", element: <UiRating /> },
  { path: "/ui-rangeslider", element: <UiRangeSlider /> },
  { path: "/ui-notifications", element: <UiNotifications /> },
  { path: "/ui-placeholders", element: <UiPlaceholders /> },
  { path: "/ui-toasts", element: <UiToasts /> },
  { path: "/ui-utilities", element: <UiUtilities /> },

  //   //Utility
  { path: "/pages-starter", element: <PagesStarter /> },
  { path: "/pages-timeline", element: <PagesTimeline /> },
  { path: "/pages-faqs", celement: <PagesFaqs /> },
  { path: "/pages-pricing", element: <PagesPricing /> },

  //   // this route should be at the end of all other routes
  //   // eslint-disable-next-line react/display-name
  { path: "/", exact: true, element: <Navigate to="/login" /> },
];

const publicRoutes = [
  { path: "/logout", element: <Logout /> },
  { path: "/login", element: <Login /> },
  { path: "/forgot-password", element: <ForgetPwd /> },
  { path: "/register", element: <Register /> },

  { path: "/pages-maintenance", element: <PagesMaintenance /> },
  { path: "/pages-comingsoon", element: <PagesComingsoon /> },
  { path: "/pages-404", element: <Pages404 /> },
  { path: "/pages-500", element: <Pages500 /> },

];

// export { authProtectedRoutes, publicRoutes };
export { authProtectedRoutes, publicRoutes }
