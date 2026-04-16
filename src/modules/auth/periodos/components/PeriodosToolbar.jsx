import { Funnel, Search } from "lucide-react";
import { useState } from "react";
import NuevoPeriodoModal from "./NuevoPeriodoModal";

export default function PeriodosToolbar({ onPeriodoCreado, onSave, busqueda, setBusqueda, filtroStatus, setFiltroStatus, suggestedStart }) {
   const usuarioLogueado = JSON.parse(localStorage.getItem("usuario") || "{}");
   const esAdmin = usuarioLogueado.rol === "Administrador" || usuarioLogueado.rol === "ADMIN";

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
                  placeholder="Buscar por nombre..." 
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
               />
         </div>
         
         {/* Filtro */}
         <div className="d-flex gap-3">
               <div className="dropdown">
                  <button 
                     className="btn bg-white border shadow-sm d-flex align-items-center gap-2 px-4" 
                     type="button" 
                     data-bs-toggle="dropdown"
                     style={{ height: '50px' }} 
                  >
                     <Funnel size={18} className="text-muted" />
                     <span className="text-dark fw-medium">
                           {filtroStatus === 'Todos' ? 'Filtros' : filtroStatus}
                     </span>
                  </button>

                  <ul className="dropdown-menu shadow border-0 mt-2">
                     <li>
                           <button className={`dropdown-item ${filtroStatus === 'Todos' ? 'fw-bold' : ''}`} onClick={() => setFiltroStatus('Todos')}>
                              Todos los estados
                           </button>
                     </li>
                     <li><hr className="dropdown-divider" /></li>
                     <li>
                           <button className={`dropdown-item ${filtroStatus === 'Activo' ? 'fw-bold' : ''}`} onClick={() => setFiltroStatus('Activo')}>
                              Activo
                           </button>
                     </li>
                     <li>
                           <button className={`dropdown-item ${filtroStatus === 'Futuro' ? 'fw-bold' : ''}`} onClick={() => setFiltroStatus('Futuro')}>
                              Futuro
                           </button>
                     </li>
                     <li>
                           <button className={`dropdown-item ${filtroStatus === 'Inactivo' ? 'fw-bold' : ''}`} onClick={() => setFiltroStatus('Inactivo')}>
                              Inactivo
                           </button>
                     </li>
                  </ul>
               </div>

               {/* Botón Nuevo */}
               {esAdmin && (
                  <button 
                  className="btn btn-primary text-nowrap px-4 fw-medium shadow-sm" 
                  style={{ height: '50px' }}
                  data-bs-toggle="modal" 
                  data-bs-target="#nuevoPeriodoModal"
               >
                  + Nuevo Periodo 
               </button>
               )}
         </div>
         <NuevoPeriodoModal onPeriodoCreado={onPeriodoCreado} onConfirm={onSave} suggestedStart={suggestedStart} />
      </div>
   )
}