const ProjectController = {};
const API_URL = "http://localhost:8081/api/projects"

ProjectController.getAll = async () => 
   await fetch(API_URL,
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

ProjectController.getFormData = async () =>
   await fetch(API_URL+"/saveFormData",
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

ProjectController.save = async (projectData) =>
   await fetch(API_URL,
      {
         method: "POST",
         headers: {
               "authorization": "Bearer "+sessionStorage.getItem("token"),
               "Content-Type": "application/json",
               "Accept": "application/json"
         },
         body: JSON.stringify(projectData)
      }
   ).then(response => response.json())
   .then(result => (result))
   .catch(console.log);   

export default ProjectController;