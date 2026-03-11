import BaseCard from "../../../../components/cards/BaseCard";


export default function ProyectoCard({ proyecto }) {

    const title = proyecto?.title || "[Titulo]";
    const description = proyecto?.description || "[Texto descripitivo del proyecto]";
    const asesor = proyecto?.asesor || "Dr. Roberto Hernández";
    const date = proyecto?.date || "[Fecha]";
    const progress = proyecto?.progress || 10;
    const taskCount = proyecto?.taskCount || "0/0";
    const hours = proyecto?.hours || 0;
    const students = proyecto?.students || 0;
    const status = proyecto?.status || "[Estado]";

    const isHighProgress = progress >= 80;
    const badgeColorClass = isHighProgress ? "text-success" : "text-primary";
    const badgeBgColor = isHighProgress ? "#c7f7e0" : "#c1e6f7";

    return (
        <BaseCard className="mb-4 h-100">
            <div className="d-flex flex-column px-4 py-4 h-100">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <p className="h4 fw-bold mb-0 text-truncate" style={{ maxWidth: '85%' }}>{title}</p>
                    
                    <div className="dropdown">
                        <button 
                            className="btn btn-sm btn-link text-muted p-0 border-0" 
                            type="button" 
                            id={`dropdownMenuButton-${proyecto?.id || Math.random()}`} 
                            data-bs-toggle="dropdown" 
                            aria-expanded="false"
                            style={{ fontSize: '1.5rem', lineHeight: '1', textDecoration: 'none' }}
                        >
                            ...
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0 rounded-3 py-2" aria-labelledby={`dropdownMenuButton-${proyecto?.id || Math.random()}`}>
                            <li>
                                <a className="dropdown-item d-flex align-items-center gap-3 py-2" href="#">
                                    <i className="bi bi-box-arrow-up-right"></i>
                                    <span>Ver tablero</span>
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item d-flex align-items-center gap-3 py-2" href="#">
                                    <i className="bi bi-pencil"></i>
                                    <span>Editar</span>
                                </a>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <a className="dropdown-item d-flex align-items-center gap-3 py-2 text-danger" href="#">
                                    <i className="bi bi-trash text-danger"></i>
                                    <span className="text-danger">Eliminar</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>
                
                <div className="mb-3">
                    <p className="h6 text-secondary mb-0" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {description}
                    </p>
                </div>
                
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <p className="h6 fw-bold mb-0">{asesor}</p>
                    <p className="text-secondary small mb-0">{date}</p>
                </div>
                
                <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <p className="h6 fw-medium mb-0 text-secondary">Progreso General</p>
                        <span 
                            className={`badge rounded-pill ${badgeColorClass} px-3 py-1`} 
                            style={{ backgroundColor: badgeBgColor }}
                        >
                            {progress}%
                        </span>
                    </div>
                    <div className="progress" style={{ height: '8px' }}>
                        <div 
                            className="progress-bar" 
                            role="progressbar"
                            style={{ width: `${progress}%` }} 
                            aria-valuenow={progress} 
                            aria-valuemin="0" 
                            aria-valuemax="100"
                        />
                    </div>
                </div>
                
                <div className="row g-3 mb-4 mt-auto">
                    <div className="col-4">
                        <div className="text-center rounded-3 p-2 bg-light border h-100">
                            <p className="h4 fw-bold mb-0">{taskCount}</p>
                            <p className="small text-secondary mb-0">Tareas</p>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="text-center rounded-3 p-2 bg-light border h-100">
                            <p className="h4 fw-bold mb-0">{hours}</p>
                            <p className="small text-secondary mb-0">Horas totales</p>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="text-center rounded-3 p-2 bg-light border h-100">
                            <p className="h4 fw-bold mb-0">{students}</p>
                            <p className="small text-secondary mb-0">Estudiantes</p>
                        </div>
                    </div>
                </div>
                
                <div className="text-end mt-auto pt-3 border-top">
                    <span className="fw-medium text-secondary">{status}</span>
                </div>
            </div>
        </BaseCard>
    );
}