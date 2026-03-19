export default function DetalleEvidenciaModal(){
    return (
        <div className="modal fade" id="detalleEvidenciaModal" tabIndex="-1" aria-labelledby="detalleEvidenciaModalLabel" aria-hidden="true">
            {/* modal-dialog-centered hace que aparezca justo en medio de la pantalla */}
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow" style={{ borderRadius: '12px' }}>
                    
                    {/* Cabecera del Modal */}
                    <div className="modal-header border-0 pb-0 pt-4 px-4 d-flex flex-column align-items-start">
                        <div className="d-flex justify-content-between w-100 mb-1">
                            <h5 className="modal-title fw-bold text-dark" id="nuevoUsuarioModalLabel">Detalle de Evidencia</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <p className="text-muted small mb-0">Revise y valide la evidencia enviada por el estudiante.</p>
                    </div>

                    {/* Cuerpo del Modal (Formulario) */}
                    <div className="modal-body px-4 py-4">
                        <form>
                            <div className="d-flex ">
                                <div className="mb-3 col-6">
                                    <label className="form-label small fw-medium text-dark">Estudiante</label>
                                    
                                </div>
                                
                                <div className="mb-3 col-6">
                                    <label className="form-label small fw-medium text-dark">Proyecto</label>
                                    
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="mb-3 col-6">
                                    <label className="form-label small fw-medium text-dark">Tarea</label>
                                   
                                </div>
                                
                                <div className="mb-2 col-6">
                                    <label className="form-label small fw-medium text-dark">Fecha</label>
                                    
                                </div>
                            </div>
                            <div className="mb-2">
                                <label className="form-label small fw-medium text-dark">Contenido</label>
                            </div>
                            <div className="mb-2">
                                <label className="form-label small fw-medium text-dark">Retroalimentación</label>
                                <input type="text" className="form-control" placeholder="Escribe un comentario sobre esta evidencia..." />
                            </div>            
                        </form>
                    </div>

                    {/* Pie del Modal (Botones) */}
                    <div className="modal-footer border-0 px-4 pb-4 pt-0 gap-2">
                        <button type="button" className="btn btn-white border shadow-sm fw-medium px-4" data-bs-dismiss="modal">
                            Rechazar
                        </button>
                        <button type="button" className="btn btn-primary fw-medium px-4 shadow-sm">
                            Aprobar
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}