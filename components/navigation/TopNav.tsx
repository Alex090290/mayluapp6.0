"use client";

import { Container, ListGroup, Navbar } from "react-bootstrap";
import Clock from "./Clock";

function TopNav() {
  return (
    <Navbar bg="success" data-bs-theme="dark" className="none-select">
      <Container>
        <Navbar.Brand>
          <span className="bg-light p-2 rounded border border-2 border-white">
            Maylu app
          </span>
        </Navbar.Brand>
        <ListGroup horizontal>
          <ListGroup.Item></ListGroup.Item>
          <ListGroup.Item className="fs-5 px-1 p-0">
            <Clock />
          </ListGroup.Item>
          <ListGroup.Item></ListGroup.Item>
        </ListGroup>
      </Container>
    </Navbar>
  );
}

export default TopNav;
