import FormOperadores from "@/components/operadores/FormOperadores";
import Link from "next/link";
import { Button } from "react-bootstrap";

function OperadoresPage({
  params,
  searchParams,
}: {
  params: {};
  searchParams: { view: string; model: string };
}) {
  const { view, model } = searchParams;
  const LayoutView = () => {
    if (view === "form" && model === "operadores") return <FormOperadores />;
  };

  const LayoutBtn = () => {
    if (view === "form" && model === "operadores") {
      return (
        <>
          <Link
            href="/catalogos/operadores?view=form&model=operadores&action=reset"
            className="fw-bold btn btn-outline-info btn-sm"
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
        <Link
          href="/catalogos/operadores?view=form&model=operadores"
          className="btn btn-info btn-sm fw-bold"
        >
          Nuevo
        </Link>
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
