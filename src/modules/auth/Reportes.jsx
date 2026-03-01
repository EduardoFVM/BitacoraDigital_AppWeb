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
                                <p className="fw-semibold">Sistema de inventarios</p>
                                </td>
                                <td className="text-body-secondary px-3">8</td>
                                <td className="text-body-secondary px-3">3</td>
                                <td>
                                <span className="badge rounded-pill bg-success bg-opacity-10 text-success px-3 py-2">
                                    Activo
                                </span>
                                </td>
                                <td className="px-3">
                                    <div className="d-flex align-items-center">
                                        <div className="progress w-100 me-2" style={{ height: '13px' }}>
                                            <div 
                                                className="progress-bar" 
                                                style={{ width: `10%` }} 
                                            />
                                        </div>
                                        <p className="mb-0">10%</p>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row mt-5 d-flex justify-content-between">
                                    <div className="col-6 mb-5" style={{width: '990px'}}>
                                        <BaseCard>
                                            <div className="d-flex px-4 pt-5 row">   
                                                <div className="col-12 mb-2 d-flex justify-content-between">
                                                    <p className="h4 fw-bold">[Titulo]</p>
                                                    
                                                </div>
                                                <div className="col-12 mb-2">
                                                    <p className="h5">[Texto]</p>
                                                </div>
                                                <div className="mb-5">
                                                    <div>
                                                        <div className="progress" style={{ height: '13px' }}>
                                                            <div 
                                                            className="progress-bar" 
                                                            style={{ width: `10%` }} 
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 gap-3 mb-3 d-flex">
                                                    <div className="container text-center rounded-4 p-3" style={{backgroundColor: '#f9fafb'}}>
                                                        <p className="h2 fw-bold">18/24</p>
                                                        <p>Tareas</p>
                                                    </div>
                                                    <div className="container text-center rounded-4 p-3" style={{backgroundColor: '#f9fafb'}}>
                                                        <p>[Numero_Horas]</p>
                                                        <p>Horas totales</p>
                                                    </div>
                                                    <div className="container text-center rounded-4 p-3" style={{backgroundColor: '#f9fafb'}}>
                                                        <p>[Numero_Estudiantes]</p>
                                                        <p>Estudiantes</p>
                                                    </div>
                                                </div>
                                                <div className="col-12 text-end">
                                                    <p>[Estado]</p>
                                                </div>
                                            </div>
                                        </BaseCard>
                                    </div>
                                    
                                </div>
            </div>
        </div>
    );
}