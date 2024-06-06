import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Navigation from "../components/Navigation"


export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <>
    <Navigation />
    <Container>
      <h1 className="my-3">Sign up for an account</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button 
        variant="primary"
        onClick={async (e) => {
          setError("");
          const canSignup = username && password;
          if (canSignup)
            try {
              await createUserWithEmailAndPassword(auth, username, password);
              navigate("/adminhomepage");
            } catch (error) {
              setError(error.message);
            }
          }}
        >
        Sign Up
        </Button>
      </Form>
      <p>{error}</p>
    </Container>
    </>
  );
}
