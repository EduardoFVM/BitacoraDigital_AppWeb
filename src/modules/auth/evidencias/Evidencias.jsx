import { useEffect, useState } from "react";
import EstadisticasCard from "../panel_principal/components/EstadisticasCard"; 
import EvidenciasToolbar from "./components/EvidenciasToolbar";
import EvidenciaItemCard from "./components/EvidenciaItemCard";
import EvidenceController from "./evidences.controller";
import DetalleEvidenciaModal from "./components/DetalleEvidenciaModal";

export default function Evidencias() {
    const MOCK_STATS = [
        { title: "Pendientes", value: "N/A", iconId: "clock", color: "bg-warning text-dark" },
        { title: "Aprobadas", value: "N/A", iconId: "circle-check", color: "bg-success" },
        { title: "Rechazadas", value: "N/A", iconId: "circle-x", color: "bg-danger" }
    ];
    const [stats, setStats] = useState(MOCK_STATS);
    const [evidencias, setEvidencias] = useState([]);
    const [loading, setLoading] = useState(true)
    const [selectedEvidence, setSelectedEvidence] = useState({})

    const loadEvidences = async () => {
        let data = null
        if(localStorage.getItem("role") === "Admin") {
            ({data} = await EvidenceController.getAll());
        } else if(localStorage.getItem("role") === "Asesor") {
            const userId = localStorage.getItem("userId");
            ({data} = await EvidenceController.getByAdvisorId(userId));
        }
        if(data){
            setEvidencias(data);
            setStats(prevStats => prevStats.map(stat => {
                    if (stat.iconId === "clock") {
                        return { ...stat, value: data.filter(e => e.status === "in_revision").length };
                    }
                    if (stat.iconId === "circle-check") {
                        return { ...stat, value: data.filter(e => e.status === "approved").length };
                    }
                    if (stat.iconId === "circle-x") {
                        return { ...stat, value: data.filter(e => e.status === "rejected").length };
                    }
                    return stat;
                })
            );
        }

        setLoading(false);
    }
    const loadDetailsModal = (evidence) => {
        setSelectedEvidence(evidence);
    }


    useEffect(() => {
        loadEvidences()
    }, [])

    return (
        <div className="container-fluid p-4">
            <div className="row g-4 mb-5">
                {stats.map((stat, i) => (
                    <EstadisticasCard key={i} item={stat} />
                ))}
            </div>

            <div className="row mb-4">
                <EvidenciasToolbar />
            </div>

            <div className="row">
                {loading ? (
                    <div className="col-12 text-center p-5 text-muted">
                        <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                        Cargando evidencias...
                    </div>
                ) : (
                    evidencias.length === 0 ? (
                        <div className="text-center p-5 border rounded-3 bg-light text-muted">Aún no hay evidencias registradas para este perfil.</div>
                    ) : (
                        evidencias.map((evidencia, index) => (
                            <EvidenciaItemCard key={index} item={evidencia} onSelectedItem={loadDetailsModal}/>
                        ))
                    )
                )}
                <DetalleEvidenciaModal item={selectedEvidence} onEvidenceUpdate={loadEvidences}/>
            </div>
        </div>
    );
}