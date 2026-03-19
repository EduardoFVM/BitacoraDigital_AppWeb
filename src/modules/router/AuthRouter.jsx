import { Navigate, Route, Routes } from "react-router-dom";
import PanelPrincipal from "../auth/panel_principal/PanelPrincipal";
import GestionUsuarios from "../auth/gestion_usuarios/GestionUsuarios";
import Proyectos from "../auth/proyectos/Proyectos";
import Evidencias from "../auth/evidencias/Evidencias";
import Reportes from "../auth/reportes/Reportes";
import Error404 from "../error/Error404";
import MainLayout from "../../layouts/MainLayout";
import Tareas from "../auth/tareas/Tareas";


export default function AuthRouter({setSession}){
    return(<>
        <Routes>
            <Route path="/" element={<MainLayout setSession={setSession}/>}>
                <Route index element={<Navigate to="home" replace />} />

                <Route path="home" element={<PanelPrincipal />} />
                <Route path="users" element={<GestionUsuarios />} />
                <Route path="projects" element={<Proyectos />} />
                <Route path="tasks" element={<Tareas />} />
                <Route path="evidence" element={<Evidencias />} />
                <Route path="reports" element={<Reportes />} />
            </Route>
            
            {/* FALLBACKS */}
            <Route path="*" element={ <Error404 />} />
        </Routes>
    </>)
}