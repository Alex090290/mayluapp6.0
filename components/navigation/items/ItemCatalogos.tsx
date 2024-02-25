"use client";

import Link from "next/link";
import { Button, NavDropdown } from "react-bootstrap";
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
      <Link href="/almacenes" className="dropdown-item">
        <FaWarehouse className="me-2" />
        Almacenes
      </Link>
      <Link href="/productos" className="dropdown-item">
        <BsBoxes className="me-2" />
        Productos
      </Link>
      <Link href="/clientes" className="dropdown-item">
        <BsPersonLinesFill className="me-2" />
        Clientes
      </Link>
      <Link href="/proveedores" className="dropdown-item">
        <FaTruck className="me-2" />
        Proveedores
      </Link>
      <Link href="/operadores" className="dropdown-item">
        <FaRegUserCircle className="me-2" />
        Operadores
      </Link>
    </NavDropdown>
  );
}

export default ItemCatalogos;
