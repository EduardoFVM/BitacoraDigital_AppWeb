import BaseCard from "../../../../components/cards/BaseCard";


export default function ProyectoCard({ proyecto }) {
    if (!proyecto) return null;

    return (
        <BaseCard className="h-100">
            <div className="p-4 d-flex flex-column h-100">
                <h5 className="fw-bold text-dark mb-4">{proyecto.titulo}</h5>
                
                <div className="mb-4">
                    <p className="text-muted small mb-2">Tareas completadas</p>
                    <div className="progress rounded-pill bg-light" style={{ height: '8px' }}>
                        <div 
                            className="progress-bar bg-primary rounded-pill" 
                            style={{ width: `${proyecto.avance}%` }} 
                        />
                    </div>
                </div>
                
                <div className="flex-grow-1"></div>
                
                <div className="row g-0 text-center pt-2 mt-3">
                    <div className="col-4">
                        <h4 className="fw-bold mb-0 text-dark">{proyecto.numEstudiantes}</h4>
                        <p className="text-muted small mb-0" style={{fontSize: '0.75rem'}}>Estudiantes</p>
                    </div>
                    <div className="col-4">
                        <h4 className="fw-bold mb-0 text-dark">{proyecto.totalHoras}h</h4>
                        <p className="text-muted small mb-0" style={{fontSize: '0.75rem'}}>Horas</p>
                    </div>
                    <div className="col-4">
                        <h4 className="fw-bold mb-0 text-dark">{proyecto.avance}%</h4>
                        <p className="text-muted small mb-0" style={{fontSize: '0.75rem'}}>Avance</p>
                    </div>
                </div>
            </div>
        </BaseCard>
    );
}