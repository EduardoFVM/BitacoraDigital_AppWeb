export default function ProyectosTable({ proyectos = [] }) {
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
                        <th className="fw-medium px-3 py-3 text-muted">HORAS</th>
                        <th className="fw-medium px-4 py-3 text-muted">AVANCE</th>
                    </tr>
                </thead>
                <tbody>
                    {proyectos.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center text-muted py-5">
                                Sin proyectos registrados.
                            </td>
                        </tr>
                    ) : (
                        proyectos.map((p) => {
                            const avance = p.totalTasks > 0
                                ? Math.round((p.completedTasks / p.totalTasks) * 100)
                                : 0;
                            return (
                                <tr key={p.id}>
                                    <td className="px-4 py-3">
                                        <p className="fw-semibold mb-0">{p.name}</p>
                                        <p className="text-muted small mb-0">{p.periodName}</p>
                                    </td>
                                    <td className="text-body-secondary px-3">{p.studentCount}</td>
                                    <td className="text-body-secondary px-3">{p.completedTasks}/{p.totalTasks}</td>
                                    <td className="text-body-secondary px-3">{p.workedHours}h</td>
                                    <td className="px-4">
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="progress flex-grow-1" style={{ height: "8px" }}>
                                                <div
                                                    className="progress-bar bg-primary"
                                                    style={{ width: `${avance}%` }}
                                                />
                                            </div>
                                            <p className="mb-0 fw-medium text-secondary" style={{ width: "40px" }}>{avance}%</p>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
}
