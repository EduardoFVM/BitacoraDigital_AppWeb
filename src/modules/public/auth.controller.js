const AuthController = {};
const API_URL = "http://localhost:8081/api/auth/login"
const FIRST_LOGIN_URL = "http://localhost:8081/api/auth/first-login";

AuthController.login = async (credentials) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(credentials)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.data || "Contraseña o Correo Incorrectos")
    }

    const resultado = await response.json();
   

    if (resultado.token) {
        localStorage.setItem("token", resultado.token);
    }

    let rolAmigable = resultado.role;
    if (resultado.role === "Estudiante") rolAmigable = "Estudiante";
    if (resultado.role === "Administrador") rolAmigable = "Administrador";

    const usuarioGuardar = {
        id: resultado.userId,
        rol: rolAmigable,
        nombre: resultado.userName
    };

    localStorage.setItem("usuario", JSON.stringify(usuarioGuardar));

    return resultado;
};

AuthController.completeFirstLogin = async (data) => {
    const response = await fetch(FIRST_LOGIN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data) 
    });

    if (!response.ok) {
        throw new Error("No se pudo actualizar la contraseña. Verifica tus datos.");
    }

    const resultado = await response.json();
  

    if (resultado.token) {
        localStorage.setItem("token", resultado.token);
    }

    let rolAmigable = resultado.role;
    if (resultado.role === "Estudiante") rolAmigable = "Estudiante";
    if (resultado.role === "Administrador") rolAmigable = "Administrador";

    const usuarioGuardar = {
        id: resultado.userId,
        rol: rolAmigable,
        nombre: resultado.userName
    };

    localStorage.setItem("usuario", JSON.stringify(usuarioGuardar));

    return resultado;
};

export default AuthController;