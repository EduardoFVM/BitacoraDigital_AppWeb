export default function EstudiantesTable({ estudiantes = [] }) {
    return (
        <div className="border rounded-3 overflow-hidden bg-white shadow-sm mb-5">
            <table className="table mb-0 align-middle">
                <thead>
                    <tr>
                        <th colSpan="5" className="py-3 px-4 border-bottom bg-light">
                            <h4 className="mb-0 fw-bold">Reporte Detallado por Estudiante</h4>
                        </th>
                    </tr>
                    <tr className="bg-light">
                        <th className="fw-medium px-4 py-3 text-muted">ESTUDIANTE</th>
                        <th className="fw-medium px-3 py-3 text-muted">PROYECTO</th>
                        <th className="fw-medium px-3 py-3 text-muted">HORAS REGISTRADAS</th>
                        <th className="fw-medium px-3 py-3 text-muted">HORAS REQUERIDAS</th>
                        <th className="fw-medium px-4 py-3 text-muted">AVANCE</th>
                    </tr>
                </thead>
                <tbody>
                    {estudiantes.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center text-muted py-5">
                                Sin estudiantes registrados.
                            </td>
                        </tr>
                    ) : (
                        estudiantes.map((e, i) => (
                            <tr key={i}>
                                <td className="px-4 py-3 fw-medium">{e.studentName}</td>
                                <td className="text-secondary px-3">{e.projectName}</td>
                                <td className="text-secondary px-3">{e.loggedHours}h</td>
                                <td className="text-secondary px-3">{e.requiredHours}h</td>
                                <td className="px-4">
                                    <div className="d-flex align-items-center gap-2">
                                        <div className="progress flex-grow-1 bg-light" style={{ height: "8px" }}>
                                            <div
                                                className="progress-bar bg-primary"
                                                style={{ width: `${Math.min(e.hoursPercentage, 100)}%` }}
                                            />
                                        </div>
                                        <p className="mb-0 fw-medium text-secondary" style={{ width: "45px" }}>
                                            {e.hoursPercentage}%
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
