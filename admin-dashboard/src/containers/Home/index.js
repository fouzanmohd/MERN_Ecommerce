import React from "react";
import { Jumbotron } from "react-bootstrap";
import Layout from "./../../components/Layout/index";
export default function Home() {
  return (
    <div>
      <Layout>
        <Jumbotron
          style={{ margin: "3rem", background: "#fff" }}
          className="text-center"
        >
          <h1>Welcome to Admin Dashboard!</h1>
          <p>
            What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing
            and typesetting industry Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s.Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s
          </p>
        </Jumbotron>
      </Layout>
    </div>
  );
}
