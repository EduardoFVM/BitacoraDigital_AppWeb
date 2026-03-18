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

    return await response.json();
};

export default AuthController;