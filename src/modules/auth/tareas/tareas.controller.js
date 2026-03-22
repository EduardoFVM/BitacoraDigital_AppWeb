const TaskController = {};
const API_URL = "http://localhost:8081/api/tasks"

TaskController.getAllByProject = async (projectId) => 
   await fetch(`${API_URL}/project/${projectId}`,
      {
         method: "GET",
         headers: {
               "authorization": "Bearer "+sessionStorage.getItem("token"),
               "Content-Type": "application/json",
               "Accept": "application/json"
         },
      }
   ).then(response => response.json())
   .then(result => (result))
   .catch(console.log);

export default TaskController;