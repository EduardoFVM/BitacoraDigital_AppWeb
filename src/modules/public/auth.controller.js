const AuthController = {};
const API_URL = "http://localhost:8081/api/auth/login"

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
        throw new Error("Contraseña o Correo Incorrectos")
    }

    const resultado = await response.json();

    if (resultado.token) {
        sessionStorage.setItem("token", resultado.token);
    }

    let rolAmigable = resultado.role;
    if (resultado.role === "Estudiante") rolAmigable = "Estudiante";
    if (resultado.role === "Administrador") rolAmigable = "Administrador";

    const usuarioGuardar = {
        id: resultado.userId,
        rol: rolAmigable,
        nombre: resultado.userName 
    };

    sessionStorage.setItem("usuario", JSON.stringify(usuarioGuardar));

    return resultado;
};

export default AuthController;