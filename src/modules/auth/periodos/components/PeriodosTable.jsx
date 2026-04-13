import { Edit } from "lucide-react";
import { useState } from "react";

export default function PeriodosTable({ periodos, onEdit }) {
   const usuarioLogueado = JSON.parse(sessionStorage.getItem("usuario") || "{}");
   const esAdmin = usuarioLogueado.rol === 'Administrador' || usuarioLogueado.rol === 'ADMIN';
   const [paginaActual, setPaginaActual] = useState(1);
   const registrosPorPagina = 10;

   if (!periodos || periodos.length === 0) {
        return <div className="text-center p-5 border rounded-3 bg-light text-muted">No hay periodos para mostrar.</div>;
    }

   const indiceUltimoRegistro = paginaActual * registrosPorPagina;
   const indicePrimerRegistro = indiceUltimoRegistro - registrosPorPagina;

   const periodosPaginados = periodos.slice(indicePrimerRegistro, indiceUltimoRegistro);
   
   const totalPaginas = Math.ceil(periodos.length / registrosPorPagina);

   const irPaginaAnterior = () => {
      if (paginaActual > 1) setPaginaActual(paginaActual - 1);
   };

   const irPaginaSiguiente = () => {
      if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
   };

   const formatearFecha = (isoString) => {
      const [year, month, day] = isoString.split("-");
      return `${day}/${month}/${year}`
   }

   return (
      <div className="">
         <div className="border rounded-3 overflow-hidden shadow-sm">
               <table className="table mb-0 align-middle">
                  <thead className="table-light text-secondary">
                     <tr>
                           <th className="fw-medium py-3 px-4">PERIODO</th>
                           <th className="fw-medium py-3">FECHA DE INICIO</th>
                           <th className="fw-medium py-3">FECHA DE FIN</th>
                           <th className="fw-medium py-3">ESTADO</th>
                           {esAdmin && <th className="fw-medium py-3 text-center">ACCIONES</th>}
                     </tr>
                  </thead>
                  <tbody>
                     {periodosPaginados.map((periodo) => {
                        const formattedStartDate = formatearFecha(periodo.startDate);
                        const formattedDueDate = formatearFecha(periodo.endDate);

                        return (
                           <tr key={periodo.id}>
                              <td className="py-3 px-4">
                                 <div className="fw-bold text-dark">{periodo.name}</div>
                              </td>
                              <td className="text-body-secondary">{formattedStartDate}</td>
                              <td className="text-body-secondary">{formattedDueDate}</td>
                              <td>
                                 <span className={`badge rounded-pill px-3 py-2 ${(periodo.status === 'Activo') ? 'bg-success bg-opacity-10 text-success' 
                                    : (periodo.status === 'Inactivo') ? 'bg-secondary bg-opacity-10 text-secondary' : 'bg-primary bg-opacity-10 text-primary'}`}>
                                       {periodo.status}
                                 </span>
                              </td>
                              {esAdmin && (
                                 <td className="text-center">
                                       <button 
                                          onClick={() => onEdit(periodo)} 
                                          className="btn btn-sm btn-light text-primary border-0 shadow-sm" 
                                          data-bs-toggle="modal" 
                                          data-bs-target="#editarPeriodoModal"
                                       >
                                          <Edit size={18} />
                                       </button>
                                       {/*<div className="d-flex justify-content-center gap-2">
                                          
                                       </div>*/}
                                 </td>
                              )}
                           </tr>
                        )}
                     )}
                  </tbody>
               </table>
         </div>

         <nav aria-label="Navegación de páginas" className="d-flex justify-content-between align-items-center mt-3 px-2">
               
               <span className="text-secondary small">
                  Mostrando {indicePrimerRegistro + 1} al {Math.min(indiceUltimoRegistro, periodos.length)} de {periodos.length} registros
               </span>

               <ul className="pagination pagination-sm mb-0">
                  
                  <li className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
                     <button className="page-link" onClick={irPaginaAnterior} aria-label="Previous">
                           <span aria-hidden="true">&laquo;</span>
                     </button>
                  </li>

                  {[...Array(totalPaginas)].map((_, index) => (
                     <li key={index} className={`page-item ${paginaActual === index + 1 ? 'active' : ''}`}>
                           <button className="page-link" onClick={() => setPaginaActual(index + 1)}>
                              {index + 1}
                           </button>
                     </li>
                  ))}

                  <li className={`page-item ${paginaActual === totalPaginas ? 'disabled' : ''}`}>
                     <button className="page-link" onClick={irPaginaSiguiente} aria-label="Next">
                           <span aria-hidden="true">&raquo;</span>
                     </button>
                  </li>
               </ul>
         </nav>
      </div>
   )
}