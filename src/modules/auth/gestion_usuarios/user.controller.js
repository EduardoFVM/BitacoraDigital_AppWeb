const UserController = {};

const API_URL = "http://localhost:8081/api/users";

const getHeaders = () => {
    const token = localStorage.getItem("token");
    return{
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": token ? `Bearer ${token}` : ""
    };
};

UserController.findAll = async () => 
    await fetch(API_URL, {
        method: "GET",
        headers: getHeaders()
    })
    .then(response => {
        if(!response.ok) throw new Error("Error al consultar el backend");
        return response.json();
    })
    .then(result => result.data)
    .catch(error => {
        console.error("Error al obtener la lista de usuarios:", error);
        return [];
    });

UserController.findStudentsByProject = async (projectId) => 
    await fetch(`${API_URL}/students/${projectId}`, {
        method: "GET",
        headers: getHeaders()
    })
    .then(response => {
        if(!response.ok) throw new Error("Error al consultar el backend");
        return response.json();
    })
    .then(result => result.data)
    .catch(error => {
        console.error("Error al obtener la lista de estudiantes:", error);
        return [];
    });

UserController.save = async (usuario) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(usuario)
    });

    if (!response.ok) {
        throw new Error("Error al guardar el usuario en el backend");
    }

    return await response.json();
};

UserController.update = async (id, usuario) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(usuario)
    });

    if (!response.ok) {
        throw new Error(`Error al actualizar el usuario con ID: ${id}`);
    }

    return await response.json();
};

UserController.updateStatus = async (id) => {
    const response = await fetch(`${API_URL}/${id}/status`, {
        method: "PATCH", 
        headers: getHeaders()
    });

    if (!response.ok) {
        throw new Error(`Error al cambiar el estatus del usuario con ID: ${id}`);
    }

    return await response.json();
};

export default UserController;