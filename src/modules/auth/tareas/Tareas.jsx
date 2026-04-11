import { useEffect, useState } from "react";
import TaskController from "./tareas.controller";
import TareaList from "./components/TareaList";
import NuevaTareaModal from "./components/NuevaTareaModal";
import { useLocation, useNavigate } from "react-router-dom";
import EditarTareaModal from "./components/EditarTareaModal";
import UserController from "../gestion_usuarios/user.controller";

export default function Tareas() {
   const navigate = useNavigate();
   const location = useLocation();
   const {projectId} = location.state || {};

   const [selectedTask, setSelectedTask] = useState(null);
   const [formData, setFormData] = useState(null);
   const [loadingForm, setLoadingForm] = useState(true);
   const [tareas, setTareas] = useState([]);
   const [loading, setLoading] = useState(true);
   const statuses = ["pending", "in_progress", "in_revision", "rejected", "completed"]
   const getAll = async () => {
      setLoading(true);
      setLoadingForm(true);

      try {
         const taskResponse = await TaskController.getAllByProject(projectId);
         if(taskResponse && taskResponse.data) {
            setTareas(taskResponse.data);
         }

         const responseStudents = await UserController.findStudentsByProject(projectId);

         if(responseStudents) {
            setFormData(responseStudents);
         }
         
      } catch (error) {
         console.log("Error cargando datos: ", error);
      } finally {
         setLoadingForm(false);
         setLoading(false);
      }
   }

   useEffect(() => {
      if(projectId) {
         getAll();
      } else {
         navigate("/projects");
      }
   }, []);

   const handleEdit = (tarea) => {
      setSelectedTask(tarea);
   }
   const handleUpdate = async (datosTarea) => {
      await TaskController.update(datosTarea);
      getAll();
   }

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
            {!loadingForm ? (
               <NuevaTareaModal onTareaCreada={getAll} formData={formData}/> 
            ) : (<></>)}

            {loading ? (
                    <div className="col-12 text-center p-5 text-muted">
                        <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                        Cargando tareas...
                    </div>
            ) : (
               tareas.length === 0 ? (
                  <div className="text-center p-5 border rounded-3 bg-light text-muted mt-2">No hay tareas registradas para este proyecto.</div>
               ) : (
                  <div className="row g-4 mt-2">
                     {statuses.map(status => (
                        <TareaList key={status} status={status} tareas={tareas.filter(t => t.status === status)} onEdit={handleEdit}/>
                     ))}
                     <EditarTareaModal selectedTask={selectedTask} onUpdate={handleUpdate} formData={formData}/>
                  </div>
               )
            )}
         </div>
      </div>
   )
}