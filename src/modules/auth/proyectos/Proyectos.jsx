import { useEffect, useState } from "react";
import ProyectosToolbar from "./components/ProyectosToolbar";
import ProyectoCard from "./components/ProyectoCard";
import ProjectController from "./proyectos.controller";

// Mock Data para probar la vista
const MOCK_PROYECTOS = [
    {
        title: "Sistema de Inventarios Inteligente",
        description: "Desarrollo de una plataforma web para la gestión automatizada de inventarios usando códigos QR y predicción de demanda.",
        asesor: "Dr. Roberto Hernández",
        date: "24 Oct 2025",
        progress: 75,
        taskCount: "18/24",
        hours: 120,
        students: 3,
        status: "En Desarrollo"
    },
    {
        title: "App Móvil Clínica",
        description: "Aplicación móvil para la gestión de citas médicas y expedientes de pacientes.",
        asesor: "Dra. Ana Silveira",
        date: "15 Nov 2025",
        progress: 45,
        taskCount: "9/20",
        hours: 80,
        students: 2,
        status: "En Pausa"
    },
    {
        title: "Portal Web Escolar",
        description: "Sistema integral para la gestión de calificaciones y comunicación con padres de familia.",
        asesor: "Mtro. Carlos Gómez",
        date: "02 Feb 2026",
        progress: 90,
        taskCount: "45/50",
        hours: 200,
        students: 4,
        status: "Fase Final"
    }
];

export default function Proyectos() {
    const [proyectos, setProyectos] = useState([]);

    const getAll = async () => {
        const {data} = await ProjectController.getAll();
        if(data) setProyectos(data)
    }

    useEffect(() => {
        getAll();
    }, []);

    return (
        <div className="container-fluid p-4">
            <div className="row">
                <ProyectosToolbar onProyectoCreado={getAll}/>

                {proyectos.length === 0 ? (
                        <div className="text-center p-5 border rounded-3 bg-light text-muted">No se encontraron proyectos registrados para este perfil.</div>
                ) : (
                    <div className="row mt-4 g-4">
                        {proyectos.map((proyecto) => (
                            
                            <div key={proyecto.id} className="col-12 col-xl-6">
                                <ProyectoCard proyecto={proyecto} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}