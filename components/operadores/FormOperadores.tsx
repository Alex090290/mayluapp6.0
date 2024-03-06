"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { CiSaveUp2 } from "react-icons/ci";

function FormOperadores() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("action") && searchParams.get("action") === "reset") {
    }
  }, [searchParams]);
  return (
    <Form className="card border-success bg-gradient">
      <div className="card-body">
        <Row className="mb-3">
          <Col xs="12">
            <Button variant="success" size="sm" type="submit">
              <CiSaveUp2 className="me-2" />
              Guardar
            </Button>
          </Col>
        </Row>
        <Row>
          <Form.Group className="col-10 col-sm-8 col-md-4 col-lg-3 mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              name="nombre"
              type="text"
              autoComplete="off"
              placeholder="Nombre y apellido"
              className="fs-5"
              autoFocus
              required
            />
            <Form.Text>p. ej. Nombre Apellido</Form.Text>
          </Form.Group>
          <Form.Group className="col-10 col-sm-8 col-md-4 col-lg-3 mb-3">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              name="operador"
              maxLength={15}
              type="text"
              autoComplete="off"
              placeholder="Usuario..."
              className="fs-5"
              required
            />
            <Form.Text>p. ej. Primera letra de nombre y apellido</Form.Text>
          </Form.Group>
          <Form.Group className="col-10 col-sm-8 col-md-4 col-lg-3 mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              name="pswd"
              maxLength={4}
              type="password"
              autoComplete="off"
              placeholder="Contraseña..."
              className="fs-5 text-center"
              required
            />
            <Form.Text>Máximo 4 caracteres</Form.Text>
          </Form.Group>
          <Form.Group className="col-10 col-sm-8 col-md-4 col-lg-3 mb-3">
            <Form.Label>Confirmar contraseña</Form.Label>
            <Form.Control
              name="pswd2"
              maxLength={4}
              type="password"
              autoComplete="off"
              placeholder="Confirmar contraseña..."
              className="fs-5 text-center"
              required
            />
            <Form.Text>Máximo 4 caracteres</Form.Text>
          </Form.Group>
          <Form.Group className="col-10 col-sm-8 col-md-4 col-lg-3 mb-3">
            <Form.Label>Grupo</Form.Label>
            <Form.Select required className="fs-5">
              <option value="">Selecciona un grupo</option>
            </Form.Select>
            <Form.Text>Asigna un grupo al nuevo operador</Form.Text>
          </Form.Group>
          <Form.Group className="col-10 col-sm-8 col-md-4 col-lg-3 mb-3 d-flex align-items-center">
            <Form.Check
              type="switch"
              name="activo"
              label="Activo"
              className="fs-5"
              id="activo"
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="col-10 col-sm-8 col-md-4 col-lg-3 mb-3">
            <Form.Label className="fs-4">Empresas</Form.Label>
            <Form.Check
              label="Empresa 1"
              name="empresa1"
              type="checkbox"
              className="fs-5"
              id="empresa1"
            />
            <Form.Check
              label="Empresa 2"
              name="empresa2"
              type="checkbox"
              className="fs-5"
              id="empresa2"
            />
            <Form.Check
              label="Empresa 3"
              name="empresa3"
              type="checkbox"
              className="fs-5"
              id="empresa3"
            />
          </Form.Group>
        </Row>
      </div>
    </Form>
  );
}

export default FormOperadores;
