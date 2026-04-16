import { useState, useEffect } from "react";
import BaseCard from "../../../components/cards/BaseCard";
import EstadisticasCard from "./components/EstadisticasCard";
import ProgresoProyectoItem from "./components/ProgresoProyectoItem";
import ValidacionesCard from "./components/ValidacionesCard";
import ProjectController from "../proyectos/proyectos.controller";
import EvidenceController from "../evidencias/evidences.controller";

const formatDate = (rawDate) => {
    if (!rawDate) return "--/--/----";
    if (Array.isArray(rawDate)) {
        const [year, month, day] = rawDate;
        return `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${year}`;
    }
    return new Date(rawDate).toLocaleDateString("es-MX");
};

export default function PanelPrincipal() {
    const [stats, setStats] = useState([
        { title: "Estudiantes Activos", value: 0, iconId: "users", color: "bg-primary" },
        { title: "Proyectos en Curso", value: 0, iconId: "projects", color: "bg-danger" },
        { title: "Tareas Completadas", value: 0, iconId: "tasks", color: "bg-success" },
    ]);
    const [advance, setAdvance] = useState([]);
    const [activities, setActivities] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarDatos = async () => {
            const role = localStorage.getItem("role");
            const userId = localStorage.getItem("userId");

            let proyectosResponse;
            if (role === "Administrador") {
                proyectosResponse = await ProjectController.getAll();
            } else {
                proyectosResponse = await ProjectController.getByAdvisor(userId);
            }
            const proyectos = proyectosResponse?.data || [];

            const totalStudents = proyectos.reduce((sum, p) => sum + (p.studentCount || 0), 0);
            const totalCompleted = proyectos.reduce((sum, p) => sum + (p.completedTasks || 0), 0);

            setStats([
                { title: "Estudiantes Activos", value: totalStudents, iconId: "users", color: "bg-primary" },
                { title: "Proyectos en Curso", value: proyectos.length, iconId: "projects", color: "bg-danger" },
                { title: "Tareas Completadas", value: totalCompleted, iconId: "tasks", color: "bg-success" },
            ]);

            setAdvance(proyectos.map(p => ({
                title: p.name,
                progress: p.totalTasks > 0 ? Math.round((p.completedTasks / p.totalTasks) * 100) : 0
            })));

            let evidenciasResponse;
            if (role === "Administrador") {
                evidenciasResponse = await EvidenceController.getAll();
            } else {
                evidenciasResponse = await EvidenceController.getByAdvisorId(userId);
            }
            const evidencias = evidenciasResponse?.data || [];

            const pendientes = evidencias
                .filter(e => e.status === "in_revision")
                .slice(0, 5)
                .map(e => ({
                    name: e.studentName,
                    title: e.taskName,
                    date: formatDate(e.uploadDate),
                    type: "Evidencia"
                }));

            setActivities(pendientes);
            setCargando(false);
        };

        cargarDatos();
    }, []);

    if (cargando) return <div className="p-5 text-center">Cargando panel...</div>;

    return (
        <div className="container-fluid p-0">
            <div className="row g-4 mb-5">
                {stats.map((stat, index) => (
                    <EstadisticasCard key={index} item={stat} />
                ))}
            </div>

            <div className="row g-4">
                <div className="col-12 col-lg-8">
                    <BaseCard style={{ height: "100%", minHeight: "620px" }}>
                        <div className="p-4 mb-4 d-flex justify-content-between align-items-center">
                            <p className="h4 fw-bold mb-0">Avance por Proyecto</p>
                        </div>
                        <div className="p-4">
                            {advance.length === 0 ? (
                                <p className="text-muted text-center">Sin proyectos registrados.</p>
                            ) : (
                                advance.map((item, index) => (
                                    <ProgresoProyectoItem key={index} item={item} />
                                ))
                            )}
                        </div>
                    </BaseCard>
                </div>

                <div className="col-12 col-lg-4">
                    <BaseCard style={{ height: "100%", minHeight: "620px" }}>
                        <div className="p-4">
                            <p className="h4 fw-bold mb-4">Validaciones Pendientes</p>
                            <div className="d-flex flex-column">
                                {activities.length === 0 ? (
                                    <p className="text-muted text-center">Sin validaciones pendientes.</p>
                                ) : (
                                    activities.map((activity, index) => (
                                        <ValidacionesCard key={index} item={activity} />
                                    ))
                                )}
                            </div>
                        </div>
                    </BaseCard>
                </div>
            </div>
        </div>
    );
}
