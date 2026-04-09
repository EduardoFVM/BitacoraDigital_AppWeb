const PrincipalController = {}
const API_URL = "";
const HEADERS = {
    "content-type" : "application/json",
    "accept" : "application/json"
}

PrincipalController.findAll = async () =>
    await fetch(API_URL, {
        method: "GET",
        headers: HEADERS
    })
    .then(response => response.json())
    .then(result => (result))
    .catch(console.log())

export default PrincipalController