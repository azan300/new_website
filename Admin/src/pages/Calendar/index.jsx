//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";

import { addNewEvent as onAddNewEvent, } from "/src/store/actions";
import BootstrapTheme                    from "@fullcalendar/bootstrap";
import allLocales                        from '@fullcalendar/core/locales-all';
import dayGridPlugin                     from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable }  from "@fullcalendar/interaction";
import listPlugin                        from '@fullcalendar/list';

// import "@fullcalendar/react/dist/vdom";
import FullCalendar                   from "@fullcalendar/react";
import { useFormik }                  from "formik";
import { isEmpty }                    from "lodash";
import PropTypes                      from "prop-types";
import React, { useEffect, useState } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { toast }                    from 'react-toastify';

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
}                         from "reactstrap";
import { createSelector } from "reselect";
import * as Yup           from "yup";

//import Images
import verification            from "../../assets/images/verification-img.png";
import { del, get, post, put } from "../../helpers/api_helper.jsx";
import { error, success }      from '../../helpers/Toaster.jsx';

import DeleteModal from "./DeleteModal";

const CLIENT_ID = "602714767093-hulo8d18n3t9i9qa9fal0d4afl74iods.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/calendar";

const Calender = (props) => {
  //meta title
  document.title = "Full Calendar | Vite React Admin & Dashboard";

  const dispatch = useDispatch();

  const [event, setEvent] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const [accessToken, setAccessToken] = useState(null);

  const categoryValidation = useFormik({
    enableReinitialize: true,

    initialValues: {
      title: (event && event.title) || '',
      // category: (event && event.category) || '',
      startDate: (event && event.start) || '',
      endDate: (event && event.end) || '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please Enter Your Event Name"),
      // category: Yup.string().required("Please Enter Your Billing Name"),
      startDate: Yup.date().required("Please Enter Your Start Date"),
      endDate: Yup.date().required("Please Enter Your End Date"),
    }),
    onSubmit: async (values) => {
      try {
        let authUser = localStorage.getItem("authUser");
        if (authUser) {
          authUser = JSON.parse(authUser);

          if (isEdit) {
            const updateEvent =
              {
                summary: values.title,
                start: {
                  dateTime: new Date(values.startDate).toISOString(),
                },
                end: {
                  dateTime: new Date(values.endDate).toISOString(),
                }
              }
            if (event.eventId) {
              const res = await put(`/calendar/events/${ event.eventId }?id=${ authUser.id }`, updateEvent)
            }
            await put(`/calendar/firestore/events/${ event.id }`, updateEvent)
            categoryValidation.resetForm();
          }
          else {
            const newEvent = {
              events: [
                {
                  summary: values.title,
                  start: {
                    dateTime: new Date(values.startDate).toISOString(),
                  },
                  end: {
                    dateTime: new Date(values.endDate).toISOString(),
                  }
                }
              ],
              userId: authUser.id
            };

            // const res = await post(`/calendar/event?id=${ newEvent.userId }`, newEvent.events[0])
            // newEvent.events[0]["eventId"] = res.id
            await post(`/calendar/firestore/events`, newEvent)

            categoryValidation.resetForm()
          }
          toggle();

          success({ message: `Successfully ${ isEdit ? "Updated" : "Created" }` })
          await fetchEvents();

        }
      }
      catch (e) {
        console.error(e);
        error({ message: "Unable to complete task" })
      }
    },
  });

  const CalendarProperties = createSelector(
    (state) => state.calendar,
    (Calendar) => ({
      events: Calendar.events,
      categories: Calendar.categories,
    })
  );

  const {
    categories
  } = useSelector(CalendarProperties);

  const [deleteId, setDeleteId] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [modalCategory, setModalCategory] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState({
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
  });

  const handleDatesSet = async (arg) => {
    setSelectedDate({
      start: arg.start,
      end: arg.end
    })


    let authUser = localStorage.getItem("authUser");
    if (authUser) {
      authUser = JSON.parse(authUser);
      const eventTemp = await get(`/calendar/firestore/events?startTime=${ arg.start.toISOString() }&endTime=${ arg.end.toISOString() }&userId=${ authUser.id }`);
      setEvents(eventTemp);
    }
  };


  useEffect(() => {
    (async () => {
      await fetchEvents();
      new Draggable(document.getElementById("external-events"), {
        itemSelector: ".external-event",
      });
    })()
  }, [dispatch,]);

  const fetchEvents = async () => {
    let authUser = localStorage.getItem("authUser");
    if (authUser) {
      authUser = JSON.parse(authUser);
      const eventTemp = await get(`/calendar/firestore/events?startTime=${ selectedDate.start.toISOString() }&endTime=${ selectedDate.end.toISOString() }&userId=${ authUser.id }`);
      setEvents(eventTemp);
    }
  }

  useEffect(() => {
    if (!modalCategory && !isEmpty(event) && !!isEdit) {
      setTimeout(() => {
        setEvent({});
        setIsEdit(false);
      }, 500);
    }
  }, [modalCategory, event]);

  const handleGoogleSync = async () => {
    try {
      let authUser = localStorage.getItem("authUser");
      if (authUser) {
        authUser = JSON.parse(authUser);
        const eventResponse = await get(`/calendar/events/sync?id=${ authUser.id }`);
        if (eventResponse.failedCount === 0) {
          success({
            message: `Successfully sync event ${ eventResponse.syncedCount }`,
          })
        }
        else {
          error({
            message: `Error sync event ${ eventResponse.failedCount }`,
          })
        }
      }
    }
    catch (e) {
      error({
        message: e.message,
      })
    }
  };


  /**
   * Handling the modal state
   */
  const toggle = () => {
    categoryValidation.resetForm()
    if (modalCategory) {
      setModalCategory(false);
      setIsEdit(false);
    }
    else {
      setModalCategory(true);
    }
  }
  /**
   * Handling date click on calendar
   */
  const handleDateClick = (arg) => {
    const date = arg["date"];
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const currectDate = new Date();
    const currentHour = currectDate.getHours();
    const currentMin = currectDate.getMinutes();
    const currentSec = currectDate.getSeconds();
    const modifiedDate = new Date(
      year,
      month,
      day,
      currentHour,
      currentMin,
      currentSec
    );
    const modifiedData = { ...arg, date: modifiedDate };

    setSelectedDay(modifiedData);
    setEvent({
      startDate: date.toISOString(),
      endDate: date.toISOString(),
    })
    toggle();
  };

  /**
   * Handling click on event on calendar
   */
  const handleEventClick = (arg) => {
    const event = arg.event;
    let tempEvent = events.find((val) => val.id === event.id)
    setEvent(tempEvent);
    setDeleteId(event.id)
    setIsEdit(true);
    setModalCategory(true)
    toggle();
  };

  /**
   * On delete event
   */
  const handleDeleteEvent = async () => {
    if (deleteId) {
      let authUser = localStorage.getItem("authUser");
      if (authUser) {
        authUser = JSON.parse(authUser);
        if (event.eventId) {
          await del(`/calendar/events/${ event.eventId }?id=${ authUser.id }`);
        }
        await del(`/calendar/firestore/events/${ event.id }`);
      }
      success({ message: `Event deleted successfully.` });

      setDeleteModal(false);
      await fetchEvents();
    }
  }

  /**
   * On category darg event
   */
  const onDrag = (event) => {
    event.preventDefault();
  };

  /**
   * On calendar drop event
   */
  const onDrop = (event) => {
    const date = event["date"];
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const currectDate = new Date();
    const currentHour = currectDate.getHours();
    const currentMin = currectDate.getMinutes();
    const currentSec = currectDate.getSeconds();
    const modifiedDate = new Date(
      year,
      month,
      day,
      currentHour,
      currentMin,
      currentSec
    );

    const draggedEl = event.draggedEl;
    const draggedElclass = draggedEl.className;
    if (
      draggedEl.classList.contains("external-event") &&
      draggedElclass.indexOf("fc-event-draggable") == -1
    ) {
      const modifiedData = {
        id: Math.floor(Math.random() * 100),
        title: draggedEl.innerText,
        start: modifiedDate,
        className: draggedEl.className,
      };
      dispatch(onAddNewEvent(modifiedData));
    }
  };

  //set the local language
  const enLocal = {
    "code": "en-nz",
    "week": {
      "dow": 1,
      "doy": 4
    },
    "buttonHints": {
      "prev": "Previous $0",
      "next": "Next $0",
      "today": "This $0"
    },
    "viewHint": "$0 view",
    "navLinkHint": "Go to $0"
  };
  const [isLocal, setIsLocal] = useState(enLocal);
  const [currentView, setCurrentView] = useState('dayGridMonth');
  const handleChangeLocals = (value) => {
    setIsLocal(value);
  };
  const utcToLocalDateTime = (utcDateString) => {
    if (!utcDateString) return "";
    const date = new Date(utcDateString);
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
  };

  return (
    <React.Fragment>
      <DeleteModal
        show={ deleteModal }
        onDeleteClick={ handleDeleteEvent }
        onCloseClick={ () => setDeleteModal(false) }
      />
      <div className="page-content">
        <Container fluid={ true }>
          {/* Render Breadcrumb */ }
          <Breadcrumbs title="Calendar" breadcrumbItem="Calendar"/>
          <Row>
            <Col className="col-12">
              <Row>
                <Col xl={ 3 }>
                  <Card>
                    <CardBody>
                      <div className="d-flex gap-2">
                        <div className="flex-grow-1">
                          <select
                            id="locale-selector"
                            className="form-select"
                            defaultValue={ isLocal }
                            onChange={ (event) => {
                              const selectedValue = event.target.value;
                              const selectedLocale =
                                allLocales.find((locale) => locale.code === selectedValue);
                              handleChangeLocals(selectedLocale);
                            } }
                          >
                            { (allLocales || []).map((localeCode, key) => (
                              <option key={ key } value={ localeCode.code }>
                                { localeCode.code }
                              </option>
                            )) }
                          </select>
                        </div>
                        <Button
                          color="primary"
                          className="font-16"
                          onClick={ toggle }
                        >
                          <i className="mdi mdi-plus-circle-outline me-1"/>
                          Create New Event
                        </Button>
                      </div>

                      <div id="external-events" className="mt-2">
                        <br/>
                        <p className="text-muted">
                          Drag and drop your event or click in the calendar
                        </p>
                        { categories &&
                          (categories || []).map((category) => (
                            <div
                              className={ `${ category.type } external-event fc-event text-white` }
                              key={ "cat-" + category.id }
                              draggable
                              onDrag={ event => onDrag(event, category) }
                            >
                              <i className="mdi mdi-checkbox-blank-circle font-size-11 me-2"/>
                              { category.title }
                            </div>
                          )) }
                      </div>

                      <Row className="justify-content-center mt-5">
                        <img src={ verification } alt="" className="img-fluid d-block"/>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>

                <Col className="col-xl-9">
                  {/* fullcalendar control */ }
                  <Card>
                    <CardBody>

                      < Button color="secondary" className="mb-3" onClick={ handleGoogleSync }>
                        Sync with Google Calendar
                      </Button>

                      <FullCalendar
                        plugins={ [
                          BootstrapTheme,
                          dayGridPlugin,
                          listPlugin,
                          interactionPlugin,
                        ] }
                        initialView="dayGridMonth"
                        slotDuration={ "00:15:00" }
                        handleWindowResize={ true }
                        themeSystem="bootstrap"
                        locale={ isLocal }
                        viewDidMount={ (arg) => {
                          setCurrentView(arg.type);
                        } }
                        datesSet={ handleDatesSet }
                        headerToolbar={ {
                          left: "prev,next today",
                          center: "title",
                          right: "dayGridMonth,dayGridWeek,dayGridDay,listWeek",
                        } }
                        events={ events }
                        editable={ true }
                        droppable={ true }
                        selectable={ true }

                        dateClick={ handleDateClick }
                        eventClick={ handleEventClick }
                        drop={ onDrop }
                      />

                    </CardBody>
                  </Card>
                  <Modal
                    isOpen={ modalCategory }
                    className={ props.className }
                    centered
                  >
                    <ModalHeader toggle={ toggle }>
                      { !!isEdit ? "Edit Event" : "Add Event" }
                    </ModalHeader>
                    <ModalBody className="p-4">
                      <Form
                        onSubmit={ (e) => {
                          e.preventDefault();
                          if (new Date(categoryValidation.values.startDate) > new Date(categoryValidation.values.endDate)) {
                            error({
                              message: `Start Date is greater than end`,
                            })
                          }
                          else {
                            categoryValidation.handleSubmit();

                          }
                          return false;
                        } }
                      >
                        <Row>
                          <Col className="col-12">
                            <div className="mb-3">
                              <Label>Event Name</Label>
                              <Input
                                name="title"
                                type="text"
                                placeholder="Insert Event Name"
                                onChange={ categoryValidation.handleChange }
                                onBlur={ categoryValidation.handleBlur }
                                value={ categoryValidation.values.title || "" }
                                invalid={
                                  categoryValidation.touched.title && categoryValidation.errors.title ? true : false
                                }
                              />
                              { categoryValidation.touched.title && categoryValidation.errors.title ? (
                                <FormFeedback type="invalid">{ categoryValidation.errors.title }</FormFeedback>
                              ) : null }
                            </div>
                          </Col>
                          {/*<Col className="col-12">*/ }
                          {/*  <div className="mb-3">*/ }
                          {/*    <Label>Category</Label>*/ }
                          {/*    <Input*/ }
                          {/*      type="select"*/ }
                          {/*      name="category"*/ }
                          {/*      placeholder="All Day Event"*/ }
                          {/*      onChange={categoryValidation.handleChange}*/ }
                          {/*      onBlur={categoryValidation.handleBlur}*/ }
                          {/*      value={categoryValidation.values.category || ""}*/ }
                          {/*      invalid={*/ }
                          {/*        categoryValidation.touched.category && categoryValidation.errors.category ? true : false*/ }
                          {/*      }*/ }
                          {/*    >*/ }
                          {/*      <option value="bg-danger">Danger</option>*/ }
                          {/*      <option value="bg-success">Success</option>*/ }
                          {/*      <option value="bg-primary">Primary</option>*/ }
                          {/*      <option value="bg-info">Info</option>*/ }
                          {/*      <option value="bg-dark">Dark</option>*/ }
                          {/*      <option value="bg-warning">Warning</option>*/ }
                          {/*    </Input>*/ }
                          {/*    {categoryValidation.touched.category && categoryValidation.errors.category ? (*/ }
                          {/*      <FormFeedback type="invalid">{categoryValidation.errors.category}</FormFeedback>*/ }
                          {/*    ) : null}*/ }
                          {/*  </div>*/ }
                          {/*</Col>*/ }
                          <Col className={ "col-12 mb-3" }>
                            <Label>Start Date</Label>
                            <Input
                              name={ "startDate" }
                              aria-label="Date and time"
                              type="datetime-local"
                              onChange={ categoryValidation.handleChange }
                              onBlur={ categoryValidation.handleBlur }
                              value={ utcToLocalDateTime(categoryValidation.values.startDate) || "" }
                              invalid={
                                categoryValidation.touched.startDate && categoryValidation.errors.startDate ? true : false
                              }
                            />
                            { categoryValidation.touched.startDate && categoryValidation.errors.startDate ? (
                              <FormFeedback type="invalid">{ categoryValidation.errors.startDate }</FormFeedback>
                            ) : null }
                          </Col>
                          <Col className={ "col-12 mb-3" }>
                            <Label>End Date</Label>
                            <Input
                              name={ "endDate" }
                              aria-label="Date and time"
                              type="datetime-local"
                              onChange={ categoryValidation.handleChange }
                              onBlur={ categoryValidation.handleBlur }
                              value={ utcToLocalDateTime(categoryValidation.values.endDate) || "" }
                              invalid={
                                categoryValidation.touched.endDate && categoryValidation.errors.endDate ? true : false
                              }
                            />
                            { categoryValidation.touched.endDate && categoryValidation.errors.endDate ? (
                              <FormFeedback type="invalid">{ categoryValidation.errors.endDate }</FormFeedback>
                            ) : null }
                          </Col>
                        </Row>

                        <Row className="mt-2">
                          <Col className="col-6">
                            { isEdit &&
                              <button type="button" className="btn btn-danger" id="btn-delete-event"
                                      onClick={ () => {
                                        toggle();
                                        setDeleteModal(true)
                                      } }>Delete</button>
                            }
                          </Col>

                          <Col className="col-6 text-end">
                            <button
                              type="button"
                              className="btn btn-light me-1"
                              onClick={ toggle }
                            >
                              Close
                            </button>
                            <button
                              type="submit"
                              className="btn btn-success"
                              id="btn-save-event"
                            >
                              Save
                            </button>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );

};

Calender.propTypes = {
  events: PropTypes.array,
  categories: PropTypes.array,
  className: PropTypes.string,
  onGetEvents: PropTypes.func,
  onAddNewEvent: PropTypes.func,
  onUpdateEvent: PropTypes.func,
  onDeleteEvent: PropTypes.func,
  onGetCategories: PropTypes.func,
};

export default Calender;
