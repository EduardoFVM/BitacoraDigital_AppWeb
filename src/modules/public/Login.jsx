import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthController from "./auth.controller";

export default function Login({ setSession}){
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(!!sessionStorage.getItem('token')){
            navigate("/home");
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const result = await AuthController.login({email, password});

            const realToken = result.token;

            sessionStorage.setItem("token", realToken);
            setSession(true);
            navigate("/home");
        } catch (err) {
            console.error("Error en login: ", err);
            setError("Usuario o contraseña incorrectos. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="card border-0 rounded-4 shadow" style={{ width: 400 }}>
                <div className="card-body p-4">
                    <p className="fw-bold text-center fs-4">Inicio de Sesión</p>
              
                    {error && <div className="alert alert-danger py-2 text-center">{error}</div>}

                    <form onSubmit={handleLogin} className="mt-2 row">
                        <div className="col-12 mb-3">
                            <label>Usuario o correo electrónico</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="col-12 mb-4">
                            <label>Contraseña</label>
                            <input 
                                type="password" 
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="col-12 text-center mt-3">
                            <button 
                                type="submit" 
                                className="btn btn-primary col-12"
                                disabled={loading}
                            >
                                {loading ? 'Iniciando...' : 'Iniciar Sesión'}
                            </button>
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