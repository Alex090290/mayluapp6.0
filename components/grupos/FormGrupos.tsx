import FormCreateGrupo from "./FormCreateGrupo";
import ViewAccesos from "./ViewAccesos";

function FormGrupos() {
  return (
    <div className="container-fluid border border-secondary rounded bg-light">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-5 col-lg-4 col-xl-3 border-end border-secondary">
          <FormCreateGrupo />
        </div>
        <div className="col-12 col-sm-7 col-lg-8 col-xl-9">
          <ViewAccesos />
        </div>
      </div>
    </div>
  );
}

export default FormGrupos;
