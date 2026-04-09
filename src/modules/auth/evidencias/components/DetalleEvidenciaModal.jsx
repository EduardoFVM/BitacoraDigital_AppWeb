import { useState } from "react";
import EvidenceController from "../evidences.controller";
import MediaGallery from "./MediaGallery";

const EvidenceStatus = Object.freeze({
    IN_REVISION: 'in_revision',
    APPROVED: 'approved',
    REJECTED: 'rejected'
})

export default function DetalleEvidenciaModal({item, onEvidenceUpdate}){
    const [feedback, setFeedback] = useState("");

    const changeStatus = async (status) => {
        if(item != null) {
            try {
                const changeObject = {
                    id: item.id,
                    evidenceStatus: status,
                    feedback: feedback
                }
            
                await EvidenceController.changeStatus(changeObject);
                if(onEvidenceUpdate) {
                    onEvidenceUpdate()
                }

            } catch(error) {
                console.log("Error: "+error);
                alert("Ocurrio un error al actualizar el estado");
            }
        }
    } 

    return (
        <div className="modal fade" id="detalleEvidenciaModal" tabIndex="-1" aria-labelledby="detalleEvidenciaModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow" style={{ borderRadius: '12px' }}>
                    
                    <div className="modal-header border-0 pb-0 pt-4 px-4 d-flex flex-column align-items-start">
                        <div className="d-flex justify-content-between w-100 mb-1">
                            <h5 className="modal-title fw-bold text-dark" id="nuevoUsuarioModalLabel">Detalle de Evidencia</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <p className="text-muted small mb-0">Revise y valide la evidencia enviada por el estudiante.</p>
                    </div>

                    <div className="modal-body px-4 py-4">
                        <form>
                            <div className="d-flex ">
                                <div className="mb-3 col-6">
                                    <label className="form-label small fw-medium text-dark">Estudiante</label>
                                    <p>{item.studentName}</p>
                                </div>
                                
                                <div className="mb-3 col-6">
                                    <label className="form-label small fw-medium text-dark">Proyecto</label>
                                    <p>{item.projectName}</p>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="mb-3 col-6">
                                    <label className="form-label small fw-medium text-dark">Tarea</label>
                                    <p>{item.taskName}</p>
                                </div>
                                
                                <div className="mb-2 col-6">
                                    <label className="form-label small fw-medium text-dark">Fecha</label>
                                    <p>{item.uploadDate}</p>
                                </div>
                            </div>
                            <div className="mb-2">
                                <label className="form-label small fw-medium text-dark">Contenido</label>
                                {item.files ? (
                                    <MediaGallery files={item.files} />
                                ) : (
                                    <></>
                                )}
                            </div>
                            {item.status === EvidenceStatus.IN_REVISION ? (
                                <div className="mb-2">
                                    <label className="form-label small fw-medium text-dark">Retroalimentación</label>
                                    <input type="text" className="form-control" placeholder="Escribe un comentario sobre esta evidencia..." 
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                    />
                                </div>            
                            ) : (
                                item.feedback ? (
                                    <div className="mb-2">
                                        <label className="form-label small fw-medium text-dark">Retroalimentación</label>
                                        <p>{item.feedback}</p>
                                    </div>
                                ) : (<></>)
                            )}
                        </form>
                    </div>
                    {/* Pie del Modal (Botones) */}
                    {item.status === EvidenceStatus.IN_REVISION && (
                        <div className="modal-footer border-0 px-4 pb-4 pt-0 gap-2">
                            <button type="button" className="btn btn-danger border shadow-sm fw-medium px-4" data-bs-dismiss="modal"
                                onClick={() => changeStatus(EvidenceStatus.REJECTED)}
                                disabled={feedback === ""}
                                >
                                Rechazar
                            </button>
                            <button type="button" className="btn btn-white border shadow-sm fw-medium px-4" data-bs-dismiss="modal">
                                Cancelar
                            </button>
                            <button type="button" className="btn btn-success fw-medium px-4 shadow-sm" data-bs-dismiss="modal"
                                onClick={() => changeStatus(EvidenceStatus.APPROVED)}
                                >
                                Aprobar
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}