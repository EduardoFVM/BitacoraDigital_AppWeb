import { useState, useEffect } from "react";
import BaseCard from "../../../components/cards/BaseCard";
import EstadisticasCard from "./components/EstadisticasCard";
import ProgresoProyectoItem from "./components/ProgresoProyectoItem";
import ValidacionesCard from "./components/ValidacionesCard";

// 1. Tus Mock Data (preparados para ser reemplazados por el backend)
const MOCK_STATS = [
    { title: "Estudiantes Activos", value: "48", iconId: "users", color: "bg-primary" },
    { title: "Proyectos en Curso", value: "12", iconId: "projects", color: "bg-danger" },
    { title: "Tareas Completadas", value: "156", iconId: "tasks", color: "bg-success" },
];

const MOCK_ADVANCE = [
    { title: "Sistema de inventarios", progress: 75 },
    { title: "App Móvil Clínica", progress: 45 },
    { title: "Portal Web Escolar", progress: 90 },
    { title: "API REST Municipal", progress: 30 }
];

const MOCK_ACTIVITIES = [
    { name: "Pedro Ramirez", title: "Módulo de autenticación", date: "04/02/2026", type: "Archivo" },
    { name: "Sofia Torres", title: "Base de datos relacional", date: "04/02/2026", type: "Texto" },
    { name: "Diego Flores", title: "Interfaz de usuario", date: "04/02/2026", type: "Archivo" }
];

export default function PanelPrincipal() {
    
    const [stats, setStats] = useState(MOCK_STATS);
    const [advance, setAdvance] = useState(MOCK_ADVANCE);
    const [activities, setActivities] = useState(MOCK_ACTIVITIES);
    const [cargando, setCargando] = useState(false);

    if(cargando) return <div className="p-5 text-center">Cargando panel...</div>;

    return (
        <div className="container-fluid p-0">
            {/* SECCIÓN 1: ESTADÍSTICAS */}
            <div className="row g-4 mb-5">
                {stats.map((stat, index) => (
                    <EstadisticasCard key={index} item={stat} />
                ))}
            </div>

            <div className="row g-4">
                {/* SECCIÓN 2: AVANCE DE PROYECTOS */}
                <div className="col-12 col-lg-8">
                    <BaseCard style={{ height: '100%', minHeight: '620px' }}>
                        <div className="p-4 mb-4 d-flex justify-content-between align-items-center">
                            <p className="h4 fw-bold mb-0">Avance por Proyecto</p>
                            <span className="text-primary" style={{ cursor: 'pointer' }}>Ver todos &gt;</span>
                        </div>
                        <div className="p-4">
                            {advance.map((item, index) => (
                                <ProgresoProyectoItem key={index} item={item} />
                            ))}
                        </div>
                    </BaseCard>
                </div>

                {/* SECCIÓN 3: VALIDACIONES PENDIENTES */}
                <div className="col-12 col-lg-4">
                    <BaseCard style={{ height: '100%', minHeight: '620px' }}>
                        <div className="p-4">
                            <p className="h4 fw-bold mb-4">Validaciones Pendientes</p>
                            
                            <div className="d-flex flex-column">
                                {activities.map((activity, index) => (
                                    <ValidacionesCard key={index} item={activity} />
                                ))}
                            </div>

                            <button className="btn btn-outline-secondary text-primary w-100 mt-3 fw-bold">
                                Ver todas las validaciones
                            </button>
                        </div>
                    </BaseCard>
                </div>
            </div>
        </div>
    );
}