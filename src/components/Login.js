import React from "react";
import axios from "axios";
import { Container, Row, Col, Jumbotron, Card, CardBody } from "reactstrap";
import LoginForm from "./LoginForm";

class Login extends React.Component {
  render() {
    return (
      <>
        <Container>
          <Row>
            <Col />
            <Col lg="8">
              <Jumbotron>
                <h3>
                  <u>Login Form</u>
                </h3>
                <hr />
                <Card>
                  <CardBody>
                    <LoginForm {...this.props} />
                  </CardBody>
                </Card>
              </Jumbotron>
            </Col>
            <Col />
          </Row>
        </Container>
      </>
    );
  }
}

export default Login;
