export default function EliminarUsuarioModal() {
    return(
         <div className="modal fade" id="eliminarUsuarioModal" tabIndex="-1" aria-labelledby="eliminarUsuarioModalLabel" aria-hidden="true">
            {/* modal-dialog-centered hace que aparezca justo en medio de la pantalla */}
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow" style={{ borderRadius: '12px' }}>
                    
                    {/* Cabecera del Modal */}
                    <div className="modal-header border-0 pb-0 pt-4 px-4 d-flex flex-column align-items-start">
                        <div className="d-flex justify-content-center w-100 mb-1">
                            <h5 className="modal-title fw-bold text-dark" id="nuevoUsuarioModalLabel">¿Deseas Eliminar Este Usuario?</h5>
                        </div>
                    </div>

                    {/* Pie del Modal (Botones) */}
                    <div className="modal-footer justify-content-center border-0 px-4 pb-4 pt-0 gap-2">
                        <button type="button" className="btn btn-white border shadow-sm fw-medium px-4" data-bs-dismiss="modal">
                            Cancelar
                        </button>
                        <button type="button" className="btn btn-primary fw-medium px-4 shadow-sm">
                            Confirmar
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}