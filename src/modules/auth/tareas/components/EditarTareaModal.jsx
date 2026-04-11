import React, { useEffect, useRef, useState } from 'react';
import TaskController from '../tareas.controller';
import UserController from '../../gestion_usuarios/user.controller';
import { useLocation } from 'react-router-dom';

export default function EditarTareaModal({ selectedTask, onUpdate, formData }) {
    const location = useLocation();
    const [estudiantes, setEstudiantes] = useState([]);

    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [dueDate, setDueDate] = useState(new Date());
    const [estudianteAsignado, setEstudianteAsignado] = useState({});
    const [cargando, setCargando] = useState(false);

    const botonCerrarRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);

        try {
            const nuevaTarea = {
				id: selectedTask.id,
                title: titulo,
                description: descripcion,
                dueDate: dueDate,
                studentId: estudianteAsignado.id
            };

            await onUpdate(nuevaTarea);

            if (botonCerrarRef.current) botonCerrarRef.current.click();

            setTitulo('');
            setDescripcion('');
            setEstudianteAsignado(null);
            
        } catch (error) {
            console.error("Error", error);
            alert("Hubo un error al editar la tarea");
        } finally {
            setCargando(false);
        }
    }

    const getFormData = async () => {
        if(location.state.projectId) {
            setEstudiantes(await UserController.findStudentsByProject(location.state.projectId));
        }
    }
    useEffect(() => {
		if(selectedTask) {
			setTitulo(selectedTask.title);
			setDescripcion(selectedTask.description);
			setDueDate(selectedTask.dueDate);
			setEstudianteAsignado(selectedTask.student)
		}
        getFormData();
    }, [selectedTask])

    return (
        <div className="modal fade" id="editarTareaModal" tabIndex="-1" aria-labelledby="editarTareaModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow" style={{ borderRadius: '12px' }}>
                    
                    {/* Cabecera del Modal */}
                    <div className="modal-header border-0 pb-0 pt-4 px-4 d-flex flex-column align-items-start">
                        <div className="d-flex justify-content-between w-100 mb-1">
                            <h5 className="modal-title fw-bold text-dark" id="editarTareaModalLabel">Editar Tarea</h5>
                            <button 
                                ref={botonCerrarRef} 
                                type="button" 
                                className="btn-close" 
                                data-bs-dismiss="modal" 
                                aria-label="Close"
                            ></button>
                        </div>
                        <p className="text-muted small mb-0">Complete los datos para editar la tarea en el sistema.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="modal-body px-4 py-4">
                            <div className="mb-3">
                                <label className="form-label small fw-medium text-dark">Título</label>
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
                                <label className="form-label small fw-medium text-dark">Fecha de entrega</label>
                                <input className="form-control" type="datetime-local" required value={dueDate} 
                                    onChange={(e) => {setDueDate(e.target.value)}}/>
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
                                    value={estudianteAsignado.id}
                                    onChange={(e) => setEstudianteAsignado(e.target.value)}
                                >
                                    <option value="">Nombre del estudiante</option>
                                    {estudiantes.map((estudiante) => (
                                        <option value={estudiante.id}>{estudiante.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="modal-footer border-0 px-4 pb-4 pt-0 gap-2">
                            <button type="button" className="btn btn-white border shadow-sm fw-medium px-4" data-bs-dismiss="modal">
                                Cancelar
                            </button>
                            {/* Cambiamos el tipo a "submit" y lo deshabilitamos si está cargando */}
                            <button type="submit" className="btn btn-primary fw-medium px-4 shadow-sm" disabled={cargando}>
                                {cargando ? 'Guardando...' : 'Editar Tarea'}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}