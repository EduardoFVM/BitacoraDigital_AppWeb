const PrincipalController = {}
const API_URL = "http://localhost:8081/api/dashboards";

const getHeaders = () => ({
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`
});

PrincipalController.getByStudent = async (studentId) =>
    await fetch(`${API_URL}/student/${studentId}`, {
        method: "GET",
        headers: getHeaders()
    })
    .then(response => response.json())
    .then(result => result)
    .catch(console.log);

export default PrincipalController