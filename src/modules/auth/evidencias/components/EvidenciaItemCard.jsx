import { Eye, FileText } from "lucide-react";
import BaseCard from "../../../../components/cards/BaseCard";
import DetalleEvidenciaModal from "./DetalleEvidenciaModal";

export default function EvidenciaItemCard({ item }) {
    if (!item) return null;

    const statusConfig = {
        "Aprobada": { color: "text-success", bg: "#c7f7e0" },
        "Pendiente": { color: "text-warning text-dark", bg: "#fff3cd" },
        "Rechazada": { color: "text-danger", bg: "#f8d7da" }
    };

    const badgeStyle = statusConfig[item.estado] || { color: "text-secondary", bg: "#e2e3e5" };

    return (
        <BaseCard className="mb-4">
            <div className="row p-3 align-items-center">
                <div className="col-auto">
                    <div className="bg-primary text-white p-3 rounded-3 shadow-sm d-flex justify-content-center align-items-center" style={{width: '70px', height: '70px'}}>
                        <FileText size={32} />
                    </div>
                </div>
                
                <div className="col">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <p className="h5 fw-bold mb-0">{item.titulo}</p>
                        <button 
                            className="btn btn-outline-secondary rounded-4 btn-sm d-flex align-items-center gap-2 px-3"
                            data-bs-toggle="modal"
                            data-bs-target="#detalleEvidenciaModal"    
                        >
                            <Eye size={16} /> Ver
                        </button>
                        <DetalleEvidenciaModal/>
                    </div>
                    
                    <div className="d-flex align-items-center gap-3 mb-2">
                        <span 
                            className={`rounded-2 px-2 py-1 small fw-medium ${badgeStyle.color}`} 
                            style={{ backgroundColor: badgeStyle.bg }}
                        >
                            {item.estado}
                        </span>
                        <span className="text-secondary fw-medium small">{item.proyecto}</span>
                    </div>
                    
                    <p className="text-dark rounded-2 px-2 py-2 small mb-3" style={{ backgroundColor: '#f1f3f5' }}>
                        {item.descripcion}
                    </p>
                    
                    <div className="d-flex gap-4 text-muted small">
                        <span><strong>Por:</strong> {item.usuario}</span>
                        <span><strong>Fecha:</strong> {item.fecha}</span>
                        <span><strong>Hora:</strong> {item.hora}</span>
                    </div>
                </div>
            </div>
        </BaseCard>
    );
}