import { useEffect, useRef, useState } from "react"
import { addDays } from "../../../../utils/dateUtils";

export default function EditarPeriodoModal({ periodo, onConfirm, lowerLimit, upperLimit }) {
   const [periodData, setPeriodData] = useState({
      id: 0,
      name: '',
      startDate: '',
      endDate: ''
   })
   const [cargando, setCargando] = useState(false);
   const [minStartDate, setMinStartDate] = useState('');
   const [minEndDate, setMinEndDate] = useState('');

   const botonCerrarRef = useRef(null);

   useEffect(() => {
      if (periodo) {
         setPeriodData({
            id: periodo.id,
            name: periodo.name || '',
            startDate: periodo.startDate || '',
            endDate: periodo.endDate || ''
         })
      }
   }, [periodo])

   const handleChange = (e) => {
        setPeriodData({ ...periodData, [e.target.name]: e.target.value });
    };
   
   const handleSubmit = async (e) => {
      e.preventDefault();
      setCargando(true);

      try {

         await onConfirm(periodData);

         if (botonCerrarRef.current) botonCerrarRef.current.click();
         
      } catch (error) {
         console.error("Error", error);
         alert("Hubo un error al registrar el periodo");
      } finally {
         setCargando(false);
      }
   }

   return (
      <div className="modal fade" id="editarPeriodoModal" tabIndex="-1" aria-labelledby="editarPeriodoModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow" style={{ borderRadius: '12px' }}>
                    <div className="modal-header border-0 pb-0 pt-4 px-4 d-flex flex-column align-items-start">
                        <div className="d-flex justify-content-between w-100 mb-1">
                            <h5 className="modal-title fw-bold text-dark" id="nuevoPeriodoModalLabel">Editar Periodo</h5>
                            <button 
                                ref={botonCerrarRef} 
                                type="button" 
                                className="btn-close" 
                                data-bs-dismiss="modal" 
                                aria-label="Close"
                            ></button>
                        </div>
                        <p className="text-muted small mb-0">Complete los datos para editar el periodo en el sistema.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="modal-body px-4 py-4">
                            <div className="mb-3">
                                <label className="form-label small fw-medium text-dark">Nombre del periodo</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Nombre del periodo" 
                                    value={periodData.name}
                                    onChange={handleChange}
                                    name="name"
                                    required
                                />
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label small fw-medium text-dark">Fecha de inicio</label>
                                <input 
                                    type="date" 
                                    className="form-control" 
                                    placeholder="Fecha de inicio" 
                                    value={periodData.startDate}
                                    min={lowerLimit || addDays(periodData.endDate, -120)}
                                    onChange={handleChange}
                                    name="startDate"
                                    required
                                />
                            </div>

                            <div className="mb-2">
                                <label className="form-label small fw-medium text-dark">Fecha de fin</label>
                                <input 
                                    type="date" 
                                    className="form-control" 
                                    placeholder="Fecha de fin" 
                                    value={periodData.endDate}
                                    min={ addDays(periodData.startDate, 7) }
                                    max={upperLimit}
                                    onChange={handleChange}
                                    name="endDate"
                                    required
                                />
                            </div>
                        </div>

                        <div className="modal-footer border-0 px-4 pb-4 pt-0 gap-2">
                            <button type="button" className="btn btn-white border shadow-sm fw-medium px-4" data-bs-dismiss="modal">
                                Cancelar
                            </button>
                            <button type="submit" className="btn btn-primary fw-medium px-4 shadow-sm" disabled={cargando}>
                                {cargando ? 'Guardando...' : 'Actualizar Periodo'}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
      </div>
   )
}