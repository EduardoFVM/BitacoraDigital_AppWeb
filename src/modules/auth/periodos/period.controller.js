const PeriodController = {};
const API_URL = "http://localhost:8081/api/periods"

const getHeaders = () => {
    const token = localStorage.getItem("token");
    return{
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": token ? `Bearer ${token}` : ""
    };
};

PeriodController.getAll = async () => 
   await fetch(API_URL,
      {
         method: "GET",
         headers: getHeaders()
      }
   ).then(response => response.json())
   .then(result => (result))
   .catch(console.log);

PeriodController.getMaxEndDate = async () => 
   await fetch(API_URL+"/max-end-date",
      {
         method: "GET",
         headers: getHeaders()
      }
   ).then(response => response.json())
   .then(result => (result))
   .catch(console.log);

PeriodController.getPeriodLimits = async (periodData) => 
   await fetch(API_URL+"/period-limits",
      {
         method: "POST",
         headers: getHeaders(),
         body: JSON.stringify(periodData)
      }
   ).then(response => response.json())
   .then(result => (result))
   .catch(console.log);

PeriodController.save = async (periodData) =>
   await fetch(API_URL,
      {
         method: "POST",
         headers: getHeaders(),
         body: JSON.stringify(periodData)
      }
   ).then(response => response.json())
   .then(result => (result))
   .catch(console.log);   

PeriodController.update = async (periodData) =>
   await fetch(API_URL,
      {
         method: "PUT",
         headers: getHeaders(),
         body: JSON.stringify(periodData)
      }
   ).then(response => response.json())
   .then(result => (result))
   .catch(console.log);   

export default PeriodController;