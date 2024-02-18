"use client";

import { Container, ListGroup, Nav, Navbar } from "react-bootstrap";
import Clock from "./Clock";
import ItemCatalogos from "./items/ItemCatalogos";
import Link from "next/link";
import { ImExit } from "react-icons/im";
import { FaCircleUser, FaToolbox } from "react-icons/fa6";
import { FaStore, FaTools } from "react-icons/fa";
import { BsGearFill } from "react-icons/bs";

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
          <span className="bg-light text-white p-2 rounded border border-2 border-white">
            Maylu app
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="topnav" />
        <Navbar.Collapse id="topnav">
          <Nav className="me-auto">
            <Link href="/puntoventa" className="nav-link">
              <FaStore className="me-1" />
              Punto de Venta
            </Link>
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
          </Nav>
        </Navbar.Collapse>
        <div className="d-flex">
          <Navbar.Text className="me-2 fw-bolder">
            <FaCircleUser />
            raguilar
          </Navbar.Text>
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
