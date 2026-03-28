import { Eye, FileText } from "lucide-react";
import MediaGallery from "./MediaGallery";


const EvidenceStatus = Object.freeze({
    IN_REVISION: 'in_revision',
    APPROVED: 'approved',
    REJECTED: 'rejected'
})

export default function EvidenciaItemCard({ item, onSelectedItem }) {
    if (!item) return null;
    const isoString = item.uploadDate;
    const uploadDate = new Date(isoString);

    const formattedDate = new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(uploadDate);

    const formattedHour = new Intl.DateTimeFormat('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    }).format(uploadDate);

    const statusConfig = {
        "approved": { color: "text-success", bg: "#c7f7e0" },
        "in_revision": { color: "text-warning text-dark", bg: "#fff3cd" },
        "rejected": { color: "text-danger", bg: "#f8d7da" }
    };

    const badgeStyle = statusConfig[item.status] || { color: "text-secondary", bg: "#e2e3e5" };

    return (
        <div className="col-6">
            <div className="card border-0 shadow mb-2">
                <div className="card-body">
                    <div className="row p-3 align-items-center">
                        <div className="col-auto">
                            <div className="bg-primary text-white p-3 rounded-3 shadow-sm d-flex justify-content-center align-items-center" style={{width: '70px', height: '70px'}}>
                                <FileText size={32} />
                            </div>
                        </div>
                        
                        <div className="col">
                            <div className="d-flex justify-content-between align-items-start mb-2 flex-wrap">
                                <p className="h5 fw-bold mb-0">{item.taskName}</p>
                                <button 
                                    className="btn btn-outline-secondary rounded-4 btn-sm d-flex align-items-center gap-2 px-3"
                                    data-bs-toggle="modal"
                                    data-bs-target="#detalleEvidenciaModal" 
                                    onClick={() => onSelectedItem(item)}
                                >
                                    <Eye size={16} /> Ver
                                </button>
                            </div>
                            
                            <div className="d-flex align-items-center gap-3 mb-2">
                                <span 
                                    className={`rounded-2 px-2 py-1 small fw-medium ${badgeStyle.color}`} 
                                    style={{ backgroundColor: badgeStyle.bg }}
                                >
                                    {item.status === "in_revision" ? 
                                        "En revisión" : (item.status === "approved" ?
                                            "Aprobada" : "Rechazada"
                                        )
                                    }
                                </span>
                                <span className="text-secondary fw-medium small">{item.projectName}</span>
                            </div>
                            
                            <p className="text-dark rounded-2 px-2 py-2 small mb-3" style={{ backgroundColor: '#f1f3f5' }}>
                                {item.description}
                            </p>
                            
                            <div className="d-flex gap-4 text-muted small flex-wrap">
                                <span><strong>Por:</strong> {item.studentName}</span>
                                <span><strong>Fecha:</strong> {formattedDate}</span>
                                <span><strong>Hora:</strong> {formattedHour}</span>
                            </div>
                        </div>
                        <MediaGallery files={item.files} />
                    </div>
                </div>
            </div>
        </div>
    );
}