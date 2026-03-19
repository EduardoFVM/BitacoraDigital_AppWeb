const TaskController = {};
const API_URL = "http://localhost:8081/api/tasks"

TaskController.getAllByProject = async (projectId) => 
   await fetch(`${API_URL}/project/${projectId}`,
      {
         method: "GET",
         headers: {
               "authorization": "Bearer fca6d680-cc12-4c75-a02c-39fdf2be55e8",
               "Content-Type": "application/json",
               "Accept": "application/json"
         },
      }
   ).then(response => response.json())
   .then(result => (result))
   .catch(console.log);

export default TaskController;