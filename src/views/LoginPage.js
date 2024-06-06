import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Navigation from "../components/Navigation"

export default function SignUpPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const setError = useState("");
    const navigate = useNavigate();
    const sysname = "sys@sys.com";
  
  
    return (
        <>
        <Navigation/>
        <Container>
          <h1 className="my-3">Login to your account</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            {/* Direct User to contact admin for sign up */}
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <a href="/contactadmin">Contact our System Administration to sign up for an account</a>
            </Form.Group>

            {/* Sign in -> HomePage */}
            <Button 
            variant="primary" 
            onClick={async (e) => {
              setError("");
              const canLogin = username && password;
              const sysLogin = sysname && password;

              if (sysLogin){
                try {
                    await signInWithEmailAndPassword(auth, username,password);
                    navigate("/adminhomepage");
                  } catch (error){
                    setError(error.message)
                  }

              }else if(canLogin){
                try {
                  await signInWithEmailAndPassword(auth, username,password);
                  navigate("/");
                } catch (error){
                  setError(error.message)
                }
              }
            }}>
              Login
            </Button>
          </Form>
          <p></p>
        </Container>
        </>
      );
    }    
