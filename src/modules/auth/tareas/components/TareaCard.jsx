import { useEffect, useRef, useState } from "react";
import TaskController from "../tareas.controller";
import { Edit } from "lucide-react";

export default function TareaCard({ tarea, editable, onEdit }) {
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
   const [editingIndex, setEditingIndex] = useState(null);
   const [editandoCampo, setEditandoCampo] = useState(null);   

   const inputRef = useRef(null);

   useEffect(() => {
      if(editandoCampo && inputRef.current) {
         inputRef.current.focus();
         inputRef.current.selectionStart = inputRef.current.value.length;
      }
   }, [editandoCampo])

   const handleAgregarSubtarea = () => {
      setEditandoCampo(null);
      setEditando(true);
   }
   const agregarSubtarea = async () => {
      if (nuevaSubtarea.trim()) {
         const nuevaSubtareaObj = {
            id: null,
            name: nuevaSubtarea,
            checked: false
         }
         setSubtareas([...subtareas, nuevaSubtareaObj]);
         
         const response = await TaskController.saveSubtask({
            idTask: item.id,
            name: nuevaSubtareaObj.name,
         });

         setSubtareas(prev => 
            prev.map((element) => {
               if(element.name === nuevaSubtarea) {
                  return {...element, id: response.data};
               }
               return element;
            })
         );

         if(!response.ok) {
            alert("Ocurrió un error al guardar la subtarea: "+message);
            setSubtareas(subtareas.filter(sub => sub.name !== nuevaSubtarea))
         }

      }
      setNuevaSubtarea('');
      setEditando(false);
   };

   const handleKeyDown = (e, confirm, dismiss) => {
      if (e.key === 'Enter') {
         confirm();
      } else if (e.key === 'Escape') {
         dismiss();
      }
   };

   const handleEdit = (setEdit) => {
      setEdit();
      setEditando(false);
   }

   const handleSubtaskUpdate = async () => {
      if(editingIndex === null) return;

      const oldSubtask = subtareas[editingIndex];
      const newText = inputRef.current.value;

      if(newText !== oldSubtask.name) {
         const newSubtaskInf = {
            id: oldSubtask.id,
            name: newText
         }
         modifySubtask(editingIndex, { name: newText })

         try {
            const {error, message} = await TaskController.changeSubtaskName(newSubtaskInf);
            if(error){
               modifySubtask(editingIndex, { name: oldSubtask.name })
               alert("Error al actualizar información de tarea: "+message);
            }
            
         } catch (errorEx) {
            console.log("Ocurrió un error al comunicarse con el servidor: ", errorEx);
            alert("Ocurrió un error al comunicarse con el servidor.");
            modifySubtask(editingIndex, { name: oldSubtask.name })
         }
      }
      setEditingIndex(null);
   }
   const modifySubtask = async (selectedIndex, newProperties) => {
      setSubtareas(prev => 
         prev.map((element, index) => {
            if(index === selectedIndex) {
               return {...element, ...newProperties};
            }
            return element;
         })
      );
   }
   const deleteSubtask = async (index) => {
      const idToDelete = subtareas[index].id;
      try {
            //const {error, message} = 
            await TaskController.deleteSubtask(idToDelete);
            /*if(error){
               alert("Error al eliminar la subtarea: "+message);
            } else {
            }*/
            setSubtareas(subtareas.filter(subtarea => subtarea.id !== idToDelete))
            
      } catch (errorEx) {
         console.log("Ocurrió un error al comunicarse con el servidor: ", errorEx);
         //alert("Ocurrió un error al comunicarse con el servidor.");
      }
   }

   const handleUpdate = async () => {
      if(!editandoCampo) return;

      const oldValue = item[editandoCampo];
      const newValue = inputRef.current.value;
      
      if(newValue !== oldValue) {
         const newTaskInf = {
            id: item.id,
            [editandoCampo]: newValue
         }
         
         setItem({...item, [editandoCampo]: newValue});

         try {
            const {error, message} = await TaskController.update(newTaskInf);
            if(error){
               setItem({...item, [editandoCampo]: oldValue});
               alert("Error al actualizar información de tarea: "+message);
            }
            
         } catch (errorEx) {
            console.log("Ocurrió un error al comunicarse con el servidor: ", errorEx);
            alert("Ocurrió un error al comunicarse con el servidor.");
            setItem({...item, [editandoCampo]: oldValue});
         }
      }
      setEditandoCampo(null);
   }

   const formatearFecha = (isoString) => {
      const date = new Date(isoString);
      return new Intl.DateTimeFormat('es-ES', {
         year: 'numeric',
         month: '2-digit',
         day: '2-digit',
         hour: '2-digit',
         minute: '2-digit',
         second: '2-digit',
         hour12: true
      }).format(date);
   }

   return (
      <div className="card border-0 shadow mb-2">
         <div className="card-body">
            {/* TÍTULO */}
            <div className="field-group">
               {editandoCampo === 'title' && editable ? (
                  <input
                     ref={inputRef}
                     defaultValue={item.title}
                     className="form-control" 
                     onBlur={handleUpdate}
                     onKeyDown={(e) => handleKeyDown(e, () => {
                        handleUpdate();
                     }, () => {
                        setEditandoCampo(null);
                     })}
                  />
               ) : (
                  <p className="fw-bold fs-5" onClick={() => handleEdit(() => { setEditandoCampo('title') })}>
                     {item.title}
                  </p>
               )}
            </div>

            {/* DESCRIPCIÓN */}
            <div className="field-group">
               {editandoCampo === 'description' && editable ? (
                  <textarea
                     ref={inputRef}
                     defaultValue={item.description}
                     className="form-control"
                     onBlur={handleUpdate}
                     onKeyDown={(e) => handleKeyDown(e, () => {
                        handleUpdate();
                     }, () => {
                        setEditandoCampo(null);
                     })}
                  />
               ) : (
                  <p className="small" onClick={() => handleEdit(() => { setEditandoCampo('description') })}>
                     {item.description}
                  </p>
               )}
            </div>
         
            <ul className="list-group list-group-flush">
               {subtareas.map((sub, index) => (
                  <li key={index} className="list-group-item d-flex align-items-center border-0 ps-0">
                     {editingIndex === index ? (
                        <input
                           autoFocus
                           ref={inputRef}
                           defaultValue={sub.name}
                           className="form-control"
                           onBlur={handleSubtaskUpdate}
                           onKeyDown={(e) => handleKeyDown(e, () => {
                              handleSubtaskUpdate();
                           }, () => {
                              setEditingIndex(null);
                           })}
                        />
                     ) : (
                        <>
                           <div className="col">
                              <input type="checkbox" className="me-2" checked={sub.checked} readOnly style={{"accentColor": "green"}}/>
                              <span className="small text-muted" onClick={() => handleEdit(() => { setEditingIndex(index) })} >{sub.name}</span>
                           </div>
                           <div className="col-auto">
                              <div className="btn btn-close btn-outline-danger" onClick={() => deleteSubtask(index)}></div>
                           </div>
                        </>
                     )}
                  </li>
               ))}
            </ul>

            {!editando && editable? (
               <button 
                  className="btn btn-link btn-sm p-0 text-decoration-none mb-3" 
                  onClick={handleAgregarSubtarea}
               >
                  + Agregar subtarea
               </button>
            ) : (
               editable && (
                  <div className="input-group input-group-sm mb-3">
                     <input 
                     type="text" 
                     className="form-control me-2" 
                     value={nuevaSubtarea}
                     onChange={(e) => setNuevaSubtarea(e.target.value)}
                     onKeyDown={(e) => handleKeyDown(e, () => {
                        agregarSubtarea();
                        setNuevaSubtarea('');
                     }, () => {
                        setEditando(false);
                        setNuevaSubtarea('');
                     })}
                     onBlur={() => setEditando(false)}
                     placeholder="Nombre de la subtarea..."
                     autoFocus
                     />
                     <button className="btn btn-primary" onClick={agregarSubtarea}>Agregar</button>
                  </div>
               )
            )}
            <div className="row">
               <div className="text-muted small">
                  {item.student.name}
               </div>
            </div>
            <div className="row">
               <div className="text-muted small">
                  {formatearFecha(item.dueDate)}
               </div>
            </div>
            {editable && (
               <div className="row">
                  <div className="col-12 text-end">
                     <button 
                        onClick={() => onEdit(tarea)}
                        className="btn btn-sm btn-light text-primary border-0" 
                        data-bs-toggle="modal" 
                        data-bs-target="#editarTareaModal"
                     >
                        <Edit size={18} />
                     </button>
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}  