import React, { useState } from "react";
import { CircleCheckBig, Clock, FolderKanban, TrendingUp, Search } from "lucide-react";
import BaseCard from "../../components/cards/BaseCard";

export default function Reportes() {
    // 1. Estados para controlar la UI y los datos
    const [vistaActiva, setVistaActiva] = useState("proyecto"); // 'proyecto' o 'estudiante'
    const [idBusqueda, setIdBusqueda] = useState(""); // El ID que el usuario quiere buscar
    const [reporteProyecto, setReporteProyecto] = useState(null);
    const [reporteEstudiante, setReporteEstudiante] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    // 2. Estado para las tarjetas superiores
    // Nota: Como tus DTOs actuales no traen esta información, inician en 0.
    const [estadisticasGrales, setEstadisticasGrales] = useState({
        pendientes: 0,
        aprobadas: 0,
        rechazadas: 0,
        enRevision: 0 // Corregí el duplicado de "Rechazadas" de tu código original
    });

    // 3. Función que se dispara al hacer clic en "Buscar"
    const buscarDatos = async (e) => {
        e.preventDefault();
        if (!idBusqueda) return;

        setCargando(true);
        setError(null);
        setReporteProyecto(null);
        setReporteEstudiante(null);

        try {
            const baseUrl = "http://localhost:8081/api/reports"; 
            const endpoint = vistaActiva === "proyecto" 
                ? `${baseUrl}/project/${idBusqueda}` 
                : `${baseUrl}/student/${idBusqueda}`;

            // 1. Recuperamos el token de donde lo tengas guardado
            const token = localStorage.getItem("token"); // Ajusta esta llave según tu proyecto

            // 2. Agregamos los headers a la petición
            const respuesta = await fetch(endpoint, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Aquí inyectamos el token
                }
            });
            

            
            if (!respuesta.ok) {
                throw new Error(`No se encontró el ${vistaActiva} con el ID ${idBusqueda}`);
            }

            const datos = await respuesta.json();

            if (vistaActiva === "proyecto") {
                setReporteProyecto(datos);
            } else {
                setReporteEstudiante(datos);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }
    };

    // Arreglo de configuración visual para las tarjetas usando los datos del estado
    const statsConfig = [
        { icon: FolderKanban, title: "Pendientes", value: estadisticasGrales.pendientes, color: "bg-primary" },
        { icon: CircleCheckBig, title: "Aprobadas", value: estadisticasGrales.aprobadas, color: "bg-success" },
        { icon: Clock, title: "Rechazadas", value: estadisticasGrales.rechazadas, color: "bg-warning" },
        { icon: TrendingUp, title: "En Revisión", value: estadisticasGrales.enRevision, color: "bg-info" }
    ];

    // Función para limpiar la pantalla al cambiar de pestaña
    const cambiarVista = (nuevaVista) => {
        setVistaActiva(nuevaVista);
        setReporteProyecto(null);
        setReporteEstudiante(null);
        setError(null);
        setIdBusqueda(""); // Limpiamos el input
    };

    return (
        <div className="container-fluid p-0">
            <div className="row">
                {/* --- SECCIÓN 1: Tarjetas de estadísticas superiores --- */}
                <div className="row g-4 mb-5">
                    {statsConfig.map((stat, i) => (
                        <div key={i} className="col-12 col-sm-12 col-xl-3">
                            <BaseCard>
                                <div className="p-4 d-flex justify-content-between align-items-start">
                                    <div>
                                        <p className="text-muted fw-bold h5 mb-1">{stat.title}</p>
                                        <h3 className="h2 fw-bold mb-2">{stat.value}</h3>
                                    </div>
                                    <div className={`${stat.color} text-white p-3 rounded-3 shadow-sm`}>
                                        <stat.icon size={40} />
                                    </div>
                                </div>
                            </BaseCard>
                        </div>
                    ))}
                </div>

                {/* --- SECCIÓN 2: Controles y Buscador --- */}
                <div className="col-12 mb-5">
                    <BaseCard>
                        <div className="p-4 d-flex flex-wrap justify-content-between align-items-center gap-3">
                            
                            {/* Botones de navegación */}
                            <div className="d-flex gap-2">
                                <button 
                                    className={`btn ${vistaActiva === 'proyecto' ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => cambiarVista('proyecto')}
                                >
                                    Por Proyecto
                                </button>
                                <button 
                                    className={`btn ${vistaActiva === 'estudiante' ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => cambiarVista('estudiante')}
                                >
                                    Por Estudiante
                                </button>
                            </div>

                            {/* Buscador Dinámico */}
                            <form onSubmit={buscarDatos} className="d-flex gap-2" style={{ maxWidth: '400px', flexGrow: 1 }}>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    placeholder={`Buscar ID de ${vistaActiva}...`}
                                    value={idBusqueda}
                                    onChange={(e) => setIdBusqueda(e.target.value)}
                                    min="1"
                                    required
                                />
                                <button type="submit" className="btn btn-dark d-flex align-items-center gap-2" disabled={cargando}>
                                    <Search size={18} />
                                    {cargando ? "Buscando..." : "Buscar"}
                                </button>
                            </form>

                        </div>
                    </BaseCard>
                </div>

                {/* --- SECCIÓN 3: Tarjeta de Resultados Dinámica --- */}
                <div className="row d-flex justify-content-between">
                    <div className="col-12 mb-5">
                        <BaseCard>
                            <div className="d-flex px-4 py-5 row min-vh-25">
                                
                                {/* Estado: Mensaje de Error */}
                                {error && (
                                    <div className="alert alert-danger text-center w-100" role="alert">
                                        {error}
                                    </div>
                                )}

                                {/* Estado: Cargando */}
                                {cargando && !error && (
                                    <div className="text-center w-100 text-muted">
                                        <div className="spinner-border text-primary mb-3" role="status"></div>
                                        <p>Consultando base de datos...</p>
                                    </div>
                                )}

                                {/* Estado: Sin búsqueda inicial */}
                                {!cargando && !error && !reporteProyecto && !reporteEstudiante && (
                                    <div className="text-center w-100 text-muted py-4">
                                        <p className="h5">Ingresa un ID numérico en el buscador superior para ver el reporte.</p>
                                    </div>
                                )}

                                {/* Resultado: VISTA PROYECTO */}
                                {!cargando && !error && vistaActiva === "proyecto" && reporteProyecto && (
                                    <>
                                        <div className="col-12 mb-2 d-flex justify-content-between">
                                            <p className="h4 fw-bold">{reporteProyecto.projectName}</p>
                                        </div>
                                        <div className="col-12 mb-2">
                                            <p className="h5 text-muted">Progreso del Proyecto</p>
                                        </div>
                                        <div className="mb-5">
                                            <div>
                                                <div className="progress" style={{ height: '15px' }}>
                                                    <div
                                                        className="progress-bar bg-success progress-bar-striped progress-bar-animated"
                                                        style={{ width: `${reporteProyecto.completionPercentage}%` }}
                                                        title={`${reporteProyecto.completionPercentage}%`}
                                                    >
                                                        {reporteProyecto.completionPercentage}%
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 gap-3 mb-3 d-flex flex-wrap flex-md-nowrap">
                                            <div className="container text-center rounded-4 p-4 shadow-sm border" style={{ backgroundColor: '#f9fafb' }}>
                                                <p className="h2 fw-bold text-primary">{reporteProyecto.completedTasks} / {reporteProyecto.totalTasks}</p>
                                                <p className="mb-0 text-muted fw-semibold">Tareas Completadas</p>
                                            </div>
                                            <div className="container text-center rounded-4 p-4 shadow-sm border" style={{ backgroundColor: '#f9fafb' }}>
                                                <p className="h2 fw-bold text-success">{reporteProyecto.completionPercentage}%</p>
                                                <p className="mb-0 text-muted fw-semibold">Avance General</p>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* Resultado: VISTA ESTUDIANTE */}
                                {!cargando && !error && vistaActiva === "estudiante" && reporteEstudiante && (
                                    <>
                                        <div className="col-12 mb-2 d-flex justify-content-between">
                                            <p className="h4 fw-bold">{reporteEstudiante.studentFullName}</p>
                                        </div>
                                        <div className="col-12 mb-2">
                                            <p className="h5 text-muted">Horas Registradas</p>
                                        </div>
                                        <div className="mb-5">
                                            <div>
                                                <div className="progress" style={{ height: '15px' }}>
                                                    <div
                                                        className="progress-bar bg-primary progress-bar-striped progress-bar-animated"
                                                        style={{ width: `${reporteEstudiante.hoursPercentage}%` }}
                                                        title={`${reporteEstudiante.hoursPercentage}%`}
                                                    >
                                                        {reporteEstudiante.hoursPercentage}%
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 gap-3 mb-3 d-flex flex-wrap flex-md-nowrap">
                                            <div className="container text-center rounded-4 p-4 shadow-sm border" style={{ backgroundColor: '#f9fafb' }}>
                                                <p className="h2 fw-bold text-primary">{reporteEstudiante.loggedHours}</p>
                                                <p className="mb-0 text-muted fw-semibold">Horas Realizadas</p>
                                            </div>
                                            <div className="container text-center rounded-4 p-4 shadow-sm border" style={{ backgroundColor: '#f9fafb' }}>
                                                <p className="h2 fw-bold text-dark">{reporteEstudiante.requiredHours}</p>
                                                <p className="mb-0 text-muted fw-semibold">Horas Requeridas</p>
                                            </div>
                                            <div className="container text-center rounded-4 p-4 shadow-sm border" style={{ backgroundColor: '#f9fafb' }}>
                                                <p className="h2 fw-bold text-success">{reporteEstudiante.hoursPercentage}%</p>
                                                <p className="mb-0 text-muted fw-semibold">Porcentaje completado</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </BaseCard>
                    </div>
                </div>
            </div>
        </div>
    );
}