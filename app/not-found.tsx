import Link from "next/link";

function NotFoundPage() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="alert alert-warning">
            <h4>Elemento no encontrado</h4>
            <Link href="/">Volver</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
