import React, { useContext } from "react";
import { Formik, Field, Form } from "formik";
import { Redirect, Link } from "@reach/router";
import axios from "axios";

import UserContext from "components/Context/UserContext";

import Logo from "assets/images/logo.png";

import LoginSchema from "./LoginSchema";
import styles from "./styles.module.scss";

const Login = ({ handleSuccessfulAuth }) => {
  const user = useContext(UserContext);
  if (user) {
    return <Redirect to="/" noThrow />;
  }
  const handleSubmit = ({ email, password }) => {
    axios
      .post(
        "http://localhost:3001/sessions",
        {
          user: {
            email: email,
            password: password
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        console.log(response);
        if (response.data.status === "created") {
          handleSuccessfulAuth(response.data.user);
        }
      })
      .catch(error => {
        console.log("Login failed", error);
      });
  };
  return (
    <div className={styles.login}>
      <div className={styles.loginForm}>
        <img className={styles.logo} src={Logo} alt="clickjob logo" />
        <h2>Log in</h2>
        <Formik
          initialValues={{
            email: "",
            password: ""
          }}
          onSubmit={handleSubmit}
          validationSchema={LoginSchema}
          isInitialValid={false}
        >
          {({ isValid }) => (
            <Form>
              <div className={styles.field}>
                <label htmlFor="email">Email</label>
                <Field id="email" name="email" placeholder="your@email.com" />
              </div>
              <div className={styles.field}>
                <label htmlFor="password">Password</label>
                <Field
                  id="password"
                  type="password"
                  name="password"
                  placeholder="******"
                />
              </div>
              <button disabled={!isValid} type="submit">
                LOGIN
              </button>
            </Form>
          )}
        </Formik>
        <p className={styles.note}>
          Don't have an account yet? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
