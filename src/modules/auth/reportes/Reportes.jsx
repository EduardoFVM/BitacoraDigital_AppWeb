import { useState } from "react";
import ReporteEstadisticasCard from "../reportes/components/ReporteEstadisticasCard"; 
import BaseCard from "../../../components/cards/BaseCard";
import EstudiantesTable from "./components/EstudiantesTable";
import ProyectoCard from "./components/ProyectoCard";
import ProyectosTable from "./components/ProyectosTable";

const MOCK_STATS = [
    { title: "Proyectos Totales", value: "4", iconId: "projects", color: "bg-primary" },
    { title: "Tareas Completadas", value: "63/104", iconId: "circle-check", color: "bg-success" },
    { title: "Horas Registradas", value: "1,152", iconId: "clock", color: "bg-warning text-dark" }, 
    { title: "Avance Promedio", value: "60%", iconId: "trending-up", color: "bg-info text-white" } 
];

const MOCK_PROYECTOS_DETALLADO = [
    { id: 1, titulo: "Sistema de Inventarios", avance: 75, numEstudiantes: 8, totalHoras: 360 },
    { id: 2, titulo: "App Móvil Clínica", avance: 45, numEstudiantes: 6, totalHoras: 216 },
    { id: 3, titulo: "Portal Web Escolar", avance: 90, numEstudiantes: 10, totalHoras: 432 },
    { id: 4, titulo: "API REST Municipal", avance: 30, numEstudiantes: 5, totalHoras: 144 }
];

export default function Reportes() {

    const [vistaActiva, setVistaActiva] = useState("proyecto");

    return (
        <div className="container-fluid p-4">
            
            <div className="row g-4 mb-5">
                {MOCK_STATS.map((stat, i) => (
                        <ReporteEstadisticasCard key={i} item={stat} />
                ))}
            </div>

            <div className="row mb-4">
                <div className="col-auto">
                    <BaseCard>
                        <div className="d-flex gap-2 p-2">
                            <button 
                                className={`btn px-4 fw-medium ${vistaActiva === 'proyecto' ? 'btn-primary text-white shadow-sm' : 'btn-light text-muted'}`}
                                onClick={() => setVistaActiva('proyecto')}
                            >
                                Por Proyecto
                            </button>
                            
                            <button 
                                className={`btn px-4 fw-medium ${vistaActiva === 'estudiante' ? 'btn-primary text-white shadow-sm' : 'btn-light text-muted'}`}
                                onClick={() => setVistaActiva('estudiante')}
                            >
                                Por Estudiante
                            </button>
                        </div>
                    </BaseCard>
                </div>
            </div>

            {vistaActiva === "proyecto" ? (
                <>
                    <ProyectosTable />
                    
                    <div className="row g-4 mt-2">
                        {MOCK_PROYECTOS_DETALLADO.map((proyecto) => (
                            <div key={proyecto.id} className="col-12 col-md-6">
                                <ProyectoCard proyecto={proyecto} />
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <EstudiantesTable />
            )}
            
        </div>
    );
}