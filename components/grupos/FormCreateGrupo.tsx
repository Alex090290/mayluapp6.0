"use client";

import { Button, Form, Row, Spinner } from "react-bootstrap";
import { CiSaveUp2 } from "react-icons/ci";
import ListGrupos from "./ListGrupos";
import { accesos } from "@/helpers/accesos";
import { useRef, useState } from "react";
import useGrupos from "@/hooks/grupos";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

const INIT_VALUES = {
  id: undefined,
  nombre: "",
  accesos: accesos,
  createdat: undefined,
  createdby: "system",
} as Grupo;
function FormCreateGrupo() {
  const route = useRouter();
  const nombreRef = useRef<HTMLInputElement>(null);
  const [createGrupo] = useGrupos((st) => [st.createGrupo]);
  const [values, setValues] = useState<Grupo>(INIT_VALUES);
  const [loading, setLoading] = useState<boolean>(false);

  const handleValues = (e: FormEvents["onChange"]) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvents["onSubmit"]) => {
    e.preventDefault();
    setLoading(true);
    const newName = values.nombre.trim().toLowerCase();
    const res: any = await createGrupo({ ...values, nombre: newName });
    if (res.errorCode === "ER_DUP_ENTRY") {
      toast.error("Registro duplicado: El grupo ya existe.", {
        position: "top-left",
      });
      nombreRef.current?.focus();
      setLoading(false);
      return;
    }

    if (res.res === "success") {
      // toast.success("Registro completado con éxito.", {
      //   position: "top-center",
      // });
      setValues(INIT_VALUES);
      setLoading(false);
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit} className="mb-2">
        <Row>
          <Form.Group className="col-10">
            <Form.Label>Crear grupo</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              ref={nombreRef}
              value={values.nombre}
              onChange={handleValues}
              required
              placeholder="Nombre de grupo..."
              autoComplete="off"
              className="text-capitalize"
            />
          </Form.Group>
          <Form.Group className="col-2 d-flex align-items-end p-0">
            <Button type="submit" variant="success">
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <CiSaveUp2 />
              )}
            </Button>
          </Form.Group>
        </Row>
      </Form>
      <ListGrupos />
    </>
  );
}

export default FormCreateGrupo;
