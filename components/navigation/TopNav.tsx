"use client";

import { Container, ListGroup, Nav, Navbar } from "react-bootstrap";
import Clock from "./Clock";
import ItemCatalogos from "./items/ItemCatalogos";
import Link from "next/link";
import { ImExit } from "react-icons/im";
import { FaCircleUser, FaToolbox } from "react-icons/fa6";
import { FaStore, FaTools } from "react-icons/fa";
import { BsGearFill } from "react-icons/bs";
import ItemPuntoVenta from "./items/ItemPuntoVenta";

function TopNav() {
  return (
    <Navbar
      bg="success"
      data-bs-theme="light"
      expand="lg"
      className="none-select rounded sticky-top"
    >
      <Container>
        <Navbar.Brand>
          <Link
            className="bg-light text-white p-2 rounded border border-2 border-white text-decoration-none"
            href="/"
          >
            Maylu app
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="topnav" />
        <Navbar.Collapse id="topnav">
          <Nav className="me-auto">
            <ItemPuntoVenta />
            <ItemCatalogos />
            <Link href="/tools" className="nav-link">
              <FaTools className="me-1" />
              Herramientas
            </Link>
            <Link href="/movimientos" className="nav-link">
              <BsGearFill className="me-1" />
              Movimientos
            </Link>
            <Link href="/utileria" className="nav-link">
              <FaToolbox className="me-1" />
              Utilería
            </Link>
            <Navbar.Text className="ms-4 fw-bolder">
              <FaCircleUser className="me-1" />
              raguilar
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
        <div className="d-flex">
          <ListGroup horizontal>
            <ListGroup.Item className="fs-5 px-1 p-0">
              <Clock />
            </ListGroup.Item>
          </ListGroup>
          <Navbar.Text className="ms-2 link-hover">
            <ImExit />
            salir
          </Navbar.Text>
        </div>
      </Container>
    </Navbar>
  );
}

export default TopNav;
