import { useState } from "react";
import EstadisticasCard from "../panel_principal/components/EstadisticasCard"; 
import EvidenciasToolbar from "./components/EvidenciasToolbar";
import EvidenciaItemCard from "./components/EvidenciaItemCard";

const MOCK_STATS = [
    { title: "Pendientes", value: "12", iconId: "clock", color: "bg-warning text-dark" },
    { title: "Aprobadas", value: "12", iconId: "circle-check", color: "bg-success" },
    { title: "Rechazadas", value: "12", iconId: "circle-x", color: "bg-danger" }
];

const MOCK_EVIDENCIAS = [
    {
        titulo: "Diagrama de Base de Datos",
        estado: "Aprobada",
        proyecto: "Sistema de Inventarios",
        descripcion: "Se adjunta el modelo Entidad-Relación actualizado según los requerimientos del cliente.",
        usuario: "María García",
        fecha: "04/02/2026",
        hora: "10:30 AM"
    },
    {
        titulo: "Bocetos UI/UX",
        estado: "Pendiente",
        proyecto: "App Móvil Clínica",
        descripcion: "Pantallas iniciales del flujo de inicio de sesión y registro de pacientes.",
        usuario: "Diego Flores",
        fecha: "03/02/2026",
        hora: "16:45 PM"
    },
    {
        titulo: "Código de Autenticación",
        estado: "Rechazada",
        proyecto: "Portal Web Escolar",
        descripcion: "Falta implementar el cifrado de contraseñas y validación de tokens.",
        usuario: "Pedro Ramirez",
        fecha: "01/02/2026",
        hora: "09:15 AM"
    }
];

export default function Evidencias() {
    const [stats, setStats] = useState(MOCK_STATS);
    const [evidencias, setEvidencias] = useState(MOCK_EVIDENCIAS);

    return (
        <div className="container-fluid p-4">
            <div className="row g-4 mb-5">
                {stats.map((stat, i) => (
                    <EstadisticasCard key={i} item={stat} />
                ))}
            </div>

            <div className="row mb-4">
                <EvidenciasToolbar />
            </div>

            <div className="row">
                <div className="col-12">
                    {evidencias.map((evidencia, index) => (
                        <EvidenciaItemCard key={index} item={evidencia} />
                    ))}
                </div>
            </div>
        </div>
    );
}