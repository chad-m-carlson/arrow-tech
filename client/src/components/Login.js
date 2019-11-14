import React, { useContext, useState, useEffect } from "react";
import { Button, Form, Segment, Header } from "semantic-ui-react";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, error } = useContext(AuthContext);

  useEffect(() => {
    error && toastMessage(error, "warning");
  }, [error]);

  const handleSubmit = e => {
    e.preventDefault();
    handleLogin({ email, password }, props.history);
  };

  const toastMessage = (message, type) => {
    toast(message, {
      type: type,
      autoClose: 10000
    });
  };

  return (
    <>
      <Segment basic>
        <Header as="h1" textAlign="center">
          Login
        </Header>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            label="Email"
            required
            autoFocus
            name="email"
            value={email}
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
          />
          <Form.Input
            label="Password"
            required
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />
          <Button>Log In</Button>
        </Form>
      </Segment>
    </>
  );
};

export default Login;
