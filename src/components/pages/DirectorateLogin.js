import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import "../../assets/css/MainHome.css";
import "../../assets/css/AdminBanner.css";
import Login from "../../assets/images/login.png";

function DirectorateLogin() {
  

  return (
    <>
    <Form>
      <Form.Group className="mb-3 mt-3" controlId="loginType">
        <Form.Label className="nd-form-label">Login Type</Form.Label>
        <Form.Control
          type="text"
          placeholder="Login type"
          className="nd-form-control"
          value="Directorate Login"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label className="nd-form-label">Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          className="nd-form-control"
        />
      </Form.Group>

      <div className="nd-admin-btn">
        <Button className="nd-primary">Login</Button>
      </div>
      </Form>
      
    </>
  );
}

export default DirectorateLogin;
