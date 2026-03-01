import { CircleCheckBig, Clock, FolderKanban, TrendingUp } from "lucide-react";
import BaseCard from "../../components/cards/BaseCard";

export default function Reportes(){
    
    const stats = [
    {icon: FolderKanban, title: "Pendientes", value: "12", color: "bg-primary"},
    {icon: CircleCheckBig, title: "Aprobadas", value: "12", color: "bg-success"},
    {icon: Clock, title: "Rechazadas", value: "12", color: "bg-warning"},
    {icon: TrendingUp, title: "Rechazadas", value: "12", color: "bg-info"}
    ];

    return(
        <div className="container-fluid p-0">
            <div className="row">
                <div className="row g-4 mb-5">
                    {stats.map((stat, i) => (
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
                <div className="col-2 mb-5">
                    <BaseCard>
                        <div className="col justify-content-center d-flex gap-4">
                            <p className="h6">Por Proyecto</p>
                            <p className="h6">Por Estudiante</p>
                        </div>
                    </BaseCard>
                </div>
                <div className="col-12">
                    <div className="border rounded-3 overflow-hidden">
                    
                    <table className="table mb-0 align-middle">
                        
                        <thead>
                        <tr>
                            <th className="py-3"><h3>Reporte General Por Proyecto</h3></th>
                        </tr>
                        <tr>
                            <th className="fw-medium px-3 py-3">PROYECTO</th>
                            <th className="fw-medium px-3 py-3">ESTUDIANTES</th>
                            <th className="fw-medium px-3 py-3">TAREAS</th>
                            <th className="fw-medium px-3 py-3">HORAS</th>
                            <th className="fw-medium px-3 py-3">AVANCE</th>
                        </tr>
                        </thead>
                        
                        <tbody>
                        <tr>
                            <td className="px-3 py-3">
                            <div className="fw-semibold">Sistema de inventarios</div>
                            </td>
                            <td className="text-body-secondary px-3">8</td>
                            <td className="text-body-secondary px-3">3</td>
                            <td>
                            <span className="badge rounded-pill bg-success bg-opacity-10 text-success px-3 py-2">
                                Activo
                            </span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    );
}