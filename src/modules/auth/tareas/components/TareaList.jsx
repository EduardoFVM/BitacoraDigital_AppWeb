import TareaCard from "./TareaCard";

export default function TareaList({status, tareas, onEdit}) {
   return (
      <div className="col-2">
         {status === "pending" && (<p className="fw-bold rounded-4 ps-3" style={{"backgroundColor": "#F9FAFB", "color": "#364153"}}>Pendiente</p>)}
         {status === "in_progress" && (<p className="fw-bold rounded-4 ps-3" style={{"backgroundColor": "#EFF6FF", "color": "#1447E6"}}>En Progreso</p>)}
         {status === "in_revision" && (<p className="fw-bold rounded-4 ps-3" style={{"backgroundColor": "#FEFCE8", "color": "#A65F00"}}>En Revisión</p>)}
         {status === "completed" && (<p className="fw-bold rounded-4 ps-3" style={{"backgroundColor": "#F0FDF4", "color": "#008236"}}>Completada</p>)}
         {status === "rejected" && (<p className="fw-bold rounded-4 ps-3" style={{"backgroundColor": "#FEF2F2", "color": "#E7000B"}}>Rechazada</p>)}
         {tareas.map((tarea) => (
            <TareaCard key={tarea.id} tarea={tarea} editable={status !== 'completed'} onEdit={onEdit}/>
         ))}
      </div>
   )
}