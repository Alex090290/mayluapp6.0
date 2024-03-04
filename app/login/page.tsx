import FormLogin from "@/components/login/FormLogin";

function LoginPage() {
  return (
    <div className="row h-100 justify-content-center align-content-center bg-light bg-gradient">
      <div className="col-11 col-sm-6 col-md-6 col-lg-2 h-75">
        <FormLogin />
      </div>
    </div>
  );
}

export default LoginPage;
