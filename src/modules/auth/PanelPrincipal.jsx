import { 
  Users, FolderKanban, ClipboardCheck, Clock, TrendingUp, 
  ArrowUpRight, AlertCircle, Timer, 
  CircleAlert
} from "lucide-react";
import BaseCard from "../../components/cards/BaseCard";

const stats = [
    { title: "Estudiantes Activos", value: "48", icon: Users, color: "bg-primary" },
    { title: "Proyectos en Curso", value: "12", icon: FolderKanban, color: "bg-danger" },
    { title: "Tareas Completadas", value: "156", icon: ClipboardCheck, color: "bg-success" },
];

const advance = [
    {title: "Sistema de inventarios", progress: 75},
    {title: "App Móvil Clínica", progress: 45},
    {title: "Portal Web Escolar", progress: 90},
    {title: "API REST Municipal", progress: 30}
]

const activities = [
    {name: "Pedro Ramirez", tittle: "Módulo de autenticación", date: "04/02/2026", type: "Archivo" },
    {name: "Sofia Torres", tittle: "Base de datos relacional", date: "04/02/2026", type: "Texto"},
    {name: "Diego Flores", tittle: "Interfaz de usuario", date: "04/02/2026", type: "Archivo"}
]

export default function PanelPrincipal(){
    return(
        <div className="container-fluid p-0">
            <div className="row g-4 mb-5">
                {stats.map((stat, i) => (
                <div key={i} className="col-12 col-sm-12 col-xl-4">
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
            <div className="row">
                <div className="col-8" style={{height: '620px'}}>
                    <BaseCard>
                        <div className="p-4 mb-5 d-flex justify-content-between align-items-start">
                            <p className="h4 fw-bold">Avance por Proyecto</p>
                            <p className="text-primary">Ver todos &gt;</p>
                        </div>
                        <div className="p-4 d-flex row">
                            {advance.map((item) => (
                                <div className="mb-5">
                                    <div className="d-flex justify-content-between">
                                        <p className="h5 fw-normal">{item.title}</p>
                                        {item.progress >= 80 ? (
                                            <p className="text-success rounded-4 px-4 py-1 h5" style={{backgroundColor: '#c7f7e0'}}>{item.progress}%</p>
                                        ):(
                                            <p className="text-primary rounded-4 px-4 py-1 h5" style={{backgroundColor: '#c1e6f7'}}>{item.progress}%</p>
                                        )}
                                    </div>
                                    <div>
                                        <div className="progress" style={{ height: '13px' }}>
                                            <div 
                                            className="progress-bar" 
                                            style={{ width: `${item.progress}%` }} 
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </BaseCard>
                </div>
                <div className="col-4" style={{height: '620px'}}>
                    <BaseCard>
                        <div className="row p-4 d-flex align-items-center" style={{height: '180px'}}>
                            <p className="h4 fw-bold">Validaciones Pendientes</p>
                            {activities.map((activity) => (
                                <BaseCard className="mb-4">
                                    <div className="row">
                                        <div className="col">
                                            <CircleAlert color="#fd8d3f" />
                                        </div>
                                        <div className="col-10">
                                            <p className="fw-bold">{activity.name}</p>
                                            <p>{activity.tittle}</p>
                                            <div className="d-flex">
                                                <p className="">{activity.type}</p>
                                                <p>{activity.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                </BaseCard>
                            ))}
                            <button className="btn btn-outline-secondary text-primary">Ver todas las validaciones</button>
                        </div>
                        
                    </BaseCard>
                </div>
            </div>
        </div>
    );
}