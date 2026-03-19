import { Edit, RefreshCcw, Trash2 } from "lucide-react";
import EditarNuevoUsuario from "./EditarUsuarioModal";
import EliminarUsuarioModal from "./EliminarUsuarioModal";
import CambiarEstatusModal from "./CambiarEstatusModal";

export default function UsuariosTable({ usuarios }) {
    
    if (!usuarios || usuarios.length === 0) {
        return <div className="text-center p-5 border rounded-3 bg-light text-muted">No hay usuarios para mostrar.</div>;
    }

    return (
        <div className="border rounded-3 overflow-hidden shadow-sm">
            <table className="table mb-0 align-middle">
                <thead className="table-light text-secondary">
                    <tr>
                        <th className="fw-medium py-3 px-4">USUARIO</th>
                        <th className="fw-medium py-3">ROL</th>
                        <th className="fw-medium py-3">PROYECTO</th>
                        <th className="fw-medium py-3">ESTADO</th>
                        <th className="fw-medium py-3">ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario, index) => (
                        <tr key={index}>
                            <td className="py-3 px-4">
                                <div className="fw-bold text-dark">{usuario.nombre}</div>
                                <div className="text-secondary small">{usuario.correo}</div>
                            </td>
                            <td className="text-body-secondary">{usuario.rol}</td>
                            <td className="text-body-secondary">{usuario.proyecto}</td>
                            <td>
                                <span className={`badge rounded-pill px-3 py-2 ${usuario.estado === 'Activo' ? 'bg-success bg-opacity-10 text-success' : 'bg-secondary bg-opacity-10 text-secondary'}`}>
                                    {usuario.estado}
                                </span>
                            </td>
                            <td className="" >
                                <div className="d-flex justify-content-center gap-2">
                                    {/* Botón Cambiar Estado */}
                                    <button 
                                        onClick={() => onToggleStatus(usuario)} 
                                        className="btn btn-sm btn-light text-secondary border-0 shadow-sm"
                                        data-bs-toggle="modal"
                                        data-bs-target="#cambiarEstatusModal"
                                        title={usuario.estado === 'Activo' ? "Desactivar" : "Activar"}
                                    >
                                        <RefreshCcw size={18} />
                                    </button>
                                    <CambiarEstatusModal/>

                                    
                                    {/* Botón Editar */}
                                    <button 
                                        onClick={() => onEdit(usuario)} 
                                        className="btn btn-sm btn-light text-primary border-0 shadow-sm" 
                                        data-bs-toggle="modal" 
                                        data-bs-target="#editarUsuarioModal"
                                        title="Editar Usuario"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <EditarNuevoUsuario />
                                    
                                    {/* Botón Eliminar */}
                                    <button 
                                        onClick={() => onDelete(usuario)} 
                                        className="btn btn-sm btn-light text-danger border-0 shadow-sm" 
                                        data-bs-toggle="modal" 
                                        data-bs-target="#eliminarUsuarioModal"
                                        title="Eliminar Usuario"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                    <EliminarUsuarioModal/>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}