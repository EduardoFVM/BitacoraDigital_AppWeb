import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login(){
    const navigate = useNavigate();
    const changeSession = () => {
        sessionStorage.setItem("token", "test.token.tiendita");
        navigate("/home");
        setSession(true);
    };

    useEffect(() => {
        if(!!sessionStorage.getItem('token')){
            navigate("/home");
        }
    }, []);

    return (
        <main className="d-flex align-items-center justify-content-center">
            <div className="card border-0 rounded-4 shadow" style={{width: 400}}>
                <div className="card-body">
                    <p className="fw-bold">Inicio de Sesisón</p>
                    <form action="" className="mt-2 row">
                        <div className="col-12">
                            <label htmlFor="">Usuario o correo electronico</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-12">
                            <label htmlFor="">Contraseña</label>
                            <input type="password" className="form-control" />
                        </div>
                        <div className="col-12 text-center mt-3">
                            <button onClick={() => changeSession()} className="btn btn-primary col-12">Iniciar Sesion</button>
                            <p className="mb-0 mt-3">
                                <Link to="/recovery">¿Olvidaste tu contraseña?</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}