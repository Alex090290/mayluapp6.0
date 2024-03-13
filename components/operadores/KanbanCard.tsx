import { FaRegEdit } from "react-icons/fa";
import Link from "next/link";

function KanbanCard({ operador }: { operador: KanbanOperador }) {
  return (
    <div className="col-12 col-sm-6 col-md-6 col-lg-5 col-xl-3 mb-3 none-select">
      <div className="card border border-secondary">
        <div className="card-body text-white">
          <h6 className="card-title d-flex justify-content-between">
            <p className="card-text text-capitalize m-0">{operador.nombre}</p>
            <span
              className={`${operador.activo ? "text-success" : "text-danger"}`}
            >{`${operador.activo ? "activo" : "inactivo"}`}</span>
            <Link
              href={`/catologos/operadores?view=form&model=grupos&record=${operador.grupoid}`}
              className="text-decoration-none text-white text-capitalize"
            >
              {operador.name_grupo}
            </Link>
          </h6>
          <div className="d-flex justify-content-between">
            <p className="card-text m-0">{operador.usuario}</p>
            <Link
              href={`/catalogos/operadores?view=form&model=operadores&record=${operador.id}`}
              className="text-decoration-none text-white btn btn-secondary btn-sm"
            >
              <FaRegEdit className="me-2" />
              Editar
            </Link>
            {/* <small>{fechaYhora(operador.createdat)}</small> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default KanbanCard;
