import FormOperadores from "@/components/operadores/FormOperadores";
import KanbanOperadores from "@/components/operadores/KanbanOperadores";
import Link from "next/link";
import conn from "@/lib/connect";

async function getOperadores(): Promise<any[]> {
  try {
    const result: any = conn.query(
      "select maylu.operadores.id, maylu.operadores.nombre, maylu.operadores.usuario, \
      maylu.operadores.grupoid, maylu.operadores.activo, maylu.operadores.createdat, maylu.operadores.createdby, maylu.grupos.nombre as name_grupo \
      from maylu.operadores \
      inner join maylu.grupos on maylu.operadores.grupoid = maylu.grupos.id ORDER BY maylu.operadores.createdat DESC"
    );

    return result;
  } catch (error: any) {
    return error;
  }
}

async function OperadoresPage({
  searchParams,
}: {
  searchParams: { view: string; model: string };
}) {
  const listOpers: any[] = await getOperadores();
  const data: string = JSON.stringify(listOpers);

  const { view, model } = searchParams;
  const LayoutView = () => {
    if (view === "form" && model === "operadores") {
      return <FormOperadores />;
    } else if (null) {
    } else {
      return <KanbanOperadores listOpers={data} />;
    }
  };

  const LayoutBtn = () => {
    if (view === "form" && model === "operadores") {
      return (
        <>
          <Link
            href="/catalogos/operadores?view=form&model=operadores&action=reset"
            className="fw-bold btn btn-outline-info btn-sm"
            replace
          >
            Nuevo
          </Link>
          <Link
            href="/catalogos/operadores"
            className="text-decoration-none text-dark ms-2"
          >
            <span className="link-hover text-primary">Operadores</span>
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link
            href="/catalogos/operadores?view=form&model=operadores"
            className="btn btn-info btn-sm fw-bold"
          >
            Nuevo
          </Link>
          <Link
            href="/catalogos/operadores?view=form&model=grupos"
            className="ms-4 text-decoration-none"
          >
            Grupos
          </Link>
        </>
      );
    }
  };

  return (
    <div className="row">
      <div className="col-12 py-1">
        <LayoutBtn />
      </div>
      <div className="col-12">
        <LayoutView />
      </div>
    </div>
  );
}

export default OperadoresPage;
