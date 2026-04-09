export default function EstudiantesTable() {
    const MOCK_ESTUDIANTES = [
        { nombre: "María García", proyecto: "Sistema de Inventarios", tareas: "5/6", horas: "120h", evidencias: "8", avance: 83 },
        { nombre: "Carlos Lopez", proyecto: "App Móvil Clínica", tareas: "4/8", horas: "90h", evidencias: "5", avance: 50 },
        { nombre: "Ana Martínez", proyecto: "Sistema de Inventarios", tareas: "3/5", horas: "70h", evidencias: "4", avance: 60 },
        { nombre: "Juan Perez", proyecto: "API REST Municipal", tareas: "2/7", horas: "55h", evidencias: "3", avance: 28 },
        { nombre: "Pedro Ramirez", proyecto: "Portal Web Escolar", tareas: "4/4", horas: "110h", evidencias: "7", avance: 100 }
    ];

    return (
        <div className="border rounded-3 overflow-hidden bg-white shadow-sm mb-5">
            <table className="table mb-0 align-middle">
                <thead>
                    <tr>
                        <th colSpan="6" className="py-3 px-4 border-bottom bg-light">
                            <h4 className="mb-0 fw-bold">Reporte Detallado por Estudiante</h4>
                        </th>
                    </tr>
                    <tr className="bg-light">
                        <th className="fw-medium px-4 py-3 text-muted">ESTUDIANTE</th>
                        <th className="fw-medium px-3 py-3 text-muted">PROYECTO</th>
                        <th className="fw-medium px-3 py-3 text-muted">TAREAS</th>
                        <th className="fw-medium px-3 py-3 text-muted">HORAS</th>
                        <th className="fw-medium px-3 py-3 text-muted">EVIDENCIAS</th>
                        <th className="fw-medium px-4 py-3 text-muted">AVANCE</th>
                    </tr>
                </thead>
                <tbody>
                    {MOCK_ESTUDIANTES.map((estudiante, i) => (
                        <tr key={i}>
                            <td className="px-4 py-3 fw-medium">{estudiante.nombre}</td>
                            <td className="text-secondary px-3">{estudiante.proyecto}</td>
                            <td className="text-secondary px-3">{estudiante.tareas}</td>
                            <td className="text-secondary px-3">{estudiante.horas}</td>
                            <td className="text-secondary px-3">{estudiante.evidencias}</td>
                            <td className="px-4">
                                <div className="d-flex align-items-center gap-2">
                                    <div className="progress flex-grow-1 bg-light" style={{ height: '8px' }}>
                                        <div className="progress-bar bg-primary" style={{ width: `${estudiante.avance}%` }} />
                                    </div>
                                    <p className="mb-0 fw-medium text-secondary" style={{ width: '40px' }}>{estudiante.avance}%</p>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}