export default function EditarNuevoUsuario() {
    return (
         <div className="modal fade" id="editarUsuarioModal" tabIndex="-1" aria-labelledby="editarUsuarioModalLabel" aria-hidden="true">
            {/* modal-dialog-centered hace que aparezca justo en medio de la pantalla */}
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow" style={{ borderRadius: '12px' }}>
                    
                    {/* Cabecera del Modal */}
                    <div className="modal-header border-0 pb-0 pt-4 px-4 d-flex flex-column align-items-start">
                        <div className="d-flex justify-content-between w-100 mb-1">
                            <h5 className="modal-title fw-bold text-dark" id="nuevoUsuarioModalLabel">Editar Usuario</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <p className="text-muted small mb-0">Complete los datos para registrar un nuevo usuario en el sistema.</p>
                    </div>

                    {/* Cuerpo del Modal (Formulario) */}
                    <div className="modal-body px-4 py-4">
                        <form>
                            <div className="mb-3">
                                <label className="form-label small fw-medium text-dark">Nombre Completo</label>
                                <input type="text" className="form-control" placeholder="Nombre del usuario" />
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label small fw-medium text-dark">Correo Electrónico</label>
                                <input type="email" className="form-control" placeholder="correo@edu.mx" />
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label small fw-medium text-dark">Rol</label>
                                <select className="form-select text-secondary">
                                    <option value="estudiante">Estudiante</option>
                                    <option value="administrador">Administrador</option>
                                </select>
                            </div>
                            
                            <div className="mb-2">
                                <label className="form-label small fw-medium text-dark">Proyecto Asignado</label>
                                <select className="form-select text-secondary">
                                    <option value="">Nombre del proyecto</option>
                                    <option value="1">Sistema de Inventarios</option>
                                    <option value="2">App Móvil Clínica</option>
                                    <option value="3">API REST Municipal</option>
                                </select>
                            </div>
                        </form>
                    </div>

                    {/* Pie del Modal (Botones) */}
                    <div className="modal-footer border-0 px-4 pb-4 pt-0 gap-2">
                        <button type="button" className="btn btn-white border shadow-sm fw-medium px-4" data-bs-dismiss="modal">
                            Cancelar
                        </button>
                        <button type="button" className="btn btn-primary fw-medium px-4 shadow-sm">
                            Guardar Cambios
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}