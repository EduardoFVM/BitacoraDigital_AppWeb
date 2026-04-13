import { useEffect, useState } from "react";
import PeriodosToolbar from "./components/PeriodosToolbar";
import PeriodosTable from "./components/PeriodosTable";
import PeriodController from "./period.controller";
import EditarPeriodoModal from "./components/EditarPeriodoModal";

export default function Periodos() {
   const [periodos, setPeriodos] = useState([]); 
   const [busqueda, setBusqueda] = useState('');
   const [loading, setLoading] = useState(false);
   const [loadingForm, setLoadingForm] = useState(false);
   const [suggestedStart, setSuggestedStart] = useState('');
   const [lowerLimit, setLowerLimit] = useState('');
   const [upperLimit, setUpperLimit] = useState('');
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
   const getNextStartDate = async () => {
      setLoadingForm(true)

      const {data} = await PeriodController.getMaxEndDate();
      if(data) {
         setSuggestedStart(data.suggestedStart);
      }

      setLoadingForm(false);   
   }

   useEffect(() => {
      cargarPeriodos();
      getNextStartDate();
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
      getNextStartDate();
   }

   const handleEditarPeriodo = async (periodo) => {
      const {data} = await PeriodController.getPeriodLimits(periodo);
      if(data) {
         setLowerLimit(data.lowerLimit);
         setUpperLimit(data.upperLimit);
      }
      
      setPeriodoSeleccionado(periodo);
   }

   const handleActualizarPeriodo = async (datosPeriodo) => {
      const {error, message} = await PeriodController.update(datosPeriodo);
      
      if(error) {
         alert("Error al registrar periodo: "+message);
         return;
      }
      
      cargarPeriodos();
      getNextStartDate();
   }

   return (
      <div className="container-fluid p-4">
         <div className="row">
            {!loadingForm && (
               <PeriodosToolbar 
                  onPeriodoCreado={cargarPeriodos}
                  busqueda={busqueda}
                  setBusqueda={setBusqueda}
                  onSave={handleGuardar}
                  filtroStatus={filtroStatus}
                  setFiltroStatus={setFiltroStatus}
                  suggestedStart={suggestedStart}
               />
            )}

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
               lowerLimit={lowerLimit}
               upperLimit={upperLimit}
         />
      </div>
   );
}