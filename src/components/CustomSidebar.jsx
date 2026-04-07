import { BarChart3, BookOpen, FileCheck, FolderKanban, LayoutDashboard, MoveLeft, Settings, Users } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import '../styles/global.css';

{/* Objeto de los links de navegación */}
const navItems = [
  { path: "/home", label: "Panel Principal", icon: LayoutDashboard },
  { path: "/users", label: "Gestión de Usuarios", icon: Users },
  { path: "/projects", label: "Proyectos", icon: FolderKanban },
  { path: "/evidence", label: "Evidencias", icon: FileCheck },
  { path: "/reports", label: "Reportes", icon: BarChart3 },
];

export default function CustomSidebar({ setSession }){

    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const sidebarStyle = {
        backgroundColor: '#101828',
        width: isHovered ? "280px" : "80px",
        transition: "width 0.3s ease-in-out",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 1050,
        overflowX: "hidden",
        whiteSpace: "nowrap"
    }

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        localStorage.removeItem("token");
        if (setSession) {
            setSession(false);
        }

        navigate("/");
    };

    return(
        <aside 
            className="d-flex flex-column text-white shadow" 
            style={sidebarStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            
            {/* LOGO */}
            <div className="d-flex align-items-center px-3 py-4" style={{height: '80px'}}>
                <div className="bg-info rounded-3 p-2 d-flex justify-content-center align-items-center flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                    <BookOpen size={24} className="text-white" color="#000000"/>
                </div>
                <div 
                    className="ms-3" 
                    style={{ 
                        opacity: isHovered ? 1 : 0, 
                        transition: 'opacity 0.2s ease',
                        pointerEvents: isHovered ? 'auto' : 'none'
                    }}
                >
                    <h3 className="h6 mb-0 fw-bold">Bitacora Digital</h3>
                    <small className="text-secondary" style={{fontSize: '0.75rem'}}>Plataforma de Gestión Social</small>
                </div>
            </div>

            {/* LINKS */}
            <nav className="flex-column gap-2 p-2 flex-grow-1 mt-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => 
                                `sidebar-btn btn d-flex align-items-center border-0 text-start ${
                                    isActive ? 'bg-primary text-white' : 'text-white-50'
                                }`
                            }
                            style={{ 
                                padding: '12px 14px'
                            }}
                        >
                            <Icon size={22} className="flex-shrink-0" />
                            <span 
                                className="ms-3"
                                style={{
                                    opacity: isHovered ? 1 : 0, 
                                    transition: 'opacity 0.2s ease 0.1s'
                                }}
                            >
                                {item.label}
                            </span>
                        </NavLink>
                    );
                })}
            </nav>

            {/* Salir */}
            <div className="p-2 border-top border-secondary border-opacity-25 mt-auto">
                <button 
                    onClick={handleLogout}
                    className="sidebar-btn btn d-flex align-items-center border-0 w-100 p-2 text-decoration-none text-white-50 hover-bg-danger"
                    style={{ background: 'transparent' }}
                >
                    <MoveLeft size={22} className="flex-shrink-0" />
                    <span 
                        className="ms-3 text-start"
                        style={{ 
                            opacity: isHovered ? 1 : 0, 
                            transition: 'opacity 0.2s' 
                        }}
                    >
                        Cerrar Sesión
                    </span>
                </button>
            </div>
        </aside>
    );
}