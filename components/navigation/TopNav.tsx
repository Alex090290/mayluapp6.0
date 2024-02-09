"use client";

import { Container, Navbar } from "react-bootstrap";

function TopNav() {
  return (
    <Navbar bg="success" data-bs-theme="dark" className="none-select">
      <Container>
        <Navbar.Brand>
          <span className="bg-light p-2 rounded border border-2 border-white">
            Maylu app
          </span>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default TopNav;
