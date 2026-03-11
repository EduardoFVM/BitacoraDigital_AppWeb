import { Funnel, Search } from "lucide-react";

export default function EvidenciasToolbar() {
    return (
        <div className="col-12 gap-3 justify-content-between d-flex mb-5 flex-wrap">
            {/* Buscador */}
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
            
            {/* Dropdown de Filtro */}
            <div className="dropdown">
                <button 
                    className="btn bg-white border shadow-sm d-flex align-items-center gap-2 px-4" 
                    type="button" 
                    data-bs-toggle="dropdown"
                    style={{ height: '50px' }} 
                >
                    <Funnel size={18} className="text-muted" />
                    <span className="text-dark fw-medium">Filtros</span>
                </button>
                <ul className="dropdown-menu shadow border-0 mt-2">
                    <li><a className="dropdown-item fw-bold" href="#">Todos los estados</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Aprobadas</a></li>
                    <li><a className="dropdown-item" href="#">Pendientes</a></li>
                    <li><a className="dropdown-item" href="#">Rechazadas</a></li>
                </ul>
            </div>
        </div>
    );
}