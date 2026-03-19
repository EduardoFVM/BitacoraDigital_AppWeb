import { useEffect, useState } from "react";
import TaskController from "./tareas.controller";
import TareaList from "./components/TareaList";
import NuevaTareaModal from "./components/NuevaTareaModal";

export default function Tareas() {
   const [tareas, setTareas] = useState([]);
   const statuses = ["pending", "in_progress", "in_revision", "rejected", "completed"]

   const getAll = async () => {
      const {data} = await TaskController.getAllByProject(1);
      console.log(data);
      setTareas(data);
   }

   useEffect(() => {
      getAll();
   }, []);

   return (
      <div className="container-fluid p-4">
         <div className="row">
            <div className="col-12 text-end">
                  <button 
                     className="btn btn-primary text-nowrap px-4 fw-medium shadow-sm" style={{ height: '50px' }}
                     data-bs-toggle="modal" 
                     data-bs-target="#nuevaTareaModal"
                     > 
                     + Nueva Tarea
                  </button>
            </div>
            <NuevaTareaModal />

            <div className="row g-4 mt-2">
               {statuses.map(status => (
                  <TareaList key={status} status={status} tareas={tareas.filter(t => t.status === status)} />
               ))}
            </div>
         </div>
      </div>
   )
}