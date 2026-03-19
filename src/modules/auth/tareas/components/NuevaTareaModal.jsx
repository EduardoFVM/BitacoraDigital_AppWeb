import React, { useRef, useState } from 'react';
import TaskController from '../tareas.controller';

export default function NuevaTareaModal({ onTareaCreada }) {

    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [idEstudianteAsignado, setIdEstudianteAsignado] = useState(0);
    const [cargando, setCargando] = useState(false);

    const botonCerrarRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);

        try {
            const nuevaTarea = {
                title: titulo,
                description: descripcion,
                assignedTo: idEstudianteAsignado
            };

            await TaskController.save(nuevaTarea);

            if (onTareaCreada) {
                onTareaCreada();
            }

            if (botonCerrarRef.current) {
                botonCerrarRef.current.click();
            }

            setTitulo('');
            setDescripcion('');
            setIdEstudianteAsignado(0);
            
        } catch (error) {
            console.error("Error", error);
            alert("Hubo un error al crear la tarea");
        } finally {
            setCargando(false);
        }
    }

    return (
        <div className="modal fade" id="nuevaTareaModal" tabIndex="-1" aria-labelledby="nuevaTareaModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow" style={{ borderRadius: '12px' }}>
                    
                    {/* Cabecera del Modal */}
                    <div className="modal-header border-0 pb-0 pt-4 px-4 d-flex flex-column align-items-start">
                        <div className="d-flex justify-content-between w-100 mb-1">
                            <h5 className="modal-title fw-bold text-dark" id="nuevoUsuarioModalLabel">Crear Nueva Tarea</h5>
                            <button 
                                ref={botonCerrarRef} 
                                type="button" 
                                className="btn-close" 
                                data-bs-dismiss="modal" 
                                aria-label="Close"
                            ></button>
                        </div>
                        <p className="text-muted small mb-0">Complete los datos para registrar una nueva tarea en el sistema.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="modal-body px-4 py-4">
                            <div className="mb-3">
                                <label className="form-label small fw-medium text-dark">Nombre Completo</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Título de la tarea" 
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                    required
                                />
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label small fw-medium text-dark">Descripción</label>
                                <textarea
                                    rows="5"
                                    style={{"resize": 'none'}}
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Descripción de la tarea" 
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                    required>

                                 </textarea>
                            </div>                            
                            
                            <div className="mb-2">
                                <label className="form-label small fw-medium text-dark">Estudiante Asignado</label>
                                <select 
                                    className="form-select text-secondary"
                                    value=""
                                >
                                    <option value="">Nombre del estudiante</option>
                                    <option value="1">Juan Pérez</option>
                                    <option value="2">María García</option>
                                    <option value="3">Carlos López</option>
                                </select>
                            </div>
                        </div>

                        <div className="modal-footer border-0 px-4 pb-4 pt-0 gap-2">
                            <button type="button" className="btn btn-white border shadow-sm fw-medium px-4" data-bs-dismiss="modal">
                                Cancelar
                            </button>
                            {/* Cambiamos el tipo a "submit" y lo deshabilitamos si está cargando */}
                            <button type="submit" className="btn btn-primary fw-medium px-4 shadow-sm" disabled={cargando}>
                                {cargando ? 'Guardando...' : 'Crear Tarea'}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}