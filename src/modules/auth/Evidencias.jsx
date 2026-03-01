import { CircleCheckBig, CircleX, Clock, Eye, FileText, Funnel, Search } from "lucide-react";
import BaseCard from "../../components/cards/BaseCard";

export default function Evidencias(){
const stats = [
    {icon: Clock, title: "Pendientes", value: "12", color: "bg-warning"},
    {icon: CircleCheckBig, title: "Aprobadas", value: "12", color: "bg-success"},
    {icon: CircleX, title: "Rechazadas", value: "12", color: "bg-danger"}
];
    
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
            <div className="col-12 gap-5 justify-content-between d-flex mb-5">
                <div className="input-group flex-grow-1 shadow-sm" style={{ maxWidth: '1000px', height: '50px' }}>
                    <span className="input-group-text bg-white border-end-0 text-muted px-3">
                        <Search size={18} />
                    </span>
                    <input 
                        type="search" 
                        className="form-control border-start-0 ps-0" 
                        placeholder="Buscar por nombre o correo..." 
                    />
                </div>
                {/* 2. DROPDOWN DE FILTRO (Armonizado) */}
                <div className="dropdown">
                    {/* Le damos fondo blanco, borde, sombra y altura de 50px para que iguale al buscador */}
                    <button 
                        className="btn bg-white border shadow-sm d-flex align-items-center gap-2 px-4" 
                        type="button" 
                        data-bs-toggle="dropdown"
                        style={{ height: '50px' }} 
                    >
                        <Funnel size={18} className="text-muted" />
                        <span className="text-dark fw-medium">Filtros</span>
                    </button>
                    
                    {/* Menú desplegable */}
                    <ul className="dropdown-menu shadow border-0 mt-2">
                        <li><a className="dropdown-item fw-bold" href="#">Todos los roles</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#">Administrador</a></li>
                        <li><a className="dropdown-item" href="#">Estudiante</a></li>
                    </ul>
                </div>
            </div>
            <div className="row d-flow">
                <div className="col-12 mb-4">
                    <BaseCard>
                        <div className="row p-3 justify-content-center">
                            <div className="col-1 bg-primary text-white p-3 rounded-3 shadow-sm" style={{width: '70px', height: '70px'}}>
                                <FileText size={40} />
                            </div>
                            <div className="col-11">
                                <div className="col d-flex justify-content-between">
                                    <p className="h4 fw-bold">[Title]</p>
                                    <button className="btn btn-outline-secondary rounded-4"><Eye />&nbsp; Ver</button>
                                </div>
                                <p className="text-success rounded-2 px-1 py-1 h5" style={{backgroundColor: '#c7f7e0', width: '82px'}}>[Estado]</p>
                                <p>[Proyecto]</p>
                                <p className="text-black rounded-2 px-1 py-1 " style={{backgroundColor: '#c1cad33f'}}>[Descripción]</p>
                                <div className="col d-flex gap-3">
                                    <p>[Usuario]</p>
                                    <p>[Fecha]</p>
                                    <p>[Hora]</p>
                                </div>
                            </div>
                        </div>
                    </BaseCard>
                </div>
            </div>
        </div>
    );
}