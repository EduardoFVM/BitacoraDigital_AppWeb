import React, { useRef, useState } from 'react';
import UserController from '../user.controller';

export default function NuevoUsuarioModal({ onUsuarioCreado }) {

    const [nombreCompleto, setNombreCompleto] = useState('');
    const [correo, setCorreo] = useState('');
    const [rol, setRol] = useState('');
    const [proyecto, setProyecto] = useState('');
    const [cargando, setCargando] = useState(false);

    const botonCerrarRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);

        try {
            const partesNombre = nombreCompleto.split(' '); 
            const nameUser = partesNombre[0];
            const lastName = partesNombre.slice(1).join(' ');

            const nuevoUsuario = {
                nameUser: nameUser,
                lastName: lastName,
                email: correo,
                rol: rol,
                status: true
            };

            await UserController.save(nuevoUsuario);

            if (onUsuarioCreado) {
                onUsuarioCreado();
            }

            if (botonCerrarRef.current) {
                botonCerrarRef.current.click();
            }

            setNombreCompleto('');
            setCorreo('');
            setRol('estudiante');
            setProyecto('');
            

            
        } catch (error) {
            console.error("Error", error);
            alert("Hubo un error al crear el usuario");
        } finally {
            setCargando(false);
        }
    }

    return (
        <div className="modal fade" id="nuevoUsuarioModal" tabIndex="-1" aria-labelledby="nuevoUsuarioModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow" style={{ borderRadius: '12px' }}>
                    
                    {/* Cabecera del Modal */}
                    <div className="modal-header border-0 pb-0 pt-4 px-4 d-flex flex-column align-items-start">
                        <div className="d-flex justify-content-between w-100 mb-1">
                            <h5 className="modal-title fw-bold text-dark" id="nuevoUsuarioModalLabel">Crear Nuevo Usuario</h5>
                            <button 
                                ref={botonCerrarRef} 
                                type="button" 
                                className="btn-close" 
                                data-bs-dismiss="modal" 
                                aria-label="Close"
                            ></button>
                        </div>
                        <p className="text-muted small mb-0">Complete los datos para registrar un nuevo usuario en el sistema.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="modal-body px-4 py-4">
                            <div className="mb-3">
                                <label className="form-label small fw-medium text-dark">Nombre Completo</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Nombre del usuario" 
                                    value={nombreCompleto}
                                    onChange={(e) => setNombreCompleto(e.target.value)}
                                    required
                                />
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label small fw-medium text-dark">Correo Electrónico</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    placeholder="correo@edu.mx" 
                                    value={correo}
                                    onChange={(e) => setCorreo(e.target.value)}
                                    required
                                />
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label small fw-medium text-dark">Rol</label>
                                <select 
                                    className="form-select text-secondary"
                                    value={rol}
                                    onChange={(e) => setRol(e.target.value)}
                                >
                                    <option value="estudiante">Estudiante</option>
                                    <option value="administrador">Asesor</option>
                                </select>
                            </div>
                            
                            <div className="mb-2">
                                <label className="form-label small fw-medium text-dark">Proyecto Asignado</label>
                                <select 
                                    className="form-select text-secondary"
                                    value={proyecto}
                                    onChange={(e) => setProyecto(e.target.value)}
                                >
                                    <option value="">Nombre del proyecto</option>
                                    <option value="1">Sistema de Inventarios</option>
                                    <option value="2">App Móvil Clínica</option>
                                    <option value="3">API REST Municipal</option>
                                </select>
                            </div>
                        </div>

                        <div className="modal-footer border-0 px-4 pb-4 pt-0 gap-2">
                            <button type="button" className="btn btn-white border shadow-sm fw-medium px-4" data-bs-dismiss="modal">
                                Cancelar
                            </button>
                            {/* Cambiamos el tipo a "submit" y lo deshabilitamos si está cargando */}
                            <button type="submit" className="btn btn-primary fw-medium px-4 shadow-sm" disabled={cargando}>
                                {cargando ? 'Guardando...' : 'Crear Usuario'}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}