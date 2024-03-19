"use client";

import { useEffect, useState } from "react";
import { Button, ListGroup, Spinner } from "react-bootstrap";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaChevronRight } from "react-icons/fa";
import useGrupos from "@/hooks/grupos";
import Link from "next/link";
import ModalConfirm from "../modals/ModalConfirm";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

function ListGrupos() {
  const [grupos, fetchGrupos] = useGrupos((st) => [st.grupos, st.fetchGrupos]);

  const [loading, setLoading] = useState<boolean>(false);

  const cargarGrupos = async () => {
    setLoading(true);
    await fetchGrupos();
    setLoading(false);
  };

  useEffect(() => {
    cargarGrupos();
  }, []);
  return (
    <>
      <ListGroup
        style={{ height: "300px", overflowY: "auto" }}
        className="border border-secondary p-2 mb-2"
      >
        <h6 className="text-center">
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "Lista de Grupos"
          )}
        </h6>
        {grupos.map((grupo) => (
          <ListGroup.Item
            key={`grupoid#${grupo.id}-${grupo.nombre}`}
            className="d-flex justify-content-between"
          >
            <span className="text-capitalize">{grupo.nombre}</span>
            <div>
              <Link
                href={`/catalogos/operadores?view=form&model=grupos&record=${grupo.id}`}
                className="me-4 btn btn-info btn-sm"
                title="Seleccionar"
              >
                <FaChevronRight />
              </Link>
              <BtnDelete id={grupo.id} />
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

const BtnDelete = ({ id }: { id: string | undefined }) => {
  const router = useRouter();
  const [fetchGrupos] = useGrupos((st) => [st.fetchGrupos]);

  const [modalConfirm, setModalConfirm] = useState<any>({
    show: false,
    msg: "",
  });

  const targetDeleteGrupo = async () => {
    if (!id) return;
    const { data }: AxiosResponse = await axios.delete(`/api/grupos/${id}`);
    if (data.errorCode === "ER_ROW_IS_REFERENCED_2") {
      setModalConfirm({
        ...modalConfirm,
        msg: "ERROR: El grupo seleccionado no se puede eliminar porque tiene operadores relacionados.",
      });
      return;
    }

    if (data.res === "success") {
      setModalConfirm({ show: false, msg: "" });
      await fetchGrupos();
      router.replace("/catalogos/operadores?view=form&model=grupos");
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="danger"
        size="sm"
        title="Eliminar"
        onClick={() =>
          setModalConfirm({
            show: true,
            msg: "¿Eliminar el grupo seleccionado?",
          })
        }
      >
        <RiDeleteBin5Line />
      </Button>
      <ModalConfirm
        show={modalConfirm.show}
        onHide={() => setModalConfirm(!modalConfirm.show)}
        action={targetDeleteGrupo}
        text={modalConfirm.msg}
      />
    </>
  );
};

export default ListGrupos;
