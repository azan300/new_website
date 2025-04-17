import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../../components/Common/withRouter";
import TableContainer from "../../../components/Common/TableContainer";
import Spinners from "../../../components/Common/Spinner";
import {
  Card, CardBody, Col, Container, Row, Modal, ModalHeader, ModalBody, Label, FormFeedback, Input,
  Form, Button, UncontrolledTooltip
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { db } from "../../../Firebase/firebaseConfig";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

import Breadcrumbs from "/src/components/Common/Breadcrumb";
import DeleteModal from "/src/components/Common/DeleteModal";
import { ToastContainer } from "react-toastify";
import { isEmpty } from "lodash";

const ContactsList = () => {
  document.title = "Contact User - Vite React Admin & Dashboard Template";

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [contact, setContact] = useState(null);

  const toggle = () => setModal(!modal);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "contacts"));
      const userData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(userData);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: contact?.name || "",
      designation: contact?.designation || "",
      tags: contact?.tags || [],
      email: contact?.email || "",
      projects: contact?.projects || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      designation: Yup.string().required("Please Enter Your Designation"),
      tags: Yup.array().min(1, "Please select at least one tag"),
      email: Yup.string().email("Invalid email").required("Please Enter Your Email"),
      projects: Yup.string().required("Please Enter Your Project"),
    }),
    onSubmit: async (values) => {
      if (isEdit) {
        try {
          const userRef = doc(db, "contacts", contact.id);
          await updateDoc(userRef, values);
        } catch (err) {
          console.error("Update failed:", err);
        }
      } else {
        try {
          await addDoc(collection(db, "contacts"), values);
        } catch (err) {
          console.error("Add failed:", err);
        }
      }
      validation.resetForm();
      setIsEdit(false);
      toggle();
      fetchUsers();
    }
  });

  const handleUserClick = (user) => {
    setContact(user);
    setIsEdit(true);
    toggle();
  };

  const handleUserClicks = () => {
    setContact(null);
    setIsEdit(false);
    toggle();
  };

  const onClickDelete = (user) => {
    setContact(user);
    setDeleteModal(true);
  };

  const handleDeleteUser = async () => {
    if (contact?.id) {
      try {
        await deleteDoc(doc(db, "contacts", contact.id));
        fetchUsers();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
    setContact(null);
    setDeleteModal(false);
  };

  const columns = useMemo(() => [
    {
      header: "#",
      accessorKey: "img",
      cell: (cell) => (
        <div className="avatar-xs">
          <span className="avatar-title rounded-circle">{cell.row.original.name.charAt(0)}</span>
        </div>
      ),
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: (cell) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">{cell.getValue()}</Link>
          </h5>
          <p className="text-muted mb-0">{cell.row.original.designation}</p>
        </>
      ),
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Tags",
      accessorKey: "tags",
      cell: (cell) => (
        <>
          {cell.getValue()?.map((tag, i) => (
            <span key={i} className="badge badge-soft-primary font-size-11 m-1">{tag}</span>
          ))}
        </>
      ),
    },
    {
      header: "Projects",
      accessorKey: "projects",
    },
    {
      header: "Action",
      cell: (cellProps) => (
        <div className="d-flex gap-3">
          <Link to="#" className="text-success" onClick={() => handleUserClick(cellProps.row.original)}>
            <i className="mdi mdi-pencil font-size-18" />
          </Link>
          <Link to="#" className="text-danger" onClick={() => onClickDelete(cellProps.row.original)}>
            <i className="mdi mdi-delete font-size-18" />
          </Link>
        </div>
      ),
    },
  ], []);

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Contacts" breadcrumbItem="User List" />
          {isLoading ? (
            <Spinners setLoading={setIsLoading} />
          ) : (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <TableContainer
                      columns={columns}
                      data={users}
                      isGlobalFilter
                      isPagination
                      isCustomPageSize
                      SearchPlaceholder="Search..."
                      isAddButton
                      handleUserClick={handleUserClicks}
                      buttonClass="btn btn-success btn-rounded mb-2"
                      buttonName="New Contact"
                      tableClass="align-middle table-nowrap table-hover dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
                      theadClass="table-light"
                      paginationWrapper="dataTables_paginate paging_simple_numbers pagination-rounded"
                      pagination="pagination"
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}

          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
              {isEdit ? "Edit User" : "Add User"}
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={validation.handleSubmit}>
                <Row>
                  <Col xs={12}>
                    <div className="mb-3">
                      <Label>Name</Label>
                      <Input
                        name="name"
                        value={validation.values.name}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        invalid={validation.touched.name && validation.errors.name}
                      />
                      <FormFeedback>{validation.errors.name}</FormFeedback>
                    </div>

                    <div className="mb-3">
                      <Label>Email</Label>
                      <Input
                        name="email"
                        type="email"
                        value={validation.values.email}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        invalid={validation.touched.email && validation.errors.email}
                      />
                      <FormFeedback>{validation.errors.email}</FormFeedback>
                    </div>

                    <div className="mb-3">
                      <Label>Tags</Label>
                      <Input
                        type="select"
                        name="tags"
                        multiple
                        value={validation.values.tags}
                        onChange={e =>
                          validation.setFieldValue("tags", Array.from(e.target.selectedOptions, option => option.value))
                        }
                        onBlur={validation.handleBlur}
                        invalid={validation.touched.tags && validation.errors.tags}
                      >
                        <option>Photoshop</option>
                        <option>illustrator</option>
                        <option>Html</option>
                        <option>Php</option>
                        <option>Java</option>
                        <option>Python</option>
                        <option>UI/UX Designer</option>
                        <option>Ruby</option>
                        <option>Css</option>
                      </Input>
                      <FormFeedback>{validation.errors.tags}</FormFeedback>
                    </div>

                    <div className="mb-3">
                      <Label>Projects</Label>
                      <Input
                        name="projects"
                        value={validation.values.projects}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        invalid={validation.touched.projects && validation.errors.projects}
                      />
                      <FormFeedback>{validation.errors.projects}</FormFeedback>
                    </div>

                    <div className="mb-3">
                      <Label>Designation</Label>
                      <Input
                        type="select"
                        name="designation"
                        value={validation.values.designation}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        invalid={validation.touched.designation && validation.errors.designation}
                      >
                        <option>Frontend Developer</option>
                        <option>UI/UX Designer</option>
                        <option>Backend Developer</option>
                        <option>Full Stack Developer</option>
                      </Input>
                      <FormFeedback>{validation.errors.designation}</FormFeedback>
                    </div>
                  </Col>
                </Row>

                <div className="text-end">
                  <Button type="submit" color="success">
                    {isEdit ? "Update" : "Add"}
                  </Button>
                </div>
              </Form>
            </ModalBody>
          </Modal>
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default withRouter(ContactsList);
