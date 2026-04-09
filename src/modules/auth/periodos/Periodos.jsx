import { useEffect, useState } from "react";
import PeriodosToolbar from "./components/PeriodosToolbar";
import PeriodosTable from "./components/PeriodosTable";
import PeriodController from "./period.controller";
import EditarPeriodoModal from "./components/EditarPeriodoModal";

export default function Periodos() {
   const [periodos, setPeriodos] = useState([]); 
   const [busqueda, setBusqueda] = useState('');
   const [loading, setLoading] = useState(false);
   const [filtroStatus, setFiltroStatus] = useState('Todos');
   const [periodoSeleccionado, setPeriodoSeleccionado] = useState(null);

   const cargarPeriodos = async () => {
      setLoading(true);
      
      const {data} = await PeriodController.getAll();
      if(data) {
         setPeriodos(data);
      }

      setLoading(false);
   }

   useEffect(() => {
      cargarPeriodos();
   }, [])

   const periodosFiltrados = periodos.filter((periodo) => {
      const limpiarTexto = (texto) => {
         return texto.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      };

      const nombreLimpio = limpiarTexto(periodo.name || "");
      const busquedaLimpia = limpiarTexto(busqueda);
      
      const coincideBusqueda = busquedaLimpia === "" ||
                              nombreLimpio.includes(busquedaLimpia);

      const coincideStatus = filtroStatus === "Todos" || periodo.status === filtroStatus;

      return coincideBusqueda && coincideStatus;
   });
   
   const handleGuardar = async (datosPeriodo) => {
      await PeriodController.save(datosPeriodo);
      cargarPeriodos();
   }

   const handleEditarPeriodo = (periodo) => {
      setPeriodoSeleccionado(periodo);
   }

   const handleActualizarPeriodo = async (datosPeriodo) => {
      await PeriodController.update(datosPeriodo);
      cargarPeriodos();
   }

   return (
      <div className="container-fluid p-4">
         <div className="row">
               <PeriodosToolbar 
                  onPeriodoCreado={cargarPeriodos}
                  busqueda={busqueda}
                  setBusqueda={setBusqueda}
                  onSave={handleGuardar}
                  filtroStatus={filtroStatus}
                  setFiltroStatus={setFiltroStatus}
               />

               <div className="col-12 mt-3">
                  {loading ? (
                     <div className="text-center p-5 text-muted">
                           <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                           Cargando periodos...
                     </div>
                  ) : (
                     <PeriodosTable 
                           periodos={periodosFiltrados} 
                           onEdit={handleEditarPeriodo} 
                     />
                  )}
               </div>
         </div>

         <EditarPeriodoModal
               periodo={periodoSeleccionado} 
               onConfirm={handleActualizarPeriodo} 
         />
      </div>
   );
}