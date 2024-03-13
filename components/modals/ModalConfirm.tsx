"use client";

import { Button, Modal } from "react-bootstrap";

function ModalConfirm({
  show,
  onHide,
  action,
  text,
}: {
  show: boolean;
  onHide: () => void;
  action: () => void;
  text: string;
}) {
  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>Confirmar</Modal.Header>
      <Modal.Body>{text}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={action}>
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalConfirm;
