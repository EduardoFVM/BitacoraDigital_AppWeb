import { useEffect, useState } from "react";
import UsuariosToolbar from "./components/UsuariosToolbar";
import UsuariosTable from "./components/UsuariosTable";
import UserController from "./user.controller";
import EditarUsuarioModal from "./components/EditarUsuarioModal";
import CambiarEstatusModal from "./components/CambiarEstatusModal";

export default function GestionUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [filtroRol, setFiltroRol] = useState("Todos");
    const [cargando, setCargando] = useState(true);
    const [paginaActual, setPaginaActual] = useState(1);

    const registrosPorPagina = 10;

    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

    const cargarUsuarios = async () => {
        setCargando(true);
        const datosBackend = await UserController.findAll();

        if (datosBackend) {
            const UsuariosMapeados = datosBackend.map(user => ({
                ...user,
                nombre: `${user.nameUser || ''} ${user.lastName || ''}`.trim(),
                correo: user.email || 'Sin Correo',
                rol: user.rol || 'Sin rol asignado',
                proyecto: "No asignado",
                estado: (user.userStatus && user.userStatus.toLowerCase() === 'active') ? "Activo" : "Inactivo"
            }));

            setUsuarios(UsuariosMapeados);
        }
        setCargando(false);
    }

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const handleEditClick = (usuario) => {
        setUsuarioSeleccionado(usuario);
    };

    const handleStatusClick = (usuario) => {
        setUsuarioSeleccionado(usuario);
    };

    const handleActualizarUsuario = async (id, datosFormulario) => {
        await UserController.update(id, datosFormulario); 
        cargarUsuarios();
    };

    const handleCambiarEstatus = async (id) => {
        await UserController.updateStatus(id); 
        cargarUsuarios(); 
    };

    const usuariosFiltrados = usuarios.filter((usuario) => {
        const limpiarTexto = (texto) => {
            return texto.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        };

        const nombreLimpio = limpiarTexto(usuario.nombre || "");
        const correoLimpio = limpiarTexto(usuario.correo || "");
        const busquedaLimpia = limpiarTexto(busqueda);
        
        const coincideBusqueda = busquedaLimpia === "" || 
                                 nombreLimpio.includes(busquedaLimpia) || 
                                 correoLimpio.includes(busquedaLimpia);

        const coincideRol = filtroRol === "Todos" || usuario.rol === filtroRol;

        return coincideBusqueda && coincideRol;
    });

    return (
        <div className="container-fluid p-4">
            <div className="row">
                <UsuariosToolbar 
                onUsuarioCreado={cargarUsuarios}
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                filtroRol={filtroRol}
                setFiltroRol={setFiltroRol}
                />

                <div className="col-12 mt-3">
                    {cargando ? (
                        <div className="text-center p-5 text-muted">
                            <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                            Cargando usuarios...
                        </div>
                    ) : (
                        <UsuariosTable 
                            usuarios={usuariosFiltrados} 
                            onEdit={handleEditClick} 
                            onToggleStatus={handleStatusClick} 
                        />
                    )}
                </div>
            </div>

            <EditarUsuarioModal 
                usuario={usuarioSeleccionado} 
                onConfirm={handleActualizarUsuario} 
            />
            
            <CambiarEstatusModal 
                usuario={usuarioSeleccionado} 
                onConfirm={handleCambiarEstatus} 
            />
        </div>
    );
}