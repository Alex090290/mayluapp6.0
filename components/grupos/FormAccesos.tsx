"use client";

import { accesos } from "@/helpers/accesos";
import axios, { AxiosResponse } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { CiSaveUp2 } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";

function FormAccesos() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [values, setValues] = useState<Accesos>(accesos);
  const [isSelected, setIsSelected] = useState<boolean>(true);
  const [grupoName, setGrupoName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleValues = (e: FormEvents["onChange"], key: string) => {
    let newAccesos = {
      ...values,
    };

    //@ts-ignore
    newAccesos[key] = {
      //@ts-ignore
      ...values[key],
      [e.target.name]: e.target.checked,
    };

    setValues(newAccesos);
  };

  const handleSubmit = async (e: FormEvents["onSubmit"]) => {
    e.preventDefault();
    setIsSaved(true);
    const grupoId: string | null = searchParams.get("record");
    if (!grupoId) return;
    const { data }: AxiosResponse = await axios.put(`/api/grupos/${grupoId}`, {
      accesos: values,
    });
    if (data.res === "success") {
      toast.success("Operación completada", { position: "top-center" });
      setIsSaved(false);
    }
  };

  const fetchAccesos = async (grupoId: string) => {
    setLoading(true);
    const { data }: AxiosResponse = await axios.get(`/api/grupos/${grupoId}`);
    if (data.res === "success") {
      const parsedAccesos: Accesos = JSON.parse(data.data.accesos);
      setIsSelected(false);
      setValues(parsedAccesos);
      setGrupoName(data.data.nombre);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchParams.get("record")) {
      const grupoId: string | null = searchParams.get("record");
      if (!grupoId) {
        setIsSelected(true);
        return;
      }
      fetchAccesos(grupoId);
    }
  }, [searchParams]);

  return (
    <Form onSubmit={handleSubmit} style={{}} className="card none-select">
      <div className="card-header d-flex justify-content-between">
        <span>
          Grupo:{" "}
          {loading ? (
            <Spinner animation="border" size="sm" className="me-2" />
          ) : (
            <strong className="text-capitalize">{grupoName}</strong>
          )}
        </span>
        <Button variant="success" size="sm" type="submit" disabled={isSelected}>
          {isSaved ? (
            <Spinner animation="border" size="sm" className="me-2" />
          ) : (
            <CiSaveUp2 className="me-2" />
          )}
          Guardar
        </Button>
      </div>
      <fieldset className="card-body" disabled={isSelected}>
        <Row className="justify-content-center">
          {Object.keys(values).map((k, i) => (
            <Col
              key={`accesos#${i}-form`}
              xs="6"
              sm="6"
              md="4"
              lg="3"
              xl="2"
              className="border border-secondary p-2"
            >
              <h6 className="text-center text-capitalize">
                {k.replace("_", " ")}
              </h6>
              {
                //@ts-ignore
                Object.keys(values[k]).map((v, i) => (
                  <Form.Group key={`valuesaccesos#${i}-form`}>
                    <Form.Check
                      type="checkbox"
                      id={v}
                      label={v.replace("_", " ")}
                      name={v}
                      //@ts-ignore
                      onChange={(e) => handleValues(e, k)}
                      className="text-capitalize"
                      //@ts-ignore
                      checked={values[k][v]}
                    />
                  </Form.Group>
                ))
              }
            </Col>
          ))}
        </Row>
      </fieldset>
      <ToastContainer />
    </Form>
  );
}

export default FormAccesos;
