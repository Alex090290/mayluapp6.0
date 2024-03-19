"use client";
import { useEffect, useState } from "react";
import KanbanCard from "./KanbanCard";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

function KanbanOperadores({ listOpers }: { listOpers: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const parsedList: any[] = JSON.parse(listOpers);

  const [opers, setOpers] = useState<any[]>(parsedList);
  const [value, setValue] = useState<string>("");

  const handleValue = (e: FormEvents["onChange"]) => {
    const entry: string = e.target.value;
    if (entry === "") {
      setOpers(parsedList);
      setValue("");
    } else {
      setValue(entry.toLowerCase());
    }
  };

  const handleSubmit = (e: FormEvents["onSubmit"]) => {
    e.preventDefault();
    if (value === "activo") {
      const result = parsedList.filter((s) => s.activo === 1);
      setOpers(result);
    } else if (value === "inactivo") {
      const result = parsedList.filter((s) => s.activo === 0);
      setOpers(result);
    } else {
      const result = parsedList.filter(
        (s) =>
          s.nombre.includes(value) ||
          s.usuario.includes(value) ||
          s.name_grupo.includes(value)
      );

      setOpers(result);
    }
  };

  const filtrarPorGrupo = (grupoId: string) => {
    const result: any[] = parsedList.filter((s) => s.grupoid == grupoId);
    // console.log(result);
    setOpers(result);
  };

  const verTodos = () => {
    setOpers(parsedList);
    router.replace("/catalogos/operadores");
  };

  useEffect(() => {
    if (searchParams.get("filter") && searchParams.get("record")) {
      const grupoId: string | null = searchParams.get("record");
      if (!grupoId) return;
      filtrarPorGrupo(grupoId);
    }
  }, [searchParams]);

  return (
    <Container fluid>
      <Row>
        <Col md="12" className="d-flex justify-content-between mb-2">
          <Form className="ms-2" onSubmit={handleSubmit}>
            <Row>
              <Form.Group className="col-10 p-0">
                <Form.Control
                  size="sm"
                  value={value}
                  onChange={handleValue}
                  type="text"
                  placeholder="Filtrar"
                  autoComplete="off"
                  required
                />
              </Form.Group>
              <Button
                type="submit"
                variant="secondary"
                size="sm"
                className="col-2 p-0"
              >
                <FaSearch />
              </Button>
            </Row>
          </Form>
          <Button size="sm" variant="secondary" onClick={verTodos}>
            Todos
          </Button>
          <small className="me-2">Registros: {opers.length}</small>
        </Col>
      </Row>
      <Row>
        {opers.map((oper) => (
          <KanbanCard key={`kanbanoperador#${oper.id}`} operador={oper} />
        ))}
      </Row>
    </Container>
  );
}

export default KanbanOperadores;
