const EvidenceController = {};
const API_URL = "http://localhost:8081/api/evidences"

EvidenceController.getAll = async () =>
   await fetch(API_URL, 
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

EvidenceController.getByAdvisorId = async (advisorId) =>
   await fetch(`${API_URL}/${advisorId}`, 
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

EvidenceController.changeStatus = async (changeObj) =>
   await fetch(API_URL, 
      {
         method: "PUT",
         headers: {
               "authorization": "Bearer "+localStorage.getItem("token"),
               "Content-Type": "application/json",
               "Accept": "application/json"
         },
         body: JSON.stringify(changeObj)
      }
   ).then(response => response.json())
   .then(result => (result))
   .catch(console.log);

export default EvidenceController;