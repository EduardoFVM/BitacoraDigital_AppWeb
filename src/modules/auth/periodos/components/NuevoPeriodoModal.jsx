import { useRef, useState } from "react"
import { addDays } from "../../../../utils/dateUtils";

export default function NuevoPeriodoModal({ onPeriodoCreado, onConfirm, suggestedStart }) {
   const [periodName, setPeriodName] = useState('');
   const [startDate, setStartDate] = useState(suggestedStart);
   const [endDate, setEndDate] = useState('');
   const [cargando, setCargando] = useState(false);

   const botonCerrarRef = useRef(null);
   
   const handleSubmit = async (e) => {
      e.preventDefault();
      setCargando(true);

      try {
         const periodData = {
            name: periodName,
            startDate,
            endDate
         };

         await onConfirm(periodData);

         if (botonCerrarRef.current) {
               botonCerrarRef.current.click();
         }

         setPeriodName('');
         setStartDate('');
         setEndDate('');
         
      } catch (error) {
         console.error("Error", error);
         alert("Hubo un error al registrar el periodo");
      } finally {
         setCargando(false);
      }
   }
   return (
      <div className="modal fade" id="nuevoPeriodoModal" tabIndex="-1" aria-labelledby="nuevoPeriodoModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow" style={{ borderRadius: '12px' }}>
                    <div className="modal-header border-0 pb-0 pt-4 px-4 d-flex flex-column align-items-start">
                        <div className="d-flex justify-content-between w-100 mb-1">
                            <h5 className="modal-title fw-bold text-dark" id="nuevoPeriodoModalLabel">Registrar Nuevo Periodo</h5>
                            <button 
                                ref={botonCerrarRef} 
                                type="button" 
                                className="btn-close" 
                                data-bs-dismiss="modal" 
                                aria-label="Close"
                            ></button>
                        </div>
                        <p className="text-muted small mb-0">Complete los datos para registrar un nuevo periodo en el sistema.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="modal-body px-4 py-4">
                            <div className="mb-3">
                                <label className="form-label small fw-medium text-dark">Nombre del periodo</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Nombre del periodo" 
                                    value={periodName}
                                    onChange={(e) => setPeriodName(e.target.value)}
                                    required
                                />
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label small fw-medium text-dark">Fecha de inicio</label>
                                <input 
                                    type="date" 
                                    className="form-control" 
                                    placeholder="Fecha de inicio" 
                                    value={startDate}
                                    min={suggestedStart}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-2">
                                <label className="form-label small fw-medium text-dark">Fecha de fin</label>
                                <input 
                                    type="date" 
                                    className="form-control" 
                                    placeholder="Fecha de fin" 
                                    value={endDate}
                                    min={addDays(startDate, 7)}
                                    max={addDays(startDate, 120)}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="modal-footer border-0 px-4 pb-4 pt-0 gap-2">
                            <button type="button" className="btn btn-white border shadow-sm fw-medium px-4" data-bs-dismiss="modal">
                                Cancelar
                            </button>
                            <button type="submit" className="btn btn-primary fw-medium px-4 shadow-sm" disabled={cargando}>
                                {cargando ? 'Guardando...' : 'Registrar Periodo'}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
      </div>
   )
}