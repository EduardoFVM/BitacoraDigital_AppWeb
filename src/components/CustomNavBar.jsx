import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function CustomNavbar() {
    const location = useLocation();

    const [usuarioActual, setUsuarioActual] = useState({
        nombre: "Usuario",
        rol: "Invitado",
        inicial: "U"
    });

    useEffect(() => {
        const usuarioGuardado = sessionStorage.getItem("usuario");
        
        if (usuarioGuardado) {
            try {
                const userObj = JSON.parse(usuarioGuardado);
                
                const nombreReal = userObj.nombre || "Usuario";
                
                setUsuarioActual({
                    nombre: nombreReal,
                    rol: userObj.rol || "Sin Rol",
                    inicial: nombreReal.charAt(0).toUpperCase()
                });
            } catch (error) {
                console.error("Error al leer los datos:", error);
            }
        }
    }, []);

    const pageTitles = {
        '/home': 'Panel Principal',
        '/users': 'Gestión de Usuarios',
        '/periods': 'Periodos',
        '/projects': 'Proyectos',
        '/evidence': 'Evidencias',
        '/reports': 'Reportes',
        '/settings': 'Configuración del Sistema',
        '/projects/tasks': `Tablero de Tareas ${location.state?.projectName ? ` - ${location.state.projectName}` : ''}`
    }

    const currentTitle = pageTitles[location.pathname] || 'Bitácora Digital';

    return (
        <ul className="nav w-100 px-4 py-4 border-bottom justify-content-between align-items-center bg-white">
            <li className="nav-item">
                <span className="h3 mb-0 fw-bold text-dark">{currentTitle}</span>
            </li>
            <li className="nav-item d-flex align-items-center gap-3">
                <span className="text-secondary px-5">{usuarioActual.rol}</span>
                
                <div className="bg-info text-white rounded-circle d-flex justify-content-center align-items-center fw-bold" style={{width: 35, height: 35}}>
                    {usuarioActual.inicial}
                </div>
                
                <span className="fw-bold">{usuarioActual.nombre}</span>
            </li>
        </ul>
    );
}