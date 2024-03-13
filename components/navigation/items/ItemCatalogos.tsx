"use client";

import Link from "next/link";
import { NavDropdown } from "react-bootstrap";
import { FaWarehouse, FaTruck, FaRegUserCircle } from "react-icons/fa";
import { BsBoxes, BsPersonLinesFill } from "react-icons/bs";
import { FaBook } from "react-icons/fa6";

function ItemCatalogos() {
  return (
    <NavDropdown
      title={
        <>
          <FaBook className="me-1" />
          Catálogos
        </>
      }
    >
      <NavDropdown.Item className="p-0" as="span">
        <Link href="/catalogos/almacenes" className="dropdown-item">
          <FaWarehouse className="me-2" />
          Almacenes
        </Link>
      </NavDropdown.Item>
      <NavDropdown.Item className="p-0" as="span">
        <Link href="/catalogos/productos" className="dropdown-item">
          <BsBoxes className="me-2" />
          Productos
        </Link>
      </NavDropdown.Item>
      <NavDropdown.Item className="p-0" as="span">
        <Link href="/catalogos/clientes" className="dropdown-item">
          <BsPersonLinesFill className="me-2" />
          Clientes
        </Link>
      </NavDropdown.Item>
      <NavDropdown.Item className="p-0" as="span">
        <Link href="/catalogos/proveedores" className="dropdown-item">
          <FaTruck className="me-2" />
          Proveedores
        </Link>
      </NavDropdown.Item>
      <NavDropdown.Item className="p-0" as="span">
        <Link href="/catalogos/operadores" className="dropdown-item">
          <FaRegUserCircle className="me-2" />
          Operadores
        </Link>
      </NavDropdown.Item>
    </NavDropdown>
  );
}

export default ItemCatalogos;
