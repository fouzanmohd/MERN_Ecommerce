import React from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Layout from "../../components/Layout";

import Input from "./../../components/UI/Input/index";

export default function Signin() {
  return (
    <div>
      <Layout>
        <Container>
          <Row style={{ marginTop: "3rem" }}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form>
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
                  Sign In
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Layout>
    </div>
  );
}
