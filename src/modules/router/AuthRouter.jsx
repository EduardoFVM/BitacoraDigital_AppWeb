import { Navigate, Route, Routes } from "react-router-dom";
import PanelPrincipal from "../auth/PanelPrincipal";
import GestionUsuarios from "../auth/GestionUsuarios";
import Proyectos from "../auth/Proyectos";
import Evidencias from "../auth/Evidencias";
import Reportes from "../auth/Reportes";
import Error404 from "../error/Error404";
import MainLayout from "../../layouts/MainLayout";


export default function AuthRouter(){
    return(<>
        <Routes>
            <Route PATH="/auth" element={<MainLayout />}>
                <Route index element={<Navigate to="home" replace />} />

                {/* RUTAS HIJAS (Nota que ya no llevan /auth al principio) */}
                <Route path="home" element={<PanelPrincipal />} />
                <Route path="users" element={<GestionUsuarios />} />
                <Route path="projects" element={<Proyectos />} />
                <Route path="evidence" element={<Evidencias />} />
                <Route path="reports" element={<Reportes />} />
            </Route>
            
            {/* FALLBACKS */}
            <Route path="*" element={ <Error404 />} />
        </Routes>
    </>)
}