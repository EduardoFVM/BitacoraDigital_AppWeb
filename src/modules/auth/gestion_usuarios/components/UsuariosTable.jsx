import React, { useState } from "react"; // <-- Importante importar useState
import { Edit, RefreshCcw, Trash2 } from "lucide-react";

export default function UsuariosTable({ usuarios, onToggleStatus, onEdit }) {
    
    const usuarioLogueado = JSON.parse(sessionStorage.getItem("usuario") || "{}");
    const esAdmin = usuarioLogueado.rol === 'Administrador' || usuarioLogueado.rol === 'ADMIN';
    const [paginaActual, setPaginaActual] = useState(1);
    const registrosPorPagina = 10;

    if (!usuarios || usuarios.length === 0) {
        return <div className="text-center p-5 border rounded-3 bg-light text-muted">No hay usuarios para mostrar.</div>;
    }

    const indiceUltimoRegistro = paginaActual * registrosPorPagina;
    const indicePrimerRegistro = indiceUltimoRegistro - registrosPorPagina;

    const usuariosPaginados = usuarios.slice(indicePrimerRegistro, indiceUltimoRegistro);
    
    const totalPaginas = Math.ceil(usuarios.length / registrosPorPagina);

    const irPaginaAnterior = () => {
        if (paginaActual > 1) setPaginaActual(paginaActual - 1);
    };

    const irPaginaSiguiente = () => {
        if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
    };

    return (
        <div className="">
            <div className="border rounded-3 overflow-hidden shadow-sm">
                <table className="table mb-0 align-middle">
                    <thead className="table-light text-secondary">
                        <tr>
                            <th className="fw-medium py-3 px-4">USUARIO</th>
                            <th className="fw-medium py-3">ROL</th>
                            <th className="fw-medium py-3">ESTADO</th>
                            {esAdmin && <th className="fw-medium py-3 text-center">ACCIONES</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {usuariosPaginados.map((usuario) => (
                            <tr key={usuario.id}>
                                <td className="py-3 px-4">
                                    <div className="fw-bold text-dark">{usuario.nameUser || usuario.nombre}</div>
                                    <div className="text-secondary small">{usuario.email || usuario.correo}</div>
                                </td>
                                <td className="text-body-secondary">{usuario.rol}</td>
                                <td>
                                    <span className={`badge rounded-pill px-3 py-2 ${(usuario.userStatus === 'active' || usuario.estado === 'Activo') ? 'bg-success bg-opacity-10 text-success' : 'bg-secondary bg-opacity-10 text-secondary'}`}>
                                        {(usuario.userStatus === 'active' || usuario.estado === 'Activo') ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                {esAdmin && (
                                    <td className="text-center">
                                        <div className="d-flex justify-content-center gap-2">
                                            <button 
                                                onClick={() => onToggleStatus(usuario)} 
                                                className="btn btn-sm btn-light text-secondary border-0 shadow-sm"
                                                data-bs-toggle="modal"
                                                data-bs-target="#cambiarEstatusModal"
                                            >
                                                <RefreshCcw size={18} />
                                            </button>
                                            
                                            <button 
                                                onClick={() => onEdit(usuario)} 
                                                className="btn btn-sm btn-light text-primary border-0 shadow-sm" 
                                                data-bs-toggle="modal" 
                                                data-bs-target="#editarUsuarioModal"
                                            >
                                                <Edit size={18} />
                                            </button>
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <nav aria-label="Navegación de páginas" className="d-flex justify-content-between align-items-center mt-3 px-2">
                
                <span className="text-secondary small">
                    Mostrando {indicePrimerRegistro + 1} al {Math.min(indiceUltimoRegistro, usuarios.length)} de {usuarios.length} registros
                </span>

                <ul className="pagination pagination-sm mb-0">
                    
                    <li className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={irPaginaAnterior} aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>

                    {[...Array(totalPaginas)].map((_, index) => (
                        <li key={index} className={`page-item ${paginaActual === index + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => setPaginaActual(index + 1)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}

                    <li className={`page-item ${paginaActual === totalPaginas ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={irPaginaSiguiente} aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}