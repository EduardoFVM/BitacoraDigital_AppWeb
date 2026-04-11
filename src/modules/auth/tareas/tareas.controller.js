const TaskController = {};
const API_URL = "http://localhost:8081/api/tasks"
const SUBTASK_API_URL = "http://localhost:8081/api/subtasks"

TaskController.getAllByProject = async (projectId) => 
   await fetch(`${API_URL}/project/${projectId}`,
      {
         method: "GET",
         headers: {
               "authorization": "Bearer "+localStorage.getItem("token"),
               "Content-Type": "application/json",
               "Accept": "application/json"
         },
      }
   ).then(response => response.json())
   .then(result => (result))
   .catch(console.log);

TaskController.save = async (task) => 
   await fetch(API_URL,
      {
         method: "POST",
         headers: {
               "authorization": "Bearer "+localStorage.getItem("token"),
               "Content-Type": "application/json",
               "Accept": "application/json"
         },
         body: JSON.stringify(task)
      }
   ).then(response => response.json())
   .then(result => (result))
   .catch(console.log);

TaskController.update = async (task) => 
   await fetch(API_URL,
      {
         method: "PUT",
         headers: {
               "authorization": "Bearer "+localStorage.getItem("token"),
               "Content-Type": "application/json",
               "Accept": "application/json"
         },
         body: JSON.stringify(task)
      }
   ).then(response => response.json())
   .then(result => (result))
   .catch(console.log);

TaskController.saveSubtask = async (subtask) => 
   await fetch(API_URL+'/save-subtask',
      {
         method: "POST",
         headers: {
               "authorization": "Bearer "+localStorage.getItem("token"),
               "Content-Type": "application/json",
               "Accept": "application/json"
         },
         body: JSON.stringify(subtask)
      }
   ).then(response => response.json())
   .then(result => (result))
   .catch(console.log);

TaskController.changeSubtaskName = async (subtask) => 
   await fetch(SUBTASK_API_URL+'/change-name',
      {
         method: "PUT",
         headers: {
               "authorization": "Bearer "+localStorage.getItem("token"),
               "Content-Type": "application/json",
               "Accept": "application/json"
         },
         body: JSON.stringify(subtask)
      }
   ).then(response => response.json())
   .then(result => (result))
   .catch(console.log);

TaskController.deleteSubtask = async (id) => 
   await fetch(`${SUBTASK_API_URL}/${id}`,
      {
         method: "DELETE",
         headers: {
               "authorization": "Bearer "+localStorage.getItem("token"),
               "Content-Type": "application/json",
               "Accept": "application/json"
         },
      }
   ).then(response => response.json())
   .then(result => (result))
   .catch(console.log);

export default TaskController;