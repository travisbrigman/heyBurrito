import React, { useRef } from "react";
import {
  Box,
  Button,
  Form,
  FormField,
  Heading,
  Layer,
  TextInput,
} from "grommet";

export const Register = (props) => {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();
  const verifyPassword = useRef();
  const passwordDialog = useRef();

  //http://localhost:8088/customers?email=${email.current.value}

  const existingUserCheck = () => {
    return fetch(
      `https://db-hey-burrito.herokuapp.com/customers?email=${email.current.value}`
    )
      .then((_) => _.json())
      .then((user) => !!user.length);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    //http://localhost:8088/customers

    if (password.current.value === verifyPassword.current.value) {
      existingUserCheck().then(() => {
        fetch("https://db-hey-burrito.herokuapp.com/customers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.current.value,
            password: password.current.value,
            name: `${firstName.current.value} ${lastName.current.value}`,
          }),
        })
          .then((_) => _.json())
          .then((createdUser) => {
            if (createdUser.hasOwnProperty("id")) {
              localStorage.setItem("heyBurrito_customer", createdUser.id);
              props.history.push("/");
            }
          });
      });
    } else {
      passwordDialog.current.showModal();
    }
  };

  return (
    <Box style={{ textAlign: "center" }}>
      <dialog className="dialog dialog--password" ref={passwordDialog}>
        <div>Passwords do not match</div>
        <button
          className="button--close"
          onClick={(e) => passwordDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <Form className="form--login" onSubmit={handleRegister}>
        <Heading className="h3 mb-3 font-weight-normal">
          Please Register for HeyBurrito!
        </Heading>
        <FormField>
          <TextInput
            ref={firstName}
            type="text"
            label="First Name"
            name="firstName"
            className="form-control"
            placeholder="First name"
            required
            autoFocus
          />
        </FormField>
        <FormField>
          <TextInput
            ref={lastName}
            type="text"
            label="Last Name"
            name="lastName"
            className="form-control"
            placeholder="Last name"
            required
          />
        </FormField>
        <FormField>
          <TextInput
            ref={email}
            type="email"
            label="Email Address"
            name="email"
            className="form-control"
            placeholder="Email address"
            required
          />
        </FormField>
        <FormField>
          <TextInput
            ref={password}
            type="password"
            label="Password"
            name="password"
            className="form-control"
            placeholder="Password"
            required
          />
        </FormField>
        <FormField>
          <TextInput
            ref={verifyPassword}
            type="password"
            label="Verify Password"
            name="verifyPassword"
            className="form-control"
            placeholder="Verify password"
            required
          />
        </FormField>
        <FormField>
          <Box align="center" pad="medium">
            <Button
              size="large"
              label="sign in"
              fill={false}
              margin="small"
              pad="small"
              primary
              type="submit"
            />
          </Box>
        </FormField>
      </Form>
    </Box>
  );
};
