import { Search } from "lucide-react";
import NuevoProyectoModal from "./NuevoProyectoModal";

export default function ProyectosToolbar({onProyectoCreado}) {
    return (
        <div className="col-12 d-flex justify-content-between mb-4">
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
            <button className="btn btn-primary text-nowrap px-4 fw-medium shadow-sm" style={{ height: '50px' }}
                    data-bs-toggle="modal" 
                    data-bs-target="#nuevoProyectoModal"> 
                + Nuevo Proyecto
            </button>
            <NuevoProyectoModal onProyectoCreado={onProyectoCreado}/>
        </div>
    );
}