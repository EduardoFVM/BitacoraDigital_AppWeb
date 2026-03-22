import { useLocation } from "react-router-dom";

export default function CustomNavbar() {

    const location = useLocation();

    const pageTitles = {
        '/home': 'Panel Principal',
        '/users': 'Gestión de Usuarios',
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
            <li className="av-item d-flex align-items-center gap-3">
                <span className="text-secondary px-5">[Tipo_Usuario]</span>
                <div className="bg-info text-white rounded-circle d-flex justify-content-center align-items-center" style={{width: 35, height: 35}}>
                    A
                </div>
                <span className="fw-bold">[Nombre_Usuario]</span>
            </li>
        </ul>
    );
}