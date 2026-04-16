const ReportesController = {};
const API_URL = "http://localhost:8081/api/reports";

const getHeaders = () => ({
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`
});

// Retorna directo (sin wrapper ApiResponse): { projectName, totalTasks, completedTasks, completionPercentage }
ReportesController.getProjectReport = async (projectId) => {
    try {
        const response = await fetch(`${API_URL}/project/${projectId}`, {
            method: "GET",
            headers: getHeaders()
        });
        if (!response.ok) return null;
        return await response.json();
    } catch {
        return null;
    }
};

// Retorna directo (sin wrapper ApiResponse): { studentFullName, loggedHours, requiredHours, hoursPercentage }
ReportesController.getStudentReport = async (studentId) => {
    try {
        const response = await fetch(`${API_URL}/student/${studentId}`, {
            method: "GET",
            headers: getHeaders()
        });
        if (!response.ok) return null;
        return await response.json();
    } catch {
        return null;
    }
};

export default ReportesController;
