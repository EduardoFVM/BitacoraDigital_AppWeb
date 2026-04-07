import React, { useRef, useState } from 'react';

export default function CambiarEstatusModal({ usuario, onConfirm }) {
    const botonCerrarRef = useRef(null);
    const [cargando, setCargando] = useState(false);

    const handleConfirmar = async () => {
        if (!usuario || !usuario.id) {
            console.error("No hay un usuario seleccionado para cambiar el estatus.");
            return; 
        }

        setCargando(true);
        
        try {
            await onConfirm(usuario.id); 
        } catch (error) {
            console.error("Error al actualizar el estatus:", error);
        } finally {
            setCargando(false);
            if (botonCerrarRef.current) {
                botonCerrarRef.current.click();
            }
        }
    };

    return(
         <div className="modal fade" id="cambiarEstatusModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow" style={{ borderRadius: '12px' }}>
                    <div className="modal-header border-0 pb-0 pt-4 px-4 d-flex flex-column align-items-start">
                        <div className="d-flex justify-content-center w-100 mb-1">
                            <h5 className="modal-title fw-bold text-dark">¿Cambiar Estatus?</h5>
                            <button ref={botonCerrarRef} type="button" className="btn-close d-none" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <p className="text-center w-100 text-muted mt-2">
                            ¿Estás seguro de cambiar el estatus de <strong>{usuario?.nameUser || usuario?.nombre}</strong>?
                        </p>
                    </div>

                    <div className="modal-footer justify-content-center border-0 px-4 pb-4 pt-0 gap-2">
                        <button type="button" className="btn btn-white border shadow-sm fw-medium px-4" data-bs-dismiss="modal" disabled={cargando}>
                            Cancelar
                        </button>
                        <button type="button" className="btn btn-primary fw-medium px-4 shadow-sm" onClick={handleConfirmar} disabled={cargando}>
                            {cargando ? 'Guardando...' : 'Confirmar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}