import { useEffect, useRef, useState } from 'react';
import ProjectController from '../proyectos.controller';

export default function NuevoProyectoModal({onProyectoCreado, formData}) {

    const [periods, setPeriods] = useState(formData.periods || []);
    const [students, setStudents] = useState(formData.students || []);
    const [advisors, setAdvisors] = useState(formData.advisors || []);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [neededHours, setNeededHours] = useState(200);
    const [period, setPeriod] = useState(0);
    const [advisor, setAdvisor] = useState(0);
    const [assignedStudents, setAssignedStudents] = useState([]);
    const [cargando, setCargando] = useState(false);

    const botonCerrarRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);

        try {
            const studentIds = assignedStudents.map(student => student.id);
            
            const projectData = {
                projectName: name,
                description,
                idPeriod: period,
                idAdviser: advisor,
                studentIds,
                neededHours
            }
            const response = await ProjectController.save(projectData);

            if(!response.success) {
                alert("Error al crear el proyecto: "+response.message);
                return;
            }

            if (onProyectoCreado) {
                onProyectoCreado();
            }

            if (botonCerrarRef.current) {
                botonCerrarRef.current.click();
            }

            setName('');
            setDescription('');
            setPeriod({});
            setAdvisor({});
            setAssignedStudents([]);
            
        } catch (error) {
            console.error("Error", error);
            alert("Hubo un error al crear el proyecto");
        } finally {
            setCargando(false);
        }
    }

    useEffect(() => {
        //getFormData();
    }, [])

    return (
        <div className="modal fade" id="nuevoProyectoModal" tabIndex="-1" aria-labelledby="nuevoProyectoModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow" style={{ borderRadius: '12px' }}>
                    <div className="modal-header border-0 pb-0 pt-4 px-4 d-flex flex-column align-items-start">
                        <div className="d-flex justify-content-between w-100 mb-1">
                            <h5 className="modal-title fw-bold text-dark" id="nuevoProyectoModalLabel">Crear Nuevo Proyecto</h5>
                            <button 
                                ref={botonCerrarRef} 
                                type="button" 
                                className="btn-close" 
                                data-bs-dismiss="modal" 
                                aria-label="Close"
                            ></button>
                        </div>
                        <p className="text-muted small mb-0">Complete los datos para registrar un nuevo proyecto en el sistema.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="modal-body px-4 py-4">
                            <div className="mb-3">
                                <label className="form-label small fw-medium text-dark">Nombre del Proyecto</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Nombre del proyecto" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label small fw-medium text-dark">Descripción</label>
                                <textarea 
                                    className="form-control" 
                                    placeholder="Descripción del proyecto" 
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label small fw-medium text-dark">Horas necesarias por Estudiante</label>
                                <input 
                                    min={200}
                                    step={5}
                                    max={600}
                                    type="number" 
                                    className="form-control" 
                                    placeholder="Horas necesarias para acreditación" 
                                    value={neededHours}
                                    onChange={(e) => setNeededHours(e.target.value)}
                                    required
                                />
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label small fw-medium text-dark">Periodo</label>
                                <select 
                                    className="form-select text-secondary"
                                    value={period}
                                    onChange={(e) => setPeriod(e.target.value)}
                                >
                                    <option value="">Seleccione un periodo</option>
                                    {periods.map(period => (
                                        <option key={period.id} value={period.id}>{period.periodAlias}</option>
                                    ))}
                                </select>
                            </div>

                           <div className="row mb-2 d-flex flex-wrap">
                                {assignedStudents.map((student) => (
                                    <div key={student.id} className="col-auto">
                                        {student.name}
                                        <div className="btn btn-close btn-outline-danger" onClick={() => {
                                            setAssignedStudents(assignedStudents.filter(s => s.id !== student.id))
                                            setStudents([...students, student])
                                        }}></div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="dropdown mb-3">
                                <button type="button" className="btn btn-link btn-sm p-0 text-decoration-none" 
                                    data-bs-toggle="dropdown" aria-expanded="false"
                                    id="dropdownMenuButton"
                                    >
                                       + Agregar estudiante
                                </button>
                                <ul className="dropdown-menu dropend shadow-sm border-0 rounded-3 p-3" aria-labelledby="dropdownMenuButton">
                                    {students.length === 0 ? (
                                        <li className="dropdown-item text-muted disabled">No hay estudiantes disponibles</li>
                                    ) : (
                                        students.map(student => (
                                            <li className="dropdown-item" key={student.id} onClick={() => {
                                                    setAssignedStudents([...assignedStudents, student])
                                                    setStudents(students.filter(s => s.id !== student.id))
                                                }}>
                                                {student.name}
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>
                            
                            <div className="mb-2">
                                <label className="form-label small fw-medium text-dark">Asignación de asesor</label>
                                <select 
                                    className="form-select text-secondary"
                                    value={advisor}
                                    onChange={(e) => setAdvisor(e.target.value)}
                                >
                                    <option value="">Seleccione un asesor</option>
                                    {advisors.map(advisor => (
                                        <option key={advisor.id} value={advisor.id}>{advisor.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="modal-footer border-0 px-4 pb-4 pt-0 gap-2">
                            <button type="button" className="btn btn-white border shadow-sm fw-medium px-4" data-bs-dismiss="modal">
                                Cancelar
                            </button>
                            <button type="submit" className="btn btn-primary fw-medium px-4 shadow-sm" disabled={cargando}>
                                {cargando ? 'Guardando...' : 'Crear Proyecto'}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}