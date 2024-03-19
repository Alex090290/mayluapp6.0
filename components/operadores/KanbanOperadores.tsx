"use client";
import { useEffect, useState } from "react";
import KanbanCard from "./KanbanCard";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaRegUserCircle, FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

function KanbanOperadores({ listOpers }: { listOpers: string }) {
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

  useEffect(() => {
    // if (parsedList.length === 0) {
    //   router.replace("/login");
    // }
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col className="d-flex justify-content-between mb-2">
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
