import { useState } from "react";
import BaseCard from "../../../../components/cards/BaseCard";

export default function TareaCard({ tarea }) {
   const [item, setItem] = useState(tarea || {
      title: "Titulo de la tarea",
      description: "Descripción breve de la tarea",
      status: "estado",
      dueDate: "fecha de entrega",
      subTasks: []
   })

   const [subtareas, setSubtareas] = useState(item.subTasks || []);
   const [nuevaSubtarea, setNuevaSubtarea] = useState('');
   const [editando, setEditando] = useState(false);

   const agregarSubtarea = () => {
      if (nuevaSubtarea.trim()) {
         const nuevaSubtareaObj = {
            name: nuevaSubtarea,
            checked: false
         }
         setSubtareas([...subtareas, nuevaSubtareaObj]);
         setNuevaSubtarea('');
         setEditando(false);
      }
   };
   const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
         agregarSubtarea();
      } else if (e.key === 'Escape') {
         setEditando(false);
         setNuevaSubtarea('');
      }
   };

   return (
      <div className="card border-0 shadow mb-2">
         <div className="card-body">
            <p className="fw-bold fs-5">{item.title}</p>
            <p className="small">{item.description}</p>
         
            <ul className="list-group list-group-flush">
               {subtareas.map((sub, index) => (
                  <li key={index} className="list-group-item d-flex align-items-center border-0 ps-0">
                  <input type="checkbox" onChange={({target}) => {
                     const updatedSubtareas = [...subtareas];
                     updatedSubtareas[index].checked = target.checked;
                     setSubtareas(updatedSubtareas);
                  }} className="me-2" checked={sub.checked} style={{"accentColor": "green"}}/>
                  <span className="small text-muted">{sub.name}</span>
                  </li>
               ))}
            </ul>

            {!editando ? (
               <button 
                  className="btn btn-link btn-sm p-0 text-decoration-none mb-3" 
                  onClick={() => setEditando(true)}
               >
                  + Agregar subtarea
               </button>
            ) : (
               <div className="input-group input-group-sm mb-3">
                  <input 
                  type="text" 
                  className="form-control me-2" 
                  value={nuevaSubtarea}
                  onChange={(e) => setNuevaSubtarea(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  placeholder="Nombre de la subtarea..."
                  autoFocus
                  />
                  <button className="btn btn-primary" onClick={agregarSubtarea}>Agregar</button>
               </div>
            )}
            <div className="row">
               <div className="text-muted small">
                  {item.studentName}
               </div>
            </div>
            <div className="row">
               <div className="text-muted small">
                  {item.dueDate}
               </div>
            </div>
         </div>
      </div>
   )
}  