import { Funnel, Search } from "lucide-react";
import BaseCard from "../../components/cards/BaseCard";

export default function GestionUsuarios(){
    return(
        <div className="container-fluid p-0">
            <div className="row">
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
                    <button className="btn btn-primary text-nowrap"> 
                        + Nuevo Usuario 
                    </button>
                </div>

                {/* Tabla */}
                <div className="col">
                    <div className="border rounded-3 overflow-hidden">
                    
                    <table className="table mb-0 align-middle">
                        
                        <thead className="table-light text-secondary">
                        <tr>
                            <th className="fw-medium py-3">USUARIO</th>
                            <th className="fw-medium py-3">ROL</th>
                            <th className="fw-medium py-3">PROYECTO</th>
                            <th className="fw-medium py-3">ESTADO</th>
                        </tr>
                        </thead>
                        
                        <tbody>
                        <tr>
                            <td className="py-3">
                            <div className="fw-semibold">María García</div>
                            <div className="text-secondary small">maria.garcia@mail.mx</div>
                            </td>
                            <td className="text-body-secondary">Desarrollador (frontend)</td>
                            <td className="text-body-secondary">Sistema de Inventarios</td>
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