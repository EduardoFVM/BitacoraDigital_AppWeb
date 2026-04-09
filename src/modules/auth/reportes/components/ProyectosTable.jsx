export default function ProyectosTable() {
    return (
        <div className="border rounded-3 overflow-hidden bg-white shadow-sm mb-5">
            <table className="table mb-0 align-middle">
                <thead>
                    <tr>
                        <th colSpan="5" className="py-3 px-4 border-bottom bg-light">
                            <h4 className="mb-0 fw-bold">Reporte General Por Proyecto</h4>
                        </th>
                    </tr>
                    <tr className="bg-light">
                        <th className="fw-medium px-4 py-3 text-muted">PROYECTO</th>
                        <th className="fw-medium px-3 py-3 text-muted">ESTUDIANTES</th>
                        <th className="fw-medium px-3 py-3 text-muted">TAREAS</th>
                        <th className="fw-medium px-3 py-3 text-muted">ESTADO</th>
                        <th className="fw-medium px-4 py-3 text-muted">AVANCE</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="px-4 py-3">
                            <p className="fw-semibold mb-0">Sistema de inventarios</p>
                        </td>
                        <td className="text-body-secondary px-3">8</td>
                        <td className="text-body-secondary px-3">3</td>
                        <td>
                            <span className="badge rounded-pill bg-success bg-opacity-10 text-success px-3 py-2">
                                Activo
                            </span>
                        </td>
                        <td className="px-4">
                            <div className="d-flex align-items-center gap-2">
                                <div className="progress flex-grow-1" style={{ height: '8px' }}>
                                    <div className="progress-bar bg-primary" style={{ width: `10%` }} />
                                </div>
                                <p className="mb-0 fw-medium text-secondary" style={{ width: '40px' }}>10%</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}