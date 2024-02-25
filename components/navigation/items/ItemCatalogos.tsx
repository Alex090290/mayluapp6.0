"use client";

import Link from "next/link";
import { Button, NavDropdown } from "react-bootstrap";
import { FaWarehouse, FaTruck, FaRegUserCircle } from "react-icons/fa";
import { BsBoxes, BsPersonLinesFill } from "react-icons/bs";

function ItemCatalogos() {
  return (
    <div className="nav-item dropdown">
      <button
        data-bs-toggle="dropdown"
        aria-expanded="false"
        className="nav-link dropdown-toggle"
      >
        Catálogos
      </button>
      <div className="dropdown-menu">
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
      </div>
    </div>
  );
}

export default ItemCatalogos;
