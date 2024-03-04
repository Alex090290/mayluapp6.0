"use client";
import { Button, Form } from "react-bootstrap";

function FormLogin() {
  return (
    <Form className="card">
      <div className="card-header">
        <h5 className="card-title">Inicio de Sesión</h5>
      </div>
      <div className="card-body text-center">
        <Form.Group className="mb-3">
          <Form.Label>Operador</Form.Label>
          <Form.Control
            name="nombre"
            type="text"
            maxLength={15}
            autoComplete="off"
            required
            placeholder="Nombre..."
            autoFocus
            className="text-center"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            name="pswd"
            type="password"
            maxLength={6}
            autoComplete="off"
            required
            placeholder="Contraseña..."
            className="text-center"
          />
        </Form.Group>
        <Form.Group className="d-grid gap-2">
          <Button type="submit" variant="primary">
            Entrar
          </Button>
        </Form.Group>
      </div>
    </Form>
  );
}

export default FormLogin;
