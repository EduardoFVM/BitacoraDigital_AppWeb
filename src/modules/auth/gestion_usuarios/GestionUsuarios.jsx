import { useState } from "react";
import UsuariosToolbar from "./components/UsuariosToolbar";
import UsuariosTable from "./components/UsuariosTable";

const MOCK_USUARIOS = [
    { nombre: "María García", correo: "maria.garcia@mail.mx", rol: "Desarrollador (frontend)", proyecto: "Sistema de Inventarios", estado: "Activo" },
    { nombre: "Carlos López", correo: "carlos.lopez@mail.mx", rol: "Administrador", proyecto: "N/A", estado: "Activo" },
    { nombre: "Ana Martínez", correo: "ana.m@mail.mx", rol: "Diseñador UX/UI", proyecto: "App Móvil Clínica", estado: "Inactivo" },
];

export default function GestionUsuarios() {
    const [usuarios, setUsuarios] = useState(MOCK_USUARIOS);

    return (
        <div className="container-fluid p-4">
            <div className="row">
                <UsuariosToolbar />

                <div className="col-12">
                    <UsuariosTable usuarios={usuarios} />
                </div>
            </div>
        </div>
    );
}