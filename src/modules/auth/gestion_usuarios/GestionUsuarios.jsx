import { use, useEffect, useState } from "react";
import UsuariosToolbar from "./components/UsuariosToolbar";
import UsuariosTable from "./components/UsuariosTable";
import UserController from "./user.controller";

export default function GestionUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);

    const cargarUsuarios = async () => {
        setCargando(true);
        const datosBackend = await UserController.findAll();

        if (datosBackend) {
            const UsuariosMapeados = datosBackend.map(user => ({
                nombre: `${user.nameUser || ''} ${user.lastName || ''}`.trim(),
                correo: user.email || 'Sin Correo',
                rol: user.rol || 'Sin rol asignado',
                proyecto: "No asignado",
                estado: user.userStatus === false ? "Inactivo" : "Activo"
            }));

            setUsuarios(UsuariosMapeados);
        }
        setCargando(false);
    }

    useEffect(() => {
        cargarUsuarios();
    }, []);

    return (
        <div className="container-fluid p-4">
            <div className="row">
                <UsuariosToolbar onUsuarioCreado={cargarUsuarios}/>

                <div className="col-12">
                    {cargando ? (
                        <div className="text-center p-5 text-muted">
                            <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                            Cargando usuarios...
                        </div>
                    ) : (
                        <UsuariosTable usuarios={usuarios} />
                    )}
                </div>
            </div>
        </div>
    );
}