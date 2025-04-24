import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import withRouter from "../../components/Common/withRouter";

// Google Authentication
import {signInWithGoogle} from "../../Firebase/firebaseConfig";

// Redux
import {useDispatch, useSelector} from "react-redux";
import {createSelector} from "reselect";

// Formik validation
import * as Yup from "yup";
import {useFormik} from "formik";

import {Alert, Card, CardBody, Col, Container, Form, FormFeedback, Input, Label, Row,} from "reactstrap";

// Actions
import {loginUser} from "/src/store/actions";

// Import images
import profile from "../../assets/images/profile-img.png";
import logo from "../../assets/images/logo.svg";
import lightlogo from "../../assets/images/logo-light.svg";
import {get} from "../../helpers/api_helper.jsx";

const Login = (props) => {
  // Meta title
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      let id = searchParams.get("id");
      if (id) {
        let authDetail = await get(`/auth/me/${id}`)
        localStorage.setItem("authUser", JSON.stringify(authDetail.detail))
        navigate("/dashboard")
      }
    })()
  }, [searchParams]);

  document.title = "Login - Vite React Admin & Dashboard Template";
  const dispatch = useDispatch();

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Please enter your email"),
      password: Yup.string().required("Please enter your password"),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values, props.router.navigate));
    },
  });

  const LoginProperties = createSelector(
    (state) => state.Login,
    (login) => ({
      error: login.error
    })
  );

  const { error } = useSelector(LoginProperties);

  // Function to handle Google Login
  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      console.log("User Signed In:", user);

      // // Store user info (can be Redux or LocalStorage)
      // localStorage.setItem("authUser", JSON.stringify(user));
      //
      // // Redirect user to dashboard
      // props.router.navigate("/dashboard");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary-subtle">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back!</h5>
                        <p>Sign in to continue.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div className="auth-logo">
                    <Link to="/" className="auth-logo-light">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img src={lightlogo} alt="" className="rounded-circle" height="34" />
                        </span>
                      </div>
                    </Link>
                    <Link to="/" className="auth-logo-dark">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img src={logo} alt="" className="rounded-circle" height="34" />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      {error ? <Alert color="danger">{error}</Alert> : null}

                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={validation.touched.email && validation.errors.email ? true : false}
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          autoComplete="off"
                          value={validation.values.password || ""}
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={validation.touched.password && validation.errors.password ? true : false}
                        />
                        {validation.touched.password && validation.errors.password ? (
                          <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="customControlInline" />
                        <label className="form-check-label" htmlFor="customControlInline">
                          Remember me
                        </label>
                      </div>

                      <div className="mt-3 d-grid">
                        <button className="btn btn-primary btn-block" type="submit">
                          Log In
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <h5 className="font-size-14 mb-3">Sign in with</h5>

                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <button
                              className="btn btn-danger"
                              onClick={handleGoogleLogin}
                              style={{
                                padding: "10px 20px",
                                borderRadius: "5px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "auto",
                                margin: "10px auto",
                              }}
                            >
                              <i className="mdi mdi-google" style={{ marginRight: "8px" }}></i>
                              Sign in with Google
                            </button>
                          </li>
                        </ul>
                      </div>

                      <div className="mt-4 text-center">
                        <Link to="/forgot-password" className="text-muted">
                          <i className="mdi mdi-lock me-1" /> Forgot your password?
                        </Link>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Don&#39;t have an account?{" "}
                  <Link to="/register" className="fw-medium text-primary">
                    Signup now
                  </Link>{" "}
                </p>
                <p>
                  Crafted with <i className="mdi mdi-heart text-danger" /> by Roofing Senior Design UNT Team
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};
