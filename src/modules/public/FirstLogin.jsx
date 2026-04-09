import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthController from "./auth.controller";

export default function FirstLogin({ setSession }) {
    const navigate = useNavigate();
    const location = useLocation();
    
    const { email, tempPassword } = location.state || {};

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    if (!email || !tempPassword) {
        navigate("/login");
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (newPassword !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        setLoading(true);

        try {

            const result = await AuthController.completeFirstLogin({
                email: email,
                code: tempPassword,
                newPassword: newPassword
            });

            localStorage.setItem("token", result.token);
            localStorage.setItem("userId", result.userId);
            localStorage.setItem("role", result.role);

            setSession(true);
            navigate("/home");
        } catch (err) {
            setError("Ocurrió un error al actualizar tu contraseña. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="card border-0 rounded-4 shadow" style={{ width: 400 }}>
                <div className="card-body p-4">
                    <p className="fw-bold text-center fs-4">Cambio de Contraseña</p>
                    <p className="text-center text-muted small mb-4">
                        Por seguridad, debes cambiar tu contraseña temporal antes de continuar.
                    </p>
              
                    {error && <div className="alert alert-danger py-2 text-center">{error}</div>}

                    <form onSubmit={handleSubmit} className="mt-2 row">
                        <div className="col-12 mb-3">
                            <label>Nueva Contraseña</label>
                            <input 
                                type="password" 
                                className="form-control"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="col-12 mb-4">
                            <label>Confirmar Contraseña</label>
                            <input 
                                type="password" 
                                className="form-control"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="col-12 text-center mt-3">
                            <button 
                                type="submit" 
                                className="btn btn-primary col-12"
                                disabled={loading}
                            >
                                {loading ? 'Actualizando...' : 'Actualizar y Entrar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}