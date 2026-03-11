export default function UsuariosTable({ usuarios }) {
    
    if (!usuarios || usuarios.length === 0) {
        return <div className="text-center p-5 border rounded-3 bg-light text-muted">No hay usuarios para mostrar.</div>;
    }

    return (
        <div className="border rounded-3 overflow-hidden shadow-sm">
            <table className="table mb-0 align-middle">
                <thead className="table-light text-secondary">
                    <tr>
                        <th className="fw-medium py-3 px-4">USUARIO</th>
                        <th className="fw-medium py-3">ROL</th>
                        <th className="fw-medium py-3">PROYECTO</th>
                        <th className="fw-medium py-3">ESTADO</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario, index) => (
                        <tr key={index}>
                            <td className="py-3 px-4">
                                <div className="fw-bold text-dark">{usuario.nombre}</div>
                                <div className="text-secondary small">{usuario.correo}</div>
                            </td>
                            <td className="text-body-secondary">{usuario.rol}</td>
                            <td className="text-body-secondary">{usuario.proyecto}</td>
                            <td>
                                <span className={`badge rounded-pill px-3 py-2 ${usuario.estado === 'Activo' ? 'bg-success bg-opacity-10 text-success' : 'bg-secondary bg-opacity-10 text-secondary'}`}>
                                    {usuario.estado}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}