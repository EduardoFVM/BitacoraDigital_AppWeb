import { useState, useEffect } from "react";
import ReporteEstadisticasCard from "../reportes/components/ReporteEstadisticasCard";
import BaseCard from "../../../components/cards/BaseCard";
import EstudiantesTable from "./components/EstudiantesTable";
import ProyectoCard from "./components/ProyectoCard";
import ProyectosTable from "./components/ProyectosTable";
import ProjectController from "../proyectos/proyectos.controller";
import UserController from "../gestion_usuarios/user.controller";
import ReportesController from "./reportes.controller";

export default function Reportes() {
    const [vistaActiva, setVistaActiva] = useState("proyecto");

    const [stats, setStats] = useState([
        { title: "Proyectos Totales", value: 0, iconId: "projects", color: "bg-primary" },
        { title: "Tareas Completadas", value: "0/0", iconId: "circle-check", color: "bg-success" },
        { title: "Horas Registradas", value: 0, iconId: "clock", color: "bg-warning text-dark" },
        { title: "Avance Promedio", value: "0%", iconId: "trending-up", color: "bg-info text-white" },
    ]);

    const [proyectos, setProyectos] = useState([]);
    const [estudiantes, setEstudiantes] = useState([]);
    const [loadingProyectos, setLoadingProyectos] = useState(true);
    const [loadingEstudiantes, setLoadingEstudiantes] = useState(false);
    const [estudiantesCargados, setEstudiantesCargados] = useState(false);

    useEffect(() => {
        const cargarProyectos = async () => {
            const role = localStorage.getItem("role");
            const userId = localStorage.getItem("userId");

            let response;
            if (role === "Administrador") {
                response = await ProjectController.getAll();
            } else {
                response = await ProjectController.getByAdvisor(userId);
            }
            const data = response?.data || [];
            setProyectos(data);

            const totalCompleted = data.reduce((sum, p) => sum + (p.completedTasks || 0), 0);
            const totalTasks = data.reduce((sum, p) => sum + (p.totalTasks || 0), 0);
            const totalHoras = data.reduce((sum, p) => sum + (p.workedHours || 0), 0);

            const proyectosConTareas = data.filter(p => p.totalTasks > 0);
            const avancePromedio = proyectosConTareas.length > 0
                ? Math.round(
                    proyectosConTareas.reduce((sum, p) => sum + (p.completedTasks / p.totalTasks) * 100, 0)
                    / proyectosConTareas.length
                  )
                : 0;

            setStats([
                { title: "Proyectos Totales", value: data.length, iconId: "projects", color: "bg-primary" },
                { title: "Tareas Completadas", value: `${totalCompleted}/${totalTasks}`, iconId: "circle-check", color: "bg-success" },
                { title: "Horas Registradas", value: totalHoras, iconId: "clock", color: "bg-warning text-dark" },
                { title: "Avance Promedio", value: `${avancePromedio}%`, iconId: "trending-up", color: "bg-info text-white" },
            ]);

            setLoadingProyectos(false);
        };

        cargarProyectos();
    }, []);

    const cargarEstudiantes = async () => {
        if (estudiantesCargados) return;
        setLoadingEstudiantes(true);

        const role = localStorage.getItem("role");
        const userId = localStorage.getItem("userId");

        let proyectosResponse;
        if (role === "Administrador") {
            proyectosResponse = await ProjectController.getAll();
        } else {
            proyectosResponse = await ProjectController.getByAdvisor(userId);
        }
        const listaProyectos = proyectosResponse?.data || [];

        const filas = [];
        for (const proyecto of listaProyectos) {
            const estudiantesDelProyecto = await UserController.findStudentsByProject(proyecto.id);
            for (const estudiante of (estudiantesDelProyecto || [])) {
                const reporte = await ReportesController.getStudentReport(estudiante.id);
                const loggedHours = reporte?.loggedHours ?? 0;
                const requiredHours = proyecto.neededHours ?? reporte?.requiredHours ?? 480;
                const hoursPercentage = requiredHours > 0
                    ? Math.min(Math.round((loggedHours / requiredHours) * 10000) / 100, 100)
                    : 0;
                filas.push({
                    studentName: reporte?.studentFullName ?? estudiante.name,
                    projectName: proyecto.name,
                    loggedHours,
                    requiredHours,
                    hoursPercentage
                });
            }
        }

        setEstudiantes(filas);
        setEstudiantesCargados(true);
        setLoadingEstudiantes(false);
    };

    const handleCambiarVista = (vista) => {
        setVistaActiva(vista);
        if (vista === "estudiante") {
            cargarEstudiantes();
        }
    };

    const proyectosParaCards = proyectos.map(p => ({
        titulo: p.name,
        avance: p.totalTasks > 0 ? Math.round((p.completedTasks / p.totalTasks) * 100) : 0,
        numEstudiantes: p.studentCount,
        totalHoras: p.workedHours
    }));

    return (
        <div className="container-fluid p-4">
            <div className="row g-4 mb-5">
                {stats.map((stat, i) => (
                    <ReporteEstadisticasCard key={i} item={stat} />
                ))}
            </div>

            <div className="row mb-4">
                <div className="col-auto">
                    <BaseCard>
                        <div className="d-flex gap-2 p-2">
                            <button
                                className={`btn px-4 fw-medium ${vistaActiva === "proyecto" ? "btn-primary text-white shadow-sm" : "btn-light text-muted"}`}
                                onClick={() => handleCambiarVista("proyecto")}
                            >
                                Por Proyecto
                            </button>
                            <button
                                className={`btn px-4 fw-medium ${vistaActiva === "estudiante" ? "btn-primary text-white shadow-sm" : "btn-light text-muted"}`}
                                onClick={() => handleCambiarVista("estudiante")}
                            >
                                Por Estudiante
                            </button>
                        </div>
                    </BaseCard>
                </div>
            </div>

            {vistaActiva === "proyecto" ? (
                <>
                    {loadingProyectos ? (
                        <div className="text-center p-5 text-muted">
                            <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                            Cargando proyectos...
                        </div>
                    ) : (
                        <>
                            <ProyectosTable proyectos={proyectos} />
                            <div className="row g-4 mt-2">
                                {proyectosParaCards.map((proyecto, i) => (
                                    <div key={i} className="col-12 col-md-6">
                                        <ProyectoCard proyecto={proyecto} />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </>
            ) : (
                loadingEstudiantes ? (
                    <div className="text-center p-5 text-muted">
                        <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                        Cargando estudiantes...
                    </div>
                ) : (
                    <EstudiantesTable estudiantes={estudiantes} />
                )
            )}
        </div>
    );
}
