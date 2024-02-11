"use client";

import { Container, Dropdown, ListGroup, Navbar } from "react-bootstrap";
import Clock from "./Clock";

function TopNav() {
  return (
    <Navbar
      bg="secondary"
      data-bs-theme="dark"
      className="none-select rounded sticky-top"
    >
      <Container>
        <Navbar.Brand>
          <span className="bg-light p-2 rounded border border-2 border-white">
            Maylu app
          </span>
        </Navbar.Brand>
        <div className="d-flex">
          <Navbar.Text className="me-2 text-white">raguilar</Navbar.Text>
          <ListGroup horizontal>
            <ListGroup.Item className="fs-5 px-1 p-0">
              <Clock />
            </ListGroup.Item>
          </ListGroup>
          <Navbar.Text className="ms-2 link-hover">salir</Navbar.Text>
        </div>
      </Container>
    </Navbar>
  );
}

export default TopNav;
