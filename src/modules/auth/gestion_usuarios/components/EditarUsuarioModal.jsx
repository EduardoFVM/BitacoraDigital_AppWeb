import React, { useRef, useState, useEffect } from 'react';

export default function EditarNuevoUsuario({ usuario, onConfirm }) {
    const botonCerrarRef = useRef(null);
    const [cargando, setCargando] = useState(false);
    const [formData, setFormData] = useState({
        nombreCompleto: '', 
        email: '',
        rol: ''
    });

    useEffect(() => {
        if (usuario) {
            setFormData({
                nombreCompleto: `${usuario.nameUser || ''} ${usuario.lastName || ''}`.trim() || usuario.nombre || '',
                email: usuario.email || usuario.correo || '',
                rol: usuario.rol || 'Estudiante'
            });
        }
    }, [usuario]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGuardar = async () => {
        setCargando(true);
        
        try {
            const partes = formData.nombreCompleto.trim().split(" ");
            const nameUser = partes[0] || ""; 
            const lastName = partes.slice(1).join(" ") || ""; 
            const payloadBackend = {
                nameUser: nameUser,
                lastName: lastName,
                email: formData.email,
                rol: formData.rol 
            };

            await onConfirm(usuario.id, payloadBackend);
            
            if (botonCerrarRef.current) botonCerrarRef.current.click();
            
        } catch (error) {
            console.error("Error al intentar guardar:", error);
            alert("Hubo un problema al actualizar el usuario. Revisa la consola.");
        } finally {
            setCargando(false);
        }
    };

    return (
         <div className="modal fade" id="editarUsuarioModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow" style={{ borderRadius: '12px' }}>
                    
                    <div className="modal-header border-0 pb-0 pt-4 px-4 d-flex flex-column align-items-start">
                        <div className="d-flex justify-content-between w-100 mb-1">
                            <h5 className="modal-title fw-bold text-dark">Editar Usuario</h5>
                            <button ref={botonCerrarRef} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    </div>

                    <div className="modal-body px-4 py-4">
                        <form>
                            <div className="mb-3">
                                <label className="form-label small fw-medium text-dark">Nombre Completo</label>
                                <input type="text" name="nombreCompleto" className="form-control" value={formData.nombreCompleto} onChange={handleChange} />
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label small fw-medium text-dark">Correo Electrónico</label>
                                <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label small fw-medium text-dark">Rol</label>
                                <select name="rol" className="form-select text-secondary" value={formData.rol} onChange={handleChange}>
                                    <option>-- Selecciona Una Opción --</option>
                                    <option value="Estudiante">Estudiante</option>
                                    <option value="Administrador">Administrador</option>
                                    <option value="Asesor">Asesor</option>
                                </select>
                            </div>
                        </form>
                    </div>

                    <div className="modal-footer border-0 px-4 pb-4 pt-0 gap-2">
                        <button type="button" className="btn btn-white border shadow-sm fw-medium px-4" data-bs-dismiss="modal" disabled={cargando}>
                            Cancelar
                        </button>
                        <button type="button" className="btn btn-primary fw-medium px-4 shadow-sm" onClick={handleGuardar} disabled={cargando}>
                            {cargando ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}