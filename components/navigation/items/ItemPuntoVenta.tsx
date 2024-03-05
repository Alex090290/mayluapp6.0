"use client";

import Link from "next/link";
import { Button, NavDropdown } from "react-bootstrap";
import { FaStore, FaCashRegister } from "react-icons/fa";
import { ImDrawer } from "react-icons/im";
import { MdOutlinePointOfSale } from "react-icons/md";
import { TbChartInfographic } from "react-icons/tb";

function ItemPuntoVenta() {
  return (
    <NavDropdown
      title={
        <>
          <FaStore className="me-1" />
          Punto de Venta
        </>
      }
    >
      <NavDropdown.Item className="p-0">
        <Link href="/puntoventa/regventas" className="dropdown-item">
          <MdOutlinePointOfSale className="me-2" />
          Registro de Ventas
        </Link>
      </NavDropdown.Item>
      <NavDropdown.Item className="p-0">
        <Link href="/puntoventa/caja" className="dropdown-item">
          <FaCashRegister className="me-2" />
          Caja
        </Link>
      </NavDropdown.Item>
      <NavDropdown.Item as="button">
        <ImDrawer className="me-2" />
        Abrir Cajón
      </NavDropdown.Item>
      <NavDropdown.Item as="button">
        <TbChartInfographic className="me-2" />
        Monitor de Ventas
      </NavDropdown.Item>
    </NavDropdown>
  );
}

export default ItemPuntoVenta;
