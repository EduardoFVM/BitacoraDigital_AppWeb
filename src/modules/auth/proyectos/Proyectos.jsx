import { useEffect, useState } from "react";
import ProyectosToolbar from "./components/ProyectosToolbar";
import ProyectoCard from "./components/ProyectoCard";
import ProjectController from "./proyectos.controller";
import EditarProyectoModal from "./components/EditarProyectoModal";

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
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [formData, setFormData] = useState({});
    const [proyectos, setProyectos] = useState([]);
    const [projectList, setProjectList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingForm, setLoadingForm] = useState(true);

    const getAll = async () => {
        let data = null;
        let comingFormData = null;
                
        setLoading(true);
        setLoadingForm(true);

        if(localStorage.getItem("role") === "Administrador") {
            ({data} = await ProjectController.getAll());
        } else if(localStorage.getItem("role") === "Asesor") {
            const userId = localStorage.getItem("userId");
            ({data} = await ProjectController.getByAdvisor(userId));
        }
        if(data){ 
            setProyectos(data);
            setProjectList(data);
        }

        ({data: comingFormData} = await ProjectController.getFormData());
        if(comingFormData) {
            setFormData(comingFormData);
            setLoadingForm(false);
        }
        
        setLoading(false);
    }
    const loadUpdateModal = (id) => {
        setSelectedProjectId(id);
    }
    const search = (searchText) => {
        const searchCriteria = searchText.trim().toLowerCase();
        if(searchCriteria === '') {
            setProjectList(proyectos);
        } else {
            const filtered = proyectos.filter(proyecto =>
                proyecto.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchCriteria) ||
                proyecto.advisorName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchCriteria) ||
                proyecto.periodName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchCriteria) ||
                proyecto.description.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchCriteria)
            );
            setProjectList(filtered);
        }
    }
    
    useEffect(() => {
        getAll();
    }, []);

    return (
        <div className="container-fluid p-4">
            <div className="row">
                {!loadingForm ? (
                    <ProyectosToolbar onProyectoCreado={getAll} formData={formData} onSearch={search}/>
                ) : (<></>)}
                

                {loading ? (
                    <div className="col-12 text-center p-5 text-muted">
                        <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                        Cargando proyectos...
                    </div>
                ) : (
                    proyectos.length === 0 ? (
                        <div className="text-center p-5 border rounded-3 bg-light text-muted">No se encontraron proyectos registrados para este perfil.</div>
                    ) : (
                        <>
                            <div className="row mt-4 g-4">
                                {projectList.map((proyecto) => (
                                    
                                    <div key={proyecto.id} className="col-12 col-xl-6">
                                        <ProyectoCard proyecto={proyecto} setSelectedProjectId={loadUpdateModal} />
                                    </div>
                                ))}
                            </div>
                            <EditarProyectoModal formData={formData} onProyectoActualizado={getAll} selectedProjectId={selectedProjectId}/>
                        </>
                    )
                )}

            </div>
        </div>
    );
}