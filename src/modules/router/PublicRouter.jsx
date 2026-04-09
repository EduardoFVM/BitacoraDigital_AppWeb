import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../public/Login";
import FirstLogin from "../public/FirstLogin";
import Error404 from "../error/Error404";
import Error401 from "../error/Error401";

export default function PublicRouter({setSession}){
    return(<>
        <Routes>
            <Route path="/" element={ <Navigate to="/login" />} />
            <Route path="/login" element={<Login setSession={setSession} />} />
            <Route path="/first-login" element={<FirstLogin setSession={setSession} /> } />
            

            {/* FALLBACKS */}
            <Route path="*" element={<Error404/>} />
            <Route path="/auth/*" element={ <Error401/> } />
        </Routes>
    </>)
}