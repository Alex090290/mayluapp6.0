"use client";

import { useEffect, useRef, useState } from "react";
import useOperadores from "@/hooks/operadores";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Col, Form, ListGroup, Row, Spinner } from "react-bootstrap";
import { CiSaveUp2 } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "react-toastify";
import axios, { AxiosResponse } from "axios";
import { fechaYhora } from "@/helpers/date-formats";
import ModalConfirm from "../modals/ModalConfirm";
import useGrupos from "@/hooks/grupos";

const INIT_VALUES = {
  id: undefined,
  nombre: "",
  usuario: "",
  pswd: "",
  grupoid: "",
  activo: false,
  almacenes: [],
  createdat: undefined,
  createdby: undefined,
} as Operador;

const list_almacenes: Array<any> = [
  { nombre: "almacen1" },
  { nombre: "almacen2" },
  { nombre: "almacen3" },
];
function FormOperadores() {
  const userRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [createOperador] = useOperadores((st) => [st.createOperador]);
  const [grupos, fetchGrupos] = useGrupos((st) => [st.grupos, st.fetchGrupos]);

  const [values, setValues] = useState<Operador>(INIT_VALUES);
  const [pswd2, setPswd2] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [modalConfirm, setModalConfirm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingUser, setLoadingUser] = useState<boolean>(false);

  const handleValues = (e: FormEvents["onChange"]) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
      activo: e.target.checked,
    });
  };

  const handleAlmacenes = (e: FormEvents["onChange"]) => {
    let nombre = e.target.value;
    let list: any[] = [...values.almacenes];
    let findEmpresa = list.find((emp) => emp.nombre === nombre);
    if (!findEmpresa) {
      list = [...values.almacenes, { nombre }];
    } else {
      toast.warning("La empresa seleccionada ya se encuentra en la lista", {
        position: "top-center",
      });
    }

    setValues({ ...values, almacenes: list });
  };

  const removeAlmacen = (nombre: string) => {
    let list: any[] = [...values.almacenes];
    let filterList = list.filter((emp) => emp.nombre !== nombre);
    setValues({ ...values, almacenes: filterList });
  };

  const handleSubmit = async (e: FormEvents["onSubmit"]) => {
    e.preventDefault();
    setLoading(true);
    if (editMode) {
      const operId: string | null = searchParams.get("record");
      if (!operId) return;
      const { data }: AxiosResponse = await axios.put(
        `/api/operadores/${operId}`,
        values
      );

      if (data.res === "success") {
        router.refresh();
        toast.success("Operación completada", { position: "top-center" });
        setLoading(false);
      }
    } else {
      if (values.pswd !== pswd2) {
        toast.warn("Contraseñas no coinciden", { position: "top-left" });
        return;
      }

      if (values.pswd.length < 4 || pswd2.length < 4) {
        toast.warn("la contraseña debe ser mayor a 4 caracteres", {
          position: "top-left",
        });
        return;
      }

      const newValues = {
        ...values,
        usuario: values.usuario.toLowerCase().trim(),
      };

      const res: any = await createOperador(newValues);
      console.log(res);

      // verifica registros duplicados
      if (res.errorCode === "ER_DUP_ENTRY") {
        toast.error("Registro duplicado: El usuario ya existe.", {
          position: "top-left",
        });
        userRef.current?.focus();
        return;
      }

      if (res.res === "success") {
        toast.success("Registro completado con éxito.", {
          position: "top-center",
        });
        router.replace(
          "/catalogos/operadores?view=form&model=operadores&action=reset"
        );
        setLoading(false);
        router.refresh();
      }
    }
  };

  const deleteOperador = async () => {
    const operId: string | null = searchParams.get("record");
    if (!operId) {
      toast.error("ID no especificado", { position: "top-center" });
      return;
    }

    const { data }: AxiosResponse = await axios.delete(
      `/api/operadores/${operId}`
    );
    if (data.res === "success") {
      setModalConfirm(false);
      toast.success("Registro eliminado", { position: "top-center" });
      router.replace(
        "/catalogos/operadores?view=form&model=operadores&action=reset"
      );
    }
  };

  const fetchOperData = async (operId: string) => {
    setLoadingUser(true);
    const { data }: AxiosResponse = await axios.get(
      `/api/operadores/${operId}`
    );
    setValues({
      ...INIT_VALUES,
      nombre: data.data.nombre,
      usuario: data.data.usuario,
      grupoid: data.data.grupoid,
      activo: data.data.activo,
      createdat: data.data.createdat,
      createdby: data.data.createdby,
      almacenes: JSON.parse(data.data.almacenes),
    });
    setLoadingUser(false);
  };

  useEffect(() => {
    if (searchParams.get("record")) {
      const operId: string | null = searchParams.get("record");
      if (!operId) return;
      fetchOperData(operId);
      setEditMode(true);
    }
    if (searchParams.get("action") && searchParams.get("action") === "reset") {
      setValues(INIT_VALUES);
      setPswd2("");
      setEditMode(false);
      router.replace("/catalogos/operadores?view=form&model=operadores");
    }
  }, [searchParams]);

  useEffect(() => {
    fetchGrupos();
  }, []);
  return (
    <Form onSubmit={handleSubmit} className="card border-secondary bg-light">
      <div className="card-body">
        <Row className="mb-3">
          <Col xs="12">
            <Button variant="success" size="sm" type="submit">
              {loading ? (
                <Spinner animation="border" size="sm" className="me-2" />
              ) : (
                <CiSaveUp2 className="me-2" />
              )}
              {editMode ? "Editar" : "Guardar"}
            </Button>
            {editMode && (
              <Button
                variant="danger"
                title="Eliminar"
                size="sm"
                className="ms-2 me-5"
                onClick={() => setModalConfirm(true)}
              >
                <RiDeleteBin5Line />
              </Button>
            )}
            {loadingUser && (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Cargando operador...
              </>
            )}
          </Col>
        </Row>
        <Row>
          <Form.Group className="col-10 col-sm-8 col-md-4 col-lg-3 mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              name="nombre"
              onChange={handleValues}
              value={values.nombre}
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
              name="usuario"
              ref={userRef}
              onChange={handleValues}
              value={values.usuario}
              maxLength={15}
              type="text"
              autoComplete="off"
              placeholder="Usuario..."
              className="fs-5 text-lowercase"
              required
            />
            <Form.Text>p. ej. Primera letra de nombre y apellido</Form.Text>
          </Form.Group>
          <Form.Group className="col-10 col-sm-8 col-md-4 col-lg-3 mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              name="pswd"
              onChange={handleValues}
              value={values.pswd}
              maxLength={4}
              type="password"
              autoComplete="off"
              placeholder="Contraseña..."
              className="fs-5 text-center"
              required
              readOnly={editMode}
            />
            <Form.Text>Máximo 4 caracteres</Form.Text>
          </Form.Group>
          <Form.Group className="col-10 col-sm-8 col-md-4 col-lg-3 mb-3">
            <Form.Label>Confirmar contraseña</Form.Label>
            <Form.Control
              name="pswd2"
              onChange={(e) => setPswd2(e.target.value)}
              value={pswd2}
              maxLength={4}
              type="password"
              autoComplete="off"
              placeholder="Confirmar contraseña..."
              className="fs-5 text-center"
              required
              readOnly={editMode}
            />
            <Form.Text>Máximo 4 caracteres</Form.Text>
          </Form.Group>
          <Form.Group className="col-10 col-sm-8 col-md-4 col-lg-3 mb-3">
            <Form.Label>Grupo</Form.Label>
            <Form.Select
              required
              name="grupoid"
              className="fs-5"
              onChange={handleValues}
              value={values.grupoid}
            >
              <option value="">Selecciona un grupo</option>
              {grupos.map((grupo) => (
                <option
                  key={`selectgrupo#${grupo.id}-${grupo.nombre}`}
                  value={grupo.id}
                  className="text-capitalize"
                >
                  {grupo.nombre}
                </option>
              ))}
            </Form.Select>
            <Form.Text>Asigna un grupo al nuevo operador</Form.Text>
          </Form.Group>
          <Form.Group className="col-10 col-sm-8 col-md-4 col-lg-3 mb-3 d-flex align-items-start">
            <Form.Check
              type="switch"
              name="activo"
              onChange={handleValues}
              checked={values.activo}
              label="activo"
              className="fs-5"
              id="activo"
            />
          </Form.Group>
          <Form.Group className="col-10 col-sm-8 col-md-4 col-lg-3 mb-3">
            <Form.Label className="fs-4">Almacenes</Form.Label>
            <Form.Select
              className="fs-5"
              name="almacenes"
              onChange={handleAlmacenes}
            >
              <option value="">Selecciona un almacén</option>
              {list_almacenes.map((emp, i) => (
                <option key={`emp#${i}@form`} value={emp.nombre}>
                  {emp.nombre}
                </option>
              ))}
            </Form.Select>
            <ListGroup
              style={{ height: "200px", overflowY: "auto" }}
              className="border"
            >
              {values.almacenes.map((alm: any, i: number) => (
                <ListGroup.Item
                  key={`alm#${i}@select`}
                  className="d-flex justify-content-between text-uppercase"
                >
                  <span>{alm.nombre}</span>
                  <Button
                    variant="danger"
                    size="sm"
                    title="Quitar"
                    onClick={() => removeAlmacen(alm.nombre)}
                  >
                    <RiDeleteBin5Line />
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Form.Text>Selecciona un almacén para agregar a la lista</Form.Text>
          </Form.Group>
          <Form.Group className="col-10 col-sm-8 col-md-4 col-lg-3 mb-3 d-flex align-items-end">
            {editMode ? (
              <ListGroup>
                <ListGroup.Item>Craedo por: {values.createdby}</ListGroup.Item>
                <ListGroup.Item>
                  Fecha de creación: {fechaYhora(values.createdat)}
                </ListGroup.Item>
              </ListGroup>
            ) : null}
          </Form.Group>
        </Row>
        <Row></Row>
      </div>
      <ModalConfirm
        show={modalConfirm}
        onHide={() => setModalConfirm(!modalConfirm)}
        action={deleteOperador}
        text="¿Deseas eliminar este operador?"
      />
    </Form>
  );
}

export default FormOperadores;
