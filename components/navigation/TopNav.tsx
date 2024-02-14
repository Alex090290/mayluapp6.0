"use client";

import { Container, ListGroup, Nav, Navbar } from "react-bootstrap";
import Clock from "./Clock";
import ItemCatalogos from "./items/ItemCatalogos";
import Link from "next/link";

function TopNav() {
  return (
    <Navbar
      bg="secondary"
      data-bs-theme="dark"
      expand="lg"
      className="none-select rounded sticky-top"
    >
      <Container>
        <Navbar.Brand>
          <span className="bg-light p-2 rounded border border-2 border-white">
            Maylu app
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="topnav" />
        <Navbar.Collapse id="topnav">
          <Nav className="me-auto">
            <Link href="/puntoventa" className="nav-link">
              Punto de Venta
            </Link>
            <ItemCatalogos />
            <Link href="/tools" className="nav-link">
              Herramientas
            </Link>
            <Link href="/movimientos" className="nav-link">
              Movimientos
            </Link>
            <Link href="/utileria" className="nav-link">
              Utilería
            </Link>
          </Nav>
        </Navbar.Collapse>
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
