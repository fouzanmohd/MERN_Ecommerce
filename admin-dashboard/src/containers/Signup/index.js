import React from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
export default function Signup() {
  return (
    <div>
      <Layout>
        <Container>
          <Row style={{ marginTop: "3rem" }}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form>
                <Row>
                  <Col md={6}>
                    <Input
                      control="formBasicfirstName"
                      label="First Name"
                      type="text"
                      placeholder="First Name"
                      value=""
                      onChange={() => {}}
                    />
                  </Col>
                  <Col md={6}>
                    <Input
                      control="formBasiclastName"
                      label="Last Name"
                      type="text"
                      placeholder="Last Name"
                      value=""
                      onChange={() => {}}
                    />
                  </Col>
                </Row>
                <Input
                  control="formBasicEmail"
                  label="Email"
                  type="Email"
                  placeholder="Email"
                  value=""
                  onChange={() => {}}
                />
                <Input
                  control="formBasicPassword"
                  label="Password"
                  type="Password"
                  placeholder="Password"
                  value=""
                  onChange={() => {}}
                />
                <Button variant="primary" type="submit">
                  Sign Up
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Layout>
    </div>
  );
}
