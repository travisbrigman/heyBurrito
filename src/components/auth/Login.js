import React, { useRef, useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Anchor,
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  Header,
  Heading,
  Layer,
  ResponsiveContext,
  Text,
  TextInput,
} from "grommet";

export const Login = (props) => {
  const email = useRef();
  const password = useRef();
//   const existDialog = useRef();
//   const passwordDialog = useRef();

  const [show, setShow] = useState();
  const [showUser, setShowUser] = useState();
  //http://localhost:8088/customers?email=${email.current.value}
  const existingUserCheck = () => {
    return fetch(
      `https://db-hey-burrito.herokuapp.com/customers?email=${email.current.value}`
    )
      .then((_) => _.json())
      .then((user) => (user.length ? user[0] : false));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    existingUserCheck().then((exists) => {
      if (exists && exists.password === password.current.value) {
        localStorage.setItem("heyBurrito_customer", exists.id);
        props.history.push("/");
      } else if (exists && exists.password !== password.current.value) {
        // passwordDialog.current.showModal();
        setShow(true);
      } else if (!exists) {
        // existDialog.current.showModal();
        setShowUser(true);
      }
    });
  };

  const emailValidation = [
    {
      regexp: new RegExp("[^@ \\t\\r\\n]+@"),
      message: "Enter a valid email address.",
      status: "error",
    },
    {
      regexp: new RegExp("[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+"),
      message: "Enter a valid email address.",
      status: "error",
    },
    {
      regexp: new RegExp("[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+"),
      message: "Enter a valid email address.",
      status: "error",
    },
  ];

  return (
    <>
      <Box as="container--login">
        {showUser && (
          <Layer>
            <Heading>User does not exist</Heading>
            <Button
              className="button--close"
              onClick={() => setShowUser(false)}
            >
              Close
            </Button>
          </Layer>
        )}
        {show && (
          <Layer>
            <Heading>Password does not match</Heading>
            <Button className="button--close" onClick={() => setShow(false)}>
              Close
            </Button>
          </Layer>
        )}
        <Box>
          <Form className="form--login" onSubmit={handleLogin}>
            <Heading>HeyBurrito!</Heading>
            <Heading>Please sign in</Heading>
            <FormField
              label="Email address"
              htmlFor="inputEmail"
            //   validate={emailValidation}
            >
              <TextInput
                ref={email}
                type="email"
                id="email"
                placeholder="Email address"
                required
              />
            </FormField>
            <FormField label="Password" htmlFor="inputPassword">
              <TextInput
                ref={password}
                type="password"
                id="password"
                placeholder="Password"
                required
              />
            </FormField>
            <FormField>
              <Button primary type="submit">
                Sign in
              </Button>
            </FormField>
          </Form>
        </Box>
        <Box className="link--register">
          <Link to="/register">Not a member yet?</Link>
        </Box>
      </Box>
    </>
  );
};
